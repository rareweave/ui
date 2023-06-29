<template>
    <div v-if="nonBtn"
        class="flex px-3 items-center border font-bold font-mono border-solid hover:border-[rgba(240,246,252,0.3)] transition-colors border-[rgba(240,246,252,0.1)] rounded-lg min-h-0 h-[37.92px] bg-[rgb(20,20,20)]">

        <slot />

    </div>
    <button v-else
        class="flex px-3 items-center border font-bold font-mono border-solid hover:border-[rgba(240,246,252,0.3)] transition-colors border-[rgba(240,246,252,0.1)] rounded-lg min-h-0 h-[37.92px] bg-[rgb(20,20,20)]">

        <slot />

    </button>
</template>
<script setup>
let { nonBtn } = defineProps(['non-btn'])
</script>
