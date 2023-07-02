<template>
    <div v-if="nonBtn">
        <span
            class="flex py-2 px-4 text-center justify-center items-center border font-bold border-solid hover:border-[rgba(240,246,252,0.3)] transition-colors border-[rgba(240,246,252,0.1)] rounded-lg min-h-0 h-[38px] bg-[rgb(20,20,20)]">

            <slot />
        </span>
    </div>
    <button v-else
        class="flex py-2 px-4 text-center justify-center items-center border font-bold border-solid hover:border-[rgba(240,246,252,0.3)] transition-colors border-[rgba(240,246,252,0.1)] rounded-lg min-h-0 h-[38px] bg-[rgb(20,20,20)]">

        <slot />

    </button>
</template>
<script setup>
let { nonBtn } = defineProps(['non-btn'])
</script>
