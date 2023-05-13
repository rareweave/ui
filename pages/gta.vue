<template>
  <div class="Banner"></div>
  <div class="Page">
    <div class="Header">
      <h1 class="Title">
        Grand Theft Arweave
      </h1>
      <div class="Cta__wrapper">
        <div class="Cta__card">
          <div class="Cta__row">
            <h2>
              A collection of 500 gang members. First edition.
            </h2>
            <p>
              
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
                class="Gta2__styled"
                @click.prevent.stop="mint()"
              >
                PRESS MINT
              </button>
              <span>
                *Price: gas only!
              </span>
            </span>
          </span>
          <span
            v-else
            class="Cta__buttons"
          >
            Login to mint
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
        <div class="Roadmap">

          <div
            v-for="(milestone, i) in milestones"
            class="Milestone"
            :class="i % 2 === 0 ? '--left' : '--right'"
          >
            <div class="Road"></div>
            <div class="No">
              {{ i + 1 }}
            </div>
            <div class="Desc">
              <h3>
                {{ milestone.title }}
              </h3>
              <p>
                {{ milestone.description }}
              </p>
            </div>
          </div>
          <div class="Milestone --end">
            And more to come...
          </div>
        </div>
      </div>
      <div class="Higlight__section">
        
      </div>
      <div class="Section">
        <h2>
          Team
        </h2>
        <div class="Team">
          <div 
            v-for="member in teammembers"
            class="Member"
          >
            
              <span class="Avatar">
                <img
                  src="/avatar.png"
                  alt=""
                  width=""
                  height=""
                />
              </span>
              <div class="Info">
                <h3>
                  {{ member.name }}
                </h3>
                <p>
                  {{ member.description }}
                </p>
              </div>
            
          </div>
        </div>
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
      v-if="errors"
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
const errors = ref(false);

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

const milestones = ref([
  {
    title: "Launch!!!",
    description: "Mintpage where the community can mint their own GTA NFTs and join the gang."
  },
  {
    title: "Minting party!",
    description: "All 500 First edition GTA NFTs have been minted and are now decentralized."
  },
  {
    title: "Website 2.0",
    description: "The website has been updated with a new design and a gallery / profile for each holder will be added."
  },
  {
    title: "Game on!",
    description: "The NFTs can now enter the text-based game and build their crime families."
  }
]);

const teammembers = ref([
  {
    name: "Sh1Tt",
    description: "Founder, CEO, Dev"
  },
  {
    name: "Elon",
    description: "Founder, Community manager"
  }
]);

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
    if (errors.value)
      return;

    try {
      const { id } = this.tx;
      nodes.map(async node => await warp
        .register(id, node)
        .catch(err => null)
      );
    }
    catch(e) {
      console.log(e);
    };
  }

  async upload() {
    if (errors.value)
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
      const data = await res.json();

      const { id, image, filename } = data;
      
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
      errors.value = true;
      console.log(err);
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
    if (errors.value)
      throw new Error("Could not fetch metadata");
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
.Banner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 var(--page-spacing);
  width: 100%;
  height: auto;
  min-height: 5rem;
  background: var(--primary-color);
  color: var(--primary-color-inverted);
  text-align: center;
}
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
  margin: 1em 0 0.25em;
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
  aspect-ratio: 16/9;

}

.Cta__card {
  position: relative;
  text-align: center;
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

.Gta2__styled {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: .375rem .75rem;
  width: max-content;
  height: auto;
  font-size: 32pt;
  font-weight: 1000;
  background: linear-gradient(0deg,rgb(255, 94, 0), rgba(255, 238, 0, 0.986));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}

.Gta2__styled::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 38px;
  background: rgba(8,18,41,1);
  z-index: -1;
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
  margin: 2rem 0;
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

.Milestone {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  min-height: 128px;
  
}

.Road {
  position: absolute;
  top: 0;
  left: calc((50%) - 6px);
  width: 12px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  background: repeating-linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1) 2px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0) 4px), repeating-linear-gradient(90deg, rgb(179, 19, 19), rgb(192, 31, 31) 2px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0) 4px);
}

.No {
  position: absolute;
  top: 0;
  left: calc((50%) - 28px);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(21,26,37,1);
  border: 4px dashed  rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
}

.Desc {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  width: calc((50%) - 38px);
}

.--left {
  justify-content: flex-end;
  text-align: left;
}

.--right {
  justify-content: flex-start;
  text-align: right;
}

.--end {
  justify-content: center;
  text-align: center;
}

.Higlight__section {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 2rem 0;
  width: 100%;
  height: auto;
  min-height: 9rem;
  background-color: rgb(5, 71, 97);
  background: linear-gradient(37deg, rgba(142, 196, 43, 0.849), rgba(5, 71, 97, 1), rgba(62, 151, 54, 0.801), rgba(5, 71, 97, 1));
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
  
}

.Team {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
}

.Member {
  flex: .25 .25 0px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 2rem 4rem;
  
  background-color: rgba(21,26,37,1);
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);

}

</style>