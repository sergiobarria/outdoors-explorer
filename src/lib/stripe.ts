import Stripe from 'stripe';

const { STRIPE_SECRET_KEY } = import.meta.env;

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2024-06-20',
	typescript: true
});
