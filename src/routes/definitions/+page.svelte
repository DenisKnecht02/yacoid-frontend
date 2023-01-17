<script lang="ts">
	import FilteringAuthorModal from '../../components/FilteringAuthorModal.svelte';
	import FilteringCategoryModal from '../../components/FilteringCategoryModal.svelte';
	import QuoteCard from '../../components/QuoteCard.svelte';
	import { goto } from '$app/navigation';
	import Icon from '$components/Icon.svelte';
	import FilterBadge from '$components/FilterBadge.svelte';
	import { Categories, type Category, type Definition, type SourceType } from '$types';
	import { onMount } from 'svelte';
	import {
		fetchApproveDefinition,
		fetchChangeDefinition,
		fetchDefinitionById,
		fetchDefinitionsPage,
		fetchDeleteDefinition,
		fetchDefinitionPageCount,
		fetchRejectDefinition,
		fetchSubmitDefinition
	} from '$api/definitions';
	import { changeRoute } from '$utils';
	import { session } from '$stores/session';
	import { fetchCreateSource, fetchDeleteSource, fetchSourceById, fetchSourcePage, type CreateSourceRequest } from '$api/sources';
	import { page } from '$app/stores';

	let pageCount: number = 0;
	let definitions: Definition[] = [];
	let filteredDefinitions: Definition[] = [];
	let definitionId: string;

	onMount(() => {
		(async () => {
			//await getPageCount();
			//await submitDefinition();
			//await getDefinitions();
			//await rejectDefinition();
			//await changeDefinition();
			//await approveDefinition();
			//await deleteDefinition();
			//console.log(definitions);
			filteredDefinitions = [...definitions];
			//console.log(definitionId);
			//await deleteSource();
			//await getSourceById();
			//await createSource('journal');
			await getSourcePage();
		})();
	});

	// for pagination logic (will be redundant if we send a new query for each page)
	let maxDefinitionPerPage: number = 10;
	let currentActivePage: number = 1;
	let allPages: number[] = [];
	let startIndex: number = 0;
	let endIndex: number = maxDefinitionPerPage - 1;

	let searchCriteria: string = '';

	let allAuthors: string[] = [
		'Winston, P.H.',
		'Quinston, Elizabeth',
		'Freg, Thomas',
		'Schmindt, Lucas',
		'Kasik, Nikolai'
	];

	let selectedCategories: Category[] = [...Categories];
	let selectedAuthors: string[] = [...allAuthors];

	let filterIsSet: boolean = filteredDefinitions.length !== definitions.length;

	function setCurrentActivePage(pageNumber: number) {
		currentActivePage = pageNumber;
		startIndex = maxDefinitionPerPage * currentActivePage - maxDefinitionPerPage;
		endIndex = maxDefinitionPerPage * currentActivePage - 1;
	}

	function calculateAmountOfPages() {
		allPages = [];
		for (let i = 1; i <= Math.ceil(filteredDefinitions.length / maxDefinitionPerPage); i++) {
			allPages.push(i);
		}
	}

	function setSelectedCategories(selectedCategoriesParam: Category[]) {
		selectedCategories = selectedCategoriesParam;
		filterDefinitions();
	}

	function setSelectedAuthors(selectedAuthorsParam: string[]) {
		selectedAuthors = selectedAuthorsParam;
		filterDefinitions();
	}

	function filterDefinitions() {
		// 	filteredDefinitions = [...definitions].filter(function (element) {
		// 		return (
		// 			element.content.includes(searchCriteria) &&
		// 			selectedCategories.includes(element.category as Category) &&
		// 			selectedAuthors.includes(element.author)
		// 		);
		// 	});
		// 	filterIsSet = filteredDefinitions.length !== definitions.length;
		// 	calculateAmountOfPages();
	}

	function removeSingleFilter(filterType: string, elementToRemove?: string) {
		if (filterType === 'category') {
			if (selectedCategories.length === 1) {
				selectedCategories = [...Categories];
			} else {
				const index = selectedCategories.indexOf(elementToRemove! as Category);
				if (index !== -1) {
					selectedCategories.splice(index, 1);
				}
				selectedCategories = selectedCategories;
			}
		} else if (filterType === 'user') {
			if (selectedAuthors.length === 1) {
				selectedAuthors = [...allAuthors];
			} else {
				const index = selectedAuthors.indexOf(elementToRemove!);
				if (index !== -1) {
					selectedAuthors.splice(index, 1);
				}
				selectedAuthors = selectedAuthors;
			}
		}
		filterDefinitions();
	}

	function removeAllFilters() {
		selectedCategories = [...Categories];
		selectedAuthors = [...allAuthors];
		searchCriteria = '';
		filterIsSet = false;
		filteredDefinitions = [...definitions];
	}

	async function getPageCount() {
		const response = await fetchDefinitionPageCount({ pageSize: 10 });
		if (response.error) {
			console.log(response.error);
		} else {
			pageCount = response.data!;
		}
	}

	async function getDefinitions() {
		const response = await fetchDefinitionsPage({
			pageSize: 10,
			page: 1,
			filter: { approved: true }
		});
		if (response.error) {
			console.log(response.error);
		} else {
			definitions = response.data!;
		}
	}

	async function submitDefinition() {
		if ($session === undefined) {
			console.log('Session is undefined.');
			return;
		}
		const response = await fetchSubmitDefinition($session.id_token, {
			title: 'Test from frontend 2',
			content: 'This is a test from the frontend 2.',
			publishingDate: '2022-09-14T09:08:47.107Z',
			category: 'artificial_intelligence',
			sourceId: '63b54a203e09e73fea2c8c4b'
		});
		if (response.error) {
			console.log(response.error);
		} else {
			definitionId = response.data!;
		}
	}

	async function rejectDefinition() {
		if ($session === undefined) {
			console.log('Session is undefined');
			return;
		}
		const response = await fetchRejectDefinition($session.id_token, {
			id: '63b5529e3e09e73fea2c8c4f',
			content: 'wrong spelling'
		});
		if (response.error) {
			console.log(response.error);
		} else {
			console.log(response.message);
		}
	}

	async function changeDefinition() {
		if ($session === undefined) {
			console.log('Session is undefined');
			return;
		}
		const response = await fetchChangeDefinition($session.id_token, {
			id: '63b5529e3e09e73fea2c8c4f',
			content: 'I change it to this is a good quote.',
			category: 'artificial_intelligence'
		});
		if (response.error) {
			console.log(response.error);
		} else {
			console.log(response.message);
		}
	}

	async function approveDefinition() {
		if ($session === undefined) {
			console.log('Session is undefined');
			return;
		}
		const response = await fetchApproveDefinition($session.id_token, '63b557ce3e09e73fea2c8c54');
		if (response.error) {
			console.log(response.error);
		} else {
			console.log(response.message);
		}
	}

	async function deleteDefinition() {
		if ($session === undefined) {
			console.log('Session is undefined');
			return;
		}
		const response = await fetchDeleteDefinition($session.id_token, '63b557ce3e09e73fea2c8c54');
		if (response.error) {
			console.log(response.error);
		} else {
			console.log(response.message);
		}
	}

	async function deleteSource() {
		if ($session === undefined) {
			console.log('Session is undefined');
			return;
		}
		const response = await fetchDeleteSource($session.id_token, '63c57ecc1bcda285138a60fc');
		if (response.error) {
			console.log(response.error);
		} else {
			console.log(response.message);
		}
	}

	async function getSourceById() {
		if ($session === undefined) {
			console.log('Session is undefined');
			return;
		}
		const response = await fetchSourceById('63c5715f1bcda285138a60f9');
		if (response.error) {
			console.log(response.error);
		} else {
			console.log(response.data);
		}
	}

	async function createSource(testType: SourceType) {
		if ($session === undefined) {
			console.log('Session is undefined');
			return;
		}

		let requestObject: CreateSourceRequest;

		if(testType === 'web') {
			requestObject = {
				type: testType,
				authors: ["63c571231bcda285138a60f8"],
				webProperties: {
					articleName: "Test",
					url: "https://www.scribbr.com/citing-sources/cite-a-book/",
					websiteName: "Scribbr",
					accessDate: "2023-01-17T10:03:59.904+00:00",
					publicationDate: "2023-01-17T10:03:59.904+00:00"
				}	
			}
		} else if (testType === 'book') {
			requestObject = {
				type: testType,
				authors: ["63c571231bcda285138a60f8"],
				bookProperties: {
					title: "Test",
					publicationDate: "2023-01-17T10:03:59.904+00:00",
					pagesFrom: 1,
					pagesTo: 10,
					edition: "2nd edition",
					publisher: "Wiley",
					isbn: "978-3-12-732320-7"
				}	
			}
		} else {
			requestObject = {
				type: testType,
				authors: ["63c571231bcda285138a60f8"],
				journalProperties: {
					title: "Test",
					publicationDate: "2023-01-17T10:03:59.904+00:00",
					pagesFrom: 1,
					pagesTo: 10,
					journalName: "Testjournal",
					edition: "2nd edition",
					publisher: "Wiley",
					doi: "https://doi.org/10.1177/152700250000100304"
				}	
			}
		}
	
		const response = await fetchCreateSource($session.id_token, requestObject!);
		if (response.error) {
			console.log(response.error);
		} else {
			console.log(response.message);
		}
	}

	async function getSourcePage() {
		if ($session === undefined) {
			console.log('Session is undefined');
			return;
		}
		const response = await fetchSourcePage({
			page: 1,
			pageSize: 5			
		}
		);

		if (response.error) {
			console.log(response.error);
		} else {
			console.log(response.data);
		}
	}

	calculateAmountOfPages();
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
				on:input={filterDefinitions}
			/>
			<div class="flex flex-row gap-2 items-center justify-end w-full h-full">
				<p class="text-base text-secondary font-semibold">
					{filteredDefinitions.length} results
				</p>
				<div class="dropdown dropdown-end">
					<label tabindex="0" class="btn btn-outline rounded-full gap-2">
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
						<li>
							<!-- The button to open source modal -->
							<label for="source-modal">Sources</label>
						</li>
					</ul>
					<FilteringCategoryModal
						allCategories={Categories}
						{selectedCategories}
						modalName="category-modal"
						{setSelectedCategories}
					/>
					<FilteringAuthorModal
						{allAuthors}
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
						<li><button>Excel</button></li>
						<li><button>JSON</button></li>
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
				{#if selectedCategories.length !== Categories.length}
					{#each selectedCategories as category}
						<FilterBadge
							filterType="category"
							value={category}
							removeFunction={removeSingleFilter}
						/>
					{/each}
				{/if}
				{#if selectedAuthors.length !== allAuthors.length}
					{#each selectedAuthors as author}
						<FilterBadge filterType="user" value={author} removeFunction={removeSingleFilter} />
					{/each}
				{/if}
				<div
					class="flex justify-center items-center w-fit h-fit badge bg-secondary p-3 cursor-pointer"
					on:click={removeAllFilters}
				>
					<p class="text-base font-semibold text-center">REMOVE ALL FILTERS ❌</p>
				</div>
			</div>
		{/if}

		<div class="flex flex-col gap-8">
			{#each filteredDefinitions as definition}
				{#if filteredDefinitions.indexOf(definition) >= startIndex && filteredDefinitions.indexOf(definition) <= endIndex}
					<QuoteCard
						author=""
						category={definition.category}
						content={definition.content}
						publishingDate={new Date()}
						source=""
					/>
				{/if}
			{/each}
		</div>
		<div class="btn-group flex justify-center items-center">
			{#each allPages as page}
				{#if page === currentActivePage}
					<button class="btn btn-secondary" on:click={() => setCurrentActivePage(page)}
						>{page}</button
					>
				{:else}
					<button class="btn" on:click={() => setCurrentActivePage(page)}>{page}</button>
				{/if}
			{/each}
		</div>
	</div>
</main>

<style lang="postcss">
</style>
