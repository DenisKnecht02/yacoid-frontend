<script lang="ts">
	import QuoteCard from '../components/QuoteCard.svelte';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import StatisticCard from '../components/StatisticCard.svelte';
	import { changeRoute } from '$utils';
	import { goto } from '$app/navigation';
</script>

<main>
	<div class=" h-full text-center p-4 grid justify-items-center">
		<h1 class="text-3xl font-bold md:text-4xl lg:text-5xl py-10">WELCOME TO YACOID!</h1>

		<div
			class="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center mt-4 lg:mt-10 mb-8 lg:mb-48 max-w-xl"
		>
			<StatisticCard
				stat_title="Definitions"
				stat_value="1033"
				stat_description="↗︎ 45 (4%)"
				svg_description="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
			<StatisticCard
				stat_title="Categories"
				stat_value="12"
				stat_description="↗︎ 3 (25%)"
				svg_description="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
			/>
			<StatisticCard
				stat_title="Authors"
				stat_value="568"
				stat_description="↗︎ 91 (16%)"
				svg_description="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
			/>
			<StatisticCard
				stat_title="Sources"
				stat_value="321"
				stat_description="↗︎ 15 (5%)"
				svg_description="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</div>

		<div class=" h-full text-center p-4">
			<h1 class="text-2xl font-bold md:text-3xl lg:text-4xl pb-10">SEE OUR NEWEST DEFINITIONS!</h1>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-around">
				<QuoteCard
					category="machine_intelligence"
					quote="Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act."
					author="Winston, P.H."
					publishingDate={new Date('1992-11-21')}
				/>

				<QuoteCard
					category="machine_intelligence"
					quote="Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act."
					author="Winston, P.H."
					publishingDate={new Date(1992)}
				/>

				<QuoteCard
					category="machine_intelligence"
					quote="Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act."
					author="Winston, P.H."
					publishingDate={new Date(1992)}
				/>

				<QuoteCard
					category="machine_intelligence"
					quote="Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act."
					author="Winston, P.H."
					publishingDate={new Date(1992)}
				/>
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
