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
            <button title="accept" class="px-2 text-lg bg-green-400 rounded-lg pb-1">👍</button>
            <button title="don't accept" class="px-2 bg-red-400 rounded-lg py-0.5 text-lg">👎</button>
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

<style lang="postcss">
    
</style>