import { hash, verify } from '@node-rs/argon2';

export async function hashPassword(passwordStr: string) {
	return await hash(passwordStr, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
}

export async function verifyPassword(passwordHash: string, passwordStr: string) {
	return await verify(passwordHash, passwordStr, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
}
