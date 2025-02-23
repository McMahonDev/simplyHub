import { redirect } from '@sveltejs/kit';

interface Locals {
	user?: {
		id: string;
	};
}

export async function load({ locals, url }: { locals: Locals; url: URL }) {
	let auth: boolean;
	let id: number;
	if (!locals?.user) {
		auth = false;
		id = 0;
		if (url.pathname !== '/account/login') {
			throw redirect(302, '/account/login');
		}
	} else {
		auth = true;
		id = locals.user.id;
	}
	return { auth, id };
}
