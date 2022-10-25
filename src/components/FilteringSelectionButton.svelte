<script lang="ts">
	export let name: string;
	export let selected: boolean;
</script>

{#if selected}
	<button class="btn btn-secondary text-white" on:click>{name}</button>
{:else}
	<button class="btn btn-ghost bg-gray-200" on:click>{name}</button>
{/if}

<style lang="postcss">
</style>
