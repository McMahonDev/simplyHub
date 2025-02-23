import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	// Clear the session cookie
	cookies.set('session', '', {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: import.meta.env.VITE_NODE_ENV === 'production',
		maxAge: 0
	});

	// Redirect to the login page
	throw redirect(302, '/account/login');
}
