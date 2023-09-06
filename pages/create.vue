<template>
  <div
    class="relative flex flex-col justify-start items-center h-auto w-max mx-auto text-left"
  >
    <form
      v-if="!uploading"
      class="h-full-navbared flex-1 flex flex-col items-start justify-center bg-[rgba(17,23,32,.2)] rounded-[2.5rem] overflow-hidden mt-8 mb-32 pb-24"
      style="
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12),
          1px 2px 4px rgba(0, 0, 0, 0.1), 2px 4px 8px rgba(0, 0, 0, 0.09),
          3px 6px 12px rgba(0, 0, 0, 0.09), -1px -2px 8px rgba(0, 0, 0, 0.07);
      "
      @submit.prevent="mint"
    >
      <div
        class="w-full flex flex-fow flex-nowrap justify-between items-center mt-16 px-16"
      >
        <h1 class="text-3xl font-bold flex-1">
          Create a new <span class="rareweave-font">RareWeave</span> NFT
        </h1>
      </div>

      <div class="flex flex-col items-start justify-center w-full mt-16 px-16">
        <label class="flex justify-start items-start">
          <span class="text-xl font-bold"> Content: </span>
        </label>
        <p class="text-lg">
          Click to upload, or drag and drop your NFT content:
        </p>
        <label
          for="dropzone-file"
          class="drzone flex flex-col justify-center items-center min-w-[316px] w-[432px] max-w-[85vw] aspect-[16/9] border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 border-gray-700 hover:border-[rgba(107,114,124,1)] bg-[rgba(11,17,23,1)] mt-2"
        >
          <div class="flex flex-col items-start justify-center pt-5 pb-6">
            <span v-if="!imageObjectUrl">
              <img src="/upload_nft.png" class="Fileicon w-16 h-16" />
            </span>
            <template v-else>
              <img
                v-if="fileMeta?.type?.startsWith('image')"
                :src="imageObjectUrl"
                class="inline-flex"
              />
              <video
                v-else-if="fileMeta?.type?.startsWith('video')"
                autoplay
                muted
                controls
              >
                <source :src="imageObjectUrl" :type="fileMeta.type" />
                Your browser does not support the video tag.
              </video>
              <audio
                v-else-if="fileMeta?.type?.startsWith('audio')"
                autoplay
                muted
                controls
              >
                <source :src="imageObjectUrl" :type="fileMeta.type" />
                Your browser does not support the audio tag.
              </audio>
            </template>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            required
            @change="uploadNftContent"
          />
        </label>
        <p class="mt-1 text-md text-gray-500">
          <span>*</span>Currently supported file types: SVG, PNG, JPG, GIF, MP4,
          HTML
        </p>
      </div>
      <div class="form-control flex flex-col items-stretch">
        <label class="label flex flex-col justify-start items-start mt-8 mx-16">
          <span class="text-xl font-bold"> 
            Name: 
          </span>
        </label>
        <input
          v-model="title"
          required
          type="text"
          maxlength="40"
          class="mx-16 bg-[rgba(11,17,23,1)] text-white py-3 px-6 rounded-lg outline-none focus:outline-none border-2 border-gray-700 focus:border-gray-500 transition-colors duration-200 flex-1"
          placeholder="Enter the name of your NFT"
        />
        <label class="label flex flex-col justify-start items-start mt-8 mx-16">
          <span class="text-xl font-bold"> 
            Description: 
          </span>
        </label>
        <textarea
          placeholder="Enter a detailed description of your NFT. (max 500 characters)"
          v-model="description"
          class="mx-16 bg-[rgba(11,17,23,1)] text-white py-3 px-6 rounded-lg outline-none focus:outline-none min-h-[128px] border-2 border-gray-700 focus:border-gray-500 transition-colors duration-200 flex-1"
        ></textarea>

        <!-- Price Drop downs -->
        <div class="flex flex-wrap mt-8 mx-16">
          <div class="flex flex-col justify-start items-start mr-16">
            <label class="label flex flex-col justify-start items-start">
              <span class="text-xl font-bold"> 
                Price: 
              </span>
            </label>
            <label class="flex input-group flex-1 w-max">
              <input
                v-model="price"
                type="number"
                placeholder="0,5"
                step="0.01"
                class="bg-[rgba(11,17,23,1)] text-white py-3 px-6 rounded-lg outline-none focus:outline-none border-2 border-gray-700 focus:border-gray-500 transition-colors duration-200 flex-1 w-max"
              />
              <span
                class="w-12 text-center justify-center border border-l-0 border-gray-700 bg-gray-700"
              >
                {{ coin }}
              </span>
            </label>
          </div>
          <div class="flex flex-col justify-start items-start">
            <label class="label flex flex-col justify-start items-start">
              <span class="text-xl font-bold"> 
                Royalty: 
              </span>
            </label>
            <label class="flex input-group flex-1 w-max">
              <input
                v-model="royalty"
                type="number"
                required
                placeholder="3"
                step="0.1"
                class="bg-[rgba(11,17,23,1)] text-white py-3 px-6 rounded-lg outline-none focus:outline-none border-2 border-gray-700 focus:border-gray-500 transition-colors duration-200 flex-1"
              />
              <span
                class="w-12 text-center justify-center border border-l-0 border-gray-700 bg-gray-700"
              >
                %
              </span>
            </label>
          </div>
        </div>

        <!-- Listing Coin/Chain -->
        <div class="flex flex-wrap mt-8 mx-16">
          <div class="flex flex-col justify-start items-start mr-16">
            <label class="label flex flex-col justify-start items-start">
              <span class="text-xl font-bold">
                Chain:
              </span>
            </label>
            <div class="dropdown inline-block relative">
              <select
                v-model="chain"
                class="dropdown-select bg-[rgba(11,17,23,1)] text-white py-3 px-6 rounded-lg outline-none focus:outline-none border-2 border-gray-700 focus:border-gray-500 transition-colors duration-200"
              >
                <option selected>
                  Select a Chain
                </option>
                <option v-for="chain in Coins.Chains" :value="chain">
                  {{ chain }}
                </option>
              </select>
            </div>
          </div>

          <div
            class="flex flex-col justify-start items-start mr-16"
            v-if="chain && Coins[chain]?.length > 1"
          >
            <label class="label flex flex-col justify-start items-start">
              <span class="text-xl font-bold">
                Coin:
              </span>
            </label>
            <div class="dropdown inline-block relative">
              <select
                v-model="coin"
                class="dropdown-select bg-[rgba(11,17,23,1)] text-white py-3 px-6 rounded-lg outline-none focus:outline-none border-2 border-gray-700 focus:border-gray-500 transition-colors duration-200"
              >
                <option v-for="coin in Coins[chain]" :value="coin">
                  {{ coin }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex flex-col justify-start items-stretch flex-1">
            <label class="label flex flex-col justify-start items-start">
              <span class="text-xl font-bold">
                Address:
              </span>
            </label>
            <div class="flex-1 dropdown inline-flex relative">
              <input
                v-model="address"
                required
                type="text"
                class="bg-[rgba(11,17,23,1)] text-white py-3 px-6 rounded-lg outline-none focus:outline-none border-2 border-gray-700 focus:border-gray-500 transition-colors duration-200 flex-1"
                placeholder="Address"
              />
            </div>
            <span class="pt-2 text-gray-500">
              *This will be the address that recieves payments/Royalties
            </span>
          </div>
        </div>

        <div class="flex flex-col mt-8 mx-16">
          <label class="label flex flex-col justify-start items-start">
            <span class="text-xl font-bold">Royalties and supported chains:</span>
            <span class="pt-2 text-gray-500 max-w-[960px]">
              As RareWeave supports multiple chains and coins, you can set a royalty addresses for each chain.
              Royalties are paid on the same chain as the payment.
              When a buyer selects his chain, the royalty will be sent to the respective address.
              <!-- *When someone buys your NFT, They can change the payment method to
              one of these,
              <br />
              and youll recieve the royalties in that respective chain -->
            </span>
          </label>

          <table class="table-auto w-full">
            <thead>
              <tr>
                <th class="py-2">
                  Chain
                </th>
                <th class="py-2">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(chain, index) in Coins.royaltyList" :key="index">
                <td class="border border-2 border-gray-700 bg-[rgba(11,17,23,1)] px-4 py-2">
                  {{ chain }}
                </td>
                <td class="border border-2 border-gray-700">
                  <input v-model="addressList[index]" 
                    class="bg-[rgba(11,17,23,1)] text-white py-1 px-6 outline-none focus:outline-none transition-colors duration-200 w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <label class="label flex flex-col justify-start items-start mt-8 px-16">
          <span class="text-xl font-bold"> Collection: </span>
          <span class="pt-2 text-gray-500">
            *On rareweave a collection is defined as a group of NFTs that you
            own rather than a group of NFTs that you create.
          </span>
          <NuxtLink
            to="/collection/create"
            class="text-[#fc466b] hover:underline transition-colors duration-200 ease-in-out py-2"
          >
            Click here to create a new collection.
          </NuxtLink>
        </label>
        <label class="input-group flex w-[50%] mx-16">
          <input
            v-model="collectionId"
            type="text"
            placeholder="Collection"
            class="bg-[rgba(11,17,23,1)] text-white py-3 px-6 rounded-lg outline-none focus:outline-none border-2 border-gray-700 focus:border-gray-500 transition-colors duration-200 flex-1"
          />
          <span
            class="w-12 text-center justify-center border border-l-0 border-gray-700 bg-gray-700"
          >
            ID
          </span>
        </label>
        <label class="cursor-pointer label my-2 pr-0 mt-8 mx-16 flex-1">
          <span class="text-xl font-bold"> For sale </span>
          <input
            type="checkbox"
            class="toggle toggle-accent"
            checked
            v-model="forSale"
          />
        </label>
        <button
          type="submit"
          class="Button Amazing--button mt-8 mx-16 w-min px-8 py-2 text-2xl font-bold"
        >
          Mint
        </button>
      </div>
    </form>
    <div
      v-else
      class="h-full-navbared flex-1 flex flex-col items-center justify-center font-mono"
    >
      <div class="loading-wrapper h-20 m-2 flex items-center justify-center">
        <div class="loading"></div>
      </div>
      <h1 class="text-2xl text-mono m-2">Uploading your NFT..</h1>
      <p class="text-sm text-center text-zinc-400">
        Wait few minutes for your NFT to be mined. You may take coffee, sit back
        and relax. It will take at least 1 Arweave block (~2 minutes).
      </p>
    </div>
  </div>
</template>
<script setup>
import { Buffer } from "buffer";
import Big from "big.js";
import { useArWallet, useAccount, useArweave } from "../composables/useState";
import setArweave from "../plugins/arweave";
import { nftContractId } from "../config/contracts.json";
import { GlomeNode } from "../config/config.json";
import Coins from "../config/coins";

const arweave = useArweave().value;
if (!arweave) setArweave();

const account = useAccount();
const wallet = useArWallet();

// NFT Data
const title = ref("");
const uploading = ref(false);
const description = ref("");
const price = ref(0.5);

const chain = ref("arweave");
const coin = ref("AR");
const address = ref(account.value.addr);

const royalty = ref(3);
const forSale = ref(true);
const collectionId = ref("");

const imageObjectUrl = ref(null);
const fileMeta = ref({});

const arweaveIndex = Coins.royaltyList.indexOf("arweave");
const addressList = ref(new Array(Coins.royaltyList.length).fill(""));
addressList.value[arweaveIndex] = account.value.addr;

let nftContent = new ArrayBuffer(0);

async function uploadNftContent(e) {
  if (e.target.files && e.target.files[0]) {
    if (imageObjectUrl.value) {
      URL.revokeObjectURL(imageObjectUrl.value);
    }
    imageObjectUrl.value = URL.createObjectURL(e.target.files[0]);
    fileMeta.value = e.target.files[0];
    nftContent = await readAsArrayBuffer(e.target.files[0]);
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
  coin.value = Coins[chain.value][0];

  if (chain.value == "arweave" || chain.value == "everpay") {
    address.value = account.value.addr;
  } else {
    address.value = "";
  }
});

async function mint() {
  console.log(addressList.value);
  let initState = {
    owner: account.value.addr,
    minter: account.value.addr,
    name: title.value,
    description: description.value,
    ticker: "RWNFT",
    balances: {
      [account.value.addr]: 1,
    },
    contentType: fileMeta.value.type,
    createdAt: Date.now(),
    evolve: null,
    forSale: forSale.value,
    price: new Big(price.value) * new Big(Coins.Exponents[coin.value]),
    reservationBlockHeight: 0,
    royalty: royalty.value / 100,
    royaltyAddresses: {
      arweave: account.value.addr,
      everpay: account.value.addr,
    },
    listingAddress: address.value,
    listingChain: chain.value,
    listingCoin: coin.value,
  };

  Coins.royaltyList.forEach((chain, index) => {
    const address = addressList.value[index];
    if (address) {
      initState.royaltyAddresses[chain] = address;
    }
  });

  uploading.value = true;
  let tx = await arweave.createTransaction({
    data: Buffer.from(new Uint8Array(nftContent)),
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

  if (nftContent.byteLength > 100000) {
    await arweave.transactions.sign(tx);
    let uploader = await arweave.transactions.getUploader(tx);
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(
        `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
      );
    }
  } else {
    tx = await wallet.value.dispatch(tx);
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

function encodeTags(tags) {
  return tags.map((tag) => ({
    name: btoa(tag.name),
    value: btoa(tag.value),
  }));
}
</script>
<style scoped></style>
