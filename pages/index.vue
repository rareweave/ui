<template>
    <div class="h-full-navbared w-full flex flex-col items-center justify-center ">
        <div class="bg-black bg-opacity-50 p-4 rounded-none backdrop-blur-sm" :style="{
            backgroundImage: `radial-gradient(#000000a0,#000000ff, #000000ff), url('/main-page-banner.jpg')`,
            backgroundAttachment: 'fixed',
            backgroundColor: 'rgb(2,2,2)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
            backgroundSize: 'auto 100%'
        }">
            <h1 class="text-3xl text-center ">Welcome to <p class="rareweave-font">RareWeave</p>
            </h1>
            <p class="font-mono mt-2 p-2 text-center max-w-[50rem]"> <span>You've arrived on wonderful land - at RareWeave,
                    the NFT
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
                <span>However we still managed to build NFT that can be traded without trusted intermediary, utilizing
                    Atomic
                    Swap paradigm. <a class="text-[#fc466b]"
                        href="https://ucfobtm3o5iblpls37lmzbktytxjoo24guajfciszltxbetweaba.arweave.net/oIrgzZt3UBW9ct_WzIVTxO6XO1w1AJKJEsrncJJ2IAI">[READ
                        MORE]</a></span>
            </p>
            <p class="font-mono mt-2 p-2 text-center text-xl">But enough words! Choose your destiny</p>
            <div class="flex flex-row justify-center w-full text-center flex-wrap px-4">
                <div class="card w-96 bg-gray-900 bg-opacity-25 backdrop-blur-sm shadow-xl mr-2">
                    <figure class="px-10 pt-10">
                        <img src="~/assets/add.svg" alt="Create NFT" class="rounded-xl max-h-[9rem]" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <NuxtLink to="/create"
                            class="btn btn-xl card-title w-full text-lg amazing-button2 rounded-md hover:rounded-lg transition-all">
                            Create
                            NFT</NuxtLink>

                    </div>
                </div>
                <div class="card w-96 bg-gray-900 bg-opacity-25 backdrop-blur-sm shadow-xl ml-2">
                    <figure class="px-10 pt-10">
                        <img src="~/assets/treasure.svg" alt="Create NFT" class="rounded-xl max-h-[9rem]" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <NuxtLink to="/discover"
                            class="btn btn-xl card-title w-full text-lg amazing-button rounded-md hover:rounded-lg transition-all">
                            Discover
                            NFTs</NuxtLink>

                    </div>
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
