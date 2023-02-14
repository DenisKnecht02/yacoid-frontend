<script lang="ts">
	import type { AuthorFilter } from '$api/authors';
	import type { Author } from '$types';
	import { getSingleAuthorDisplayName } from '$utils';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let modalName: string;
	export let currentFilter: AuthorFilter = {};
	export let suggestedAuthors: Author[];
	export let selectedAuthors: Author[];
	export let authorPageCount: number;
	export let authorCurrentActivePage: number;
	let authorSearchCriteria: string;
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={modalName} class="modal-toggle" />
<label for={modalName} class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<div class="flex flex-col gap-2">
			<h3 class="text-lg font-bold">Select authors</h3>
			<input
				type="text"
				placeholder="Author name..."
				class="input input-bordered w-full"
				bind:value={authorSearchCriteria}
				on:input={() => {
					if (authorSearchCriteria) {
						currentFilter = { name: authorSearchCriteria };
						dispatch('authorInput');
					} else {
						delete currentFilter.name;
						dispatch('authorInput');
					}
				}}
			/>
			<div class="flex flex-col gap-1">
				{#each suggestedAuthors as author}
					<div
						class="p-2 bg-slate-100 rounded-md cursor-pointer hover:bg-slate-200"
						on:click={() => dispatch('selectAuthor', { author: author })}
					>
						<p class="text-lg w-fit">
							{getSingleAuthorDisplayName(author)}
						</p>
						<p class="justify-end text-base text-success">
							{#if selectedAuthors.find((authorParam) => authorParam.id === author.id)}
								Selected
							{/if}
						</p>
					</div>
				{/each}
			</div>
			<div class="btn-group flex justify-center items-center">
				{#each Array(authorPageCount) as _, index (index)}
					{#if index + 1 === authorCurrentActivePage}
						<button
							class="btn btn-secondary"
							on:click|preventDefault={() => {
								authorCurrentActivePage = index + 1;
								dispatch('page');
							}}>{index + 1}</button
						>
					{:else}
						<button
							class="btn"
							on:click|preventDefault={() => {
								authorCurrentActivePage = index + 1;
								dispatch('page');
							}}>{index + 1}</button
						>
					{/if}
				{/each}
			</div>
		</div>
	</label>
</label>

<style lang="postcss">
</style>
