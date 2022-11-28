<script lang="ts">
	import { Authorizer } from '@authorizerdev/authorizer-svelte';
	import { changeRoute } from '../../utils';
	import { goto } from '$app/navigation';

	function onSignup() {
		changeRoute(goto, 'auth/verify_email');
	}

	function onLogin() {
		changeRoute(goto, '');
	}
</script>

<main>
	<div class="flex flex-col h-full justify-center items-center p-4">
		<p class="text-2xl md:text-3xl font-bold pb-4">Login to YACOID!</p>
		<div class="w-1/2">
			<Authorizer {onSignup} {onLogin} />
		</div>
	</div>
</main>

<style lang="postcss">
</style>
