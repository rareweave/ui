<template>
  <div class="h-full-navbared w-full flex flex-col lg:flex-row justify-between" :style="{
    backgroundImage: `linear-gradient(-200deg,rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),radial-gradient(#000000a0, #000000ff), url('/profile-default-bg.jpg')`,
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'repeat',
    backgroundClip: 'border-box',
    backgroundPosition: '0% 0%',
    backgroundSize: 'cover',
  }">
    <div class="pt-4 px-4 my-4 ml-4 bg-black bg-opacity-30 flex flex-col items-center justify-start lg:h-full-navbared">
      <h1 class="font-mono text-3xl">{{ state.name }}</h1>
      <h2 class="font-mono text-1xl">{{ state.description }}</h2>
      <input class="input input-bordered rounded-lg input-accent mt-2 w-96" placeholder="Search by name/description/etc."
        v-model="searchCondition" @input="refreshResults" />
      <div class="form-control mt-4">
        <label class="cursor-pointer label">
          <input type="checkbox" v-model="forSaleOnly" class="checkbox checkbox-warning" @change="refreshResults" />
          <span class="label-text ml-2">For sale only</span>
        </label>
      </div>
      <template v-if="account && account.addr && state.admins.includes(account.addr)">
        <label for="add-modal"
          class="btn btn-xl text-lg amazing-button2 rounded-md hover:rounded-lg transition-all font-mono m-1 w-full">Add
          NFT</label>
      </template>
    </div>
    <div class="inline-flex flex-row flex-wrap overflow-auto items-center justify-center content-center">
      <NftCard v-for="nft in nfts.result" :key="nft.contractTxId" :nft="nft" :disposable="account && account.addr && state.admins.includes(account.addr)
        " @remove-item="deleteNFT"></NftCard>
    </div>
  </div>
  <input type="checkbox" id="add-modal" class="modal-toggle" :checked="false" v-model="addModalOpened" />
  <div class="modal">
    <div class="modal-box relative flex flex-col">
      <label for="add-modal" class="btn btn-sm absolute right-2 top-2">✕</label>
      <h3 class="font-bold text-lg text-center">{{ state.name }}</h3>
      <form class="modal-action flex flex-col" @submit.prevent="add">
        <input v-model="nftBeingAdded" class="input input-bordered w-full rounded-lg p-2" type="text" required
          placeholder="NFT IDs (Seperate with spaces)" />
        <button type="submit" class="btn btn-primary rounded-lg mt-4">
          Add
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
const { Warp, Contract, WarpFactory } = await import("warp-contracts");
import { useAccount, useArweave } from "../../composables/useState";
import setArweave from "../../plugins/arweave";

const arweave = useArweave().value;
if (!arweave)
    setArweave();

const account = useAccount();

let collectionId = useRoute().params.id || useRoute().hash.slice(1);
let nfts = ref(
  await $fetch(
    "https://prophet.rareweave.store/nfts?collection=" + collectionId
  )
);
let searchCondition = ref("");
let forSaleOnly = ref(false);
let addModalOpened = ref(false);
let nftBeingAdded = ref("");
let state = ref(
  (await $fetch("https://prophet.rareweave.store/contract?id=" + collectionId))
    .state
);
const warp = WarpFactory.forMainnet(
  {
    inMemory: true,
  },
  false,
  arweave
);
let nftContract = account.value
  ? warp
    .contract(collectionId)
    .setEvaluationOptions({
      remoteStateSyncSource: "https://prophet.rareweave.store/contract",
      remoteStateSyncEnabled: true,
      unsafeClient: "allow",
      allowBigInt: true,
      waitForConfirmation: false,
    })
    .connect("use_wallet")
  : warp.contract(collectionId).setEvaluationOptions({
    remoteStateSyncSource: "https://prophet.rareweave.store/contract",
    remoteStateSyncEnabled: true,
    unsafeClient: "allow",
    allowBigInt: true,
    waitForConfirmation: false,
  });
async function refreshResults() {
  nfts.value = await $fetch(
    `https://prophet.rareweave.store/nfts?collection=${collectionId}&${searchCondition.value ? "&search=" + searchCondition.value : ""
    }${forSaleOnly.value ? "&forSaleOnly=true" : ""}`
  );
}
async function add() {
  let newNfts = nftBeingAdded.value.split(" ");
  let inputs = [];
  for (let nft of newNfts) {
    inputs.push({
      function: "add-item",
      item: nft,
    });
  }
  await nftContract.writeInteraction({
    function: "bulk",
    inputs: inputs,
  });
  addModalOpened.value = false;
  state.value = (
    await fetch(
      "https://prophet.rareweave.store/contract?id=" + collectionId
    ).then((res) => res.json())
  ).state;
  refreshResults();
}
async function deleteNFT(contract) {
  await nftContract.writeInteraction({
    function: "remove-item",
    item: contract,
  });
  nfts.value.result = nfts.value.result.filter(
    (nft) => nft.contractTxId != contract
  );
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
  background: radial-gradient(circle,
      rgba(97, 9, 168, 1) 0%,
      rgba(121, 41, 9, 1) 25%,
      rgba(179, 22, 83, 1) 50%,
      rgba(171, 49, 107, 1) 61%,
      rgba(167, 40, 83, 1) 73%,
      rgb(185, 25, 36) 100%);
  background-size: 300% 300%;
  animation: amazing-bg 10s linear infinite;
}
</style>
