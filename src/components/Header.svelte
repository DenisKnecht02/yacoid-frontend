<script lang="ts" src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous">
	import { goto } from '$app/navigation';
	import { getContext, onMount } from 'svelte';
	import { changeRoute } from '../utils';
	import Icon from './Icon.svelte';
	import { session } from '$stores/session';
	import type { Writable } from 'svelte/store';
	import type { AuthorizerState } from '@authorizerdev/authorizer-svelte/types';

	export let drawer: string = '';
	const store: Writable<AuthorizerState> = getContext('authorizerContext');

	let mobileView: boolean = false;

	onMount(() => {
		// change Header based on screen width
		const mql = window.matchMedia('(max-width: 1024px');
		mobileView = mql.matches;

		mql.addEventListener('change', (e) => {
			mobileView = mql.matches;
		});
	});
</script>

<header>
	<div class="flex gap-4 flex-row w-full justify-between items-center">
		<img
			class="w-[14rem] sm:w-[16rem] md:w-[18rem] cursor-pointer"
			src="/yacoid.png"
			on:click={() => changeRoute(goto, '')}
			alt=""
		/>

		{#if mobileView}
			{#if drawer !== ''}
				<label for={drawer} class="btn w-fit h-fit drawer-button">
					<Icon icon="menu" color="#00000" strokeWidth="1.5" />
				</label>
			{/if}
		{:else}
			<div class="flex gap-8 items-center">
				<button
					class="text-base lg:text-lg font-medium hover:underline hover:text-blue-500"
					on:click={() => changeRoute(goto, 'definitions/submissions')}>Submissions</button
				>
				<button
					class="text-base lg:text-lg font-medium hover:underline hover:text-blue-500"
					on:click={() => changeRoute(goto, 'definitions')}>All Definitions</button
				>
				<button
					class="text-base lg:text-lg font-medium hover:underline hover:text-blue-500"
					on:click={() => changeRoute(goto, 'about_us')}>About us</button
				>
				{#if $session === undefined}
					<button
						class="text-base lg:text-lg font-medium hover:underline hover:text-blue-500"
						on:click={() => changeRoute(goto, 'auth')}>Login</button
					>
				{:else}
					<button
						class="text-base lg:text-lg font-medium hover:underline hover:text-blue-500"
						on:click={() => {
							$store.authorizerRef.logout();
							$session = undefined;
							changeRoute(goto, '');
						}}>Logout</button
					>
					<button
						class="btn btn-ghost btn-circle avatar"
						on:click={() => changeRoute(goto, 'profile')}
					>
						<div class="w-10 rounded-full">
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img
								src="https://www.marketingmuses.com/wp-content/uploads/2018/01/invis-user.png"
								alt="profile image"
								class="w-72 md:w-80 lg:w-96 rounded-full"
							/>
						</div>
					</button>
				{/if}
			</div>
		{/if}
	</div>
</header>

<style lang="postcss">
	header {
		@apply p-4 w-full gap-2 bg-base-200;
	}
</style>
