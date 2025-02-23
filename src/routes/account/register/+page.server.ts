import { redirect } from '@sveltejs/kit';
import { hash } from '$lib/utils/hash.js';
import { db } from '$lib/server/db/index';
import { eq } from 'drizzle-orm';
import { user } from '$lib/server/db/schema';

// Ensure the user schema includes the email field
import jwt from 'jsonwebtoken';
const { sign } = jwt;

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }: { locals: { user: any } }) {
	return {
		props: {
			user: locals.user
		}
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	createAccount: async ({ request }) => {
		const data = await request.formData();
		console.log(data);
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const confirmPassword = data.get('confirmPassword') as string;
		console.log(email, password, confirmPassword);
		if (password !== confirmPassword) {
			// TODO: add error
			throw redirect(302, '/account/login');
		}

		const account = await db.select().from(user).where(eq(user.email, email)).execute();
		console.log(account);
		if (account[0]) {
			// TODO: add error
			throw redirect(302, '/account/login');
		}

		const hashedPassword = hash(password);
		const now = new Date().toISOString();
		try {
			await db
				.insert(user)
				.values({
					email,
					password: hashedPassword,
					firstName: '',
					lastName: '',
					createdAt: now,
					updatedAt: now
				})
				.execute();
		} catch (error) {
			console.log(error);
		}

		// redirect the user
		throw redirect(302, '/account/login');
	}
};
