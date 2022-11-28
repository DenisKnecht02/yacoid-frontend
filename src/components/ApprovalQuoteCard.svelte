<script lang="ts">
	export let category: string = '';
	export let quote: string = '';
	export let author: string = '';
	export let publishing_date: string = '';
	export let source: string = '';
	export let submittedBy: string = '';
	export let submittedOn: string = '';
	let declinementReason: string = '';

	let showEmail: boolean = false;

	function changeShowEmail() {
		showEmail = !showEmail;
	}
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="flex flex-col w-full h-full p-4 gap-3 bg-gray-300 max-h-[8rem]">
		<h1 class="text-xl font-semibold">Details</h1>
		<div class="flex flex-col gap-1 w-full h-full">
			<div class="flex gap-2 md:flex-row w-full h-full items-center justify-between">
				<h2 class="font-medium text-lg">User:</h2>
				<p class="font text-base">{submittedBy}</p>
			</div>
			<div class="flex gap-2 md:flex-row w-full h-full items-center justify-between">
				<h2 class="font-medium text-lg">Sent in:</h2>
				<p class="font text-base">{new Date(submittedOn).toLocaleDateString()}</p>
			</div>
		</div>
	</div>
	<div class="card-body gap-6">
		<div class="flex flex-col sm:flex-row gap-3 h-12 sm:justify-between sm:items-center">
			<div class="badge badge-secondary text-base w-fit h-fit">{category}</div>
			<div id="forSymbol" class="flex gap-2 items-center">
				<label for="modal_accept" class="cursor-pointer px-2 text-lg bg-green-400 rounded-lg p-1">
					👍
				</label>
				<label for="modal_decline" class="cursor-pointer px-2 text-lg bg-red-400 rounded-lg p-1">
					👎
				</label>
			</div>
		</div>
		<p class="flex italic text-xl text-justify items-center">"{quote}"</p>
		<div>
			<p class="flex justify-end items-end font-bold">- {author} ({publishing_date})</p>
			<p class="flex justify-end items-end italic">from: {source}</p>
		</div>
	</div>
</div>

<input type="checkbox" id="modal_accept" class="modal-toggle" />
<label for="modal_accept" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<div class="flex flex-col w-full h-full gap-4 p-2 ">
			<h3 class="text-2xl font-bold">Definition accepted</h3>
			<p class="text-lg text-justify">
				An e-mail of approval will be sent to {submittedBy} and the definition will be added to the list.
			</p>
		</div>
	</label>
</label>

<input type="checkbox" id="modal_decline" class="modal-toggle" />
<label for="modal_decline" class="modal cursor-pointer">
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
							Dear {submittedBy}, <br /> <br /> Unfortunately, your definition, sent on {new Date(
								submittedOn
							).toLocaleDateString()}, was declined due to the following reason. <br /> <br />
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
				<label for="modal_decline" class="btn btn-error">Cancel</label>
				<label for="modal_decline" class="btn btn-secondary">Send</label>
			</div>
		</div>
	</label>
</label>

<style lang="postcss">
</style>
