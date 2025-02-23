export async function GET({ cookies }) {
	cookies.set('session', '', {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: import.meta.env.VITE_NODE_ENV === 'production',
		maxAge: 0
	});

	return new Response(null, { status: 200 });
}
