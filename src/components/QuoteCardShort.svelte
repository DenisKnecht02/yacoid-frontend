<script lang="ts">
    export let category: string;
    export let quote: string;
    export let author: string;
    export let publishing_date: string;
</script>

<div class="card w-[1/4] bg-base-100 shadow-xl">
    <div class="card-body">
        <div class="badge badge-secondary text-base mb-2 p-3">{category}</div>
        <p class="italic text-xl text-justify">"{quote}"</p>
        <p class="flex justify-end font-bold">- {author} ({publishing_date})</p>
    </div>
</div>

<style lang="postcss">
    
</style>