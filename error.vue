<template>
    <div class="bg-black bg-opacity-50 p-4 rounded-none backdrop-blur-sm hero h-full-navbared
                                                                 min-h-screen" :style="{
                                                                   backgroundImage: `radial-gradient(#000000a0,#000000ff, #000000ff), url('/main-page-banner.webp')`,
                                                                   backgroundAttachment: 'fixed',
                                                                   backgroundColor: 'rgb(2,2,2)',
                                                                   backgroundRepeat: 'true',
                                                                   backgroundSize: 'auto 100%'
                                                                 }">
      <div class="hero-content flex-col lg:flex-row justify-between w-full  ">
        <div class="text-center">
          <h1 class="text-6xl font-bold rareweave-font font-mono">Error</h1>
          <div>
            <p class="font-mono mt-2 p-2 text-center max-w-[50rem]">
              <span >Uh oh</span>
              <br />
              <span>Looks like you've stumbled upon a page that doesn't exist...</span>
              <br />
            </p>
            <div class="flex flex-row w-full flex-wrap justify-center ">
              <NuxtLink to="/"
                class="btn btn-xl text-lg amazing-button2 rounded-md hover:rounded-lg transition-all font-mono m-1 w-48">
                Go Home
              </NuxtLink>
            </div>
            <div id="gap" class="pt-4">
            </div>
          </div>
        </div>
        <NuxtLink class="randomNFT" :to="'/nft/' + randomNft?.contractTxId">
          <img :src="'https://prophet.rareweave.store/_ipx/width_384,f_webp/https://arweave.net/' + randomNft?.contractTxId"
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
  