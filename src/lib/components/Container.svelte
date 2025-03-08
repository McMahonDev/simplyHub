<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<section>
	{@render children?.()}
</section>

<style>
	section {
		display: block;
		max-width: var(--container-width);
		margin: 0 auto;
		width: 100%;
		padding-left: 15px;
		padding-right: 15px;
	}
</style>
