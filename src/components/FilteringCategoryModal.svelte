<script lang="ts">
	import type { Category } from '$types';
	import FilteringSelectionButton from './FilteringSelectionButton.svelte';

	export let allCategories: Category[];
	export let selectedCategories: Category[];
	export let modalName: string;
	export let setSelectedCategories: Function;

	let allSelected: boolean = true;

	function changeSingleSelected(category: Category) {
		if (selectedCategories.includes(category)) {
			selectedCategories = [...allCategories].filter(function (element) {
				return category === element;
			});
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
			<label
				for={modalName}
				class="btn btn-error"
				on:click={() => {
					selectedCategories = [...allCategories];
					setSelectedCategories(selectedCategories);
				}}
			>
				Cancel
			</label>
			<label for={modalName} class="btn" on:click={() => setSelectedCategories(selectedCategories)}>
				Filter
			</label>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
