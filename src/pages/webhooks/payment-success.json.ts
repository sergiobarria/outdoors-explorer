import type { APIRoute } from 'astro';
import type Stripe from 'stripe';

import { stripe } from '@/lib/stripe';
import { updateOrder } from '@/data-access/orders';
import { createBillingAddress, createShippingAddress } from '@/data-access/addresses';

export const prerender = false;
const { STRIPE_WEBHOOK_SECRET } = import.meta.env;

/**
 * Handle POST requests to /webhooks/payment-success.json
 * Used to handle Stripe payment webhooks
 */
export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.text();
		const signature = request.headers.get('stripe-signature');

		if (!signature) {
			return new Response('Invalid signature', { status: 400 });
		}

		const event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);

		if (event.type !== 'checkout.session.completed') {
			return new Response('Invalid event type', { status: 400 });
		}

		if (!event.data.object.customer_details?.email) {
			return new Response('Missing customer email', { status: 400 }); // This should never happen
		}

		const session = event.data.object as Stripe.Checkout.Session;

		const { orderId } = session.metadata || { orderId: null };
		const billingAddress = session.customer_details?.address;
		const shippingAddress = session.customer_details?.address;

		if (!orderId || !billingAddress || !shippingAddress) {
			console.error('Missing order ID or address');
			return new Response('Missing order ID or address', { status: 400 });
		}

		await updateOrder(orderId, {
			status: 'paid',
			isPaid: true,
			modified: new Date().toISOString()
		});

		await createBillingAddress({
			orderId,
			address: billingAddress.line1!,
			city: billingAddress.city!,
			state: billingAddress.state!,
			country: billingAddress.country!,
			zip: billingAddress.postal_code!
		});

		await createShippingAddress({
			orderId,
			address: shippingAddress.line1!,
			city: shippingAddress.city!,
			state: shippingAddress.state!,
			country: shippingAddress.country!,
			zip: shippingAddress.postal_code!
		});

		// TODO: Send a confirmation email

		return new Response('OK', { status: 200 });
	} catch (err: unknown) {
		console.error(err);
		return new Response('Internal server error', { status: 500 });
	}
};
