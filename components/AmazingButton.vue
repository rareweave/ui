<template>
    <div v-if="nonBtn"
        class="btn flex btn-lg rounded-lg min-h-0 font-bold font-mono h-auto p-[1.25px] px-[1.5px] hover:shadow-lg hover:shadow-orange-700/30">
        <span
            class="relative w-full p-2 inline-flex flex-row items-center justify-center h-full bg-[rgba(12,12,12,0.95)] rounded-md min-h-full up">
            <slot />
        </span>
    </div>
    <button v-else
        class="btn flex btn-lg font-bold font-mono rounded-lg min-h-0 h-auto hover:shadow-lg hover:shadow-orange-700/30 p-[1.25px] appearance-none px-[1.5px]">
        <span
            class="relative w-full p-2 inline-flex flex-row items-center justify-center h-full bg-[rgba(12,12,12,0.95)] rounded-md min-h-full ">
            <slot />
        </span>
    </button>
</template>
<script setup>
let { nonBtn } = defineProps(['non-btn'])
</script>
<style scoped>
.btn {
    background-color: #FF8400;
    background: radial-gradient(circle,
            #FF0060,
            #FE6244, #FF8400, #3F0071);
    background-size: 300% 300%;
    animation: amazing-transform 20s ease-in-out infinite;
    text-transform: none;
}

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