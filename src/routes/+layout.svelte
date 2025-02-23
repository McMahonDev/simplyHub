<script>
	let { children, data } = $props();

	let auth = $state(data.auth);

	$effect(() => {
		console.log('Auth state changed:', auth);
	});
</script>

<header>
	<h1>Your Home Hub</h1>
	<nav>
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
