import { redirect } from "@sveltejs/kit";

interface Locals {
    user?: {
        id: string;
    };
}

export async function load({ locals, url }: { locals: Locals; url: URL }) {
    let auth = true;
    console.log(locals);
    let id = locals.user?.id;
	if (!locals?.user && url.pathname !== '/account/login') {
		auth = false;
        id = undefined;
        throw redirect(302, '/account/login');
	} 
    return { auth, id }
}
