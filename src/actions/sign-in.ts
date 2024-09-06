import { getUserByEmail } from '@/data-access/users';
import { verifyPassword } from '@/lib/crypto';
import { createSession } from '@/lib/sessions';
import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

const signInSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export const signIn = defineAction({
	accept: 'form',
	input: signInSchema,
	handler: async (input, ctx) => {
		const userId = await loginUser(input);
		await createSession(userId, ctx.cookies);

		return { userId };
	}
});

async function loginUser(validatedInput: z.infer<typeof signInSchema>) {
	const { email, password } = validatedInput;

	const existingUser = await getUserByEmail(email);
	if (!existingUser) {
		throw new ActionError({ code: 'BAD_REQUEST', message: 'Invalid email or password' });
	}

	const validPassword = await verifyPassword(existingUser.password, password);
	if (!validPassword) {
		throw new ActionError({ code: 'BAD_REQUEST', message: 'Invalid email or password' });
	}

	return existingUser.id;
}
