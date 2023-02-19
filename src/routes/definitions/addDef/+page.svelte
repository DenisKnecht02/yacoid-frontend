<script lang="ts">
	import type { GenericResponse } from '$api/api';
	import {
		fetchAuthorById,
		fetchAuthorPage,
		fetchAuthorPageCount,
		fetchCreateAuthor,
		type AuthorFilter
	} from '$api/authors';
	import {
		fetchChangeDefinition,
		fetchDefinitionById,
		fetchSubmitDefinition
	} from '$api/definitions';
	import { fetchChangeSource, fetchCreateSource } from '$api/sources';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '$components/Icon.svelte';
	import LoginRequired from '$components/LoginRequired.svelte';
	import SelectAuthorModal from '$components/SelectAuthorModal.svelte';
	import { session } from '$stores/session';
	import {
		AuthorTypes,
		Categories,
		CategoryLabel,
		type Author,
		type AuthorType,
		type BookSource,
		type Category,
		type Definition,
		type FetchedBookProperties,
		type FetchedJournalProperties,
		type FetchedWebProperties,
		type JournalSource,
		type SourceType,
		type WebSource
	} from '$types';
	import { changeRoute, getSingleAuthorDisplayName } from '$utils';

	let definitionId = $page.url.searchParams.get('id') || '';
	let definitionToChange: Definition | undefined;

	let suggestedAuthors: Author[] = [];
	let selectedAuthors: Author[] = [];

	let authorType: AuthorType = 'person';
	let authorFirstName: string = '';
	let authorLastName: string = '';
	let authorOrganizationName: string = '';
	let labelForSelectedAuthorsModal: HTMLLabelElement;

	let sourceType: SourceType = 'book';

	// all properties for book source
	let bookTitle: string;
	let bookPublicationDate: Date | string | undefined;
	let bookPublicationDateInput: HTMLInputElement;
	let bookPublicationPlace: string | undefined;
	let bookPagesFrom: number | undefined;
	let bookPagesTo: number | undefined;
	let bookEdition: string | undefined;
	let bookPublisher: string | undefined;
	let bookISBN: string | undefined;
	let bookEAN: string | undefined;
	let bookDOI: string | undefined;

	// all properties for journal source
	let journalTitle: string;
	let journalArticleName: string;
	let journalPublicationDate: Date | string | undefined;
	let journalPublicationDateInput: HTMLInputElement;
	let journalPublicationPlace: string | undefined;
	let journalPagesFrom: number | undefined;
	let journalPagesTo: number | undefined;
	let journalEdition: string | undefined;
	let journalPublisher: string | undefined;
	let journalDOI: string | undefined;

	// all properties for web source
	let webArticleName: string;
	let webURL: string;
	let websiteName: string;
	let webAccessDate: Date | string;
	let webPublicationDate: Date | string | undefined;
	let webAccessDateInput: HTMLInputElement;
	let webPublicationDateInput: HTMLInputElement;

	let definitionCategory: Category;
	let definitionContent: string;
	let definitionSourceId: string;

	let authorPageCount: number = 0;
	let authorCurrentActivePage: number = 1;
	let currentFilter: AuthorFilter = {};

	(async () => {
		await getDefinitionById(definitionId);
		await getAuthorsPageCount();
		await getAuthors();
	})();

	async function getDefinitionById(id: string) {
		const response = await fetchDefinitionById(id);
		if (response.error) {
			// definition was not found
			console.log(response.error);
		} else {
			definitionToChange = response.data!;
			setDetailsOfDefinitionToChange(definitionToChange);
		}
	}

	// when an already existing definition should be changed, the information on the website must be set to the details
	// of the already existing definition
	function setDetailsOfDefinitionToChange(definition: Definition) {
		selectedAuthors = definition.source.authors;
		definitionCategory = definition.category;
		definitionContent = definition.content;
		sourceType = definition.source.type;

		if (sourceType === 'book') {
			let bookSource: BookSource = definition.source as BookSource;
			bookTitle = bookSource.title;
			if (bookSource.publicationDate)
				bookPublicationDate = bookSource.publicationDate.toISOString().substring(0, 10);
			if (bookSource.edition) bookEdition = bookSource.edition;
			if (bookSource.publicationPlace) bookPublicationPlace = bookSource.publicationPlace;
			if (bookSource.pagesFrom) bookPagesFrom = bookSource.pagesFrom;
			if (bookSource.pagesTo) bookPagesTo = bookSource.pagesTo;
			if (bookSource.publisher) bookPublisher = bookSource.publisher;
			if (bookSource.isbn) bookISBN = bookSource.isbn;
			if (bookSource.ean) bookEAN = bookSource.ean;
			if (bookSource.doi) bookDOI = bookSource.doi;
		} else if (sourceType === 'journal') {
			let journalSource: JournalSource = definition.source as JournalSource;
			journalArticleName = journalSource.title;
			journalTitle = journalSource.journalName;
			if (journalSource.publicationDate)
				journalPublicationDate = journalSource.publicationDate.toISOString().substring(0, 10);
			if (journalSource.edition) journalEdition = journalSource.edition;
			if (journalSource.publicationPlace) journalPublicationPlace = journalSource.publicationPlace;
			if (journalSource.pagesFrom) journalPagesFrom = journalSource.pagesFrom;
			if (journalSource.pagesTo) journalPagesTo = journalSource.pagesTo;
			if (journalSource.publisher) journalPublisher = journalSource.publisher;
			if (journalSource.doi) journalDOI = journalSource.doi;
		} else if (sourceType === 'web') {
			let webSource: WebSource = definition.source as WebSource;
			webArticleName = webSource.articleName;
			websiteName = webSource.websiteName;
			webAccessDate = webSource.accessDate.toISOString().substring(0, 10);
			webURL = webSource.url;
			if (webSource.publicationDate)
				webPublicationDate = webSource.publicationDate.toISOString().substring(0, 10);
		}
	}

	async function getAuthorsPageCount() {
		const response = await fetchAuthorPageCount(
			{
				pageSize: 10,
				filter: currentFilter
			},
			$session?.id_token
		);
		if (response.error) {
			console.log(response.error);
		} else {
			authorPageCount = response.data!;
		}
	}

	async function getAuthors() {
		const response = await fetchAuthorPage(
			{
				pageSize: 10,
				page: authorCurrentActivePage,
				filter: currentFilter
			},
			$session?.id_token
		);
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
					getAuthorsPageCount();
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

	// this function is used to create a new source or change an existing one
	async function handleSource(id?: string) {
		if ($session !== undefined) {
			let response;
			let selectedAuthorsIds: string[] = [];

			// preparing the selectedAuthors because only the IDs are needed
			selectedAuthors.forEach((selectedAuthor: Author) => {
				selectedAuthorsIds.push(selectedAuthor.id);
			});

			// distuingishing between the different types of sources
			if (sourceType === 'book') {
				let bookProperties: FetchedBookProperties = { title: bookTitle };
				if (bookEdition) bookProperties.edition = bookEdition;
				if (bookPublicationDate)
					bookProperties.publicationDate = new Date(bookPublicationDate).toISOString();
				if (bookPublicationPlace) bookProperties.publicationPlace = bookPublicationPlace;
				if (bookPagesFrom) bookProperties.pagesFrom = bookPagesFrom;
				if (bookPagesTo) bookProperties.pagesTo = bookPagesTo;
				if (bookPublisher) bookProperties.publisher = bookPublisher;
				if (bookISBN) bookProperties.isbn = bookISBN;
				if (bookEAN) bookProperties.ean = bookEAN;
				if (bookDOI) bookProperties.doi = bookDOI;

				if (id) {
					response = await fetchChangeSource($session.id_token, {
						id: id,
						type: 'book',
						authors: selectedAuthorsIds,
						bookProperties: bookProperties
					});
				} else {
					response = await fetchCreateSource($session.id_token, {
						type: 'book',
						authors: selectedAuthorsIds,
						bookProperties: bookProperties
					});
				}
			} else if (sourceType === 'journal') {
				let journalProperties: FetchedJournalProperties = {
					title: journalArticleName,
					journalName: journalTitle
				};

				if (journalPagesFrom) journalProperties.pagesFrom = journalPagesFrom;
				if (journalPagesTo) journalProperties.pagesTo = journalPagesTo;
				if (journalPublicationDate)
					journalProperties.publicationDate = new Date(journalPublicationDate).toISOString();
				if (journalPublicationPlace) journalProperties.publicationPlace = journalPublicationPlace;
				if (journalEdition) journalProperties.edition = journalEdition;
				if (journalPublisher) journalProperties.publisher = journalPublisher;
				if (journalDOI) journalProperties.doi = journalDOI;

				if (id) {
					response = await fetchChangeSource($session.id_token, {
						id: id,
						type: 'journal',
						authors: selectedAuthorsIds,
						journalProperties: journalProperties
					});
				} else {
					response = await fetchCreateSource($session.id_token, {
						type: 'journal',
						authors: selectedAuthorsIds,
						journalProperties: journalProperties
					});
				}
			} else if (sourceType === 'web') {
				let webProperties: FetchedWebProperties = {
					articleName: webArticleName,
					websiteName: websiteName,
					accessDate: new Date(webAccessDate).toISOString(),
					url: webURL
				};

				if (webPublicationDate)
					webProperties.publicationDate = new Date(webPublicationDate).toISOString();

				if (id) {
					response = await fetchChangeSource($session.id_token, {
						id: id,
						type: 'web',
						authors: selectedAuthorsIds,
						webProperties: webProperties
					});
				} else {
					response = await fetchCreateSource($session.id_token, {
						type: 'web',
						authors: selectedAuthorsIds,
						webProperties: webProperties
					});
				}
			}

			if (response) {
				if (response.error) {
					console.log(response.error);
				} else {
					definitionSourceId = response.data!;
				}
			}
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
		if (selectedAuthors.find((selectedAuthor: Author) => selectedAuthor.id === author.id)) {
			removeSelectedAuthor(author);
		} else {
			selectedAuthors.push(author);
		}
		selectedAuthors = selectedAuthors;
	}

	function removeSelectedAuthor(author: Author) {
		if (selectedAuthors.find((selectedAuthor: Author) => selectedAuthor.id === author.id)) {
			const index = selectedAuthors.indexOf(author);

			if (index !== -1) {
				selectedAuthors.splice(index, 1);
			}
			selectedAuthors = selectedAuthors;
		}
	}

	$: {
		if (bookPublicationDateInput)
			bookPublicationDateInput.max = new Date().toISOString().split('T')[0];

		if (journalPublicationDateInput)
			journalPublicationDateInput.max = new Date().toISOString().split('T')[0];

		if (webPublicationDateInput)
			webPublicationDateInput.max = new Date().toISOString().split('T')[0];

		if (webAccessDateInput) webAccessDateInput.max = new Date().toISOString().split('T')[0];
	}

	async function submitDefinition() {
		await handleSource();

		if ($session !== undefined) {
			const response = await fetchSubmitDefinition($session.id_token, {
				content: definitionContent,
				category: definitionCategory,
				sourceId: definitionSourceId
			});
			if (response.error) {
				console.log(response.error);
			} else {
				alert(
					'Successfully created source. YACOID will now prove it and send you an update when the status changed.'
				);
			}
		}
	}

	async function changeDefinition(id: string) {
		if (definitionToChange) {
			await handleSource(definitionToChange.source.id);
		}

		if ($session !== undefined) {
			const response = await fetchChangeDefinition($session.id_token, {
				id: id,
				content: definitionContent,
				category: definitionCategory,
				sourceId: definitionSourceId
			});
			if (response.error) {
				console.log(response.error);
			} else {
				console.log(response.message);
			}
		}
	}
</script>

<main>
	{#if $session === undefined}
		<LoginRequired />
	{:else}
		<div class="flex bg-white h-full p-8">
			<div class="card grid w-full shadow-2xl bg-base-100">
				<form class="card-body w-full gap-4" on:submit|preventDefault={() => changeRoute(goto, '')}>
					<div
						class="form-control grid grid-cols-1 md:grid-cols-3 items-start gap-0 md:gap-4 md:px-8"
					>
						<label class="label" for="">
							<span class="font-semibold text-xl">Authors</span>
						</label>
						<div class="flex flex-col gap-2 w-full col-span-2">
							<div class="flex w-full gap-1">
								<!-- The button to open select author modal -->
								<label
									for="selectAuthorModal"
									class="input"
									bind:this={labelForSelectedAuthorsModal}
								/>
								<input
									type="text"
									placeholder="Author name..."
									class="input input-bordered w-full"
									on:focus={() => labelForSelectedAuthorsModal.click()}
								/>
								<SelectAuthorModal
									modalName="selectAuthorModal"
									{suggestedAuthors}
									{selectedAuthors}
									bind:currentFilter
									bind:authorCurrentActivePage
									bind:authorPageCount
									on:authorInput={getAuthors}
									on:selectAuthor={(event) => addSelectedAuthor(event.detail.author)}
									on:page={() => {
										getAuthorsPageCount();
										getAuthors();
									}}
								/>
								<!-- The button to open create author modal -->
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
								<div
									class="flex w-full h-full overflow-x-auto overflow-y-hidden items-center gap-1"
								>
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
									bind:this={bookPublicationDateInput}
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
									bind:this={journalPublicationDateInput}
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
								<input
									type="text"
									class="input input-bordered w-full"
									bind:value={journalEdition}
								/>
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
								<input
									type="text"
									class="input input-bordered w-full"
									bind:value={webURL}
									required
								/>
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
									bind:this={webAccessDateInput}
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
									bind:this={webPublicationDateInput}
									required
								/>
							{/if}
						</div>
					</div>
					<div class="form-control grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 md:px-8">
						<label class="label" for="">
							<span class="font-semibold text-xl">Category</span>
						</label>
						<select class="select w-full border border-gray-300" bind:value={definitionCategory}>
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
							bind:value={definitionContent}
						/>
					</div>
					<div class="flex justify-end w-full gap-4 mt-6 md:px-8">
						<button
							class="btn btn-primary w-1/5"
							disabled={selectedAuthors.length === 0}
							on:click={() => {
								if (definitionToChange) {
									changeDefinition(definitionToChange.id);
								} else {
									submitDefinition();
								}
							}}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</main>

<style lang="postcss">
</style>
