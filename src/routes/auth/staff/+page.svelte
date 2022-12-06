<script lang="ts">
	import { Authorizer } from '@authorizerdev/authorizer-svelte';
	import { changeRoute } from '$utils';
	import { goto } from '$app/navigation';

	let role: string = 'admin';

	function onSignup() {
		changeRoute(goto, 'auth/verify_email');
	}

	function onLogin(response: any) {
		console.log(response);
		changeRoute(goto, '');
	}
</script>

<main>
	<div class="flex flex-col h-full justify-center items-center p-4">
		<p class="text-2xl md:text-3xl font-bold pb-4">Login to YACOID!</p>

		<label for="roles">Choose your role:</label>
		<select id="roles" bind:value={role}>
			<option value="moderator">Moderator</option>
			<option value="admin">Administrator</option>
		</select>

		<div class="w-1/2">
			<Authorizer roles={[role]} {onSignup} {onLogin} />
		</div>

		<p class="mt-2 text-sm">Go to <a class="text-blue-500" href="/auth">User Login</a></p>
	</div>
</main>

<style lang="postcss">
</style>
