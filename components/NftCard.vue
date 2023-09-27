<template>
  <div class="relative flex flex-col flex-wrap items-center box-border">
    <NuxtLink :to="'/nft/' + nft.id" class="relative flex flex-col flex-nowrap justify-start w-72 h-96 mt-1.5 ml-2 mr-2 mb-5 p-0">
      <Graphic :nft="nft" />
      <div class="absolute flex top-0 right-0 m-1">
        <button
          v-if="disposable"
          @click.prevent.stop="$emit('remove-item', nft.id)"
          class="bg-red-400 rounded-sm p-1"
        >
          ✕
        </button>
      </div>
      <div class="relative flex flex-col flex-nowrap items-stretch justify-between w-full h-16 box-border">
        <div class="flex m-0 p-1 h-10">
          <h4 class="relative flex flex-row flex-nowrap items-center justify-start flex-1 text-left h-8 p-3 text-base font-semibold font-arimo text-white whitespace-nowrap overflow-clip text-ellipsis">
            {{ nft.state.name || "-no title-" }}
          </h4>
        </div>
        <div class="flex m-0 p-1 h-10">
          <span class="relative flex flex-row flex-nowrap items-center justify-start flex-1 max-w-[80%] text-left pt-0 px-3 pb-3 h-8 p-3 text-base font-semibold font-arimo text-white whitespace-nowrap overflow-clip text-ellipsis" v-if="nft.state.owner">
            Owned:&nbsp;
            <NuxtLink :to="'/profile/' + nft.state.owner" class="relative flex flex-row flex-nowrap items-center text-[rgba(221,232,255,0.5)] no-underline hover:text-[rgba(251,250,255,0.5)] hover:underline">
              {{ nft.state.owner }}
            </NuxtLink>
          </span>
        </div>
        <div
          :class="{
            'flex m-0 p-1 h-10 last:-mt-3 last:justify-between last:rounded-[0_0_8px_8px] hover:bg-gradient-to-r hover:from-violet-500 hover:to-orange-500': nft.state.forSale,
            'flex m-0 p-1 h-10 last:-mt-3 last:justify-between': !nft.state.forSale,
          }"
        >
          <div class="relative flex flex-row flex-nowrap items-center flex-[1_1_0px] p-0">
              <span class="relative flex flex-row flex-nowrap items-center flex-1 p-0">
                <span class="flex-[0_0_32px] h-8 ml-1 mr-2">
                  <span>
                    <img :src="coinImage" alt="Arweave" />
                  </span>
                </span>
              <span class="relative flex flex-row flex-nowrap items-center" v-if="nft.state.forSale">
                {{
                  Big(nft?.state?.price) /
                  Big(
                    nft.state.listingCoin
                      ? Coins.Exponents[nft.state.listingCoin]
                      : Coins.Exponents["AR"]
                  )
                }}
                {{ nft.state.listingCoin || "AR" }}
              </span>
            </span>
          </div>
          <span class="relative flex flex-row flex-nowrap items-center flex-[0_0_max-content]">
            {{ nft.state.forSale ? "Buy Now" : "Not For Sale" }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup>
import Coins from "../config/coins";
import Big from "big.js";

const coinImage = nft.state.listingChain
  ? ref(`/coin-images/${nft.state.listingChain}.svg`)
  : ref(`/coin-images/arweave.svg`);

const { nft, disposable } = defineProps(["nft", "disposable"]);
</script>