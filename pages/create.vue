<template>
  <div class="relative flex flex-col justify-start items-center h-auto w-max mx-auto text-left">
  <form 
    v-if="!uploading" 
    class="h-full-navbared flex-1 flex flex-col items-start justify-center bg-[rgba(17,23,32,.2)] rounded-[2.5rem] overflow-hidden mt-8 mb-32 pb-24 "
    style="box-shadow: 0px 1px 2px rgba(0,0,0,.12), 1px 2px 4px rgba(0,0,0,.1), 2px 4px 8px rgba(0,0,0,.09), 3px 6px 12px rgba(0,0,0,.09), -1px -2px 8px rgba(0,0,0,.07);"
    @submit.prevent="mint"
  >
    <h1 class="text-3xl font-bold flex-1 mt-16 px-16">
      Create a new <span class="rareweave-font">RareWeave</span> NFT
    </h1>

    <div class="flex flex-col items-start justify-center mt-16 px-16">
      <label class="flex justify-start items-start">
        <span class="text-xl font-bold">
          Content:
        </span>
      </label>
      <p class="text-lg">
        Click to upload, or drag and drop your NFT content:
      </p>
      <label 
        for="dropzone-file"
        class="flex flex-col justify-center items-center w-[316px] aspect-[16/9] border-2 border-dashed rounded-lg cursor-pointer hover:bg-base-200 border-gray-700 hover:border-gray-500 bg-[rgba(3,5,9,0)] mt-2"
      >
        <div class="flex flex-col items-start justify-center pt-5 pb-6">
          
          <span
            v-if="!imageObjectUrl" 
          >
            <img src="upload.png" class="w-16 h-16" />
          </span>
          <template 
            v-else
          >
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
              <source 
                :src="imageObjectUrl" 
                :type="fileMeta.type"
              />
              Your browser does not support the video tag.
            </video>
          </template>
          
        </div>
        <input 
          id="dropzone-file" 
          type="file" 
          class="hidden" 
          required @change="uploadNftContent" 
        />
      </label>
      <p class="mt-1 text-md text-gray-500">
        <span>*</span>Currently supported file types: SVG, PNG, JPG, GIF, MP4, HTML
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
        required type="text" 
        maxlength="40" 
        class="mx-16 bg-[rgba(17,23,32,1)] text-white py-3 px-6 rounded-lg bg-[rgba(3,5,9,0)] outline-none focus:outline-none border-2 border-gray-700 focus:border-gray-500 transition-colors duration-200 flex-1" 
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
        class="mx-16 bg-[rgba(17,23,32,1)] text-white py-3 px-6 rounded-lg bg-[rgba(3,5,9,0)] outline-none focus:outline-none min-h-[128px] border-2 border-gray-700 focus:border-gray-500 transition-colors duration-200 flex-1"
      ></textarea>
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
              class="bg-[rgba(17,23,32,1)] text-white py-3 px-6 rounded-lg bg-[rgba(3,5,9,0)] outline-none focus:outline-none border-2 border-gray-700 focus:border-gray-500 transition-colors duration-200 flex-1 w-max"
            />
            <span class="w-12 text-center justify-center border border-[2px] border-l-0 border-gray-700 bg-gray-700">
              AR
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
              required placeholder="3" 
              step="0.1" 
              class="bg-[rgba(17,23,32,1)] text-white py-3 px-6 rounded-lg bg-[rgba(3,5,9,0)] outline-none focus:outline-none border-2 border-gray-700 focus:border-gray-500 transition-colors duration-200 flex-1"
            />
            <span class="w-12 text-center justify-center border border-[2px] border-l-0 border-gray-700 bg-gray-700">
              %
            </span>
          </label>
        </div>
      </div>
      <label class="label flex flex-col justify-start items-start mt-8 px-16">
        <span class="text-xl font-bold">
          Collection:
        </span>
        <span class="pt-2 text-gray-500">
          *On rareweave a collection is defined as a group of NFTs that you own rather than a group of NFTs that you create.
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
          class="bg-[rgba(17,23,32,1)] text-white py-3 px-6 rounded-lg bg-[rgba(3,5,9,0)] outline-none focus:outline-none border-2 border-gray-700 focus:border-gray-500 transition-colors duration-200 flex-1"
        />
        <span class="w-12 text-center justify-center border border-[2px] border-l-0 border-gray-700 bg-gray-700">
          ID
        </span>
      </label>
      <label class="cursor-pointer label my-2 mx-0 pr-0 mt-8 mx-16 flex-1">
        <span class="text-xl font-bold">
          For sale
        </span>
        <input 
          type="checkbox"
          class="toggle toggle-accent" 
          checked v-model="forSale" 
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
    <h1 class="text-2xl text-mono m-2">
        Uploading your NFT..
    </h1>
    <p class="text-sm text-center text-zinc-400">
      Wait few minutes for your NFT to be mined.
      You may take coffee, sit back and relax. It will take at least 1 Arweave block (~2 minutes).
    </p>
  </div>
  </div>
</template>
<script setup>
import { DeployPlugin } from "warp-contracts-plugin-deploy";
import { Buffer } from "buffer";
const { WarpFactory } = await import("warp-contracts");
import { useWallet, useAccount, useArweave } from "../composables/useState";
import setArweave from "../plugins/arweave";

const arweave = useArweave().value;
if (!arweave)
    setArweave();

const account = useAccount();
const wallet = useWallet();

const title = ref("");
const uploading = ref(false);
const description = ref("");
const price = ref(0.5);
const royalty = ref(3);
const forSale = ref(true);
const collectionId = ref("");

const warp = WarpFactory.forMainnet(
  {
    inMemory: true,
    remoteStateSyncSource: "https://prophet.rareweave.store/contract",
    remoteStateSyncEnabled: true,
  },
  false,
  arweave
).use(new DeployPlugin());

warp.definitionLoader.baseUrl = `https://prophet.rareweave.store`;
warp.interactionsLoader.delegate.baseUrl = `https://prophet.rareweave.store`;
// console.log(warp.deploy())

const imageObjectUrl = ref(null);
const fileMeta = ref({});

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
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result);
    }, false);
    reader.readAsArrayBuffer(file);
  });
};

async function mint() {
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
    price: parseInt(arweave.ar.arToWinston(price.value)),
    reservationBlockHeight: 0,
    royalty: royalty.value / 100,
  };
  
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
        value: "hcszckSXA5GTg6zg65nk6RQtT4aRHDzyxOOoD6DEGxg",
      },
      {
        name: "SDK",
        value: "Warp",
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
    tx = await wallet.dispatch(tx);
  }
  await warp.register(tx.id, "node1").catch((e) => null);
  await warp.register(tx.id, "node2").catch((e) => null);
  let contractInstance = warp.contract(tx.id).setEvaluationOptions({
    unsafeClient: "allow",
    waitForConfirmation: false, //we are using anchoring
    remoteStateSyncEnabled: false,
  });
  async function checkNFT(nftId, tries = 0) {
    if (tries >= 100) {
      return "error";
    }
    try {
      let res = await contractInstance.readState();
      return "ok";
    } catch (e) {
      console.log(e, contractInstance);
      await wait(10000);
      await warp.register(tx.id, "node1").catch((e) => null);
      await warp.register(tx.id, "node2").catch((e) => null);
      return await checkNFT(nftId, ++tries);
    }
  }

  function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  if (collectionId.value && collectionId.value != "") {
    let collectionContract = warp
      .contract(collectionId.value)
      .setEvaluationOptions({
        remoteStateSyncSource: "https://prophet.rareweave.store/contract",
        remoteStateSyncEnabled: true,
        unsafeClient: "allow",
        allowBigInt: true,
        waitForConfirmation: false,
      })
      .connect("use_wallet");

    await collectionContract.writeInteraction({
      function: "bulk",
      inputs: [
        {
          function: "add-item",
          item: tx.id,
        },
      ],
    });
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
<style scoped>
</style>
