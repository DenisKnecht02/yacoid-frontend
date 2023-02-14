<script lang="ts">
	import type { GenericResponse } from '$api/api';
	import {
		fetchAuthorById,
		fetchAuthorPage,
		fetchAuthorPageCount,
		fetchCreateAuthor,
		type AuthorFilter
	} from '$api/authors';
	import Icon from '$components/Icon.svelte';
	import { session } from '$stores/session';
	import {
		AuthorTypes,
		Categories,
		CategoryLabel,
		type Author,
		type AuthorType,
		type SourceType
	} from '$types';
	import { getSingleAuthorDisplayName } from '$utils';

	let suggestedAuthors: Author[] = [];
	let selectedAuthors: Author[] = [];

	let authorSearchCriteria: string = '';
	let authorType: AuthorType = 'person';
	let authorFirstName: string = '';
	let authorLastName: string = '';
	let authorOrganizationName: string = '';

	let sourceType: SourceType = 'book';

	// all properties for book source
	let bookTitle: string;
	let bookPublicationDate: Date;
	let bookPublicationPlace: string;
	let bookPagesFrom: number;
	let bookPagesTo: number;
	let bookEdition: string;
	let bookPublisher: string;
	let bookISBN: string;
	let bookEAN: string;
	let bookDOI: string;

	// all properties for journal source
	let journalTitle: string;
	let journalArticleName: string;
	let journalPublicationDate: Date;
	let journalPublicationPlace: string;
	let journalPagesFrom: number;
	let journalPagesTo: number;
	let journalEdition: string;
	let journalPublisher: string;
	let journalDOI: string;

	// all properties for web source
	let webArticleName: string;
	let webURL: string;
	let websiteName: string;
	let webAccessDate: Date;
	let webPublicationDate: Date;

	let authorPageCount: number = 0;
	let authorCurrentActivePage: number = 1;
	let currentFilter: AuthorFilter = {};

	(async () => {
		await getPageCount();
		await getAuthors();
	})();

	async function getPageCount() {
		const response = await fetchAuthorPageCount({
			pageSize: 5,
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
			pageSize: 5,
			page: authorCurrentActivePage,
			filter: currentFilter
		});
		if (response.error) {
			console.log(response.error);
		} else {
			suggestedAuthors = response.data!;
		}
	}

	async function createAuthor() {
		if ($session !== undefined) {
			let response;
			if (authorType === 'person') {
				response = await fetchCreateAuthor($session.id_token, {
					type: authorType,
					personProperties: {
						firstName: authorFirstName,
						lastName: authorLastName
					}
				});
			} else if (authorType === 'organization') {
				response = await fetchCreateAuthor($session.id_token, {
					type: authorType,
					organizationProperties: {
						organizationName: authorOrganizationName
					}
				});
			}
			if (response) {
				if (response.error) {
					console.log(response.error);
				} else {
					// after having created a new author successfully, fetch again all authors and get
					getPageCount();
					getAuthors();
					// get the details of the created author and add it to the selected list of authors
					// response.data contains the id of the newly created author
					let fetchedAuthor: Author = await getAuthorById(response.data!);
					addSelectedAuthor(fetchedAuthor);
				}
			}
			authorFirstName = '';
			authorLastName = '';
			authorOrganizationName = '';
		}
	}

	// get an author by id and return it
	async function getAuthorById(id: string): Promise<Author> {
		const response = await fetchAuthorById(id);
		let fetchedAuthor: Author;
		if (response.error) {
			console.log(response.error);
		} else {
			fetchedAuthor = response.data!;
		}
		return new Promise<Author>((resolve) => {
			resolve(fetchedAuthor);
		});
	}

	function addSelectedAuthor(author: Author) {
		if (!selectedAuthors.includes(author)) {
			selectedAuthors.push(author);
		}
		selectedAuthors = selectedAuthors;
	}

	function removeSelectedAuthor(author: Author) {
		if (selectedAuthors.includes(author)) {
			const index = selectedAuthors.indexOf(author);

			if (index !== -1) {
				selectedAuthors.splice(index, 1);
			}
		}
		selectedAuthors = selectedAuthors;
	}

	// async function submitDefinition() {
	// 	if ($session === undefined) {
	// 		console.log('Session is undefined.');
	// 		return;
	// 	}
	// 	const response = await fetchSubmitDefinition($session.id_token, {
	// 		title: 'Test from frontend 2',
	// 		content: 'This is a test from the frontend 2.',
	// 		publishingDate: '2022-09-14T09:08:47.107Z',
	// 		category: 'artificial_intelligence',
	// 		sourceId: '63b54a203e09e73fea2c8c4b'
	// 	});
	// 	if (response.error) {
	// 		console.log(response.error);
	// 	} else {
	// 		definitionId = response.data!;
	// 	}
	// }
</script>

<main>
	<div class="flex bg-white h-full p-8">
		<div class="card grid w-full shadow-2xl bg-base-100">
			<form class="card-body w-full gap-4" action="./">
				<div
					class="form-control grid grid-cols-1 md:grid-cols-3 items-start gap-0 md:gap-4 md:px-8"
				>
					<label class="label" for="">
						<span class="font-semibold text-xl">Authors</span>
					</label>
					<div class="flex flex-col gap-2 w-full col-span-2">
						<div class="flex w-full gap-1">
							<div class="dropdown dropdown-bottom w-full">
								<label tabindex="0">
									<input
										type="text"
										placeholder="Author name..."
										class="input input-bordered w-full"
										bind:value={authorSearchCriteria}
										on:input={() => {
											if (authorSearchCriteria) {
												// when the user wants to search for specific authors, the filter will be set by using firstName
												// however, in the backend a fuzzy search is performed on all three name types (firstName, lastName, organizationName)
												currentFilter = { firstName: authorSearchCriteria };
												getAuthors();
											} else {
												delete currentFilter.firstName;
												getAuthors();
											}
										}}
									/>
								</label>
								<ul
									tabindex="0"
									class="dropdown-content w-full menu shadow bg-base-100 rounded-b-lg"
								>
									{#each suggestedAuthors as suggestedAuthor}
										<li>
											<div
												class="flex items-center justify-between"
												on:click={() => addSelectedAuthor(suggestedAuthor)}
											>
												<p class="text-base">
													{getSingleAuthorDisplayName(suggestedAuthor)}
												</p>
											</div>
										</li>
									{/each}
								</ul>
							</div>
							<!-- The button to open modal -->
							<div class="tooltip" data-tip="Create new">
								<label for="authors-modal" class="btn btn-square btn-secondary">
									<Icon icon="plus" />
								</label>
							</div>

							<!-- Put this part before </body> tag -->
							<input type="checkbox" id="authors-modal" class="modal-toggle" />
							<label for="authors-modal" class="modal cursor-pointer">
								<label class="modal-box relative w-auto h-fit" for="">
									<div class="flex flex-col gap-6 w-full h-full">
										<h1 class="text-xl md:text-2xl font-bold">Create new author</h1>
										<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
											<p class="text-base md:text-lg font-medium">Choose author type:</p>
											<select class="select w-full max-w-xs" bind:value={authorType}>
												{#each AuthorTypes as authorType}
													<option>{authorType}</option>
												{/each}
											</select>
											{#if authorType === 'person'}
												<p class="text-base md:text-lg font-medium">First name:</p>
												<input
													type="text"
													class="input input-bordered w-full"
													bind:value={authorFirstName}
												/>
												<p class="text-base md:text-lg font-medium">Last name:</p>
												<input
													type="text"
													class="input input-bordered w-full"
													bind:value={authorLastName}
												/>
											{:else}
												<p class="text-base md:text-lg font-medium">Organization name:</p>
												<input
													type="text"
													class="input input-bordered w-full"
													bind:value={authorOrganizationName}
												/>
											{/if}
										</div>
									</div>
									<div class="modal-action">
										<label for="authors-modal" class="btn btn-error">Cancel</label>
										<label
											for={'authors-modal'}
											class="btn btn-secondary"
											on:click={(authorType === 'person' &&
												(authorFirstName === '' || authorLastName === '')) ||
											(authorType === 'organization' && authorOrganizationName === '')
												? () => alert('Missing information, author creation failed.')
												: () => createAuthor()}>Create</label
										>
									</div>
								</label>
							</label>
						</div>
						{#if selectedAuthors.length !== 0}
							<div class="flex w-full h-full overflow-x-auto overflow-y-hidden items-center gap-1">
								{#each selectedAuthors as selectedAuthor}
									<div
										class="badge min-w-[12rem] w-fit h-fit p-2 cursor-pointer"
										on:click={() => removeSelectedAuthor(selectedAuthor)}
									>
										{getSingleAuthorDisplayName(selectedAuthor)} ❌
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</div>
				<div
					class="form-control grid grid-cols-1 md:grid-cols-3 items-start gap-0 md:gap-4 md:px-8"
				>
					<label class="label" for="">
						<span class="font-semibold text-xl">Source</span>
					</label>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 items-center col-span-2">
						<p class="text-base font-medium w-fit">Choose source type:</p>
						<select class="select w-full select-bordered" bind:value={sourceType}>
							<option>book</option>
							<option>journal</option>
							<option>web</option>
						</select>
						{#if sourceType === 'book'}
							<p class="text-base font-medium">Title:</p>
							<input
								type="text"
								class="input input-bordered w-full"
								bind:value={bookTitle}
								required
							/>
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">Publication Date:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input
								type="date"
								class="input input-bordered w-full"
								bind:value={bookPublicationDate}
							/>
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">Starting Page:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input
								type="number"
								class="input input-bordered w-full"
								min="1"
								max="10000"
								bind:value={bookPagesFrom}
							/>
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">Ending Page:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input
								type="number"
								class="input input-bordered w-full"
								min="1"
								max="10000"
								bind:value={bookPagesTo}
							/>
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">Publication Place:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input
								type="text"
								class="input input-bordered w-full"
								bind:value={bookPublicationPlace}
							/>
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">Edition:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input type="text" class="input input-bordered w-full" bind:value={bookEdition} />
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">Publisher:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input type="text" class="input input-bordered w-full" bind:value={bookPublisher} />
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">ISBN:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input type="text" class="input input-bordered w-full" bind:value={bookISBN} />
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">EAN:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input type="text" class="input input-bordered w-full" bind:value={bookEAN} />
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">DOI:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input type="text" class="input input-bordered w-full" bind:value={bookDOI} />
						{:else if sourceType === 'journal'}
							<p class="text-base font-medium">Journal Title:</p>
							<input
								type="text"
								class="input input-bordered w-full"
								bind:value={journalTitle}
								required
							/>
							<p class="text-base font-medium">Article Name:</p>
							<input
								type="text"
								class="input input-bordered w-full"
								bind:value={journalArticleName}
								required
							/>
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">Publication Date:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input
								type="date"
								class="input input-bordered w-full"
								bind:value={journalPublicationDate}
							/>
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">Starting Page:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input
								type="number"
								class="input input-bordered w-full"
								min="1"
								max="10000"
								bind:value={journalPagesFrom}
							/>
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">Ending Page:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input
								type="number"
								class="input input-bordered w-full"
								min="1"
								max="10000"
								bind:value={journalPagesTo}
							/>
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">Publication Place:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input
								type="text"
								class="input input-bordered w-full"
								bind:value={journalPublicationPlace}
							/>
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">Edition:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input type="text" class="input input-bordered w-full" bind:value={journalEdition} />
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">Publisher:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input
								type="text"
								class="input input-bordered w-full"
								bind:value={journalPublisher}
							/>
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">DOI:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input type="text" class="input input-bordered w-full" bind:value={journalDOI} />
						{:else}
							<p class="text-base font-medium">Article Name:</p>
							<input
								type="text"
								class="input input-bordered w-full"
								bind:value={webArticleName}
								required
							/>
							<p class="text-base font-medium">URL:</p>
							<input type="text" class="input input-bordered w-full" bind:value={webURL} required />
							<p class="text-base font-medium">Website Name:</p>
							<input
								type="text"
								class="input input-bordered w-full"
								bind:value={websiteName}
								required
							/>
							<p class="text-base font-medium">Access Date:</p>
							<input
								type="date"
								class="input input-bordered w-full"
								bind:value={webAccessDate}
								required
							/>
							<div class="flex gap-2 w-fit items-center">
								<p class="text-base font-medium">Publication Date:</p>
								<p class="text-sm font-medium text-slate-400 italic">optional</p>
							</div>
							<input
								type="date"
								class="input input-bordered w-full"
								bind:value={webPublicationDate}
								required
							/>
						{/if}
					</div>
				</div>
				<div class="form-control grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 md:px-8">
					<label class="label" for="">
						<span class="font-semibold text-xl">Category</span>
					</label>
					<select class="select w-full border border-gray-300">
						{#each Categories as category}
							<option value={category}>{CategoryLabel[category]}</option>
						{/each}
					</select>
				</div>
				<div
					class="form-control grid grid-cols-1 md:grid-cols-3 items-start gap-0 md:gap-4 md:px-8"
				>
					<label class="label" for="">
						<span class="font-semibold text-xl">Definition</span>
					</label>
					<textarea
						placeholder="Definition..."
						class="input input-bordered col-span-2 h-40"
						required
						minlength="10"
					/>
				</div>
				<div class="flex justify-end w-full gap-4 mt-6 md:px-8">
					<input
						type="submit"
						class="btn btn-primary w-1/5"
						value="Submit"
						disabled={selectedAuthors.length === 0}
					/>
				</div>
			</form>
		</div>
	</div>
</main>

<style lang="postcss">
</style>
