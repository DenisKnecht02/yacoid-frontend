<script lang="ts">
	import { AllCategories } from '$types';
</script>

<main>
	<div class="flex bg-white h-full justify-center p-8">
		<div class="card  grid justify-center w-full shadow-2xl bg-base-100">
			<form class="card-body w-fit md:w-screen gap-4" action="./">
				<div class="form-control grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 md:px-8">
					<label class="label">
						<span class="text-bold text-lg">Author</span>
					</label>
					<input
						type="text"
						placeholder="Author name..."
						class="input input-bordered col-span-2"
						required
					/>
				</div>
				<div class="form-control grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 md:px-8">
					<label class="label">
						<span class="text-bold text-lg">Source</span>
					</label>
					<input
						type="text"
						placeholder="Source..."
						class="input input-bordered col-span-2"
						required
					/>
				</div>
				<div class="form-control grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 md:px-8">
					<label class="label">
						<span class="text-bold text-lg">Year of Submission</span>
					</label>
					<input
						type="number"
						min="1000"
						max="2099"
						step="1"
						placeholder="Year of Submission..."
						class="input input-bordered col-span-2"
						required
					/>
				</div>
				<div class="form-control grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 md:px-8">
					<label class="label">
						<span class="text-bold text-lg">Category</span>
					</label>
					<select class="select w-full border border-gray-300">
						{#each AllCategories as category}
							<option>{category}</option>
						{/each}
					</select>
				</div>
				<div class="form-control grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 md:px-8">
					<label class="label">
						<span class="text-bold text-lg">Definition</span>
					</label>
					<textarea placeholder="Definition..." class="input input-bordered col-span-2 h-40" />
				</div>
				<div class="form-control mt-6 grid grid-cols-3 lg:grid-cols-5 gap-4 md:px-8">
					<input
						type="submit"
						class=" btn btn-primary justify-center col-start-3 lg:col-start-5"
						value="Submit"
					/>
				</div>
			</form>
		</div>
	</div>
</main>

<style lang="postcss">
</style>
