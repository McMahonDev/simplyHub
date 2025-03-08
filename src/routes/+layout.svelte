<script>
	import '$lib/static/normalize.css';
	import '$lib/static/global.css';

	let { children, data } = $props();

	let auth = $state(data.auth);

	$inspect('auth', auth);
</script>

<header>
	<h1>Your Home Hub</h1>
	<nav>
		<!-- <h2>home</h2> -->
		{#if auth}
			<a href="/account/logout">Logout</a>
		{:else}
			<a href="/account/login">Login</a>
		{/if}
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer></footer>

<style>
	header {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
		padding: 10px;
	}
	nav {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 20px;
		a {
			text-decoration: underline;
		}
	}

	h1 {
		font-size: 2rem;
	}

	h2 {
		font-size: 1.5rem;
		margin: 0;
		padding: 0;
	}
</style>
