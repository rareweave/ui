<template>
  <div class="bg-black bg-opacity-50 p-4 rounded-none backdrop-blur-sm hero h-full-navbared
   min-h-screen bg-base-200" :style="{
        backgroundImage: `radial-gradient(#000000a0,#000000ff, #000000ff), url('/main-page-banner.jpg')`,
        backgroundAttachment: 'fixed',
        backgroundColor: 'rgb(2,2,2)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100%'
    }">
    <div class="hero-content flex-col lg:flex-row justify-between w-full  ">
      <div class="text-center">
        <h1 class="text-6xl font-bold rareweave-font">RareWeave</h1>
        <div>
          <p class="font-mono mt-2 p-2 text-center max-w-[50rem]">
            <span>You've arrived on wonderful land - at RareWeave, the NFT marketplace of the Arweave ecosystem. </span>
            <br />
            <span>Here you can buy unicorn JPEGs at price of just few gold ounces! </span>
            <br />
            <span>If you're ar <span class="rareweave-font">weave</span>ing for long, you might know that SmartWeave contracts can't have AR assigned it. </span>
            <br />
            <span>However we still managed to build NFT that can be traded without trusted intermediary, utilizing Atomic Swap paradigm. <a class="text-[#fc466b]" href="https://ucfobtm3o5iblpls37lmzbktytxjoo24guajfciszltxbetweaba.arweave.net/oIrgzZt3UBW9ct_WzIVTxO6XO1w1AJKJEsrncJJ2IAI">[READ MORE]</a>
            </span>
          </p>
          <div class="flex flex-row w-full flex-wrap justify-center ">
            <NuxtLink to="/create" class="btn btn-xl text-lg amazing-button rounded-md hover:rounded-lg transition-all m-1"> Mint</NuxtLink>
            <NuxtLink to="/discover" class="btn btn-xl text-lg amazing-button2 norounded-md hover:rounded-lg transition-all m-1"> Discover</NuxtLink>
          </div>
        </div>
      </div>
      <div class="randomNFT">
        <img
        :src="'https://arweave.net/' + randomNft.contractTxId"  class="max-w-sm rounded-sm shadow-2xl" />
    </div>
      </div>
  </div>
</template>

<script setup>
  let raw = await fetch('https://prophet.rareweave.store/nfts')
  let nfts = await raw.json()
  let randomNft = nfts.result[Math.floor(Math.random()*nfts.result.length)];

  definePageMeta({
    layout: "without-auth"
  })
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

  .randomNFT {
    transform: perspective(1500px) rotateY(-15deg);
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    transition: transform 1s ease 0s;
}

.randomNFT:hover {
    transform: perspective(3000px) rotateY(5deg);
 }
</style>