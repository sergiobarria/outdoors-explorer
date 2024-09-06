import { db, Payment } from 'astro:db';
import { createId } from '@paralleldrive/cuid2';

export async function savePayment(data: typeof Payment.$inferInsert) {
	const payment = db
		.insert(Payment)
		.values({
			id: createId(),
			...data
		})
		.returning({ id: Payment.id });

	return payment;
}
