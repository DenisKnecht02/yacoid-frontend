<script lang="ts">
	import FilteringSelectionButton from './FilteringSelectionButton.svelte';

	export let allAuthors: string[];
	export let selectedAuthors: string[];
	export let modalName: string;
	export let setSelectedAuthors: Function;

	let allSelected: boolean = true;
	let authorSearchCriteria: string = '';

	function changeSingleSelected(author: string) {
		if (selectedAuthors.includes(author)) {
			selectedAuthors = [...selectedAuthors].filter(function (element) {
				return author === element;
			});
		} else {
			selectedAuthors.push(author);
		}

		allSelected = selectedAuthors.length === selectedAuthors.length;
		selectedAuthors = selectedAuthors;
	}

	function changeAllSelected(truthState: boolean) {
		if (truthState) {
			selectedAuthors = [...allAuthors];
		} else {
			selectedAuthors.splice(0);
		}
		allSelected = truthState;
		selectedAuthors = selectedAuthors;
	}
</script>

<input type="checkbox" id={modalName} class="modal-toggle" />
<div class="modal">
	<div class="flex flex-col modal-box relative gap-6">
		<h3 class="font-bold text-xl">FILTER ALL AUTHORS</h3>
		<div class="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{#each allAuthors as author}
				{#if author.toLowerCase().includes(authorSearchCriteria.toLowerCase())}
					<FilteringSelectionButton
						name={author}
						selected={selectedAuthors.includes(author)}
						on:click={() => changeSingleSelected(author)}
					/>
				{/if}
			{/each}
		</div>
		<div class="flex justify-between">
			<button class="btn btn-sm btn-ghost">See more</button>
			<button class="btn btn-sm btn-ghost" on:click={() => changeAllSelected(!allSelected)}>
				{#if allSelected}
					Deselect All
				{:else}
					Select All
				{/if}
			</button>
		</div>
		<div class="flex flex-col md:flex-row md:justify-between md:items-center">
			<input
				type="text"
				placeholder="🔍 Search for author"
				class="input input-bordered max-w-3xl"
				bind:value={authorSearchCriteria}
			/>
			<div class="flex justify-start md:justify-self-end gap-2">
				<label
					for={modalName}
					class="btn btn-error"
					on:click={() => {
						selectedAuthors = [...allAuthors];
						setSelectedAuthors(selectedAuthors);
					}}
				>
					Cancel
				</label>
				<label for={modalName} class="btn" on:click={() => setSelectedAuthors(selectedAuthors)}>
					Filter
				</label>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
