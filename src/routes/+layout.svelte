<script>
    export let children;
</script>

<main>
    {#if children}
        {@render children()}
    {/if}
</main>