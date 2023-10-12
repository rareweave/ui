<template>
    <div class="h-full-navbared w-full flex flex-col items-center justify-center">
        <NftView :nftState="nftFactory.nftState" :nftId="nftFactory.nftId" />
        <template v-if="isOwner">
          <input class="p-1 placeholder-gray-600" placeholder="Description" type="text" v-model="nftFactory.nftState.description">
        </template>
        <template v-else>
          <p class="text-md text-center font-sans p-2 max-w-[32rem]">
            {{ nftFactory.nftState.description || "[This NFT has no description]" }}
          </p>
        </template>
        <div class="flex flex-col items-center bg-zinc-900 p-2 border border-gray-800 mt-4 min-w-[16rem]" >
          <div class="p-2 border-gray-950 border-2 w-full text-left mb-2 inline-flex flex-col items-center">Owner: <AddressBadge class="mt-1" :address="nftFactory.nftState.owner"/></div>
              <div class="p-2 border-gray-950 border-2 w-full text-left mb-2 inline-flex flex-col items-center">Minter: <AddressBadge class="mt-1" :address="nftFactory.nftState.minter"/></div>
              <template v-if="nftFactory.nftState.forSale">
                  <div class="flex items-center p-2 border-gray-950 border-2 w-full text-left mb-2">
                      <template v-if="isOwner">
                        <span class="pr-2">For sale:</span>
                        <input type="checkbox" v-model="nftFactory.nftState.forSale" class="w-4 h-4">
                      </template>
                      <span v-if="!isOwner">{{ nftFactory.nftState.forSale ? "For sale" : "Not for sale" }}</span>
                  </div>

                  <div class="p-2 border-gray-950 border-2 w-full text-left mb-2">
                    <template v-if="isOwner">
                      <label for="price">Price: </label>
                      <input id="price" class="p-1" type="number" placeholder="Price" :value="nftFactory.displayPrice" @input="(event) => nftFactory.nftState.price = parseInt(event.srcElement.value) * Coins.Exponents[nftFactory.nftState.listingCoin]">
                      <span class="-ml-6 font-bold">{{ nftFactory.nftState.listingCoin }}</span>
                    </template>
                    <span v-else> Price: {{ nftFactory.displayPrice }} {{ nftFactory.nftState.listingCoin }} </span>
                  </div>
                  <div class="p-2 border-gray-950 border-2 w-full text-left mb-2">Royalty: {{ nftFactory.nftState.royalty * 100 }}% </div>
                  <div class="p-2 border-gray-950 border-2 w-full text-left ">Chain: {{ nftFactory.nftState.listingChain }}</div>
                  <amazing-button v-if="!isOwner" :non-btn="true" class="mt-2 w-full" @click="nftFactory.buy">Buy</amazing-button>
                  <amazing-button v-if="isOwner" class="mt-2" @click="submitChanges">Submit changes</amazing-button>
              </template>
        </div>

        <Comments :nft-id="nftFactory.nftId" />
    </div>
</template>
<script setup>
import Coins from "../../config/coins";

definePageMeta({
    layout: "without-auth",
});
const nftFactory = useNft()
const arweaveSigner = useArweaveSigner()
const id = useRoute().params.id
const utils = useUtils()

await nftFactory.setId(id)

const isOwner = nftFactory.nftState.owner === arweaveSigner.address;

async function submitChanges() {
  const tags = [
    { name: "Contract", value: id },
    { name: "Input", value: JSON.stringify({
      function: "edit-nft",
      description: nftFactory.nftState.description,
      forSale: nftFactory.nftState.forSale,
      price: nftFactory.nftState.price
    })},
    { name: "App-Name", value: "SmartWeaveAction", },
    { name: "App-Version", value: "0.3.0", },
    { name: "Nonce", value: Date.now().toString(), },
    { name: "SDK", value: "0.3.0", },
  ];

  const transaction = await utils.arweave.createTransaction({
    data: "Glome Contract Call",
    tags: encodeTags(tags)
  });

  await arweaveSigner.dispatch(transaction)
}

function encodeTags(tags) {
  return tags.map((tag) => ({
    name: btoa(tag.name),
    value: btoa(tag.value),
  }));
}

onMounted(nftFactory.keepUpdated)
onUnmounted(nftFactory.stopUpdates)
</script>
