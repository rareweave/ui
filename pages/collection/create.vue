<template>
  <form
    v-if="!uploading"
    class="h-full-navbared w-full flex flex-col items-center justify-center font-mono"
    @submit.prevent="Create"
  >
    <h1 class="text-3xl text-center">
      Create
      <p class="rareweave-font">Collection</p>
    </h1>
    <div class="form-control mb-2 pb-2 px-2">
      <label class="label">
        <span class="label-text">Collection name</span>
      </label>
      <input
        v-model="title"
        required
        type="text"
        maxlength="40"
        placeholder="RareWeave Collection"
        class="input input-bordered"
      />
      <label class="label">
        <span class="label-text">Describe your Collection</span>
      </label>
      <textarea
        placeholder="Super Awesome NFT's!"
        v-model="description"
        class="textarea textarea-bordered textarea-xs w-full max-w-xs"
      ></textarea>
      <label class="label">
        <span class="label-text">Tags</span>
      </label>
      <input
        v-model="tags"
        required
        type="text"
        maxlength="40"
        placeholder="doge rare cool..."
        class="input input-bordered"
      />
      <button
        type="submit"
        class="btn btn-lg py-3 amazing-button rounded-lg min-h-0 h-auto my-2"
      >
        Create!
      </button>
    </div>
  </form>
  <div
    v-else
    class="h-full-navbared w-full flex flex-col items-center justify-center font-mono"
  >
    <div class="loading-wrapper h-20 m-2 flex items-center justify-center">
      <div class="loading"></div>
    </div>
    <h1 class="text-2xl text-mono m-2">Creating Collection</h1>
    <p class="text-sm text-center text-zinc-400">
      Wait few minutes for your Collection to be mined. <br />
      May take a few minutes...
    </p>
  </div>
</template>
<script setup>
import Arweave from "arweave";
import ArDB from "ardb";
import { DeployPlugin } from "warp-contracts-plugin-deploy";
import { Buffer } from "buffer";
import Account from "arweave-account";
const { WarpFactory } = await import("warp-contracts");
let accountToolsState = useState(
  "accountTools",
  () =>
    new Account({
      cacheIsActivated: true,
      cacheSize: 100,
      cacheTime: 60,
    })
);
let account = useState("account", () => null);
let walletState = useState("wallet", () => null);

let uploading = ref(false);

let title = ref("");
let description = ref("");
let tags = ref("");

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
    remoteStateSyncSource: "https://prophet.rareweave.store/contract",
    remoteStateSyncEnabled: true,
  },
  false,
  arweave
).use(new DeployPlugin());

warp.definitionLoader.baseUrl = `https://prophet.rareweave.store`;
warp.interactionsLoader.delegate.baseUrl = `https://prophet.rareweave.store`;

async function Create() {
  let tagArray = tags.value.split(" ");
  let init_state = {
    admins: [account.value.addr],
    name: title.value,
    description: description.value,
    tags: tagArray,
    evolve: null,
    items: [],
    links: {},
  };

  uploading.value = true;

  let tx = await arweave.createTransaction({
    data: Buffer.from(JSON.stringify(init_state), "utf8"),
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
        value: "mhbnvFZFgAEjiP-islmBgox8_qD70xNcR1CCcNPo3ps",
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
        name: "Init-State",
        value: JSON.stringify(init_state),
      },
      {
        name: "Title",
        value: title.value,
      },
      {
        name: "Type",
        value: "SW-Contract",
      },
      {
        name: "Topics",
        value: "NFTs, Atomic Assets, Collection",
      },
      {
        name: "Description",
        value: "RareWeave Collection",
      },
      {
        name: "Contract-Manifest",
        value: JSON.stringify({
          evaluationOptions: {
            unsafeClient: "allow",
            waitForConfirmation: false,
          },
        }),
      },
    ]),
  });
  await arweave.transactions.sign(tx);

  let uploader = await arweave.transactions.getUploader(tx);

  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(
      `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
    );
  }

  await warp.register(tx.id, "node1").catch((e) => null);
  await warp.register(tx.id, "node2").catch((e) => null);

  let contractInstance = warp.contract(tx.id).setEvaluationOptions({
    unsafeClient: "allow",
    waitForConfirmation: false, //we are using anchoring
    remoteStateSyncEnabled: false,
  });

  async function checkContract(nftId, tries = 0) {
    if (tries >= 100) {
      return "error";
    }
    try {
      return "ok";
    } catch (e) {
      console.log(e, contractInstance);
      await wait(10000);
      await warp.register(tx.id, "node1").catch((e) => null);
      await warp.register(tx.id, "node2").catch((e) => null);
      return await checkContract(nftId, ++tries);
    }
  }

  function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  await checkContract(tx.id);
  await navigateTo("/collection/" + tx.id);
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