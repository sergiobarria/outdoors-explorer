import type { AstroCookies } from 'astro';
import type { ActionAPIContext } from 'astro:actions';

import { lucia } from './auth';

export async function createSession(userId: string, cookies: AstroCookies) {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function destroySession(context: ActionAPIContext) {
	if (!context.locals.session) return;

	await lucia.invalidateSession(context.locals.session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}
