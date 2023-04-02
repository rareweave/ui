<template>
    <NuxtLink :to="'/nft/' + nft.contractTxId"
        class="nft-card card shadow-xl h-[20rem] w-[20rem] m-2  rounded-xl flex flex-col justify-end items-center " :style="{


            backgroundRepeat: 'no-repeat',
            backgroundClip: 'border-box',

            backgroundColor: `black`,
            backgroundImage: `radial-gradient(#00000030, #00000015), url('https://arweave.net/${nft.contractTxId}')`
        }">


        <div
            class="rounded font-mono flex m-4 p-2 text-white bg-black bg-opacity-20 backdrop-blur-sm flex-col max-w-max justify-center items-center">

            <h2 class="card-title">{{ nft.state.name }}</h2>
            <p v-if="nft.state.description">{{ nft.state.description.length < 80 ? nft.state.description :
                nft.state.description.slice(0, 77) + "..." }}</p>

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
const { nft } = defineProps(["nft"])
console.log(nft)
</script>