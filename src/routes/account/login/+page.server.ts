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

        console.log(account);
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
	},
	createAccount: async ({ cookies, request }) => {
        console.log('createAccount');
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
            await db.insert(user).values({ email, password: hashedPassword, firstName: '', lastName: '', createdAt: now, updatedAt: now }).execute();
        } catch (error) {
            console.log(error);
            
        }
		

		// redirect the user
		throw redirect(302, '/account/login');
	}
};