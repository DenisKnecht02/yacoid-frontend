<script lang="ts">
	import FilteringAuthorModal from '../../components/FilteringAuthorModal.svelte';
	import FilteringCategoryModal from '../../components/FilteringCategoryModal.svelte';
	import QuoteCard from '../../components/QuoteCard.svelte';
	import { goto } from '$app/navigation';
	import Icon from '$components/Icon.svelte';
	import FilterBadge from '$components/FilterBadge.svelte';
	import { AllCategories, type Category, type Definition } from '$types';

	function changeRoute(href: string) {
		goto('/' + href);
	}

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

	let allDefinitions: Definition[] = [
		{
			id: 1,
			category: 'artificial_intelligence',
			author: 'Winston, P.H.',
			publishingDate: new Date(1996),
			quote:
				'Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		},
		{
			id: 2,
			category: 'artificial_intelligence',
			author: 'Winston, P.H.',
			publishingDate: new Date(1996),
			quote:
				'Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		},
		{
			id: 3,
			category: 'artificial_intelligence',
			author: 'Winston, P.H.',
			publishingDate: new Date(1996),
			quote:
				'Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		},
		{
			id: 4,
			category: 'artificial_intelligence',
			author: 'Winston, P.H.',
			publishingDate: new Date(1996),
			quote:
				'Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		},
		{
			id: 5,
			category: 'artificial_intelligence',
			author: 'Winston, P.H.',
			publishingDate: new Date(1996),
			quote:
				'Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		},
		{
			id: 6,
			category: 'human_intelligence',
			author: 'Quinston, Elizabeth',
			publishingDate: new Date(1996),
			quote: 'This is a test definition.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		},
		{
			id: 7,
			category: 'human_intelligence',
			author: 'Quinston, Elizabeth',
			publishingDate: new Date(1996),
			quote: 'This is a test definition.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		},
		{
			id: 8,
			category: 'human_intelligence',
			author: 'Quinston, Elizabeth',
			publishingDate: new Date(1996),
			quote: 'This is a test definition.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		},
		{
			id: 9,
			category: 'human_intelligence',
			author: 'Quinston, Elizabeth',
			publishingDate: new Date(1996),
			quote: 'This is a test definition.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		},
		{
			id: 10,
			category: 'human_intelligence',
			author: 'Quinston, Elizabeth',
			publishingDate: new Date(1996),
			quote: 'This is a test definition.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		},
		{
			id: 11,
			category: 'machine_intelligence',
			author: 'Freg, Thomas',
			publishingDate: new Date(1996),
			quote: 'Machine Intelligence is currently undefined.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		},
		{
			id: 12,
			category: 'machine_intelligence',
			author: 'Freg, Thomas',
			publishingDate: new Date(1996),
			quote: 'Machine Intelligence is currently undefined.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		},
		{
			id: 13,
			category: 'machine_intelligence',
			author: 'Freg, Thomas',
			publishingDate: new Date(1996),
			quote: 'Machine Intelligence is currently undefined.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		},
		{
			id: 14,
			category: 'machine_intelligence',
			author: 'Freg, Thomas',
			publishingDate: new Date(1996),
			quote: 'Machine Intelligence is currently undefined.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		},
		{
			id: 15,
			category: 'machine_intelligence',
			author: 'Freg, Thomas',
			publishingDate: new Date(1996),
			quote: 'Machine Intelligence is currently undefined.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21')
		}
	];

	let filteredDefinitions: Definition[] = [...allDefinitions];
	let selectedCategories: Category[] = [...AllCategories];
	let selectedAuthors: string[] = [...allAuthors];

	let filterIsSet: boolean = filteredDefinitions.length !== allDefinitions.length;

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
		filteredDefinitions = [...allDefinitions].filter(function (element) {
			return (
				element.quote.includes(searchCriteria) &&
				selectedCategories.includes(element.category as Category) &&
				selectedAuthors.includes(element.author)
			);
		});
		filterIsSet = filteredDefinitions.length !== allDefinitions.length;
		calculateAmountOfPages();
	}

	function removeSingleFilter(filterType: string, elementToRemove?: string) {
		if (filterType === 'category') {
			if (selectedCategories.length === 1) {
				selectedCategories = [...AllCategories];
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
		selectedCategories = [...AllCategories];
		selectedAuthors = [...allAuthors];
		searchCriteria = '';
		filterIsSet = false;
		filteredDefinitions = [...allDefinitions];
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
						allCategories={AllCategories}
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
				<button class="btn gap-1" on:click={() => changeRoute('definitions/addDef')}>
					<Icon icon="file-plus" color="#00000" />
					<span class="hidden md:flex">Submit definition</span>
				</button>
			</div>
		</div>

		{#if filterIsSet}
			<div class="flex gap-4 py-6 overflow-x-auto">
				{#if selectedCategories.length !== AllCategories.length}
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
						author={definition.author}
						category={definition.category}
						quote={definition.quote}
						publishingDate={definition.publishingDate}
						source={definition.source}
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
