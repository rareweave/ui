<template>
  <div
    class="bg-black bg-opacity-50 p-4 rounded-none backdrop-blur-sm hero h-full-navbared
                                                                                                                                                                                                                 min-h-screen"
    :style="{
      backgroundImage: `radial-gradient(#000000a0,#000000ff, #000000ff), url('/main-page-banner.webp')`,
      backgroundAttachment: 'fixed',
      backgroundColor: 'rgb(2,2,2)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto 100%'
    }">
    <div class="hero-content flex-col lg:flex-row justify-between w-full  ">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-white font-sans ">RareWeave</h1>
        <div>
          <p class="font-sans mt-2 p-2 text-center max-w-[50rem]">
            <span>You've arrived on wonderful land - at RareWeave, the NFT marketplace of the Arweave ecosystem. </span>
            <br />
            <span>Here you can buy unicorn JPEGs at price of just few gold ounces! </span>
            <br />
            <a class="text-[#fc466b] m-1 inline-block" href="https://twitter.com/rareweave">[Twitter]</a>
            <a class="text-[#4946fc] m-1 inline-block" href="https://discord.gg/2esZrmXsqs">[Discord]</a>
          </p>
          <div class="flex flex-row w-full flex-wrap justify-center ">
            <NuxtLink to="/create" class="amazing-button2 mr-2">

              Create

            </NuxtLink>
            <NuxtLink to="/discover" class="amazing-button">
              <span class="relative px-5 inline-flex items-center justify-center h-full bg-[rgb(12,12,12)] rounded-md ">
                Discover
              </span>
            </NuxtLink>

          </div>
          <div id="gap" class="pt-4">
          </div>
          <a class="badge color-[#2dd4bf] p-3 badge-outline rounded-full"
            href="https://arweave.dev/oIrgzZt3UBW9ct_WzIVTxO6XO1w1AJKJEsrncJJ2IAI">Read
            the specification ⭐</a>
        </div>
      </div>
      <NuxtLink class="randomNFT" :to="'/nft/' + randomNft?.contractTxId">
        <img
          :src="'https://prophet.rareweave.store/_ipx/width_384,animated,f_webp/https://arweave.net/' + randomNft?.contractTxId"
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
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
}
</style>
