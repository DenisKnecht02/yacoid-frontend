<script lang="ts">
	import FilteringSelectionButton from './FilteringSelectionButton.svelte';

	export let allCategories: string[];
	export let modalName: string;
	export let setSelectedCategories: Function;

	let selectedCategories: string[] = [...allCategories];
	let allSelected: boolean = true;

	function changeSingleSelected(category: string) {
		if (selectedCategories.includes(category)) {
			const index = selectedCategories.indexOf(category);
			if (index !== -1) {
				selectedCategories.splice(index, 1);
			}
		} else {
			selectedCategories.push(category);
		}
		allSelected = selectedCategories.length === allCategories.length;
		selectedCategories = selectedCategories;
	}

	function changeAllSelected(truthState: boolean) {
		if (truthState) {
			selectedCategories = [...allCategories];
		} else {
			selectedCategories.splice(0);
		}
		allSelected = truthState;
		selectedCategories = selectedCategories;
	}

</script>

<input type="checkbox" id={modalName} class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative">
		<h3 class="font-bold text-xl mb-4">FILTER ALL CATEGORIES</h3>
		<div class="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{#each allCategories as category}
				<FilteringSelectionButton
					name={category}
					selected={selectedCategories.includes(category)}
					on:click={() => changeSingleSelected(category)}
				/>
			{/each}
		</div>
		<div class="flex justify-end mt-6 gap-2">
			<button class="btn btn-sm btn-ghost" on:click={() => changeAllSelected(!allSelected)}>
				{#if allSelected}
					Deselect All
				{:else}
					Select All
				{/if}
			</button>
		</div>
		<div class="flex modal-action justify-self-end">
			<label for={modalName} class="btn" on:click={() => setSelectedCategories(selectedCategories)}
				>Filter</label
			>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
