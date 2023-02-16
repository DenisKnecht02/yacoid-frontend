<script lang="ts">
	import FilteringAuthorModal from '../../components/FilteringAuthorModal.svelte';
	import FilteringCategoryModal from '../../components/FilteringCategoryModal.svelte';
	import QuoteCard from '../../components/QuoteCard.svelte';
	import { goto } from '$app/navigation';
	import Icon from '$components/Icon.svelte';
	import {
		Categories,
		CategoryLabel,
		getSourceDisplayName,
		type Author,
		type Category,
		type Definition
	} from '$types';
	import {
		fetchDefinitionsPage,
		fetchDefinitionPageCount,
		type DefinitionFilter
	} from '$api/definitions';
	import { changeRoute, getSingleAuthorDisplayName } from '$utils';

	let definitionPageCount: number = 0;
	let definitionCurrentActivePage: number = 1;

	let definitions: Definition[] = [];
	let currentFilter: DefinitionFilter = { approved: true };
	let filterIsSet: boolean =
		currentFilter.authors || currentFilter.categories || currentFilter.content ? true : false;

	let searchCriteria: string = '';
	let authors: Author[] = [];
	let selectedCategories: Category[] = [];
	let selectedAuthors: Author[] = [];

	(async () => {
		await getPageCount();
		await getDefinitions();
	})();

	async function getPageCount() {
		const response = await fetchDefinitionPageCount({
			pageSize: 10,
			filter: currentFilter
		});
		if (response.error) {
			console.log(response.error);
		} else {
			definitionPageCount = response.data!;
		}
	}

	async function getDefinitions() {
		const response = await fetchDefinitionsPage({
			pageSize: 10,
			page: definitionCurrentActivePage,
			filter: currentFilter
		});
		if (response.error) {
			console.log(response.error);
		} else {
			definitions = response.data!;
		}
	}

	function setSelectedCategories(selectedCategoriesParam: Category[]) {
		selectedCategories = selectedCategoriesParam;
		if (selectedCategories.length !== 0) {
			currentFilter = { ...currentFilter, categories: selectedCategories };
		} else {
			delete currentFilter.categories;
		}
		filterIsSet =
			currentFilter.authors || currentFilter.categories || currentFilter.content ? true : false;
		getPageCount();
		getDefinitions();
	}

	function setSelectedAuthors(selectedAuthorsParam: Author[]) {
		selectedAuthors = selectedAuthorsParam;

		let selectedAuthorsIds: string[] = [];
		selectedAuthors.forEach((author: Author) => {
			selectedAuthorsIds.push(author.id);
		});
		if (selectedAuthors.length !== 0) {
			currentFilter = { ...currentFilter, authors: selectedAuthorsIds };
		} else {
			delete currentFilter.authors;
		}
		filterIsSet =
			currentFilter.authors || currentFilter.categories || currentFilter.content ? true : false;
		getPageCount();
		getDefinitions();
	}

	function removeAllFilters() {
		selectedCategories = [];
		selectedAuthors = [];
		searchCriteria = '';
		filterIsSet = false;
		currentFilter = { approved: true };
		getPageCount();
		getDefinitions();
	}

	function convertToCSV(definitionsToExport: Definition[]): string {
		var array =
			typeof definitionsToExport != 'object'
				? JSON.parse(definitionsToExport)
				: definitionsToExport;
		var resultString =
			'sep=|\r\nID|submittedBy|submittedByName|submittedByDate|Definition|Source|Category\r\n';

		definitionsToExport.forEach((definition: Definition) => {
			let line: string = '';
			Object.keys(definition).forEach((property: string) => {
				if (line !== '') line += '|';

				if (property === 'source') {
					line += getSourceDisplayName(definition.source);
				} else {
					//@ts-ignore
					line += definition[property];
				}
			});
			resultString += line + '\r\n';
		});

		return resultString;
	}
</script>

<main>
	<div class="flex flex-col p-8 gap-8">
		<h1 class="text-3xl font-bold lg:text-4xl lg:font-black text-center">All Definitions</h1>
		<div class="flex flex-col gap-4 xl:flex-row md:justify-between md:items-center">
			<input
				type="text"
				placeholder="🔍 Search for definition"
				class="input w-full border-2 border-inherit hover:border-1"
				bind:value={searchCriteria}
				on:input={() => {
					if (searchCriteria) {
						currentFilter = { ...currentFilter, content: searchCriteria };
						getPageCount();
						getDefinitions();
					} else {
						delete currentFilter.content;
						getPageCount();
						getDefinitions();
					}
					filterIsSet =
						currentFilter.authors || currentFilter.categories || currentFilter.content
							? true
							: false;
				}}
			/>
			<div class="flex flex-row gap-2 items-center justify-end w-full h-full">
				<p class="text-base text-secondary font-semibold">
					{definitions.length} results
				</p>
				<div class="dropdown dropdown-end">
					<label tabindex="0" class="btn btn-outline rounded-full gap-2" for="">
						<Icon icon="sliders" color="#00000" />
						<p class="hidden md:flex">All filters</p>
					</label>
					<ul tabindex="0" class="dropdown-content menu shadow bg-base-100 rounded-box w-52">
						<li>
							<!-- The button to open categories modal -->
							<label for="category-modal">Categories</label>
						</li>
						<li>
							<!-- The button to open authors modal -->
							<label for="authors-modal">Authors</label>
						</li>
						<!-- <li>
							<label for="source-modal">Sources</label>
						</li> -->
					</ul>
					<FilteringCategoryModal
						categories={Categories}
						{selectedCategories}
						modalName="category-modal"
						{setSelectedCategories}
					/>
					<FilteringAuthorModal
						{authors}
						{selectedAuthors}
						modalName="authors-modal"
						{setSelectedAuthors}
					/>
				</div>
				<div class="dropdown dropdown-end">
					<label tabindex="0" class="btn gap-1" for="">
						<Icon icon="share-2" color="#00000" />
						<span class="hidden md:flex">Export</span>
					</label>
					<ul tabindex="0" class="dropdown-content menu shadow bg-base-100 rounded-box w-52">
						<li>
							<a
								href={'data:text/json;charset=utf-8,' +
									encodeURIComponent(JSON.stringify(definitions, null, 2))}
								download={'JSON-Export' + '.json'}>JSON</a
							>
						</li>
						<li>
							<a
								href={'data:text/json;charset=utf-8,' +
									encodeURIComponent(convertToCSV(definitions))}
								download={'Excel-Export' + '.csv'}>Excel</a
							>
						</li>
					</ul>
				</div>
				<button class="btn gap-1" on:click={() => changeRoute(goto, 'definitions/addDef')}>
					<Icon icon="file-plus" color="#00000" />
					<span class="hidden md:flex">Submit definition</span>
				</button>
			</div>
		</div>
		{#if filterIsSet}
			<div class="flex gap-4 py-6 overflow-x-auto">
				{#each selectedCategories as category}
					<div
						class="flex justify-center items-center w-fit h-fit badge bg-secondary p-3 cursor-pointer"
						on:click={() =>
							setSelectedCategories(selectedCategories.filter((element) => element !== category))}
					>
						<p class="text-base font-semibold text-center">{CategoryLabel[category]} ❌</p>
					</div>
				{/each}
				{#each selectedAuthors as author}
					<div
						class="flex justify-center items-center w-fit h-fit badge bg-secondary p-3 cursor-pointer"
						on:click={() =>
							setSelectedAuthors(selectedAuthors.filter((element) => element !== author))}
					>
						<p class="text-base font-semibold text-center">
							{getSingleAuthorDisplayName(author)} ❌
						</p>
					</div>
				{/each}
				<div
					class="flex justify-center items-center w-fit h-fit badge bg-secondary p-3 cursor-pointer"
					on:click={removeAllFilters}
				>
					<p class="text-base font-semibold text-center">Remove all filters ❌</p>
				</div>
			</div>
		{/if}

		<div class="flex flex-col gap-8">
			{#each definitions as definition}
				<QuoteCard {definition} />
			{/each}
		</div>
		<div class="btn-group flex justify-center items-center">
			{#each Array(definitionPageCount) as _, index (index)}
				{#if index + 1 === definitionCurrentActivePage}
					<button
						class="btn btn-secondary"
						on:click={() => {
							definitionCurrentActivePage = index + 1;
							getDefinitions();
						}}>{index + 1}</button
					>
				{:else}
					<button
						class="btn"
						on:click={() => {
							definitionCurrentActivePage = index + 1;
							getDefinitions();
						}}>{index + 1}</button
					>
				{/if}
			{/each}
		</div>
	</div>
</main>

<style lang="postcss">
</style>
