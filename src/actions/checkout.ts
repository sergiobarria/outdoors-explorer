import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import { BASE_URL } from '@/constants';
import { createOrder } from '@/data-access/orders';
import { getTourBySlug } from '@/data-access/tours';
import { calculateBookingPrice } from '@/lib/pricing';
import { stripe } from '@/lib/stripe';

const inputSchema = z.object({
	tourSlug: z.string(),
	quantity: z.number(),
	dateId: z.string()
});

export const checkout = defineAction({
	accept: 'form',
	input: inputSchema,
	handler: async (input, ctx) => {
		if (!ctx.locals.user) {
			throw new ActionError({
				code: 'UNAUTHORIZED',
				message: 'You must be logged in to checkout'
			});
		}

		const { url } = await createCheckoutSession(input, ctx.locals.user.id);
		return { url };
	}
});

async function createCheckoutSession(params: z.infer<typeof inputSchema>, userId: string) {
	const { tourSlug, quantity, dateId } = params;
	const tour = await getTourBySlug(tourSlug);
	const startDate = tour?.startDates.find((d) => d.id === dateId);
	if (!tour || !startDate) {
		throw new ActionError({ code: 'NOT_FOUND', message: 'Tour not found' });
	}

	const { subtotal, salesTax, bookingFee, processingFee, total } = calculateBookingPrice(
		tour.price,
		quantity,
		tour.discount || 0
	);

	const orderId = await createOrder(userId, tour.id, total);

	const session = await stripe.checkout.sessions.create({
		success_url: `${BASE_URL}/checkout?&orderId=${orderId}`,
		cancel_url: `${BASE_URL}/tours/${tour.slug}`,
		payment_method_types: ['card'],
		mode: 'payment',
		shipping_address_collection: { allowed_countries: ['US'] },
		metadata: { orderId, userId },
		invoice_creation: {
			enabled: true, // Enable automatic invoice creation
			invoice_data: {
				description: `Invoice for ${tour.name} booking`
			}
		},
		line_items: [
			{
				price_data: {
					currency: 'USD',
					product_data: {
						name: tour.name,
						images: [tour.images[0]]
					},
					unit_amount: subtotal
				},
				quantity
			},
			{
				price_data: {
					currency: 'USD',
					product_data: {
						name: 'Booking Fee'
					},
					unit_amount: bookingFee
				},
				quantity: 1
			},
			{
				price_data: {
					currency: 'USD',
					product_data: {
						name: 'Processing Fee'
					},
					unit_amount: processingFee
				},
				quantity: 1
			}
		]
	});

	return { url: session.url };
}
