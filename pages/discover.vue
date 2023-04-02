<template>
    <div class="h-full-navbared w-full flex flex-col items-center justify-center ">
        <h1 class="font-mono text-2xl">Discover NFTs</h1>
        <div class="flex flex-row flex-wrap justify-around">
            <NftCard v-for="nft in nfts.result" :key="nft.contractTxId" :nft="nft"></NftCard>
        </div>


    </div>
</template>

<script setup>
let nfts = await $fetch("https://prophet.rareweave.store/nfts")
console.log(nfts)
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
