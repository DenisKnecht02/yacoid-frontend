<script lang="ts">
	import { fetchAuthorPage, fetchAuthorPageCount, type AuthorFilter } from '$api/authors';
	import type { Author } from '$types';
	import { getSingleAuthorDisplayName } from '$utils';
	import FilteringSelectionButton from './FilteringSelectionButton.svelte';

	export let authors: Author[];
	export let selectedAuthors: Author[] = [];
	export let modalName: string;
	export let setSelectedAuthors: Function;
	let authorPageCount: number = 0;
	let authorCurrentActivePage: number = 1;

	let allSelected: boolean = false;
	let searchCriteria: string = '';
	let currentFilter: AuthorFilter = { approved: true };

	(async () => {
		await getPageCount();
		await getAuthors();
	})();

	async function getPageCount() {
		const response = await fetchAuthorPageCount({
			pageSize: 10,
			filter: currentFilter
		});
		if (response.error) {
			console.log(response.error);
		} else {
			authorPageCount = response.data!;
		}
	}

	async function getAuthors() {
		const response = await fetchAuthorPage({
			pageSize: 10,
			page: authorCurrentActivePage,
			filter: currentFilter
		});
		if (response.error) {
			console.log(response.error);
		} else {
			authors = response.data!;
		}
	}

	function changeSingleSelected(author: Author) {
		if (selectedAuthors.find((selectedAuthor: Author) => selectedAuthor.id === author.id)) {
			const index = selectedAuthors.findIndex(
				(selectedAuthor: Author) => selectedAuthor.id === author.id
			);
			if (index !== -1) {
				selectedAuthors.splice(index, 1);
			}
		} else {
			selectedAuthors.push(author);
		}
		selectedAuthors = selectedAuthors;
	}

	function changeAllSelected(truthState: boolean) {
		if (truthState) {
			// if select all was clicked, add the currently displayed authors to all selectedAuthors
			selectedAuthors = [...selectedAuthors, ...authors];
		} else {
			// if deselect all was clicked, remove the currently displayed authors from all selectedAuthors
			authors.forEach((author: Author) => {
				if (selectedAuthors.find((selectedAuthor: Author) => selectedAuthor.id === author.id)) {
					const index = selectedAuthors.findIndex(
						(selectedAuthor: Author) => selectedAuthor.id === author.id
					);
					if (index !== -1) {
						selectedAuthors.splice(index, 1);
					}
				}
			});
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
			{#each authors as author}
				<FilteringSelectionButton
					name={getSingleAuthorDisplayName(author)}
					selected={selectedAuthors.find((selectedAuthor) => selectedAuthor.id === author.id)
						? true
						: false}
					on:click={() => changeSingleSelected(author)}
				/>
			{/each}
		</div>
		<div class="btn-group flex justify-center items-center">
			{#each Array(authorPageCount) as _, index (index)}
				{#if index + 1 === authorCurrentActivePage}
					<button
						class="btn btn-secondary"
						on:click={() => {
							authorCurrentActivePage = index + 1;
							getPageCount();
							getAuthors();
						}}>{index + 1}</button
					>
				{:else}
					<button
						class="btn"
						on:click={() => {
							authorCurrentActivePage = index + 1;
							getPageCount();
							getAuthors();
						}}>{index + 1}</button
					>
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
				bind:value={searchCriteria}
				on:input={() => {
					if (searchCriteria) {
						currentFilter = { ...currentFilter, name: searchCriteria };
						getAuthors();
					} else {
						delete currentFilter.name;
						getAuthors();
					}
				}}
			/>
			<div class="flex justify-start md:justify-self-end gap-2">
				<label for={modalName} class="btn btn-error"> Cancel </label>
				<label for={modalName} class="btn" on:click={() => setSelectedAuthors(selectedAuthors)}>
					Filter
				</label>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
