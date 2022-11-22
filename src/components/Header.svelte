<script lang="ts" src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous">
	import { changeRoute } from '../utils';
</script>

<header>
	<div class="flex flex-wrap w-full justify-center lg:justify-between">
		<!-- <h1 class="text-4xl font-bold mb-6">YACOID</h1> -->
		<img class="w-72" src="/yacoid.png" on:click={() => changeRoute('')} />

		<div class="grid grid-cols-2 gap-2 items-center sm:flex">
			<button class="btn btn-secondary w-40" on:click={() => changeRoute('definitions/submissions')}
				>Submissions</button
			>
			<button class="btn btn-secondary w-40" on:click={() => changeRoute('definitions')}
				>All Definitions</button
			>
			<button class="btn btn-secondary w-40" on:click={() => changeRoute('about_us')}
				>About us</button
			>
			<button class="btn btn-secondary w-40" on:click={() => changeRoute('auth')}>Login</button>
		</div>
	</div>
</header>

<!-- <header>
	<div class="flex flex-wrap w-full justify-between">  //this works as a dissapearing menu if not mobile
		<h1 class="text-4xl font-bold">YACOID</h1>
    <label class="peer sm:hidden btn modal-button">Menu</label>
    <div class="gap-2 hidden peer-hover:flex peer-hover:justify-center">
			<button class="btn btn-secondary" on:click={() => changeRoute('definitions/submissions')}>Sub</button>
			<button class="btn btn-secondary" on:click={() => changeRoute('definitions')}
				>All</button
			>
			<button class="btn btn-secondary" on:click={() => changeRoute('about_us')}>Ab</button>
			<button class="btn btn-secondary" on:click={() => changeRoute('login')}>Lo</button>
		</div>
		<div class="gap-2 hidden sm:flex">
			<button class="btn btn-secondary" on:click={() => changeRoute('definitions/submissions')}>Submissions</button>
			<button class="btn btn-secondary" on:click={() => changeRoute('definitions')}
				>All Definitions</button
			>
			<button class="btn btn-secondary" on:click={() => changeRoute('about_us')}>About us</button>
			<button class="btn btn-secondary" on:click={() => changeRoute('login')}>Login</button>
		</div>
	</div>
</header> -->
<style lang="postcss">
	header {
		@apply p-4 w-full gap-2 bg-base-200;
	}
</style>
