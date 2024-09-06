import { db, Profile } from 'astro:db';

export async function createProfile(data: typeof Profile.$inferInsert) {
	const [result] = await db.insert(Profile).values(data).returning({ id: Profile.id });

	return result.id;
}
