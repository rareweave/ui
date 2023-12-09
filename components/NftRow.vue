<template>
  <div class="flex flex-row justify-start bg-[#11172080] items-start w-full">
    <NuxtLink :to="'/nft/' + nft.id" class="relative flex flex-row justify-start items-center w-full h-full p-1 border-l border-b border-gray-800">
      <Graphic :nft="nft" />
      <div class="grid grid-cols-[186px_1fr] w-full h-[calc(100%-1rem*2)] m-[1rem_0] p-[0_1rem]">
        <label> Name: </label>
        <span>
          {{ nft.state.name }}
        </span>

        <label> Description: </label>
        <span>
          {{ nft.state.description }}
        </span>

        <label> Owner: </label>
        <span>
          {{ nft.state.owner }}
        </span>

        <label> Minter: </label>
        <span>
          {{ nft.state.minter }}
        </span>

        <label> For Sale: </label>
        <span>
          {{ nft.state.forSale ? "Yes" : "No" }}
        </span>

        <label> Chain: </label>
        <span>
          {{ nft.state.listingChain ? nft.state.listingChain : "Arweave" }}
        </span>

        <label> Price </label>
        <span v-if="nft.state.price != null">
          {{
            nft.state.price > 0
              ? (
                  Big(nft.state.price) /
                  Big(Coins.Exponents[nft.state.listingCoin])
                ).toString() +
                (nft.state.listingCoin ?? "AR")
              : "free"
          }}
        </span>

        <label> Royalty: </label>
        <span> {{ nft.state.royalty }} % </span>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup>
import Big from "big.js";
import Coins from "../config/coins";

import Graphic from "./Graphic.vue";
const { nft } = defineProps(["nft"]);
</script>
