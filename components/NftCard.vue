<template>
  <NuxtLink
    :to="'/nft/' + nft.contractTxId"
    class="nft-card card shadow-xl h-[16rem] w-[16rem] m-2 rounded-xl flex flex-col justify-end items-center"
    :style="{
      backgroundRepeat: 'no-repeat',
      backgroundClip: 'border-box',

      backgroundColor: `black`,
      backgroundImage: `radial-gradient(#00000030, #00000015), url('https://prophet.rareweave.store/_ipx/width_420,f_webp/https://arweave.net/${nft.contractTxId}')`,
    }"
  >
    <button
      v-if="disposable"
      @click.prevent.stop="$emit('remove-item', nft.contractTxId)"
      class="btn btn-sm absolute right-2 top-2 disposable"
    >
      ✕
    </button>

    <div
      class="rounded font-mono flex m-4 p-2 text-white bg-black bg-opacity-20 backdrop-blur-sm flex-col max-w-max justify-center items-center"
    >
      <h2 class="card-title text-center">{{ nft.state.name.slice(0, 30) }}</h2>
      <!-- <p v-if="nft.state.description">{{ nft.state.description.length < 80 ? nft.state.description :
                nft.state.description.slice(0, 77) + "..." }}</p> -->
      <span class="mt-1 text-sm text-gray-400" v-if="nft.state.forSale"
        >Price:
        {{
          parseFloat(
            parseFloat(arweave.ar.winstonToAr(nft.state.price)).toFixed(3)
          )
        }}
        {{ nft.state.listingDenom || "AR" }}</span
      >

      <span class="mt-1 text-sm text-gray-300" v-if="nft.owner"
        >Owner:
        <NuxtLink class="link" :to="'/profile/' + nft.owner.address">{{
          nft.owner.ansName || nft.owner.account.handle
        }}</NuxtLink></span
      >
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

const { nft, disposable } = defineProps(["nft", "disposable"]);

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
