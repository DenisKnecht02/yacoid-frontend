<script lang="ts">
	export let modalName: string = '';
	export let modalTitle: string = '';
	export let modalContent: string = '';
	export let callbackFunction: Function = () => {};
</script>

<input type="checkbox" id={modalName} class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<h3 class="text-lg lg:text-xl font-bold">{modalTitle}</h3>
		<p class="text-base lg:text-lg py-4">
			{modalContent}
		</p>
		<div class="modal-action">
			<label
				for={modalName}
				class="btn btn-sm place-self-end modal-button"
				on:click={() => callbackFunction()}
			>
				Proceed
			</label>
			<label for={modalName} class="btn btn-sm btn-primary place-self-end modal-button">
				Cancel
			</label>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
