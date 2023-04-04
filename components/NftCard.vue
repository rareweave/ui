<template>
    <NuxtLink :to="'/nft/' + nft.contractTxId"
        class="nft-card card shadow-xl h-[16rem] w-[16rem] m-2  rounded-xl flex flex-col justify-end items-center " :style="{


            backgroundRepeat: 'no-repeat',
            backgroundClip: 'border-box',

            backgroundColor: `black`,
            backgroundImage: `radial-gradient(#00000030, #00000015), url('https://prophet.rareweave.store/_ipx/width_420,f_webp/https://arweave.net/${nft.contractTxId}')`
        }">


        <div
            class="rounded font-mono flex m-4 p-2 text-white bg-black bg-opacity-20 backdrop-blur-sm flex-col max-w-max justify-center items-center">

            <h2 class="card-title text-center">{{ nft.state.name.slice(0, 30) }}</h2>
            <!-- <p v-if="nft.state.description">{{ nft.state.description.length < 80 ? nft.state.description :
                nft.state.description.slice(0, 77) + "..." }}</p> -->
            <span class=" mt-1 text-sm text-gray-400" v-if="nft.state.forSale">Price: {{
                parseFloat(parseFloat(arweave.ar.winstonToAr(nft.state.price)).toFixed(3)) }} {{
        nft.state.listingDenom || 'AR' }}</span>

            <span class=" mt-1 text-sm text-gray-300" v-if="nft.owner">Owner: <NuxtLink class="link"
                    :to="'/profile/' + nft.owner.address">{{
                        nft.owner.ansName || nft.owner.account.handle }}</NuxtLink></span>

        </div>

    </NuxtLink>
</template>
<style>
.nft-card {
    transition: all 0.3s ease-in-out;
    background-size: cover;
    transform: translate(0);
    background-position: 50% 50%
}

.nft-card:hover {

    transform: perspective(900px) translateY(-5%) rotateX(8deg) rotateY(-5deg) translateZ(0);
    box-shadow: 2px 35px 35px -8px rgba(0, 0, 0, 0.75);
    /* translate: 0 0 300px; */


}
</style>
<script setup>

import Arweave from 'arweave';
const { nft } = defineProps(["nft"])

const arweaveState = await useState("arweave", () =>
    Arweave.init({
        host: "arweave.dev",
        port: 443,
        protocol: "https",
        timeout: 60_000,
        logging: false,
    })
);



const arweave = arweaveState.value;



</script>