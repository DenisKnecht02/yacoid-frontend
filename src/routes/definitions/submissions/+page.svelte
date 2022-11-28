<script lang="ts">
	import ApprovalQuoteCard from '$components/ApprovalQuoteCard.svelte';
</script>

<main>
	<div class="flex flex-col w-full h-full p-8 gap-8">
		<h1 class="text-3xl font-bold lg:text-4xl lg:font-black text-center">Submitted Definitions</h1>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-around">
			<ApprovalQuoteCard
				category="Machine Intelligence"
				quote="Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act.
				Ab totam sint et natus velit qui nihil?"
				author="Winston, P.H."
				publishing_date="1992"
				source="undefined"
				submittedBy="Max Mustermann"
				submittedOn="2022-11-24"
			/>

			<ApprovalQuoteCard
				category="Machine Intelligence"
				quote="Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act."
				author="Winston, P.H."
				publishing_date="1992"
				source="undefined"
				submittedBy="Max Mustermann"
				submittedOn="2022-11-24"
			/>

			<ApprovalQuoteCard
				category="Machine Intelligence"
				quote="Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act.
				Ab totam sint et natus velit qui nihil totam et laboriosam asperiores vel voluptatibus odio id ratione nesciunt. 
				Ut dignissimos voluptas ut quos tempore sit aliquam magnam est delectus aperiam quo quia suscipit in consequuntur sunt. 
				Hic nemo eligendi eum quam quae aut molestiae blanditiis et commodi unde?"
				author="Winston, P.H."
				publishing_date="1992"
				source="undefined"
				submittedBy="Max Mustermann"
				submittedOn="2022-11-24"
			/>

			<ApprovalQuoteCard
				category="Machine Intelligence"
				quote="Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act."
				author="Winston, P.H."
				publishing_date="1992"
				source="undefined"
				submittedBy="Max Mustermann"
				submittedOn="2022-11-24"
			/>
		</div>
	</div>
</main>

<style lang="postcss">
</style>
