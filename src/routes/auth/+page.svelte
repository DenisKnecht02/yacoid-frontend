<script lang="ts">
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
	import { Authorizer } from '@authorizerdev/authorizer-svelte';
	import { changeRoute } from '../../utils';

	function onSignup() {
		changeRoute('auth/verify_email');
	}

	function onLogin() {
		changeRoute('');
	}
</script>

<Header />

<div class="flex flex-col h-full justify-center items-center p-4">
	<p class="text-2xl md:text-3xl font-bold pb-4">Login to YACOID!</p>
	<div class="w-1/2">
		<Authorizer {onSignup} {onLogin} />
	</div>
</div>

<Footer />

<style lang="postcss">
</style>
