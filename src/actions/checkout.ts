import { BASE_URL } from '@/constants';
import { createOrder } from '@/data-access/orders';
import { getTourBySlug } from '@/data-access/tours';
import { getImageUrl } from '@/lib/s3';
import { stripe } from '@/lib/stripe';
import { calculateTotalPrice } from '@/lib/utils';
import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

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
		console.log('USER FOUND');
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
	const image = getImageUrl(tour.images[0]);

	const totalPrice = calculateTotalPrice(tour.price, quantity, tour.discount);
	const orderId = await createOrder(userId, tour.id, totalPrice);

	const session = await stripe.checkout.sessions.create({
		success_url: `${BASE_URL}/checkout?&orderId=${orderId}`,
		cancel_url: `${BASE_URL}/tours/${tour.slug}`,
		payment_method_types: ['card'],
		mode: 'payment',
		shipping_address_collection: { allowed_countries: ['US'] },
		metadata: { orderId },
		line_items: [
			{
				price_data: {
					currency: 'USD',
					product_data: {
						name: tour.name,
						images: [image]
					},
					unit_amount: totalPrice
				},
				quantity
			}
		]
	});

	return { url: session.url };
}
