<script lang="ts">
	export let removeFunction: Function;
	export let filterType: string;
	export let value: string | number;
</script>

<div
	class="flex justify-center items-center w-fit h-fit badge bg-secondary p-3 cursor-pointer"
	on:click={() => removeFunction(filterType, value)}
>
	<p class="text-base font-semibold text-center">{value} ❌</p>
</div>

<style lang="postcss">
</style>
