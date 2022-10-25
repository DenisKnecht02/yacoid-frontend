<script lang="ts">
	import Footer from '../../../components/Footer.svelte';
	import Header from '../../../components/Header.svelte';
  import QuoteCard from '../../../components/QuoteCard.svelte';
</script>

<Header />

<div class=" h-full text-center p-4">
  <h1 class="text-3xl font-bold lg:text-5xl lg:font-black pb-10">Submitted Definitions</h1>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-around">

    <QuoteCard
    category="Machine Intelligence"
    quote="Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act.
    Ab totam sint et natus velit qui nihil totam et laboriosam asperiores vel voluptatibus odio id ratione nesciunt. 
    Ut dignissimos voluptas ut quos tempore sit aliquam magnam est delectus aperiam quo quia suscipit in consequuntur sunt. 
    Hic nemo eligendi eum quam quae aut molestiae blanditiis et commodi unde?"
    author="Winston, P.H."
    publishing_date="1992"
    action="true"
    />

    <QuoteCard
      category="Machine Intelligence"
      quote="Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act."
      author="Winston, P.H."
      publishing_date="1992"
      action="true"
    />

    <QuoteCard
      category="Machine Intelligence"
      quote="Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act.
      Ab totam sint et natus velit qui nihil totam et laboriosam asperiores vel voluptatibus odio id ratione nesciunt. 
      Ut dignissimos voluptas ut quos tempore sit aliquam magnam est delectus aperiam quo quia suscipit in consequuntur sunt. 
      Hic nemo eligendi eum quam quae aut molestiae blanditiis et commodi unde?"
      author="Winston, P.H."
      publishing_date="1992"
      action="true"
    />

    <QuoteCard
      category="Machine Intelligence"
      quote="Artificial Intelligence is […] the study of the computations that make it possible to perceive, reason, and act."
      author="Winston, P.H."
      publishing_date="1992"
      action="true"
    />
  </div>
</div>

<Footer />

<style lang="postcss">
</style>
