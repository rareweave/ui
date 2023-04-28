<template>
  <form 
    v-if="!uploading" 
    class=""
    @submit.prevent="mint">
    <h1 class="">
      Upload
      <span class="rareweave-font">
        RareWeave
      </span>
      NFT
    </h1>
    <div class="">
      <label 
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full min-h-64 border-2 border-dashed rounded-lg cursor-pointer bg-base-300 hover:bg-base-200 border-zinc-800"
      >
        <div class="">
          <svg 
            v-if="!imageObjectUrl" 
            aria-hidden="true" 
            class="" 
            fill="none"
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg">
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
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
              <source 
                :src="imageObjectUrl"
                :type="fileMeta.type"
              />
              Your browser does not support the video tag.
            </video>
          </template>
          <p class="mb-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG, GIF, MP4, HTML
          </p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" required @change="uploadNftContent" />
      </label>
    </div>
    <div class="form-control mb-2 pb-2 px-2">
      <label class="label">
        <span class="label-text">Enter NFT title</span>
      </label>
      <input v-model="title" required type="text" maxlength="40" placeholder="Name for your NFT"
        class="input input-bordered" />
      <label class="label">
        <span class="label-text">Describe your NFT</span>
      </label>
      <textarea placeholder="NFT description" v-model="description"
        class="textarea textarea-bordered textarea-xs w-full max-w-xs"></textarea>
      <label class="label">
        <span class="label-text">Enter NFT price</span>
      </label>
      <label class="input-group">
        <input v-model="price" type="number" placeholder="0,5" step="0.01" class="input input-bordered" />
        <span class="w-12 text-center justify-center">AR</span>
      </label>
      <label class="label">
        <span class="label-text">Enter royalty</span>
      </label>
      <label class="input-group">
        <input v-model="royalty" type="number" required placeholder="3" step="0.1" class="input input-bordered" />
        <span class="w-12 text-center justify-center">%</span>
      </label>
      <label class="label">
        <span class="label-text">Collection
          <NuxtLink to="/collection/create" class="text-[#fc466b]">(Create Collection)</NuxtLink>
        </span>
      </label>
      <label class="input-group">
        <input v-model="collectionId" type="text" placeholder="Collection" class="input input-bordered" />
        <span class="w-12 text-center justify-center">ID</span>
      </label>
      <label class="cursor-pointer label my-2 mx-0 pr-0">
        <span class="label-text">For sale</span>
        <input type="checkbox" class="toggle toggle-accent" checked v-model="forSale" />
      </label>
      <button type="submit" class="btn btn-lg py-3 amazing-button rounded-lg min-h-0 h-auto">
        <span class="relative w-full inline-flex items-center justify-center h-full bg-[rgb(12,12,12)] rounded-md ">
          Mint!
        </span>
      </button>
    </div>
  </form>
  <div v-else class="h-full-navbared w-full flex flex-col items-center justify-center font-mono">
    <div class="loading-wrapper h-20 m-2 flex items-center justify-center">
      <div class="loading"></div>
    </div>
    <h1 class="text-2xl text-mono m-2">Uploading your NFT...</h1>
    <p class="text-sm text-center text-zinc-400">
      Wait few minutes for your NFT to be mined. <br />
      You may take coffee, sit back and relax. It will take at least 1 Arweave
      block (~2 minutes).
    </p>
  </div>
</template>
<script setup>
import Arweave from "arweave";
import ArDB from "ardb";
import { DeployPlugin } from "warp-contracts-plugin-deploy";
import { Buffer } from "buffer";
import Account from "arweave-account";
const { Warp, Contract, WarpFactory } = await import("warp-contracts");
let accountToolsState = useState(
  "accountTools",
  () =>
    new Account({
      cacheIsActivated: true,
      cacheSize: 100,
      cacheTime: 60,
    })
);
const accountTools = accountToolsState.value;
let account = useState("account", () => null);
let walletState = useState("wallet", () => null);
let wallet = walletState.value;
let title = ref("");
let uploading = ref(false);
let description = ref("");
let price = ref(0.5);
let royalty = ref(3);
let forSale = ref(true);
let collectionId = ref("");
const arweaveState = useState("arweave", () => {
  Arweave.init({
    host: "prophet.rareweave.store",
    port: 443,
    protocol: "https",
    timeout: 60_000,
    logging: false,
  });
});
const arweave = arweaveState.value;
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
const ardbState = useState("ardb", () => new ArDB(arweave.value));
let ardb = ardbState.value;
let imageObjectUrl = ref(null);
let fileMeta = ref({});
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
    let reader = new FileReader();
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
</style>
