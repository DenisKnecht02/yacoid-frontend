<script lang="ts">
	import { currentSubmittedDefinition } from '$stores/session';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let modalName: string;
</script>

<input type="checkbox" id={modalName} class="modal-toggle" />
<label for={modalName} class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<div class="flex flex-col w-full h-full gap-4 p-2 ">
			<h3 class="text-2xl font-bold">Accept definition</h3>
			<p class="text-lg text-justify">
				An e-mail of approval will be sent to {$currentSubmittedDefinition?.submittedByName} and the
				definition will be added to the list.
			</p>
			<label
				for={modalName}
				class="btn btn-outline"
				on:click={() => dispatch('approve', { id: $currentSubmittedDefinition?.id })}
			>
				Proceed
			</label>
		</div>
	</label>
</label>

<style lang="postcss">
</style>
