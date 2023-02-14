<script lang="ts">
	import { fetchApproveDefinition, fetchRejectDefinition } from '$api/definitions';
	import {
		currentRejectionLogDefinition,
		currentSubmittedDefinition,
		session
	} from '$stores/session';
	import {
		CategoryLabel,
		getAuthorsDisplayNames,
		getDefinitionPublishingDate,
		getSourceDisplayName,
		type Definition,
		type UserDefinition
	} from '$types';
	import { createEventDispatcher, setContext } from 'svelte';
	import ApproveModal from './ApproveModal.svelte';
	import Icon from './Icon.svelte';
	import RejectionLogModal from './RejectionLogModal.svelte';
	import RejectModal from './RejectModal.svelte';

	export let definition: UserDefinition;

	const dispatch = createEventDispatcher();

	async function approveDefinition(id: string) {
		if ($session) {
			const response = await fetchApproveDefinition($session.id_token, id);
			if (response.error) {
				console.log(response.error);
			} else {
				dispatch('handle');
			}
		}
	}

	async function rejectDefinition(id: string, content: string) {
		if ($session && content) {
			const response = await fetchRejectDefinition($session.id_token, {
				id: id,
				content: content
			});
			if (response.error) {
				console.log(response.error);
			} else {
				dispatch('handle');
			}
		}
	}
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="flex flex-col w-full h-full p-4 gap-3 bg-gray-300 max-h-[8rem]">
		<h1 class="text-xl font-semibold">Details</h1>
		<div class="flex flex-col gap-1 w-full h-full">
			<div class="flex gap-2 md:flex-row w-full h-full items-center justify-between">
				<h2 class="font-medium text-lg">User:</h2>
				<p class="font text-base">{definition.submittedByName}</p>
			</div>
			<div class="flex gap-2 md:flex-row w-full h-full items-center justify-between">
				<h2 class="font-medium text-lg">Sent in:</h2>
				<p class="font text-base">{definition.submittedDate.toLocaleDateString()}</p>
			</div>
		</div>
	</div>
	<div class="card-body gap-6">
		<div class="flex flex-col sm:flex-row gap-3 h-12 sm:justify-between sm:items-center">
			<div class="badge badge-secondary text-base w-fit h-fit">
				{CategoryLabel[definition.category]}
			</div>
			<div id="forSymbol" class="flex gap-2 items-center">
				<label
					for="rejectionLogModal"
					class="cursor-pointer"
					on:click={() => currentRejectionLogDefinition.set(definition)}
				>
					<Icon icon="info" color="#00000" />
				</label>
				<RejectionLogModal modalName="rejectionLogModal" userView={false} />
				<label
					for="modalAccept"
					class="cursor-pointer px-2 text-lg bg-green-400 rounded-lg p-1"
					on:click={() => currentSubmittedDefinition.set(definition)}
				>
					👍
				</label>
				<ApproveModal
					modalName="modalAccept"
					on:approve={(event) => approveDefinition(event.detail.id)}
				/>
				<label
					for="modalDecline"
					class="cursor-pointer px-2 text-lg bg-red-400 rounded-lg p-1"
					on:click={() => currentSubmittedDefinition.set(definition)}
				>
					👎
				</label>
				<RejectModal
					modalName="modalDecline"
					on:reject={(event) => rejectDefinition(event.detail.id, event.detail.content)}
				/>
			</div>
		</div>
		<p class="flex italic text-xl text-justify items-center">"{definition.content}"</p>
		<div>
			<p class="flex justify-end items-end font-bold">
				- {getAuthorsDisplayNames(...definition.source.authors).join('; ')}
				{#if getDefinitionPublishingDate(definition)}
					({getDefinitionPublishingDate(definition)?.toLocaleDateString()})
				{/if}
			</p>
			<p class="flex justify-end text-end break-all italic">
				from: {getSourceDisplayName(definition.source)}
			</p>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
