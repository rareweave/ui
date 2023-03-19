<template>
    <div class="h-full-navbared w-full flex flex-col items-center justify-center">
        <h1 class="text-3xl text-center">Welcome to <p class="rareweave-font">RareWeave</p>
        </h1>
        <p class="font-mono mt-2 p-2 text-center"> <span>You've arrived on wonderful land - at RareWeave, the NFT
                marketplace of
                the Arweave ecosystem.
            </span>
            <br />
            <span>Here you can buy unicorn JPEGs at price of just few gold ounces!
            </span>
            <br />
            <span>If you're ar<span class="rareweave-font">weave</span>ing for long, you might know that SmartWeave
                contracts can't have AR assigned it.
            </span><br />
            <span>However we still managed to build NFT that can be traded without trusted intermediary, utilizing Atomic
                Swap paradigm. <a class="text-[#fc466b]"
                    href="https://ucfobtm3o5iblpls37lmzbktytxjoo24guajfciszltxbetweaba.arweave.net/oIrgzZt3UBW9ct_WzIVTxO6XO1w1AJKJEsrncJJ2IAI">[READ
                    MORE]</a></span>
        </p>
        <p class="font-mono mt-2 p-2 text-center text-xl">But enough words! Choose your destiny</p>
        <div class="flex flex-row justify-center w-full text-center flex-wrap px-4">
            <div
                class="basis-full md:basis-5/12 flex justify-center text-center items-center md:items-end max-w-[100%] px-4 my-2 flex-col">
                <div class="flex w-max flex-col items-center p-1">
                    <h2 class="text-lg">I want to sell unicorn JPEGs, let me upload!</h2>
                    <NuxtLink to="/create"
                        class="btn btn-xl m-2 text-lg amazing-button2 rounded-md hover:rounded-lg transition-all">Create
                        NFT</NuxtLink>
                </div>

            </div>
            <div
                class="basis-full md:basis-5/12 flex justify-center text-center items-center md:items-start max-w-[100%] px-4 my-2 flex-col">
                <div class="flex w-max flex-col items-center p-1">
                    <h2 class="text-lg">I want to buy unicorn JPEGs, show me some!</h2>
                    <NuxtLink to="/discover"
                        class="btn btn-xl m-2 text-lg amazing-button rounded-md hover:rounded-lg transition-all">
                        Discover
                        NFTs</NuxtLink>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>

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
