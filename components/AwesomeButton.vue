<template>
    <div v-if="nonBtn" class="btn flex btn-lg  rounded-lg min-h-0 h-auto p-0">
        <span
            class="relative w-full p-2 inline-flex flex-row items-center justify-center h-full bg-[rgba(12,12,12,0.95)] rounded-md min-h-full ">
            <slot />
        </span>
    </div>
    <button v-else class="btn flex btn-lg  rounded-lg min-h-0 h-auto p-0">
        <span
            class="relative w-full p-2 inline-flex flex-row items-center justify-center h-full bg-[#E23E57] rounded-md min-h-full text-black">
            <slot />
        </span>
    </button>
</template>
<script setup>
let { nonBtn } = defineProps(['non-btn'])
</script>
<style scoped>
@keyframes amazing-transform {
    0% {
        background-position: 0 150%;
    }

    50% {
        background-position: 250% 0%;
    }

    100% {
        background-position: 0 150%;
    }
}
</style>