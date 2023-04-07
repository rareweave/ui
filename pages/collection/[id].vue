<template>
    <div class="h-full-navbared w-full flex flex-col lg:flex-row justify-between" :style="{
        backgroundImage: `linear-gradient(-200deg,rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),radial-gradient(#000000a0, #000000ff), url('/profile-default-bg.jpg')`,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'repeat',
        backgroundClip: 'border-box',
        backgroundPosition: '0% 0%',
        backgroundSize: 'cover'
    }">
      <div class="pt-4 px-4 my-4 ml-4 bg-black bg-opacity-30 flex flex-col items-center">
        <h1 class="font-mono text-3xl">{{state.name}}</h1>
        <input class="input input-bordered rounded-lg input-accent mt-2 w-96" placeholder="Search by name/description/etc." v-model="searchCondition" @input="refreshResults" />
        <div class="form-control mt-4">
          <label class="cursor-pointer label">
            <input type="checkbox" v-model="forSaleOnly" class="checkbox checkbox-warning" @change="refreshResults" />
            <span class="label-text ml-2">For sale only</span>
          </label>
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-center">
            <template v-for="nft in nfts.result">
          <NftCard v-if="state.items.includes(nft.contractTxId)" :key="nft.contractTxId" :nft="nft"></NftCard>
        </template>
      </div>
    </div>
  </template>
  <script setup>
    let collectionId = useRoute().params.id || useRoute().hash.slice(1)
    
    let nfts = ref(await $fetch("https://prophet.rareweave.store/nfts"))
    let searchCondition = ref("")
    let forSaleOnly = ref(false)

    let state = (await (await fetch("https://prophet.rareweave.store/contract?id=" + collectionId)).json()).state

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