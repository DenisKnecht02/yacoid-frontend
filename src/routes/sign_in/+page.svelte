<script lang="ts">
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
</script>

<Header />

<div class="flex flex-col h-full justify-center items-center p-4">
	<p class="text-2xl md:text-3xl font-bold pb-4">Sign in to YACOID!</p>
	<!--<p class="text-lg font-medium">To add definitions you need an account</p>-->
	<div class="card grid place-items-center w-3/4 sm:w-1/2 xl:w-1/4 shadow-2xl bg-base-100">
		<form class="card-body" action="./">
			<div class="form-control grid grid-cols-3 gap-4 sm:px-8">
				<label class="label">
					<span class="label-text">Username</span>
				</label>
				<input
					type="text"
					placeholder="Username"
					class="input input-bordered col-span-2"
					required
				/>
			</div>
			<div class="form-control grid grid-cols-3 gap-4 sm:px-8">
				<label class="label">
					<span class="label-text">Email</span>
				</label>
				<input
					type="text"
					placeholder="Email..."
					class="input input-bordered col-span-2"
					required
				/>
			</div>
			<div class="form-control grid grid-cols-3 gap-4 sm:px-8">
				<label class="label">
					<span class="label-text">Password</span>
				</label>
				<input
					type="password"
					placeholder="Password..."
					class="input input-bordered col-span-2"
					required
				/>
			</div>
			<div class="form-control mt-6 grid grid-cols-3 gap-4 md:px-8">
				<input
					type="submit"
					class=" btn btn-primary justify-center col-start-3 lg:col-start-5"
					value="Sign in"
				/>
			</div>
		</form>
	</div>
</div>

<Footer />

<style lang="postcss">
</style>
