<template>
    <div v-if="nonBtn"
        class="btn flex btn-lg font-bold rounded-lg min-h-0 h-auto p-[1px] px-[1px] hover:shadow-lg hover:drop-shadow-sm transform-style-[preserve-3d]"
    >
        <span
            class="relative w-full py-2 px-4 inline-flex flex-row items-center justify-center h-full bg-[rgba(12,12,12,0.95)] rounded-md min-h-full up">
            <slot></slot>
        </span>
    </div>
    <button v-else
        class="btn flex btn-lg font-bold rounded-lg min-h-0 h-auto p-[1px] px-[1px] hover:shadow-lg hover:drop-shadow-sm transform-style-[preserve-3d] appearance-none"
    >
        <span
            class="relative w-full py-2 px-4 inline-flex flex-row items-center justify-center h-full bg-[rgba(12,12,12,0.95)] rounded-md min-h-full">
            <slot></slot>
        </span>
    </button>
</template>
<script setup>
let { nonBtn } = defineProps(['non-btn'])
console.log(nonBtn)
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

.btn:hover {
    box-shadow:
        0px 0px 1px rgba(0, 0, 0, 0.9),
        1px 1px 2px rgba(240, 146, 6, 0.175),
        2px 2px 4px rgba(240, 146, 6, 0.175),
        4px 4px 12px rgba(240, 146, 6, 0.175),
        8px 8px 16px rgba(240, 146, 6, 0.175),
        0px -1px 1px rgba(0, 0, 0, 0.9),
        -1px -1px 2px rgba(240, 146, 6, 0.175),
        -2px -2px 4px rgba(240, 146, 6, 0.175),
        -4px -4px 12px rgba(240, 146, 6, 0.175),
        -8px -8px 16px rgba(240, 146, 6, 0.175),
        -8px -8px 24px rgba(240, 146, 6, 0.175),
        0px 8px 16px rgba(240, 146, 6, 0.175),
        -8px 0px 16px rgba(240, 146, 6, 0.175),
        8px -8px 16px rgba(240, 146, 6, 0.175)
    ;
    filter: drop-shadow(0px 0px 2px rgba(240, 146, 6, 0.09)) !important;
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