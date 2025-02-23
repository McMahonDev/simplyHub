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
	// Check if the user is already logged in
	if (locals?.user) {
		throw redirect(302, '/');
	}
	return {
		props: {
			user: locals.user
		}
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email') as string | null;
		if (!email) {
			// TODO: add error handling for missing email
			throw redirect(302, '/account/login');
		}
		const password = data.get('password') as string;
		let token;

		const account = await db.select().from(user).where(eq(user.email, email)).execute();
		const hashedPassword = hash(password);
		if (account[0] && account[0].password === hashedPassword) {
			token = sign(
				{
					user: email
				},
				import.meta.env.VITE_INTERNAL_HASH_SALT,
				{ expiresIn: '7d' }
			);
		} else {
			console.log('wrong password');
			// TODO: add error
			// throw redirect(302, '/account/login');
		}

		if (token) {
			cookies.set('session', token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: import.meta.env.VITE_NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7 // 1 week
			});
		}

		// redirect the user
		throw redirect(302, '/');
	}
};
