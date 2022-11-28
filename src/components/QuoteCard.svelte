<script lang="ts">
	export let category: string = '';
	export let quote: string = '';
	export let author: string = '';
	export let publishing_date: string = '';
	export let source: string = '';
</script>

<div class="card w-[1/4] bg-base-100 shadow-xl">
	<div class="card-body">
		<div class="flex justify-between h-12 items-center">
			<div class="badge badge-secondary text-base w-fit h-fit">{category}</div>
		</div>
		<p class="flex italic text-xl text-justify items-center">"{quote}"</p>
		<div>
			<p class="flex justify-end items-end font-bold">- {author} ({publishing_date})</p>
			<p class="flex justify-end items-end italic">from: {source}</p>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
