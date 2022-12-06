<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import { AllCategories, CategoryLabel, type AuthorType } from '$types';

	let suggestedAuthors: string[] = [
		'Winston, P.H.',
		'Quinston, Elizabeth',
		'Freg, Thomas',
		'Schmindt, Lucas',
		'Kasik, Nikolai'
	];
	let authorSearchCriteria: string = '';
	let authorType: AuthorType = 'person';
	let authorFirstName: string = '';
	let authorLastName: string = '';
	let authorOrganizationName: string = '';
</script>

<main>
	<div class="flex bg-white h-full justify-center p-8">
		<div class="card  grid justify-center w-full shadow-2xl bg-base-100">
			<form class="card-body w-fit md:w-screen gap-4" action="./">
				<div class="form-control grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 md:px-8">
					<label class="label" for="">
						<span class="text-bold text-lg">Author</span>
					</label>
					<div class="flex gap-1 w-full col-span-2">
						<div class="dropdown dropdown-bottom w-full">
							<label tabindex="0">
								<input
									type="text"
									placeholder="Author name..."
									class="input input-bordered w-full"
									bind:value={authorSearchCriteria}
									required
								/>
							</label>
							<ul tabindex="0" class="dropdown-content w-full menu shadow bg-base-100 rounded-b-lg">
								{#each suggestedAuthors as suggestedAuthor}
									{#if suggestedAuthor.toLowerCase().includes(authorSearchCriteria.toLowerCase())}
										<li>
											<div
												class="flex items-center justify-between"
												on:click={() => {
													authorSearchCriteria = suggestedAuthor;
												}}
											>
												<p class="text-base">
													{suggestedAuthor}
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
							<label class="modal-box relative w-[50vw] h-fit" for="">
								<div class="flex flex-col gap-6 w-full h-full">
									<h1 class="text-xl md:text-2xl font-bold">Create new author</h1>
									<div class="form-control grid grid-cols-1 md:grid-cols-2 gap-4">
										<p class="text-base md:text-lg font-medium">Choose author type:</p>
										<select class="select w-full max-w-xs" bind:value={authorType} required>
											<option>person</option>
											<option>organization</option>
										</select>
										{#if authorType === 'person'}
											<p class="text-base md:text-lg font-medium">First name:</p>
											<input
												type="text"
												class="input input-bordered w-full"
												bind:value={authorFirstName}
												required
											/>
											<p class="text-base md:text-lg font-medium">Last name:</p>
											<input
												type="text"
												class="input input-bordered w-full"
												bind:value={authorLastName}
												required
											/>
										{:else}
											<p class="text-base md:text-lg font-medium">Organization name:</p>
											<input
												type="text"
												class="input input-bordered w-full"
												bind:value={authorOrganizationName}
												required
											/>
										{/if}
									</div>
								</div>
								<div class="modal-action">
									<label for="authors-modal" class="btn btn-error">Cancel</label>
									<label
										for="authors-modal"
										class="btn btn-secondary"
										disabled={(authorType === 'person' &&
											(authorFirstName === '' || authorLastName === '')) ||
											(authorType === 'organization' && authorOrganizationName === '')}
										>Create</label
									>
								</div>
							</label>
						</label>
					</div>
				</div>
				<div class="form-control grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 md:px-8">
					<label class="label">
						<span class="text-bold text-lg">Source</span>
					</label>
					<input
						type="text"
						placeholder="Source..."
						class="input input-bordered col-span-2"
						required
					/>
				</div>
				<div class="form-control grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 md:px-8">
					<label class="label">
						<span class="text-bold text-lg">Year of Submission</span>
					</label>
					<input
						type="number"
						min="1000"
						max="2099"
						step="1"
						placeholder="Year of Submission..."
						class="input input-bordered col-span-2"
						required
					/>
				</div>
				<div class="form-control grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 md:px-8">
					<label class="label">
						<span class="text-bold text-lg">Category</span>
					</label>
					<select class="select w-full border border-gray-300">
						{#each AllCategories as category}
							<option>{CategoryLabel[category]}</option>
						{/each}
					</select>
				</div>
				<div class="form-control grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 md:px-8">
					<label class="label">
						<span class="text-bold text-lg">Definition</span>
					</label>
					<textarea placeholder="Definition..." class="input input-bordered col-span-2 h-40" />
				</div>
				<div class="form-control mt-6 grid grid-cols-3 lg:grid-cols-5 gap-4 md:px-8">
					<input
						type="submit"
						class=" btn btn-primary justify-center col-start-3 lg:col-start-5"
						value="Submit"
					/>
				</div>
			</form>
		</div>
	</div>
</main>

<style lang="postcss">
</style>
