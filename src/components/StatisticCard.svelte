<script lang="ts">
    export let stat_title: string;
    export let stat_value: string;
    export let stat_description: string;
    export let svg_description: string;

</script>

<div class="stat shadow-md rounded-xl justify-self-center">
    <div class="stat-figure text-secondary">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
            ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d={svg_description}
            /></svg
        >
    </div>
    <div class="stat-title text-xl opacity-75 ">{stat_title}</div>
    <div class="stat-value text-5xl">{stat_value}</div>
    <div class="stat-desc text-lg opacity-75">{stat_description}</div>
</div>

<style lang="postcss">
    
</style>