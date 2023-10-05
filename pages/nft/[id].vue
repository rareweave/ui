<template>
    <div class="h-full-navbared w-full flex flex-col items-center justify-center">
        <NftView :nftState="nftFactory.nftState" :nftId="nftFactory.nftId" />
        <p class="text-md text-center font-sans p-2 max-w-[32rem]">
            {{ nftFactory.nftState.description || "[This NFT has no description]" }}
        </p>
        <div class="flex flex-col items-center bg-zinc-900 p-2 border border-gray-800 mt-4 min-w-[16rem]" >
          <div class="p-2 border-gray-950 border-2 w-full text-left mb-2 inline-flex flex-col items-center">Owner: <AddressBadge class="mt-1" :address="nftFactory.nftState.owner"/></div>
              <div class="p-2 border-gray-950 border-2 w-full text-left mb-2 inline-flex flex-col items-center">Minter: <AddressBadge class="mt-1" :address="nftFactory.nftState.minter"/></div>
              <template v-if="nftFactory.nftState.forSale">
                  <div class="p-2 border-gray-950 border-2 w-full text-left mb-2">For sale</div>
                  <div class="p-2 border-gray-950 border-2 w-full text-left mb-2">Price: {{ nftFactory.displayPrice }} {{ nftFactory.nftState.listingCoin }}</div>
                  <div class="p-2 border-gray-950 border-2 w-full text-left mb-2">Royalty: {{ nftFactory.nftState.royalty * 100 }}% </div>
                  <div class="p-2 border-gray-950 border-2 w-full text-left ">Chain: {{ nftFactory.nftState.listingChain }}</div>
                  <amazing-button v-if="nftFactory.nftState.owner !== arweaveSigner.address" :non-btn="true" class="mt-2 w-full" @click="nftFactory.buy">Buy</amazing-button>
              </template>
        </div>

        <Comments :nft-id="nftFactory.nftId" />
    </div>
</template>
<script setup>
definePageMeta({
    layout: "without-auth",
});
const nftFactory = useNft()
const arweaveSigner = useArweaveSigner()

await nftFactory.setId(useRoute().params.id)

onMounted(nftFactory.keepUpdated)
onUnmounted(nftFactory.stopUpdates)
</script>
