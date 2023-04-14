<template>
  <div class="bg-black bg-opacity-50 p-4 rounded-none backdrop-blur-sm hero h-full-navbared
                                                       min-h-screen" :style="{
                                                         backgroundImage: `radial-gradient(#000000a0,#000000ff, #000000ff), url('/main-page-banner.jpg')`,
                                                         backgroundAttachment: 'fixed',
                                                         backgroundColor: 'rgb(2,2,2)',
                                                         backgroundRepeat: 'no-repeat',
                                                         backgroundSize: 'auto 100%'
                                                       }">
    <div class="hero-content flex-col lg:flex-row justify-between w-full  ">
      <div class="text-center">
        <h1 class="text-6xl font-bold rareweave-font font-mono">RareWeave</h1>
        <div>
          <p class="font-mono mt-2 p-2 text-center max-w-[50rem]">
            <span>You've arrived on wonderful land - at RareWeave, the NFT marketplace of the Arweave ecosystem. </span>
            <br />
            <span>Here you can buy unicorn JPEGs at price of just few gold ounces! </span>
            <br />
            <a class="text-[#fc466b] m-1 inline-block" href="https://twitter.com/rareweave">[Twitter]</a>
            <a class="text-[#4946fc] m-1 inline-block" href="https://discord.gg/2esZrmXsqs">[Discord]</a>
          </p>
          <div class="flex flex-row w-full flex-wrap justify-center ">
            <NuxtLink to="/create"
              class="btn btn-xl text-lg amazing-button2 rounded-md hover:rounded-lg transition-all font-mono m-1 w-48">
              Mint
            </NuxtLink>
            <NuxtLink to="/discover"
              class="btn btn-xl text-lg amazing-button font-mono rounded-md hover:rounded-lg transition-all m-1 w-48">
              Discover
            </NuxtLink>
          </div>
        </div>
      </div>
      <NuxtLink class="randomNFT" :to="'/nft/' + randomNft.contractTxId">
        <img :src="'https://prophet.rareweave.store/_ipx/width_384,f_webp/https://arweave.net/' + randomNft.contractTxId"
          class="max-w-sm rounded-md shadow-2xl " />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
let nfts = await fetch('https://prophet.rareweave.store/nfts').then(res => res.json())
let randomNft = nfts.result[Math.round(Math.random() * nfts.result.length)];

definePageMeta({
  layout: "without-auth"
})
</script> 
<style>
.randomNFT {
  transform: perspective(1500px) rotateY(-15deg);
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  transition: transform 1s ease-in-out 0s;
}

.randomNFT:hover {
  transform: perspective(3000px) rotateY(5deg);
}
</style>