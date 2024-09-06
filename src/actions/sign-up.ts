import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import { createProfile } from '@/data-access/profiles';
import { checkIfUserExists, createUser } from '@/data-access/users';
import { hashPassword } from '@/lib/crypto';
import { createSession } from '@/lib/sessions';

const signUpSchema = z
	.object({
		firstName: z.string().min(3, { message: 'First name must be at least 3 characters' }),
		lastName: z.string(),
		email: z.string().email(),
		password: z.string().min(8),
		passwordConfirmation: z.string(),
		acceptedTerms: z.boolean().default(false)
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: 'Passwords do not match',
		path: ['passwordConfirmation']
	});

export const signUp = defineAction({
	accept: 'form',
	input: signUpSchema,
	handler: async (input, ctx) => {
		const { userId } = await registerNewUser(input);
		await createSession(userId, ctx.cookies);

		return { userId };
	}
});

async function registerNewUser(validatedData: z.infer<typeof signUpSchema>) {
	const { password, email, acceptedTerms, firstName, lastName } = validatedData;
	const passwordHash = await hashPassword(password);

	const userExists = await checkIfUserExists(email);
	if (userExists) {
		throw new ActionError({ code: 'CONFLICT', message: 'User already exists' });
	}

	const userId = await createUser({ email, password: passwordHash, acceptedTerms });
	await createProfile({ userId, firstName, lastName });

	return { userId };
}
