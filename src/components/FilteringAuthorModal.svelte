<script lang="ts">
	import FilteringSelectionButton from './FilteringSelectionButton.svelte';

	export let allAuthors: string[];
	export let modalName: string;
	export let setSelectedAuthors: Function;

	let selectedAuthors: string[] = [...allAuthors];
	let allSelected: boolean = true;

	function changeSingleSelected(author: string) {
		if (selectedAuthors.includes(author)) {
			const index = selectedAuthors.indexOf(author);
			if (index !== -1) {
				selectedAuthors.splice(index, 1);
			}
		} else {
			selectedAuthors.push(author);
		}
		allSelected = (selectedAuthors.length === allAuthors.length);
		selectedAuthors = selectedAuthors;
	}

	function changeAllSelected(truthState: boolean) {
		if(truthState) {
			selectedAuthors = [...allAuthors];
		} else {
			selectedAuthors.splice(0);
		}
		allSelected = truthState;
		selectedAuthors=selectedAuthors;
	}
</script>

<input type="checkbox" id={modalName} class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative">
		<h3 class="font-bold text-xl mb-4">FILTER ALL AUTHORS</h3>
		<div class="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{#each allAuthors as author}
				<FilteringSelectionButton
					name={author}
					selected={selectedAuthors.includes(author)}
					on:click={() => changeSingleSelected(author)}
				/>
			{/each}
		</div>
		<div class="flex justify-between mt-6 gap-2">
			<button class="btn btn-sm btn-ghost">See more</button>
			<button class="btn btn-sm btn-ghost" on:click={() => changeAllSelected(!allSelected)}>
				{#if allSelected}
					Deselect All
				{:else}
					Select All
				{/if}
			</button>
		</div>
		<div class="flex justify-between">
			<div class="flex mt-6 gap-2">
				<input type="text" placeholder="Search" class="input input-bordered" />
				<button class="btn btn-secondary btn-square">GO</button>
			</div>
			<div class="flex modal-action justify-self-end">
				<label for={modalName} class="btn" on:click={() => setSelectedAuthors(selectedAuthors)}>Filter</label>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
