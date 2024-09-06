import { db, eq, Order } from 'astro:db';
import { createId } from '@paralleldrive/cuid2';

export async function createOrder(userId: string, tourId: string, amount: number) {
	const [result] = await db
		.insert(Order)
		.values({
			id: createId(),
			userId,
			tourId,
			amount
		})
		.returning({ id: Order.id });

	return result.id;
}

export async function updateOrder(orderId: string, data: Partial<typeof Order.$inferInsert>) {
	const [order] = await db
		.update(Order)
		.set(data)
		.where(eq(Order.id, orderId))
		.returning({ id: Order.id });

	return order.id;
}
