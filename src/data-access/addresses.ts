import { createId } from '@paralleldrive/cuid2';
import { db, BillingAddress, ShippingAddress } from 'astro:db';

export async function createBillingAddress(address: typeof BillingAddress.$inferInsert) {
	const [billingAddress] = await db
		.insert(BillingAddress)
		.values({ id: createId(), ...address })
		.returning({ id: BillingAddress.id });

	return billingAddress.id;
}

export async function createShippingAddress(address: typeof ShippingAddress.$inferInsert) {
	const [shippingAddress] = await db
		.insert(ShippingAddress)
		.values({ id: createId(), ...address })
		.returning({ id: ShippingAddress.id });

	return shippingAddress.id;
}
