<script lang="ts">
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import FilteringAuthorModal from '../../components/FilteringAuthorModal.svelte';
	import FilteringCategoryModal from '../../components/FilteringCategoryModal.svelte';
	import QuoteCard from '../../components/QuoteCard.svelte';
	import { goto } from '$app/navigation';

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

	interface Definition {
		id: number;
		category: string;
		quote: string;
		author: string;
		publishing_date: string;
		source: string;
	}

	// data that will be fetched from the server
	let allCategories: string[] = [
		'Human Intelligence',
		'Artificial Intelligence',
		'Machine Intelligence',
		'Plant Intelligence',
		'Alien Intelligence'
	];

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
			category: 'Artificial Intelligence',
			author: 'Winston, P.H.',
			publishing_date: '1992',
			quote:
				'Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		},
		{
			id: 2,
			category: 'Artificial Intelligence',
			author: 'Winston, P.H.',
			publishing_date: '1992',
			quote:
				'Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		},
		{
			id: 3,
			category: 'Artificial Intelligence',
			author: 'Winston, P.H.',
			publishing_date: '1992',
			quote:
				'Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		},
		{
			id: 4,
			category: 'Artificial Intelligence',
			author: 'Winston, P.H.',
			publishing_date: '1992',
			quote:
				'Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		},
		{
			id: 5,
			category: 'Artificial Intelligence',
			author: 'Winston, P.H.',
			publishing_date: '1992',
			quote:
				'Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		},
		{
			id: 6,
			category: 'Human Intelligence',
			author: 'Quinston, Elizabeth',
			publishing_date: '2001',
			quote: 'This is a test definition.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		},
		{
			id: 7,
			category: 'Human Intelligence',
			author: 'Quinston, Elizabeth',
			publishing_date: '2001',
			quote: 'This is a test definition.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		},
		{
			id: 8,
			category: 'Human Intelligence',
			author: 'Quinston, Elizabeth',
			publishing_date: '2001',
			quote: 'This is a test definition.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		},
		{
			id: 9,
			category: 'Human Intelligence',
			author: 'Quinston, Elizabeth',
			publishing_date: '2001',
			quote: 'This is a test definition.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		},
		{
			id: 10,
			category: 'Human Intelligence',
			author: 'Quinston, Elizabeth',
			publishing_date: '2001',
			quote: 'This is a test definition.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		},
		{
			id: 11,
			category: 'Machine Intelligence',
			author: 'Freg, Thomas',
			publishing_date: '2007',
			quote: 'Machine Intelligence is currently undefined.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		},
		{
			id: 12,
			category: 'Machine Intelligence',
			author: 'Freg, Thomas',
			publishing_date: '2007',
			quote: 'Machine Intelligence is currently undefined.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		},
		{
			id: 13,
			category: 'Machine Intelligence',
			author: 'Freg, Thomas',
			publishing_date: '2007',
			quote: 'Machine Intelligence is currently undefined.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		},
		{
			id: 14,
			category: 'Machine Intelligence',
			author: 'Freg, Thomas',
			publishing_date: '2007',
			quote: 'Machine Intelligence is currently undefined.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		},
		{
			id: 15,
			category: 'Machine Intelligence',
			author: 'Freg, Thomas',
			publishing_date: '2007',
			quote: 'Machine Intelligence is currently undefined.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1992.'
		}
	];

	let filteredDefinitions: Definition[] = [...allDefinitions];

	let selectedCategories: string[] = [...allCategories];
	let selectedAuthors: string[] = [...allAuthors];

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

	function setSelectedCategories(selectedCategoriesParam: string[]) {
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
				selectedCategories.includes(element.category) &&
				selectedAuthors.includes(element.author)
			);
		});
		calculateAmountOfPages();
	}

	calculateAmountOfPages();
</script>

<Header />

<div class="flex flex-col m-6">
	<div class="flex flex-wrap-reverse gap-2 navbar bg-gray-100 shadow-lg rounded-lg justify-center lg:justify-between">
		<div class="flex gap-2">
			<!-- The button to open categories modal -->
			<label for="category-modal" class="btn modal-button">Categories</label>
			<FilteringCategoryModal {allCategories} modalName="category-modal" {setSelectedCategories} />

			<!-- The button to open authors modal -->
			<label for="authors-modal" class="btn modal-button">Authors</label>
			<FilteringAuthorModal {allAuthors} modalName="authors-modal" {setSelectedAuthors} />

			<!-- The button to open source modal -->
			<label for="source-modal" class="btn modal-button">Sources</label>
		</div>
		<div class="grid grid-cols-1 md:flex gap-2">
      <div>
        <input
				type="text"
				placeholder="🔍 Search for definition"
				class="input w-full max-w-xs"
				bind:value={searchCriteria}
				on:input={filterDefinitions}
			/>
      </div>
			<div class=" flex gap-2">
        <div class="dropdown flex gap-2">
          <label tabindex="0" class="btn lg:m-0">Export</label>
          <ul tabindex="0" class="dropdown-content menu shadow bg-base-100 rounded-box w-52">
            <li><button>Excel</button></li>
            <li><button>JSON</button></li>
          </ul>
        </div>
        <button class="btn" on:click={() => changeRoute('definitions/addDef')}
          >➕ Add definition</button
        >
			</div>
		</div>
	</div>
	<div class="flex flex-col m-6 gap-8">
		{#each filteredDefinitions as definition}
			{#if filteredDefinitions.indexOf(definition) >= startIndex && filteredDefinitions.indexOf(definition) <= endIndex}
				<QuoteCard
					author={definition.author}
					category={definition.category}
					quote={definition.quote}
					publishing_date={definition.publishing_date}
					source={definition.source}
				/>
			{/if}
		{/each}
	</div>
	<div class="btn-group flex justify-center items-center">
		{#each allPages as page}
			{#if page === currentActivePage}
				<button class="btn btn-secondary" on:click={() => setCurrentActivePage(page)}>{page}</button
				>
			{:else}
				<button class="btn" on:click={() => setCurrentActivePage(page)}>{page}</button>
			{/if}
		{/each}
	</div>
</div>

<Footer />

<style lang="postcss">
</style>
