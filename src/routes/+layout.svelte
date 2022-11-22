<script lang="ts">
	import '../app.css';
	import { AuthorizerProvider } from '@authorizerdev/authorizer-svelte';
	import '@authorizerdev/authorizer-svelte/styles/default.css';
</script>

<AuthorizerProvider
	config={{
		authorizerURL: import.meta.env['VITE_AUTH_URL'],
		redirectURL: typeof window != 'undefined' ? window.location.origin : ``,
		client_id: import.meta.env['VITE_AUTH_CLIENT_ID'],
		is_sign_up_enabled: true,
		is_strong_password_enabled: true,
		is_email_verification_enabled: true,
		is_basic_authentication_enabled: true
	}}
>
	<slot />
</AuthorizerProvider>
