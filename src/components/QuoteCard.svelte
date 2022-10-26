<script lang="ts">
    export let category: string;
    export let quote: string;
    export let author: string;
    export let publishing_date: string;
    export let source: string;
    export let action: string;
</script>

<div class="card w-[1/4] bg-base-100 shadow-xl">
    <div class="card-body">
        <div class="flex justify-between h-12 items-center">
          {#if action === "true"}
          <div class="badge badge-secondary text-base mb-2 p-3">{category}</div>
          <div id="forSymbol" class="flex flex-wrap gap-3 items-center">
            <label for="modal_accept" class="cursor-pointer px-2 text-lg bg-green-400 rounded-lg pb-1">👍</label>
            <label for="modal_decline" class="cursor-pointer px-2 text-lg bg-red-400 rounded-lg pb-1">👎</label>
          </div>
            
          {:else}
          <div class="badge badge-secondary text-base mb-2 p-3">{category}</div>
          {/if}
        </div>
        <p class="flex italic text-xl text-justify items-center">"{quote}"</p>
        <div>
          <p class="flex justify-end items-end font-bold">- {author} ({publishing_date})</p>
          <p class="flex justify-end items-end italic">from: {source}</p>
        </div>
        
    </div>
</div>

<input type="checkbox" id="modal_accept" class="modal-toggle" />
<label for="modal_accept" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">Definition accepted</h3>
  </label>
</label>

<input type="checkbox" id="modal_decline" class="modal-toggle" />
<label for="modal_decline" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <div class="flex flex-col justify-center items-center">
      <h3 class="text-lg font-bold">Definition declined</h3>
      <div class="form-control w-full max-w-xs items-center">
        <label class="label">
          <span class="label-text">Please provide feedback</span>
        </label>
        <textarea class="textarea textarea-secondary h-48 w-full" placeholder="Type here..."></textarea>
        <label class="label">
        </label>
      </div>
    </div>
    <div class="modal-action">
      <label for="modal_decline" class="btn btn-secondary btn-sm">Send</label>
    </div>
  </label>
</label>

<style lang="postcss">
    
</style>