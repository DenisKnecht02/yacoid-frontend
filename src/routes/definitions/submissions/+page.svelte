<script lang="ts">
	import { fetchDefinitionPageCount, fetchUsersOwnDefinitionsPage } from '$api/definitions';
	import ApprovalQuoteCard from '$components/ApprovalQuoteCard.svelte';
	import LoginRequired from '$components/LoginRequired.svelte';
	import PermissionsRequired from '$components/PermissionsRequired.svelte';
	import { session } from '$stores/session';
	import type { UserDefinition } from '$types';

	let pageCount: number = 0;
	let definitions: UserDefinition[] = [];
	let currentActivePage: number = 1;

	(async () => {
		await getPageCount();
		await getDefinitions();
	})();

	async function getPageCount() {
		if ($session && $session.user) {
			const response = await fetchDefinitionPageCount(
				{
					pageSize: 10,
					filter: { approved: false }
				},
				$session?.id_token
			);
			if (response.error) {
				console.log(response.error);
			} else {
				pageCount = response.data!;
			}
		}
	}

	async function getDefinitions() {
		if ($session && $session.user) {
			const response = await fetchUsersOwnDefinitionsPage(
				{
					pageSize: 10,
					adminInformation: true,
					page: currentActivePage,
					filter: { approved: false }
				},
				$session.id_token
			);
			if (response.error) {
				console.log(response.error);
			} else {
				definitions = response.data!;
			}
		}
	}
</script>

<main>
	{#if $session === undefined}
		<LoginRequired />
	{:else if $session.user && $session.user.roles && ($session.user.roles.includes('admin') || $session.user.roles.includes('moderator'))}
		<div class="flex flex-col w-full h-full p-8 gap-8">
			<h1 class="text-3xl font-bold lg:text-4xl lg:font-black text-center">
				Submitted Definitions
			</h1>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-around">
				{#if definitions}
					{#each definitions as definition}
						<ApprovalQuoteCard
							{definition}
							on:handle={() => {
								getPageCount();
								getDefinitions();
							}}
						/>
					{/each}
				{/if}
			</div>
			<div class="btn-group flex justify-center items-center">
				{#each Array(pageCount) as _, index (index)}
					{#if index + 1 === currentActivePage}
						<button
							class="btn btn-secondary"
							on:click={() => {
								currentActivePage = index + 1;
								getDefinitions();
							}}>{index + 1}</button
						>
					{:else}
						<button
							class="btn"
							on:click={() => {
								currentActivePage = index + 1;
								getDefinitions();
							}}>{index + 1}</button
						>
					{/if}
				{/each}
			</div>
		</div>
	{:else}
		<PermissionsRequired />
	{/if}
</main>

<style lang="postcss">
</style>
