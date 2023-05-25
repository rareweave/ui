<template>
  <NuxtLink :to="'/collection/' + collection.contractTxId"
    class="background nft-card card shadow-xl w-[16rem] m-2 rounded-xl flex flex-col justify-end items-center">

    <div class="rounded font-mono flex m-2 p-1 text-white flex-col max-w-max justify-center items-center">
      <h2 class="card-title text-center">{{ collection.state.name }}</h2>
    </div>
  </NuxtLink>
</template>
<script setup>
import { useArweave } from "../composables/useState";
import setArweave from "../plugins/arweave";

const arweave = useArweave().value;
if (!arweave)
  setArweave();

const { collection } = defineProps(["collection"]);
</script>
<style>
.nft-card {
  transition: all 0.3s ease-in-out;
  background-color: #111;
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
</style>

  