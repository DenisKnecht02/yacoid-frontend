<script lang="ts">
	import {
		CategoryLabel,
		getAuthorsDisplayNames,
		getDefinitionPublishingDate,
		getSourceDisplayName,
		type Definition
	} from '$types';

	export let definition: Definition;
</script>

<div class="card w-[1/4] bg-base-100 shadow-xl">
	<div class="card-body gap-6">
		<div class="flex w-full justify-between h-12 items-center">
			<div class="badge badge-secondary text-base w-fit h-fit">
				{CategoryLabel[definition.category]}
			</div>
			<p class="text-end">
				Submitted by: <span class="font-medium">{definition.submittedByName}</span>
			</p>
		</div>
		<p class="flex italic text-xl text-justify items-center">"{definition.content}"</p>
		<div class="flex flex-col justify-end items-end text-end">
			<p class="flex font-bold">
				- {getAuthorsDisplayNames(...definition.source.authors).join('; ')}
				{#if getDefinitionPublishingDate(definition)}
					({getDefinitionPublishingDate(definition)?.toLocaleDateString()})
				{/if}
			</p>
			<p class="flex w-fit break-words whitespace-pre-wrap italic">
				from: {getSourceDisplayName(definition.source)}
			</p>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
