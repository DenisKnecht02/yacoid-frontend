<script lang="ts">
	import QuoteCard from '../components/QuoteCard.svelte';
	import StatisticCard from '../components/StatisticCard.svelte';
	import { changeRoute } from '$utils';
	import { goto } from '$app/navigation';
	import type { Definition, Statistics } from '$types';
	import { fetchNewestDefinitions } from '$api/definitions';
	import { fetchStatistics } from '$api/common';

	let newestDefinitions: Definition[] = [];
	let statistics: Statistics;

	(async () => {
		getNewestDefinitions();
		getStatistics();
	})();

	async function getNewestDefinitions() {
		const response = await fetchNewestDefinitions();
		if (response.error) {
			console.log(response.error);
		} else {
			newestDefinitions = response.data!;
		}
	}

	async function getStatistics() {
		const response = await fetchStatistics();
		if (response.error) {
			console.log(response.error);
		} else {
			statistics = response.data!;
		}
	}
</script>

<main>
	<div class=" h-full text-center p-4 grid justify-items-center">
		<h1 class="text-3xl font-bold md:text-4xl lg:text-5xl py-10">WELCOME TO YACOID!</h1>

		<div
			class="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center mt-4 lg:mt-10 mb-8 lg:mb-48 max-w-xl"
		>
			{#if statistics}
				<StatisticCard
					stat_title="Definitions"
					stat_value={statistics.definitionCount.toString()}
					stat_description={`↗︎ ${statistics.definitionCountInCurrentQuarter} (${
						(statistics.definitionCountInCurrentQuarter / statistics.definitionCount) * 100
					}%)`}
					svg_description="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
				<StatisticCard
					stat_title="Sources"
					stat_value={statistics.sourceCount.toString()}
					stat_description={`↗︎ ${statistics.sourceCountInCurrentQuarter} (${
						(statistics.sourceCountInCurrentQuarter / statistics.sourceCount) * 100
					}%)`}
					svg_description="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
				<StatisticCard
					stat_title="Authors"
					stat_value={statistics.authorCount.toString()}
					stat_description={`↗︎ ${statistics.authorCountInCurrentQuarter} (${
						(statistics.authorCountInCurrentQuarter / statistics.authorCount) * 100
					}%)`}
					svg_description="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
				/>
			{/if}
		</div>

		<div class=" h-full text-center p-4">
			<h1 class="text-2xl font-bold md:text-3xl lg:text-4xl pb-10">SEE OUR NEWEST DEFINITIONS!</h1>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-around">
				{#each newestDefinitions as definition}
					<QuoteCard {definition} />
				{/each}
			</div>
			<div class="flex my-6 justify-center lg:justify-end">
				<button class="btn btn-secondary" on:click={() => changeRoute(goto, 'definitions')}
					>see all definitions</button
				>
			</div>
		</div>
	</div>
</main>

<style lang="postcss">
</style>
