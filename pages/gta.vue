<template>
  <div class="Page">
    <div class="Header">
      <h1 class="Title">
        Grand Theft Arweave
      </h1>
      <div class="Cta__wrapper">
        <div class="Cta__card">
          <div class="Cta__row">
            <h2>
              Title
            </h2>
            <p>
              Description of the project
            </p>
          </div>
          <div class="Cta__row">
            <span>
              <img
                src="/gta-silhouette.png"
                alt=""
                width=""
                height=""
              />
            </span>
          </div>
          <span 
            v-if="account"
            class="Cta__buttons"
          >
            <span class="Cta__button">
              <button
                class="btn btn-primary"
                @click.prevent.stop="mint()"
              >
                MINT
              </button>
              Cost: gas only
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="Main">
      <div class="Section">
        <h2>
          About the project
        </h2>
        <p>
          Description of the project
        </p>
      </div>
      <div class="Section">
        <h2>
          Roadmap
        </h2>
        <!-- <div class="Roadmap">
          <div
            v-for="(milestone, i) in roadmap"
            class="Row"
          >
            <div
              v-if="i % 2 === 0"
              class="Milestone"
            >
              <span></span>
              <span>
                {{ i + 1 }}
              </span>
              <div>
                <h4>
                  {{ milestone.title }}
                </h4>
                <p>
                  {{ milestone.description }}
                </p>
              </div>
            </div>
            <div
              v-else
              class="Milestone"
            >
              <div>
                <h4>
                  {{ milestone.title }}
                </h4>
                <p>
                  {{ milestone.description }}
                </p>
              </div>
              <span>
                {{ i + 1 }}
              </span>
              <span></span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div 
      v-if="isUploading"
      class="Busy"
    >
      <div class="Loading">
        <div class="loading"></div>
      </div>
    </div>
    <div 
      v-if="!isReachable"
      class="Busy"
    >
      <div>
        API is down
      </div>
    </div>
  </div>
</template>
<script setup>
import Arweave from "arweave";
import { DeployPlugin } from "warp-contracts-plugin-deploy";
import { Buffer } from "buffer";
const { WarpFactory } = await import("warp-contracts");

let account = useState("account", () => null);

const isUploading = ref(false);
const isReachable = ref(true);

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
)
.use(new DeployPlugin());

warp.definitionLoader.baseUrl = `https://prophet.rareweave.store`;
warp.interactionsLoader.delegate.baseUrl = `https://prophet.rareweave.store`;

function readAsArrayBuffer(file) {
  return new Promise(resolve => {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        resolve(reader.result);
      },
      false
    );
    reader.readAsArrayBuffer(file);
  });
}

function encodeTags(tags) {
  const encodedTags = tags.map(tag => ({
    name: btoa(tag.name),
    value: btoa(tag.value)
  }));
  return encodedTags;
}

class NFT {
  constructor(props) {
    this.attributes = {
      owner: props.owner,
      minter: props.minter,
      name: props.name,
      description: props.description,
      ticker: "RWNFT",
      balances: {
        [props.owner]: 1,
      },
      contentType: props.contentType,
      createdAt: props.createdAt,
      evolve: props.evolve,
      forSale: props.forSale,
      price: props.price,
      reservationBlockHeight: props.reservationBlockHeight,
      royalty: props.royalty
    };
    this.buffer = new ArrayBuffer(0);
    this.tx = null;
    this.contract = null;
    this.polls = 0;
    this.maxPolls = 99;
    this.pollingTime = 10 * 1_000; // 10 seconds
    this.collection = {
      id: props.collectionId,
      contract: null
    };
  }
  
  async createTx() {
    this.tx = await arweave.createTransaction({
      data: Buffer.from(new Uint8Array(this.buffer)),
      tags: encodeTags([
        {
          name: "App-Name",
          value: "SmartWeaveContract"
        },
        {
          name: "App-Version",
          value: "0.3.0"
        },
        {
          name: "Contract-Src",
          value: "hcszckSXA5GTg6zg65nk6RQtT4aRHDzyxOOoD6DEGxg"
        },
        {
          name: "SDK",
          value: "Warp"
        },
        {
          name: "Nonce",
          value: Date.now().toString()
        },
        {
          name: "Content-Type",
          value: "image/png"
        },
        {
          name: "Init-State",
          value: JSON.stringify(this.attributes)
        },
        {
          name: "Title",
          value: this.attributes.name
        },
        {
          name: "Type",
          value: "Tradable-SW-NFT"
        },
        {
          name: "Topics",
          value: "NFTs, Atomic Assets"
        },
        {
          name: "Description",
          value: this.attributes.description
        }
      ])
    });
  }

  verified() {
    return new Promise(resolve => {
      const Poll = async () => {
        this.polls++;
        if (this.polls > this.maxPolls)
          return {
            state: "error"
          };

        try {
          await this.contract.readState();
          return {
            state: "ready"
          };
        }
        catch(e) {
          return {
            state: "polling"
          };
        };
      };
      const intRefId = setInterval(async () => {
        if (this.polls > 0)
          this.registerNodes([
            "node1", 
            "node2"
          ]);

        const _ = await Poll();
        if (_.state === "ready") {
          clearInterval(intRefId);
          resolve(true);
        }
        else if (_.state === "polling") {
          // do nothing and let polling continue
        }
        else if (_.state === "error"
        ||  ![ "error", "ready", "polling" ].includes(_.state)
        ) {
          clearInterval(intRefId);
          resolve(false);
        };
      }, 
      this.pollingTime
      );
    });
  }

  instanciate() {
    if (!this.tx)
      throw new Error("Transaction not created");

    this.contract = warp
      .contract(this.tx.id)
      .setEvaluationOptions({
        unsafeClient: "allow",
        waitForConfirmation: false, // we are using anchoring
        remoteStateSyncEnabled: false
      });

    this.collection.contract = warp
      .contract(this.collection.id)
      .setEvaluationOptions({
        remoteStateSyncSource: "https://prophet.rareweave.store/contract",
        remoteStateSyncEnabled: true,
        unsafeClient: "allow",
        allowBigInt: true,
        waitForConfirmation: false,
      })
      .connect("use_wallet")
  }

  async registerNodes(nodes) {
    try {
      await Promises.all([ 
        nodes.map(async node => await warp
          .register(this.tx.id, node)
          .catch(err => null)
        )
      ]);
    }
    catch(e) {
      console.log(e);
    };
  }

  async upload() {
    if (!isReachable.value)
      return;

    isUploading.value = true;
    await this.sign();
    let uploader = await arweave.transactions.getUploader(this.tx);
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
    };
    isUploading.value = false;
  }

  async addToCollection() {
    const { id } = this.tx;
    await this.collection.contract.writeInteraction({
      function: "bulk",
      inputs: [
        {
          function: "add-item",
          item: id,
        },
      ],
    });
  }

  async sign() {
    await arweave.transactions.sign(this.tx);
  }
}

class GtaNFT extends NFT {
  constructor(props) {
    super(props);
    this.attributes = {
      name: ``,
      description: "Grand Thieft Arweave is a PoC project that experiments with the new possibilities. Mint yourself a random GTA collectible.",
      contentType: "image/png",
      evolve: null,
      forSale: false,
      price: 0,
      reservationBlockHeight: 0,
      royalty: 0.08
    };
    this.collection = {
      id: `<gta-collection-id>`,
      contract: null
    };
    this.metadata = {
      url: `http://81.169.159.30:443/bandit/random`
    };
  }

  async fetchMetadata() {
    try {
      const res = await fetch(this.metadata.url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cors: false
      });
      const { id, filename, image } = data = await res.json();
      
      this.attributes.name = `GTA #${(id + 1).toString().padStart(3, "0")}`;

      if (data.traits)
        this.attributes.description = JSON.stringify(data.traits);
        
      const buffer = Buffer.from(image, "base64");
      const Image = new File([buffer], filename, {
        type: "image/png",
      });
      this.buffer = await readAsArrayBuffer(Image);
    }
    catch(err) {
      isReachable.value = false;
    };
  }
}

async function mint() {
  try {
    const Nft = new GtaNFT({
      minter: account.value.addr,
      owner: account.value.addr,
      createdAt: Date.now()
    });
    await Nft.fetchMetadata();
    await Nft.createTx();
    await Nft.upload();
    await Nft.registerNodes([
      "node1",
      "node2"
    ]);
    Nft.instanciate(); 
    await Nft.addToCollection();
    if (await Nft.verified())
      await navigateTo(`/nft/${Nft.tx.id}`);
    else
      console.log("Something went wrong, the NFT could not be verified.");
  }
  catch(e) {
    isUploading.value = isUploading.value !== false && false;
    console.log(e);
  };
};

// tests

async function tests() {
  await mint();
};

// init

async function init() {
  // await tests();
};

init();

definePageMeta({
  layout: "without-auth"
});
</script>
<style scoped>
.Page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  width: 100%;
  height: var(--page-height);
  overflow-x: hidden;
  overflow-y: auto;
}
.Header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 var(--page-spacing);
  width: 100%;
  height: auto;
}
.Title {
  font-size: 38pt;
}

.Cta__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  padding: 0;
  width: 640px;
  aspect-ratio: 16/9;;
}

.Cta__card {
  position: relative;
}

.Cta__row {

}

.Cta__buttons {
  position: absolute;
  bottom: 128px;
  left: calc((50%) - 128px);
  width: 256px;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.Cta__button {
  display: flex;
  flex-direction: column;
}

.Main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(21,26,37,1);
}

.Section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  width: 100%;
  height: auto;
}

.Busy {
  position: absolute;
  top: 0;
  left: 0;
  margin: 15%;
  width: 70%;
  height: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
}

.Loading {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: auto;
  height: 300px;
}

.Roadmap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 680px;
}

</style>