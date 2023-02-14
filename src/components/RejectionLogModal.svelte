<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentRejectionLogDefinition } from '$stores/session';
	import { changeRoute } from '$utils';
	import QuoteCard from './QuoteCard.svelte';

	export let modalName: string;
	export let userView: boolean = true;
</script>

<input type="checkbox" id={modalName} class="modal-toggle" />
<label for={modalName} class="modal cursor-pointer">
	<label class="modal-box relative w-[90vw] h-[80vh] max-w-none" for="">
		<div class="flex flex-col gap-4 w-full">
			<h3 class="text-xl lg:text-2xl font-bold text-center pb-4 border-b-4">Definition details</h3>

			{#if $currentRejectionLogDefinition}
				<div class="flex flex-col gap-6">
					<div class="flex flex-col gap-2">
						<div class="flex w-full justify-between">
							<h1 class="text-xl font-medium">
								Current version: <span
									class={`${
										$currentRejectionLogDefinition.status === 'approved' && 'text-success'
									} ${$currentRejectionLogDefinition.status === 'pending' && 'text-warning'} ${
										$currentRejectionLogDefinition.status === 'declined' && 'text-error'
									}`}
								>
									{$currentRejectionLogDefinition.status}
								</span>
							</h1>
							{#if userView && ($currentRejectionLogDefinition.status === 'declined' || $currentRejectionLogDefinition.status === 'pending')}
								<button
									class="btn btn-error btn-sm"
									on:click={() =>
										changeRoute(goto, 'definitions/addDef', {
											id: $currentRejectionLogDefinition?.id
										})}
								>
									Change definition
								</button>
							{/if}
						</div>
						<QuoteCard definition={$currentRejectionLogDefinition} />
					</div>
					{#if $currentRejectionLogDefinition.rejectionLog && $currentRejectionLogDefinition.rejectionLog.length > 0}
						<div class="flex flex-col gap-2">
							<h1 class="text-xl font-medium">Rejections:</h1>
							{#each $currentRejectionLogDefinition.rejectionLog as rejection}
								<div class="flex flex-col w-full bg-red-200 rounded-lg p-2">
									<p class="font-medium">{rejection.rejectedDate.toLocaleDateString()}</p>
									<p>{rejection.rejectedByName}: {rejection.content}</p>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</label>
</label>

<style lang="postcss">
</style>
