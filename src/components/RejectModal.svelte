<script lang="ts">
	import { currentSubmittedDefinition } from '$stores/session';
	import { createEventDispatcher } from 'svelte';

	export let modalName: string;
	let declinementReason: string = '';
	let showEmail: boolean = false;

	function changeShowEmail() {
		showEmail = !showEmail;
	}

	const dispatch = createEventDispatcher();
</script>

<input type="checkbox" id={modalName} class="modal-toggle" />
<label for={modalName} class="modal cursor-pointer">
	<label class="modal-box relative w-full h-full max-w-5xl" for="">
		<div class="flex flex-col gap-8 w-full h-full">
			<div class="flex flex-col gap-4">
				<h3 class="text-2xl font-bold">Definition declined</h3>
				<p class="text-lg text-justify">
					Please provide feedback why this definition is going to be declined.
				</p>
				<textarea
					class="textarea textarea-bordered"
					placeholder="Reason for declinement..."
					bind:value={declinementReason}
				/>
			</div>
			<div class="flex flex-col gap-4 w-full h-full">
				<div class="flex justify-between items-center">
					<p class="text-lg text-justify font-medium">What the e-mail will look like:</p>
					<button class="hover:text-blue-500 hover:underline" on:click={changeShowEmail}>
						{#if showEmail}
							Hide
						{:else}
							Show
						{/if}
					</button>
				</div>
				{#if showEmail}
					<div class="w-full h-full bg-gray-300 rounded-xl font-mono p-4">
						<p>
							Dear {$currentSubmittedDefinition?.submittedByName}, <br /> <br /> Unfortunately, your
							definition, sent on {$currentSubmittedDefinition?.submittedDate.toLocaleDateString()},
							was declined due to the following reason. <br /> <br />
							{declinementReason} <br /> <br />
							Click on the following link to see more details and edit your definition.<br />
							<a href="https://www.google.com" class="text-blue-500 underline">Link</a> <br />
							<br />
							Best regards,<br /> <br />
							YACOID
						</p>
					</div>
				{/if}
			</div>
			<div class="modal-action">
				<label for={modalName} class="btn btn-error">Cancel</label>
				<label
					for={modalName}
					class="btn btn-secondary"
					on:click={() => {
						dispatch('reject', { id: $currentSubmittedDefinition?.id, content: declinementReason });
						declinementReason = '';
					}}>Send</label
				>
			</div>
		</div>
	</label>
</label>

<style lang="postcss">
</style>
