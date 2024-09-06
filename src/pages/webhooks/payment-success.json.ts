import type { APIRoute } from 'astro';
import type Stripe from 'stripe';

import { stripe } from '@/lib/stripe';
import { updateOrder } from '@/data-access/orders';
import { createBillingAddress, createShippingAddress } from '@/data-access/addresses';
import { savePayment } from '@/data-access/payments';

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

		// Get the session and cast it to the correct type that includes the invoice
		const session = (await stripe.checkout.sessions.retrieve(event.data.object.id, {
			expand: ['invoice']
		})) as Stripe.Checkout.Session & { invoice: Stripe.Invoice };

		const { orderId, userId } = session.metadata || { orderId: null, userId: null };
		const billingAddress = session.customer_details?.address;
		const shippingAddress = session.customer_details?.address;
		const paymentIntentId = session.payment_intent as string;

		if (!orderId || !userId || !billingAddress || !shippingAddress) {
			console.error('Missing order ID or address');
			return new Response('Missing order ID or address', { status: 400 });
		}

		// Update order status
		await updateOrder(orderId, {
			status: 'paid',
			isPaid: true,
			modified: new Date().toISOString()
		});

		// Save addresses
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

		// Save payment details
		const paymentMethod = session.payment_method_types[0]; // Assume only one payment method is used, which is card
		const amountPaid = session.amount_total as number;

		await savePayment({
			orderId,
			userId,
			paymentIntentId,
			stripeSessionId: session.id,
			paymentMethod,
			amountPaid,
			status: session.payment_status,
			invoiceUrl: session.invoice.hosted_invoice_url
		});

		// TODO: Send a confirmation email

		return new Response('OK', { status: 200 });
	} catch (err: unknown) {
		console.error(err);
		return new Response('Internal server error', { status: 500 });
	}
};
