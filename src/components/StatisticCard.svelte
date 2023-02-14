<script lang="ts">
	export let title: string;
	export let value: string;
	export let description: string;
	export let svg: string;
</script>

<div class="stat shadow-md rounded-xl justify-self-center">
	<div class="stat-figure text-secondary">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="inline-block w-8 h-8 stroke-current"
			><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svg} /></svg
		>
	</div>
	<div class="stat-title text-base md:text-lg opacity-75 ">{title}</div>
	<div class="stat-value text-3xl lg:text-4xl">{value}</div>
	<div class="stat-desc text-base md:text-lg opacity-75">{description}</div>
</div>

<style lang="postcss">
</style>
