<script lang="ts">
	import '../app.css';
	import { getContext, onMount } from 'svelte';
	import { AuthorizerProvider } from '@authorizerdev/authorizer-svelte';
	import '@authorizerdev/authorizer-svelte/styles/default.css';
	import { goto } from '$app/navigation';
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	import { changeRoute } from '$utils';
	import { session } from '$stores/session';
	import type { AuthorizerState } from '@authorizerdev/authorizer-svelte/types';

	let authUrl: string = '';
	let state: AuthorizerState | undefined = undefined;

	function setNewState(stateParam: AuthorizerState | undefined) {
		state = stateParam;
	}

	onMount(() => {
		authUrl = import.meta.env['VITE_AUTH_URL'] || '';
		if (authUrl[authUrl.length - 1] == '/') {
			authUrl = authUrl.slice(0, authUrl.length - 1);
		}
	});
</script>

<div class="drawer">
	<input id="menu-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content w-full h-full">
		<AuthorizerProvider
			config={{
				authorizerURL: import.meta.env['VITE_AUTH_URL'] || '',
				redirectURL: typeof window != 'undefined' ? window.location.origin : ``,
				client_id: import.meta.env['VITE_AUTH_CLIENT_ID'],
				is_sign_up_enabled: true,
				is_strong_password_enabled: true,
				is_email_verification_enabled: true,
				is_basic_authentication_enabled: true
			}}
			onStateChangeCallback={setNewState}
		>
			<Header drawer="menu-drawer" />
			<slot />
			<Footer />
		</AuthorizerProvider>
	</div>
	<div class="drawer-side">
		<label for="menu-drawer" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-100 text-base-content">
			<!-- Sidebar content here -->
			<li>
				<button
					class="text-base lg:text-lg font-medium hover:underline hover:text-blue-500"
					on:click={() => changeRoute(goto, 'definitions/submissions')}>Submissions</button
				>
			</li>
			<li>
				<button
					class="text-base lg:text-lg font-medium hover:underline hover:text-blue-500"
					on:click={() => changeRoute(goto, 'definitions')}>All Definitions</button
				>
			</li>
			<li>
				<button
					class="text-base lg:text-lg font-medium hover:underline hover:text-blue-500"
					on:click={() => changeRoute(goto, 'about_us')}>About us</button
				>
			</li>
			{#if $session === undefined}
				<li>
					<button
						class="text-base lg:text-lg font-medium hover:underline hover:text-blue-500"
						on:click={() => changeRoute(goto, 'auth')}>Login</button
					>
				</li>
			{:else}
				<li>
					<button
						class="text-base lg:text-lg font-medium hover:underline hover:text-blue-500"
						on:click={() => changeRoute(goto, 'profile')}
					>
						Profile
					</button>
				</li>
				<li>
					<button
						class="text-base lg:text-lg font-medium hover:underline hover:text-blue-500"
						on:click={() => {
							if (state === undefined) {
								return;
							}
							state.authorizerRef.logout();
							$session = undefined;
							changeRoute(goto, '');
						}}
						>Logout
					</button>
				</li>
			{/if}
		</ul>
	</div>
</div>
