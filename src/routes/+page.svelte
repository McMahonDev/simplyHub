<script>
	import Events from '$lib/components/Events.svelte';
	import Container from '$lib/components/Container.svelte';
	import Weather from '$lib/components/Weather.svelte';
</script>

<section>
	<Container>
		<div class="grid">
			<Events />
			<Weather />
			<!-- <Shopping /> -->
		</div>
		<nav></nav>
	</Container>
</section>

<style>
	.grid {
		margin-top: calc(var(--headerHeight) + 50px);
	}
</style>
