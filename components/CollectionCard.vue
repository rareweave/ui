<template>
    <NuxtLink :to="'/collection/' + collection.contractTxId"
      class="nft-card card shadow-xl h-[16rem] w-[16rem] m-2 rounded-xl flex flex-col justify-end items-center" :style="{
        backgroundRepeat: 'no-repeat',
        backgroundClip: 'border-box',
  
        backgroundColor: `black`,
        backgroundImage: `radial-gradient(#00000030, #00000015), url('https://prophet.rareweave.store/_ipx/width_420,f_webp/https://arweave.net/${collection.state.items[0]}')`,
      }">
  
      <div
        class="rounded font-mono flex m-4 p-2 text-white bg-black bg-opacity-20 backdrop-blur-sm flex-col max-w-max justify-center items-center">
        <h2 class="card-title text-center">{{ collection.state.name }}</h2>
      </div>
    </NuxtLink>
  </template>
  <style>
  .nft-card {
    transition: all 0.3s ease-in-out;
    background-size: cover;
    transform: translate(0);
    background-position: 50% 50%;
  }
  
  .nft-card:hover {
    transition: transform 0.5s ease 0s;
    background-color: #a12720;
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
  }
  
  .disposable {
    background-color: #cc352d;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    transition: transform 1s ease 0s;
  }
  
  .disposable:hover {
    transition: transform 0.5s ease 0s;
    background-color: #a12720;
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
  }
  </style>
  <script setup>
  import Arweave from "arweave";
  
  const { collection } = defineProps(["collection"]);
  
  const arweaveState = await useState("arweave", () =>
    Arweave.init({
      host: "prophet.rareweave.store",
      port: 443,
      protocol: "https",
      timeout: 60_000,
      logging: false,
    })
  );
  
  const arweave = arweaveState.value;
  </script>
  