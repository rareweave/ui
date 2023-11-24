<template>
  <div class="relative flex flex-col flex-wrap items-center justify-center m-0 p-0 box-border">
    <NuxtLink :to="'/nft/' + nft.id"
              class="relative flex flex-col flex-nowrap justify-start items-center w-[286px] h-[398px] bg-[rgba(17,23,32,1)] m-[6px_9px_18px] p-0 box-content border border-[rgba(43,56,68,0.33)] rounded-lg">
      <Graphic :nft="nft" />
      <div class="absolute flex top-0 right-0 m-2 mt-2 mr-4">
        <button
          v-if="disposable"
          @click.prevent.stop="$emit('remove-item', nft.id)"
          class="bg-[#cc352d] rounded-full shadow-2xl transition-transform duration-1000 ease-in-out p-[0.2em] text-base"
        >
          ✕
        </button>
      </div>
      <div
        class="relative flex flex-col flex-nowrap items-stretch justify-between w-full h-16 m-0 mt-0.5 mb-0.5 p-0 box-border">
        <div class="flex m-0 p-1 h-10">
          <h4
            class="font-[Arimo] relative flex flex-row flex-nowrap items-center transition-all ease-in-out duration-100 h-8 p-0 pl-3 text-lg font-semibold text-[rgba(251,250,255,1)] whitespace-nowrap overflow-hidden overflow-ellipsis justify-start flex-[1_1_0] text-left">
            {{ nft.state.name || "-no title-" }}
          </h4>
        </div>
        <div class="flex m-0 p-1 h-10">
          <span
            class="relative flex flex-row flex-nowrap justify-start flex-1 max-w-[80%] items-center h-8 p-[0_12px_12px] text-base font-semibold font-[Arimo] color-white truncate"
            v-if="nft.state.owner">
            Owned:&nbsp;
            <NuxtLink :to="'/pofirle/' + nft.state.owner" class="relative flex flex-row flex-nowrap items-center transition-all ease-in-out duration-100 text-[rgba(221,232,255,0.5)] no-underline whitespace-nowrap overflow-hidden overflow-ellipsis hover:text-[rgba(251,250,255,0.5)] hover:underline">
              {{ nft.state.owner }}
            </NuxtLink>
          </span>
        </div>
        <div
          :class="{
            'flex m-0 p-[0.25em] h-[40px] [&:nth-last-child(1)]:-mt-[12px] [&:nth-last-child(1)]:justify-between [&:nth-last-child(1)]:rounded-b-lg hover:bg-gradient-to-l hover:from-[rgb(158,19,131)] hover:to-[rgb(238,129,9)]': nft.state.forSale,
            'flex m-0 p-[0.25em] h-[40px] [&:nth-last-child(1)]:-mt-[12px] [&:nth-last-child(1)]:justify-between [&:nth-last-child(1)]:rounded-b-lg': !nft.state.forSale,
          }"
        >
          <div class="relative flex flex-row flex-nowrap items-center transition-all ease-in-out duration-100 justify-start flex-[1_1_0] p-0 pr-3.5 pl-2.5">
            <span class="relative flex flex-row flex-nowrap items-center transition-all ease-in-out duration-100 justify-start flex-[1_1_0] p-0">
              <span class="flex-[0_0_32px] h-8 -ml-1 mr-1.5">
                <img :src="coinImage" />
              </span>
              <span class="relative flex flex-row flex-nowrap items-center transition-all ease-in-out duration-100" v-if="nft.state.forSale">
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
          <span class="relative flex flex-row flex-nowrap items-center transition-all ease-in-out duration-100 flex-[0_0_max-content] p-[0_12px]">
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

const { nft, disposable } = defineProps(["nft", "disposable"]);

const coinImage = nft.state.listingChain
  ? ref(`/coin-images/${nft.state.listingChain}.svg`)
  : ref(`/coin-images/arweave.svg`);
</script>
