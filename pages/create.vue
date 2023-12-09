<template>
  <div class="h-full-navbared w-full flex flex-col items-center justify-center max-w-full">
    <form v-if="!uploading"
      class="h-full-navbared  flex flex-col items-start justify-center bg-[rgba(17,23,32,.2)] rounded-[2.5rem] overflow-hidden mt-8 mb-32 pb-24 mx-0 md:mx-8 max-w-full"
      style="
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12),
          1px 2px 4px rgba(0, 0, 0, 0.1), 2px 4px 8px rgba(0, 0, 0, 0.09),
          3px 6px 12px rgba(0, 0, 0, 0.09), -1px -2px 8px rgba(0, 0, 0, 0.07);
      " @submit.prevent="mint">
      <div class="w-full flex flex-fow flex-nowrap justify-center items-center mt-16 px-1 md:px-16">
        <h1 class="text-3xl font-bold text-center ">
          Create a new <span class="rareweave-font">RareWeave</span> NFT
        </h1>
      </div>

      <div class="flex flex-col items-start justify-center w-full mt-16 px-1 md:px-16 mx-0 md:mx-4">
        <label class="flex justify-start items-start">
          <span class="text-xl font-bold"> Content: </span>
        </label>
        <p class="text-lg">
          Click to upload, or drag and drop your NFT content:
        </p>
        <label for="dropzone-file"
          class="drzone flex flex-col justify-center items-center min-w-[316px] w-[432px] max-w-[85vw] aspect-[16/9] border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 border-gray-700 hover:border-[rgba(107,114,124,1)] bg-[rgba(11,17,23,1)] mt-2">
          <div class="flex flex-col items-start justify-center pt-5 pb-6">
            <span v-if="!imageObjectUrl">
              <img src="/upload_nft.png" class="Fileicon w-16 h-16" />
            </span>
            <template v-else>
              <img v-if="fileMeta?.type?.startsWith('image')" :src="imageObjectUrl" class="inline-flex" />
              <video v-else-if="fileMeta?.type?.startsWith('video')" autoplay muted controls>
                <source :src="imageObjectUrl" :type="fileMeta.type" />
                Your browser does not support the video tag.
              </video>
              <audio v-else-if="fileMeta?.type?.startsWith('audio')" autoplay muted controls>
                <source :src="imageObjectUrl" :type="fileMeta.type" />
                Your browser does not support the audio tag.
              </audio>
            </template>
          </div>
          <input id="dropzone-file" type="file" class="hidden" required @change="uploadNftContent" />
        </label>
        <p class="mt-1 text-md text-gray-500">
          <span>*</span>Currently supported file types: SVG, PNG, JPG, GIF, MP4,
          HTML
        </p>
      </div>
      <div class="form-control flex flex-col items-start max-w-full p-4 mx-0 md:mx-16">
        <label class="label flex flex-col justify-start items-start mt-8">
          <span class="text-xl font-bold"> Name: </span>
        </label>
        <input v-model="title" required type="text" maxlength="40"
          class="bg-zinc-800 w-full max-w-lg bg-[rgba(11,17,23,1)] border text-white py-2 px-6 rounded-lg outline-none focus:outline-none border-gray-700 focus:border-gray-500 transition-colors duration-200 "
          placeholder="Enter the name of your NFT" />
        <label class="label flex flex-col justify-start items-start mt-8 ">
          <span class="text-xl font-bold"> Description: </span>
        </label>
        <textarea placeholder="Enter a detailed description of your NFT. (max 500 characters)" v-model="description"
          class=" bg-zinc-800 w-full max-w-lg bg-[rgba(11,17,23,1)] border text-white p-3 rounded-lg outline-none focus:outline-none border-gray-700 focus:border-gray-500 transition-colors duration-200 min-h-[120px] "></textarea>

        <!-- Price Drop downs -->
        <div class="flex flex-row items-center justify-center  mt-4 gap-3">
          <label for="forSale"> For Sale: </label> <label for="forSale" class="relative h-8 w-14 cursor-pointer ">

            <input type="checkbox" id="forSale" v-model="forSale"
              class="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden" />

            <span
              class="absolute inset-y-0 start-0 z-10 m-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600">
              <svg data-unchecked-icon xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>

              <svg data-checked-icon xmlns="http://www.w3.org/2000/svg" class="hidden h-4 w-4" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
              </svg>
            </span>

            <span class="absolute inset-0 rounded-full bg-gray-800 transition peer-checked:bg-green-500"></span>
          </label>
        </div>
        <div class="flex flex-wrap mt-8 ">
          <div class="flex flex-col justify-start items-start mr-16">
            <label class="label flex flex-col justify-start items-start">
              <span class="text-xl font-bold"> Price: </span>
            </label>
            <label class="flex input-group  w-max">
              <input v-model="price" type="number" placeholder="0,5" step="0.01"
                class="bg-zinc-800 text-white p-3 border-r-0 rounded-lg outline-none focus:outline-none border-2 border-zinc-700 focus:border-gray-500 transition-colors duration-200 w-32" />
              <span class="w-12 text-center justify-center border-none border-zinc-700 border-l-0 bg-zinc-900">
                {{ coin }}
              </span>
            </label>
          </div>
          <div class="flex flex-col justify-start items-start">
            <label class="label flex flex-col justify-start items-start">
              <span class="text-xl font-bold"> Royalty: </span>
            </label>
            <label class="flex input-group w-max">
              <input v-model="royalty" type="number" required placeholder="3" step="0.1"
                class="bg-zinc-800 text-white p-3 border-r-0 rounded-lg outline-none focus:outline-none border-2 border-zinc-700 focus:border-gray-500 transition-colors duration-200 w-24" />
              <span class="w-12 text-center justify-center border-none border-zinc-700 border-l-0 bg-zinc-900">
                %
              </span>
            </label>
          </div>
        </div>

        <!-- Listing Coin/Chain -->
        <div class="flex flex-wrap flex-col mt-8  w-full">
          <div class="flex flex-col md:flex-row w-full mb-2">
            <div class="flex flex-col justify-start items-start mr-16">
              <label class="label flex flex-col justify-start items-start">
                <span class="text-xl font-bold">Chain:</span>
              </label>
              <SelectItem :options="Coins.Chains.map(c => ({ label: c, value: c }))" v-model="chain" />
            </div>

            <div class="flex flex-col justify-start items-start mr-16" v-if="chain">
              <label class="label flex flex-col justify-start items-start">
                <span class="text-xl font-bold">Coin:</span>
              </label>
              <SelectItem :options="Coins[chain].map(c => ({ label: c, value: c }))" v-model="coin" />

            </div>
          </div>


          <div class="dropdown flex flex-row relative items-center mt-3 w-full  max-w-[90%]">
            <label for="listingAddress"
              class="font-bold p-2 min-w-max h-full rounded-l-lg bg-zinc-800 border border-zinc-700 border-r-0">Listing
              address</label>
            <input v-model="listingAddress" required type="text" id="listingAddress"
              class="bg-zinc-700 w-full max-w-lg bg-[rgba(11,17,23,1)] border text-white py-2 px-6 rounded-l-none rounded-r-lg outline-none focus:outline-none border-l-0 border-gray-700 focus:border-gray-500 transition-colors duration-200 "
              placeholder="Address" />
          </div>
          <span class="pt-2 text-gray-500">
            This will be the address that recieves payments/Royalties
          </span>
        </div>


        <div class="flex flex-wrap mt-8 ">
          <label class="label flex flex-col justify-start items-start">
            <span class="text-xl font-bold">Supported Royalties:</span>
            <span class="pt-2 text-gray-500">
              When someone sells your NFT, they can change the payment method to
              one of these (if you set address),
              <br />
              and you'll recieve the royalties in the respective chain
            </span>
          </label>



          <div class="relative overflow-x-auto rounded-xl w-full max-w-2xl">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Chain
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(chain, index) in Coins.royaltyList" :key="index"
                  :class="[index != Coins.royaltyList.length - 1 ? 'border-b' : '', 'bg-zinc-900', 'border-gray-700']">
                  <th scope="row" class="px-6 py-4 font-medium text-base capitalize whitespace-nowrap text-white ">
                    {{ chain }}
                  </th>
                  <td class="px-6 py-4">
                    <input v-model="addressList[index]"
                      class="w-full border outline-none focus:border-zinc-600 transition-colors border-zinc-700 text-base p-2" />
                  </td>
                </tr>

              </tbody>
            </table>
          </div>


        </div>

        <label class="label flex flex-col justify-start items-start mt-8 ">
          <span class="text-xl font-bold"> Collection: </span>
          <span class="pt-2 text-gray-500">
            *On rareweave a collection is defined as a group of NFTs that you
            own rather than a group of NFTs that you create.
          </span>
          <NuxtLink to="/collection/create"
            class="text-[#fc466b] hover:underline transition-colors duration-200 ease-in-out py-2">
            Click here to create a new collection.
          </NuxtLink>
        </label>
        <label class="input-group flex w-96 max-w-full">
          <input v-model="collectionId" type="text" placeholder="Collection"
            class="bg-zinc-900 w-full text-white py-3 px-6 rounded-lg outline-none focus:outline-none border-2 border-zinc-700 focus:border-zinc-500 transition-colors duration-200 " />
          <span class="w-12 text-center justify-center border border-l-0 border-zinc-600 bg-zinc-700">
            ID
          </span>
        </label>

        <amazing-button type="submit" class="w-56 max-w-full mx-auto text-2xl font-bold mt-4">
          Mint
        </amazing-button>
      </div>
    </form>
    <div v-else class="h-full flex flex-col items-center justify-center font-mono">


      <div
        class="relative mx-auto w-24 h-24 animate-spin rounded-full bg-gradient-to-r  from-purple-400 via-blue-500 to-red-400 mt-2"
        v-if="loadingType == 'spinner'">
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-zinc-900 rounded-full  animate-pulse">
        </div>
      </div>
      <h1 class="text-2xl text-mono m-2">Uploading your NFT..</h1>
      <p class="text-sm text-center text-zinc-400">
        Wait few minutes for your NFT to be mined. You may take coffee, sit back
        and relax. It will take at least 1 Arweave block (~2 minutes).
      </p>
       <div class="w-full h-4 mb-4 rounded-full bg-gray-700 mt-6" v-if="loadingType == 'loadbar'">
          <div ref="loadbar" class="h-4 bg-blue-600 rounded-full dark:bg-blue-500 " :style="loadbarStyles"></div>
        </div>
    </div>
  </div>
</template>
<script setup>
import { Buffer } from "buffer";
import Big from "big.js";

import setArweave from "../plugins/arweave";
import { nftContractId } from "../config/contracts.json";
import { GlomeNode } from "../config/config.json";
import Coins from "../config/coins";

const utils = useUtils()
const arweaveSigner = useArweaveSigner()

const arweave = useArweave().value;
if (!arweave) setArweave();


const wallet = useArWallet();

// NFT Data
const title = ref("");
const uploading = ref(false);
const description = ref("");
const price = ref(0.5);

const chain = ref("arweave");
const coin = ref("AR");

const royalty = ref(3);
const forSale = ref(true);
const collectionId = ref("");
const loadingType = ref('spinner')
const loadingPercentage = ref(0)
const loadbarStyles=computed(()=>({'width':loadingPercentage.value+'%'}))
const imageObjectUrl = ref(null);
const fileMeta = ref({});

const arweaveIndex = Coins.royaltyList.indexOf("arweave");
const addressList = ref(new Array(Coins.royaltyList.length).fill(""));
const listingAddress = ref(arweaveSigner.address)
addressList.value[arweaveIndex] = arweaveSigner.address;
watch(() => arweaveSigner.address, () => addressList.value[arweaveIndex] = arweaveSigner.address)

let nftContent = new ArrayBuffer(0);

async function uploadNftContent(e) {
  if (e.target.files && e.target.files[0]) {
    if (imageObjectUrl.value) {
      URL.revokeObjectURL(imageObjectUrl.value);
    }
    imageObjectUrl.value = URL.createObjectURL(e.target.files[0]);
    fileMeta.value = e.target.files[0];
    nftContent = await readAsArrayBuffer(e.target.files[0]);
    console.log(nftContent.byteLength)
  }
}

function readAsArrayBuffer(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        resolve(reader.result);
      },
      false
    );
    reader.readAsArrayBuffer(file);
  });
}

// Null the coin value, incase they set a denom, then change the chain value
watch(chain, () => {
  console.log(Coins[chain.value][0])
  coin.value = Coins[chain.value][0];

  if (chain.value == "arweave" || chain.value == "everpay") {
    listingAddress.value = arweaveSigner.address;
  } else {
    listingAddress.value = "";
  }
});

async function mint() {
  let initState = {
    version: 2,
    owner: arweaveSigner.address,
    minter: arweaveSigner.address,
    name: title.value,
    description: description.value,
    ticker: "RWNFT",
    balances: {
      [arweaveSigner.address]: 1,
    },
    contentType: fileMeta.value.type,
    createdAt: Date.now(),
    evolve: null,
    forSale: forSale.value,
    price: new Big(price.value) * new Big(Coins.Exponents[coin.value]),
    reservationBlockHeight: 0,
    royalty: royalty.value / 100,
    royaltyAddresses: {
      arweave: arweaveSigner.address,
      everpay: arweaveSigner.address,
    },
    reservationTimestamp: 0,
    listingAddress: listingAddress.value,
    listingChain: chain.value,
    listingCoin: coin.value,
  };

  Coins.royaltyList.forEach((chain, index) => {
    const address = addressList.value[index];
    if (address) {
      initState.royaltyAddresses[chain] = address;
    }
  });


  let tx = await utils.arweave.createTransaction({
    data: new Uint8Array(nftContent),
    tags: encodeTags([
      {
        name: "App-Name",
        value: "SmartWeaveContract",
      },
      {
        name: "App-Version",
        value: "0.3.0",
      },
      {
        name: "Contract-Src",
        value: nftContractId,
      },
      {
        name: "Nonce",
        value: Date.now().toString(),
      },
      {
        name: "Content-Type",
        value: fileMeta.value.type,
      },
      {
        name: "Init-State",
        value: JSON.stringify(initState),
      },
      {
        name: "Title",
        value: title.value,
      },
      {
        name: "Type",
        value: "Tradable-SW-NFT",
      },
      {
        name: "Topics",
        value: "NFTs, Atomic Assets",
      },
      {
        name: "Description",
        value: description.value || "RareWeave NFT",
      },
    ]),
  });
console.log(nftContent.byteLength)
  if (nftContent.byteLength > 100000) {
    if (!arweaveSigner.isSignerSet) {
      return arweaveSigner.callOverlay(false)
    } else {
      loadingType.value = 'loadbar'
      loadingPercentage.value=0
      uploading.value = true;
    }
    let signedPart = await arweaveSigner.signer.sign(tx)//we can't just use this as tx body since arconnect doesn't give us normal tx
    tx.signature = signedPart.signature
    tx.tags = signedPart.tags
    tx.owner = signedPart.owner
    tx.id = signedPart.id

    let uploader = await utils.arweave.transactions.getUploader(tx);
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      loadingPercentage.value= uploader.pctComplete
      console.log(
        `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
      );
    }
  } else {

    tx = await arweaveSigner.dispatch(tx);
    if (tx != null) {
      loadingType.value = 'spinner'
      uploading.value = true;
    } else {
      return
    }
  }

  async function checkNFT(nftId, tries = 0) {
    if (tries >= 100) {
      return "error";
    }
    try {
      let res = await $fetch(`${GlomeNode}/state/` + nftId);
      return "ok";
    } catch (e) {
      console.log(e);
      await wait(10000);
      return await checkNFT(nftId, ++tries);
    }
  }

  function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  if (collectionId.value && collectionId.value != "") {
    // let collectionContract = warp
    //   .contract(collectionId.value)
    //   .setEvaluationOptions({
    //     remoteStateSyncSource: "https://prophet.rareweave.store/contract",
    //     remoteStateSyncEnabled: true,
    //     unsafeClient: "allow",
    //     allowBigInt: true,
    //     waitForConfirmation: false,
    //   })
    //   .connect("use_wallet");
    // await collectionContract.writeInteraction({
    //   function: "bulk",
    //   inputs: [
    //     {
    //       function: "add-item",
    //       item: tx.id,
    //     },
    //   ],
    // });
  }

  await checkNFT(tx.id);
  await navigateTo("/nft/" + tx.id);
}

definePageMeta({
  layout: "without-auth",
});
</script>

