<template>
    <div class="h-full-navbared w-full flex flex-col items-center justify-start ">
        <div class="pt-4 px-4 my-4 bg-black bg-opacity-30 flex flex-col items-center">
            <h1 class="font-mono text-3xl">Discover NFTs</h1>
            <input class="input input-bordered rounded-lg input-accent mt-2 w-96"
                placeholder="Search by name/description/etc." v-model="searchCondition" @input="refreshResults" />
            <div class="form-control">
                <label class="cursor-pointer label">

                    <input type="checkbox" v-model="forSaleOnly" class="checkbox checkbox-warning"
                        @change="refreshResults" />
                    <span class="label-text ml-2">For sale only</span>
                </label>
            </div>
        </div>
        <div class="flex flex-row flex-wrap justify-center">
            <NftCard v-for="nft in nfts.result" :key="nft.contractTxId" :nft="nft"></NftCard>
        </div>


    </div>
</template>

<script setup>
let nfts = ref(await $fetch("https://prophet.rareweave.store/nfts"))
let searchCondition = ref("")
let forSaleOnly = ref(false)

async function refreshResults() {
    nfts.value = await $fetch(`https://prophet.rareweave.store/nfts?search=${searchCondition.value}${forSaleOnly.value ? '&forSaleOnly=true' : ''}`)
}
definePageMeta({
    layout: "without-auth",
});
</script>
<style>
@keyframes amazing-bg {
    from {

        background-position-x: 0%;
    }

    50% {

        background-position-x: 200%;
    }

    to {

        background-position-x: 0%;
    }
}

.amazing-button {
    background: rgb(97, 9, 168);
    background: radial-gradient(circle, rgba(97, 9, 168, 1) 0%, rgba(121, 41, 9, 1) 25%, rgba(179, 22, 83, 1) 50%, rgba(171, 49, 107, 1) 61%, rgba(167, 40, 83, 1) 73%, rgb(185, 25, 36) 100%);
    background-size: 300% 300%;
    animation: amazing-bg 10s linear infinite;
}
</style>
