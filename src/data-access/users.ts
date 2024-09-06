import { createId } from '@paralleldrive/cuid2';
import { db, eq, User } from 'astro:db';

export async function createUser(data: typeof User.$inferInsert) {
	const [result] = await db
		.insert(User)
		.values({ id: createId(), ...data })
		.returning({ id: User.id });

	return result.id;
}

export async function getUserByEmail(email: string) {
	const result = await db
		.select({ id: User.id, email: User.email, password: User.password })
		.from(User)
		.where(eq(User.email, email))
		.get();

	return result;
}

export async function checkIfUserExists(email: string) {
	const result = await db.select({ id: User.id }).from(User).where(eq(User.email, email)).get();
	if (!result?.id) return null;

	return result?.id;
}
