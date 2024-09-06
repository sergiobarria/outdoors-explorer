import { defineAction } from 'astro:actions';

import { destroySession } from '@/lib/sessions';
import { checkout } from './checkout';
import { signUp } from './sign-up';
import { signIn } from './sign-in';

export const server = {
	checkout,
	signUp,
	signIn,
	signOut: defineAction({
		accept: 'form',
		handler: async (_, ctx) => {
			await destroySession(ctx);
			return { success: true };
		}
	})
};
