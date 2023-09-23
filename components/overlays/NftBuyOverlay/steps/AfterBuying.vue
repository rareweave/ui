<template>
    <div class="w-full flex flex-col max-w-sm justify-center items-center">
        <p class="text-sm text-center w-full mt-2">Amazing! Now you own "{{ nftFactory.nftState.name }}"</p>
        <NftView :nftState="nftFactory.nftState" :nftId="nftFactory.nftId"></NftView>

        <button class="mt-2 rounded-lg border-zinc-700 hover:border-zinc-800 border p-2 px-4 text-md text-white mb-2" @click="nftFactory.nftBuyOverlayShown = false">Close</button>

    </div>
</template>
<script setup>

const { signer, nftFactory } = defineProps(["signer", "nftFactory"])
let emit = defineEmits(['broadcasted', 'finalized'])

</script>