<script lang="ts">
	import { Authorizer } from '@authorizerdev/authorizer-svelte';
	import type { AuthToken } from '@authorizerdev/authorizer-js';
	import { changeRoute } from '$utils';
	import { goto } from '$app/navigation';
	import { session } from '$stores/session';

	function onSignup() {
		changeRoute(goto, 'auth/verify_email');
	}

	function onLogin(response: AuthToken) {
		$session = response;
		changeRoute(goto, '');
	}
</script>

<main>
	<div class="flex flex-col h-full justify-center items-center p-4">
		<p class="text-2xl md:text-3xl font-bold pb-4">Login to YACOID!</p>
		<div class="w-1/2">
			<Authorizer {onSignup} {onLogin} />
		</div>
		<p class="mt-2 text-sm">Go to <a class="text-blue-500" href="auth/staff">Staff Login</a></p>
	</div>
</main>

<style lang="postcss">
</style>
