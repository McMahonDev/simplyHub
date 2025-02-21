import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
const { verify } = jwt;
import { db } from '$lib/server/db/index';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const { headers } = event.request;
	const cookies = parse(headers.get('cookie') ?? '');
	if (cookies.session) {
		const token = cookies.session;

		try {
			const jwtUser = verify(token, import.meta.env.VITE_INTERNAL_HASH_SALT);
			if (typeof jwtUser === 'string') {
				throw new Error('Something went wrong');
			}

			const account = await db.select().from(user).where(eq(user.email, jwtUser.user)).execute();

			if (!account[0]) {
				throw new Error('User not found');
			}

			const sessionUser = {
				id: account[0].id,
				email: account[0].email
			};

			event.locals.user = sessionUser;
		} catch (error) {
			console.error(error);
		}
	}

	return await resolve(event);
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession({ locals }) {
	return {
		user: locals.user
	};
}