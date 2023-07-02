<template>
    <div class="relative bg-[rgba(17,23,32,1)] rounded-[0.375rem] mx-1 mt-2 text-gray-400 text-l font-semibold px-4 py-2">
        {{ t }}
    </div>
</template>
<script setup>
const { t } = defineProps(['t']);
</script>