<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import {
		Categories,
		CategoryLabel,
		type Author,
		type AuthorType,
		type OrganizationAuthor,
		type PersonAuthor,
		type Source,
		type SourceType,
		type WebProperties
	} from '$types';

	let suggestedAuthors: Author[] = [
		{
			id: '1',
			slugId: 'winston-1',
			submittedBy: 'user',
			submittedDate: new Date('2022-11-04'),
			type: 'person',
			firstName: 'Phillip Hans',
			lastName: 'Winston'
		},
		{
			id: '2',
			slugId: 'quinston-2',
			submittedBy: 'user',
			submittedDate: new Date('2022-11-05'),
			type: 'person',
			firstName: 'Elizabeth',
			lastName: 'Quinston'
		},
		{
			id: '3',
			slugId: 'freg-1',
			submittedBy: 'user',
			submittedDate: new Date('2022-11-08'),
			type: 'person',
			firstName: 'Thomas',
			lastName: 'Freg'
		},
		{
			id: '4',
			slugId: 'schmindt-4',
			submittedBy: 'user',
			submittedDate: new Date('2022-11-03'),
			type: 'person',
			firstName: 'Lucas',
			lastName: 'Schmindt'
		},
		{
			id: '5',
			slugId: 'kasik-5',
			submittedBy: 'user',
			submittedDate: new Date('2022-11-12'),
			type: 'person',
			firstName: 'Nikolai',
			lastName: 'Kasik'
		}
	];

	let allSelectedAuthors: Author[] = [];

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

	function createNewAuthor(idParam: string, type: AuthorType) {
		if (type === 'person') {
			let newAuthor: Author = {
				id: idParam,
				slugId: authorLastName.toLowerCase() + '-' + idParam,
				submittedBy: 'user',
				submittedDate: new Date(),
				type: 'person',
				firstName: authorFirstName,
				lastName: authorLastName
			};
			addSelectedAuthor(newAuthor);
			allSelectedAuthors = allSelectedAuthors;
			authorFirstName = '';
			authorLastName = '';
			authorOrganizationName = '';
		} else {
			// do the same for organizational authors
			let newAuthor: Author = {
				id: idParam,
				slugId: authorLastName.toLowerCase() + '-' + idParam,
				submittedBy: 'user',
				submittedDate: new Date(),
				type: 'organization',
				organizationName: authorOrganizationName
			};
			addSelectedAuthor(newAuthor);
			allSelectedAuthors = allSelectedAuthors;
			authorFirstName = '';
			authorLastName = '';
			authorOrganizationName = '';
		}
	}

	function addSelectedAuthor(author: Author) {
		if (!allSelectedAuthors.includes(author)) {
			allSelectedAuthors.push(author);
		}
		allSelectedAuthors = allSelectedAuthors;
	}

	function removeSelectedAuthor(author: Author) {
		if (allSelectedAuthors.includes(author)) {
			const index = allSelectedAuthors.indexOf(author);

			if (index !== -1) {
				allSelectedAuthors.splice(index, 1);
			}
		}
		allSelectedAuthors = allSelectedAuthors;
	}

	function getAuthorDisplayName(authorParam: Author): string {
		let authorDisplayName: string = '';
		if (authorParam.type === 'person') {
			let personAuthor: PersonAuthor = authorParam as PersonAuthor;
			authorDisplayName = personAuthor.lastName + ', ' + personAuthor.firstName;
		} else {
			let organizationAuthor: OrganizationAuthor = authorParam as OrganizationAuthor;
			authorDisplayName = organizationAuthor.organizationName;
		}

		return authorDisplayName;
	}

	function checkAuthorCriteria(suggestedAuthorParam: Author): boolean {
		let authorCriteriaIncluded: boolean = false;
		if (suggestedAuthorParam.type === 'person') {
			let personAuthor: PersonAuthor = suggestedAuthorParam as PersonAuthor;
			if (
				personAuthor.firstName.toLowerCase().includes(authorSearchCriteria) ||
				personAuthor.lastName.toLowerCase().includes(authorSearchCriteria)
			) {
				authorCriteriaIncluded = true;
			}
		} else {
			let organizationAuthor: OrganizationAuthor = suggestedAuthorParam as OrganizationAuthor;
			if (organizationAuthor.organizationName.toLowerCase().includes(authorSearchCriteria)) {
				authorCriteriaIncluded = true;
			}
		}

		return authorCriteriaIncluded;
	}
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
									/>
								</label>
								<ul
									tabindex="0"
									class="dropdown-content w-full menu shadow bg-base-100 rounded-b-lg"
								>
									{#each suggestedAuthors as suggestedAuthor}
										{#if checkAuthorCriteria(suggestedAuthor)}
											<li>
												<div
													class="flex items-center justify-between"
													on:click={() => addSelectedAuthor(suggestedAuthor)}
												>
													<p class="text-base">
														{getAuthorDisplayName(suggestedAuthor)}
													</p>
												</div>
											</li>
										{/if}
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
												<option>person</option>
												<option>organization</option>
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
												: () => createNewAuthor('100', authorType)}>Create</label
										>
									</div>
								</label>
							</label>
						</div>
						{#if allSelectedAuthors.length !== 0}
							<div class="flex w-full h-full overflow-x-auto overflow-y-hidden items-center gap-1">
								{#each allSelectedAuthors as selectedAuthor}
									<div
										class="badge min-w-[12rem] w-fit h-fit p-2 cursor-pointer"
										on:click={() => removeSelectedAuthor(selectedAuthor)}
									>
										{getAuthorDisplayName(selectedAuthor)} ❌
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</div>
				<div
					class="form-control grid grid-cols-1 md:grid-cols-3 items-start gap-0 md:gap-4 md:px-8"
				>
					<label class="label">
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
							<p class="text-base font-medium">Publication Date:</p>
							<input
								type="date"
								class="input input-bordered w-full"
								bind:value={bookPublicationDate}
								required
							/>
							<p class="text-base font-medium">Starting Page:</p>
							<input
								type="number"
								class="input input-bordered w-full"
								min="1"
								max="10000"
								bind:value={bookPagesFrom}
								required
							/>
							<p class="text-base font-medium">Ending Page:</p>
							<input
								type="number"
								class="input input-bordered w-full"
								min="1"
								max="10000"
								bind:value={bookPagesTo}
								required
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
							<p class="text-base font-medium">Publication Date:</p>
							<input
								type="date"
								class="input input-bordered w-full"
								bind:value={journalPublicationDate}
								required
							/>
							<p class="text-base font-medium">Starting Page:</p>
							<input
								type="number"
								class="input input-bordered w-full"
								min="1"
								max="10000"
								bind:value={journalPagesFrom}
								required
							/>
							<p class="text-base font-medium">Ending Page:</p>
							<input
								type="number"
								class="input input-bordered w-full"
								min="1"
								max="10000"
								bind:value={journalPagesTo}
								required
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
					<label class="label">
						<span class="font-semibold text-xl">Category</span>
					</label>
					<select class="select w-full border border-gray-300">
						{#each Categories as category}
							<option>{CategoryLabel[category]}</option>
						{/each}
					</select>
				</div>
				<div
					class="form-control grid grid-cols-1 md:grid-cols-3 items-start gap-0 md:gap-4 md:px-8"
				>
					<label class="label">
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
						class=" btn btn-primary w-1/5"
						value="Submit"
						disabled={allSelectedAuthors.length === 0}
					/>
				</div>
			</form>
		</div>
	</div>
</main>

<style lang="postcss">
</style>
