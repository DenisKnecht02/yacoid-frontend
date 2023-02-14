<script lang="ts">
	import { goto } from '$app/navigation';
	import { changeRoute } from '$utils';
</script>

<div class="flex flex-col h-full justify-center items-center p-4 gap-4">
	<p class="text-2xl md:text-3xl font-bold">Login required</p>
	<p class="text-lg md:text-xl">Please click the link below to visit the login page.</p>
	<button class="btn btn-link text-blue-500" on:click={() => changeRoute(goto, 'auth')}
		>Login</button
	>
</div>

<style lang="postcss">
</style>
