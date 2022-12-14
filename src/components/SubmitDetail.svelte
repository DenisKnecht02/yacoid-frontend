<script lang="ts">
	export let modalName: string = '';
	export let modalTitle: string = '';
	export let submitStatus: string = '';
  export let submitFeedback: string = '';
  export let submitDef: string = '';
  export let submitDate: string = '';
  export let submittedBy: string = '';
  export let submitAuthor: string = '';
  export let submitPublishing_date: string = '';
  export let submitSource: string = '';
  
	export let callbackFunction: Function = () => {};
  
  //alert(submitAuthor)
  
	// on:click={() => alert('Now the modal should open to see details')}
  
</script>

<input type="checkbox" id={modalName} class="modal-toggle" />
<label for={modalName} class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <div class="">
      <h3 class="text-xl lg:text-2xl font-bold text-center pb-4 border-b-4">{modalTitle}</h3>
      
        {#if submitStatus == "approved"}
        <p class="text-base lg:text-lg py-4 pb-6">The following definition that you have submitted on {submitDate} has been accepted</p>
        <h5 class="text-base lg:text-lg font-bold text-gray-600">Definition:</h5>
        <div>
          <p class="text-base lg:text-lg py-4">"{submitDef}"</p>
          <p class="flex justify-end items-end font-bold">- {submitAuthor} ({submitPublishing_date})</p>
          <p class="flex justify-end items-end italic pb-6">from: {submitSource}</p>
        </div>
        {:else if submitStatus == "pending"}
        <p class="text-base lg:text-lg py-4 pb-6">The following definition that you have submitted on {submitDate} is still pending to be accepted</p>
        <h5 class="text-base lg:text-lg font-bold text-gray-600">Definition:</h5>
        <div>
          <p class="text-base lg:text-lg py-4">"{submitDef}"</p>
          <p class="flex justify-end items-end font-bold">- {submitAuthor} ({submitPublishing_date})</p>
          <p class="flex justify-end items-end italic pb-6">from: {submitSource}</p>
        </div>
        {:else if submitStatus == "declined"}
        <p class="text-base lg:text-lg py-4 pb-6">The following definition that you have submitted on {submitDate} has been rejected. Please read the message!</p>
        <h5 class="text-base lg:text-lg font-bold text-gray-600">Definition:</h5>
        <div>
          <p class="text-base lg:text-lg py-4">"{submitDef}"</p>
          <p class="flex justify-end items-end font-bold">- {submitAuthor} ({submitPublishing_date})</p>
          <p class="flex justify-end items-end italic pb-6">from: {submitSource}</p>
        </div>
        <h5 class="text-base lg:text-lg font-bold text-gray-600">Messsage:</h5>
        <p class="text-base lg:text-lg py-4">{submitFeedback}</p>
        {/if}
      
    </div>
  </label>
</label>

<style lang="postcss">
</style>
