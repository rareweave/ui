<template>
  <div class="h-full-navbared pagewidth flex flex-col items-stretch justify-start mx-auto">
    <div class="relative flex flex-row flex-wrap justify-stretch items-stretch w-full h-full mt-12">
      <div class="relative flex-1 flex flex-col items-center justify-center h-full">
        <span class="relative w-full flex justify-center items-center aspect-square">
          <Graphic :nft="nft" :allowZoom="false" />
        </span>
        <div class="relative flex justify-between items-center w-full">
          <span class="relative flex justify-center items-center">
            <NuxtLink :to="`https://arweave.net/${nft.id}`" 
              target="_blank" 
              class="relative flex justify-center items-centerAmazing--br"
            >
              <img
                src="/link.png"
                class="w-6 h-6 mr-2"
              />
              .../{{ nft.id }}
            </NuxtLink>
          </span>
          <span class="relative flex justify-center items-center">
            <span class="relative flex justify-center items-center">
              <img
                src="/comment.png"
                class="w-6 h-6"
              />
              <span class="my-2 mx-4 font-bold">
                {{ comments.length }}
              </span>
            </span>
            <span class="relative flex justify-center items-center">
              <img
                src="/unliked.png"
                class="w-6 h-6"
              />
              <span class="my-2 mx-4 font-bold">
                -
              </span>
            </span>
          </span>
        </div>
      </div>
      <div class="relative flex-1 flex flex-col flex justify-start items-stretch">
        <div class="my-4 ml-10 mr-2 flex justify-between items-center">
          <span>
            <span>
              Minter:
            </span>
            <NuxtLink :to="'/profile/' + nft.state.minter" class="Amazing--br font-bold">
              {{ nftMinterANS || nft.state.minter }}
            </NuxtLink>
          </span>
          <label
            v-if="isNftOwner"
            for="transfer-modal"
            class="btn btn-primary rounded-md my-2 px-12 text-md flex justify-around items-center"
            :class="{
              'btn-disabled': isSomeoneElseBuying,
            }"
          >
            Send
            <img
              src="/send-24.png"
              class="w-4 h-4 ml-4"
            />
          </label>
        </div>
        <div class="mt-8 mx-10">  
          <h1 class="text-3xl text-center font-mono text-start font-bold">
            {{ nftState.name }}
          </h1>
        </div>
        <div class="my-4 mx-10 flex justify-start items-center">
          <span class="font-bold">
            Owned by:
          </span>
          <NuxtLink :to="'/profile/' + nft.state.owner" class="text-blue-600 ml-2">
            <span class="relative flex justify-start items-center">
              <img
                :src="nftOwner?.profile?.avatarURL"
                v-if="nftOwner?.profile?.avatarURL"
                class="w-6 h-=6 rounded-xl mr-2"
              />
              {{ nftOwnerANS
                || nftOwner?.handle
                || (nftState.owner.length > 11
                  ? nftState.owner.slice(0, 4) + "..." + nftState.owner.slice(-4)
                  : nftState.owner)
              }}
            </span>
          </NuxtLink>
        </div>
        <div class="relative flex flex-col rounded-xl border border-1 border-gray-400 my-4 mx-8 p-4">
          <h2 class="mx-1">
            Current price
          </h2>
          <div class="relative flex justify-between items-stretch flex-col mx-1 my-2"
            v-if="nftState.forSale && !isNftOwner"  
          >
            <span class="text-2xl font-bold">
              {{ nftPrice }} AR ({{ nftRoyalty }}% royalty) <span class="text-sm">Estimated royalty: {{ parseInt(nftPrice * (nftRoyalty / 100) * 1_000_000) / 1_000_000 }} AR</span>
            </span>
            <span class="text-sm font-bold mb-2">
              {{ (nftPrice * 1e12).toString() }} (+ estimated {{ (parseInt(nftPrice * (nftRoyalty / 100) * 1_000_000) * 1_000_000).toString() }}) winston
            </span>
            <span :style="[nftPrice > 0 ? { display: 'none' } : {}, !changed ? { display: 'none'} : {}]" class="text-yellow-500 mt-2">Listing for free!</span>
          </div>
          <div class="relative flex justify-between items-stretch flex-col mx-1 my-2"
            v-else-if="!nftState.forSale && !isNftOwner"
          >
            <span class="text-2xl font-bold">
              Not for sale
            </span>
            <span class="text-sm font-bold mb-2">
              No previous price actions available yet, coming soon tm.
            </span>
          </div>
          <div class="relative flex justify-between items-stretch flex-col mx-1 my-2"
            v-else-if="isNftOwner"
          >
            <h2 class="my-2 text-xl font-bold">
              Set listing price
            </h2>
            <span class="flex justify-start items-center">
              <input 
                type="number"
                class="input-bordered p-2 outline-none border-2 border-gray-400 rounded-md mr-2"
                placeholder="Price in AR"
                v-model="nftPrice"
                min="0"
                step="0.01"
                
              />
              <span>AR</span>
            </span>
            <h2 class="my-2 text-xl font-bold">
              Set royalties
            </h2>
            <span class="flex justify-start items-center">
              <input
                type="number"
                class="input-bordered p-2 outline-none border-2 border-gray-400 rounded-md mr-2"
                placeholder="Royalty in %"
                v-model="nftRoyalty"
                min="0"
                max="100"
                step="0.01"
              />
              <span>%</span>
            </span>

          </div>
          <div class="mt-2 mx-1">
            <span v-if="account && account.addr">
              <div v-if="!isNftOwner">
                <button :disabled="isSomeoneElseBuying || !nftState.forSale" 
                  :class="['Button px-8 py-2 text-xl font-bold',
                    !isSomeoneElseBuying && nftState.forSale ? 'Amazing--button' : 'invisible'
                ]"
                  for="buy-modal">
                  Buy now
                </button>
              </div>
              <div v-else class="flex justify-start items-center">
                <div class="relative flex flex-row items-center justify-start">
                  <button v-if="!nftState.forSale" :class="['px-4 py-2 text-xl flex flex-row justify-start items-center']"
                    @click="setNftForsale(true)"
                  >
                    <img
                      src="/add.png"
                      class="w-6 h-6 mr-2"
                    />
                    List for sale
                  </button>
                  <button v-else-if="nftState.forSale" :class="['Button px-4 py-2 text-xl font-bold flex flex-row justify-start items-center Awesome--button2']"
                    @click="setNftForsale(false)"
                  >
                    <img
                      src="/remove.png"
                      class="w-6 h-6 mr-2"
                    />
                    Remove listing
                  </button>
                </div>
                <span v-if="nftState.forSale && (nftPrice <= 0 || !nftPrice)" class="text-yellow-500 ml-2">
                  Listing for free!
                </span>
              </div>
            </span>
            <span v-else-if="!account">
              <NuxtLink to="/login" class="btn btn-primary">
                Login
              </NuxtLink>
            </span>
          </div>
        </div>
        <div class="relative flex flex-col my-4 mx-10">
          <h2 class="text-2xl font-bold my-2 Amazing--red">
            About this NFT
          </h2>
          <div class="relative flex flex-col justify-start items-start my-2 transition-all duration-500">
            <h4 class="font-bold my-2 text-xl flex justify-between items-center w-full">
              <span class="text-rwpeach">
                Description:
              </span>
              <span v-if="isNftOwner" class="cursor-pointer">
                <img
                  src="/edit.png"
                  class="w-6 h-6 mr-2"
                  alt="Edit description"
                  @click="setEditing(true)"
                />
              </span>
            </h4>
            <div v-if="!editing" class="font-bold">
              <p class="font-bold">
                {{ nftState.description }}
              </p>
            </div>
            <textarea v-else
              id="desc"
              class="relative w-full min-h-[10rem] p-2 outline-none border-2 border-gray-400 rounded-md"
              type="text"
              required
              placeholder="Description"
              v-model="nftState.description"
              @focusout="!changed ? setEditing(false) : null"
            ></textarea>
          </div>
          <div class="relative flex flex-col justify-start items-start my-2">
            <h4 class="font-bold my-2 text-xl text-rwpeach">
              Content type:
            </h4>
            <p class="font-bold">
              {{ nftState.contentType }}
            </p>
          </div>
          <div class="relative flex flex-col justify-start items-start my-2">
            <h4 class="font-bold my-2 text-xl text-rwpeach">
              TXID:
            </h4>
            <p class="font-bold">
              {{ nftId }}
            </p>
          </div>
          <div class="relative flex flex-col justify-start items-start mt-4">
            <h2 class="font-bold my-2 text-xl text-rwpeach">
              Current payment information:
            </h2>
            <div class="relative flex justify-start items-center">
              <div class="relative flex flex-col justify-start items-start min-w-[186px]">
                <h4 class="text-xl">
                  Chain:
                </h4>
                <p class="font-bold">
                  Arweave
                </p>
              </div>
              <div class="relative flex flex-col justify-start items-start">
                <h4 class="text-xl">
                  Token:
                </h4>
                <p class="font-bold">
                  AR
                </p>
              </div>
            </div>
          </div>
        </div>
        <div :class="['relative flex flex-col my-4 mx-10',
          changed ? 'visible' : 'invisible'
        ]">
          <span v-if="account && account.addr && isNftOwner">
            <div class="relative flex p-4 rounded-xl border border-1 border-gray-700"
              style="box-shadow: 
                0px 0px 1px rgba(0, 0, 0, 0.9),
                1px 1px 2px rgba(139, 139, 139, 0.175),
                2px 2px 4px rgba(197, 192, 197, 0.175),
                inset 0px 0px 1px rgba(158, 158, 158, 0.9),
                inset 1px 1px 2px rgba(133, 132, 132, 0.175),
                inset 2px 2px 4px rgba(49, 49, 49, 0.175)
              ;"
            >
              <button v-if="isNftOwner" :class="['my-2 mr-8 px-8 py-3 text-xl font-bold amazing-button2 rounded-md']"
                :disabled="!changed"
                @click="saveChangesToNft"
              >
                Save changes
              </button>
              <button class="my-2 mr-8 px-8 py-3 text-xl font-bold rounded-md bg-[rgba(0, 1, 3, 1.00)] text-gray-500" for="buy-modal"
                @click="resetState"
              >
                Reset
              </button>
            </div>
          </span>
        </div>
        <input
          type="checkbox"
          id="buy-modal"
          class="modal-toggle"
          :checked="false"
        />
      </div>
    </div>
    <div class="modal">
      <div class="modal-box relative flex flex-col" v-if="buyStatus != 3">
        <label
          for="buy-modal"
          class="btn btn-sm absolute right-2 top-2"
          v-if="buyStatus == 0 || buyStatus == 3"
          >✕</label
        >
        <h3 class="font-bold text-lg text-center">Buy "{{ nftState.name }}"</h3>
        <ul class="steps steps-vertical mt-4 ml-4">
          <li class="step step-primary">
            <awesome-button
              @click="payRoyalty"
              v-if="!payingRoyalty && !isBuying"
            >
              Pay royalty ({{ nftPrice * (nftRoyalty / 100) }} AR)
            </awesome-button>
            <span class="text-lg" v-else-if="isBuying">Paid royalty</span>
            <span class="text-lg" v-else
              >Paying royalty... Don't close this tab</span
            >
          </li>
          <li :class="{ step: true, 'step-primary': isBuying }">
            <amazing-button
              :disabled="!isBuying"
              v-if="!isSomeoneElseBuying && buyStatus != 2"
              @click="finalizeBuy"
            >
              Finalize buy ({{ nftPrice }} AR)
            </amazing-button>
            <span v-else-if="buyStatus == 2" class="text-lg"
              >Finalizing buy...
            </span>
            <button v-else class="btn btn-error btn-outline rounded-lg btn-sm">
              Someone else did reserve this NFT before you
            </button>
          </li>
        </ul>
        <div class="modal-action">
          <label
            for="buy-modal"
            class="btn"
            v-if="buyStatus == 0 || buyStatus == 3"
            >Close</label
          >
        </div>
      </div>
      <div class="modal-box relative flex flex-col items-center" v-else>
        <label for="buy-modal" class="btn btn-sm absolute right-2 top-2"
          >✕</label
        >
        <h3 class="font-bold text-lg text-center">
          Successfully bought "{{ nftState.name }}"
        </h3>
        <img
          v-if="nftState?.contentType?.startsWith('image')"
          :src="
            'https://prophet.rareweave.store/_ipx/width_320,animated,f_webp/https://prophet.rareweave.store/' +
            nftId
          "
          class="inline-flex max-h-[20rem] max-w-20rem my-4 purchased"
        />
        <video
          v-else-if="nftState?.contentType?.startsWith('video')"
          autoplay
          loop
          muted
          controls
        >
          <source
            :src="'https://g8way.io/' + nftId"
            :type="nftState?.contentType"
          />
          Your browser does not support the video tag.
        </video>
        <span class="text-md text-center"
          >Now you own {{ nftState.name }}!</span
        >
        <div class="modal-action">
          <label for="buy-modal" class="btn">Close</label>
        </div>
      </div>
    </div>
    
      <div class="flex flex-col items-center justify-center border-t border-1 border-gray-400/75 mt-8">
        <Comments class="mx-6" 
          :comments="comments" 
          :id="nftId"
          :account="account"
          :wallet="wallet"
          :arweave="arweave"
        />
      </div>
    <input
      type="checkbox"
      id="transfer-modal"
      class="modal-toggle"
      :checked="false"
      v-model="transferModalOpened"
    />
    <div class="modal">
      <div class="modal-box relative flex flex-col" v-if="!isSomeoneElseBuying">
        <label for="transfer-modal" class="btn btn-sm absolute right-2 top-2"
          >✕</label
        >
        <h3 class="font-bold text-lg text-center">
          Transfer "{{ nftState.name }}"
        </h3>
        <form class="modal-action" @submit.prevent="transfer">
          <input
            v-model="transferRecipient"
            class="input input-bordered w-full rounded-lg p-2"
            type="text"
            required
            placeholder="Recipient's arweave address"
          />
          <button type="submit" class="btn btn-primary rounded-lg">
            Transfer
          </button>
        </form>
      </div>
      <div class="modal-box relative flex flex-col items-center" v-else>
        <label for="transfer-modal" class="btn btn-sm absolute right-2 top-2"
          >✕</label
        >
        <h3 class="font-bold text-lg text-center">
          Can't transfer "{{ nftState.name }}"
        </h3>
        <span class="text-md text-center"
          >Somebody is buying this NFT now.</span
        >
        <div class="modal-action">
          <label for="transfer-modal" class="btn">Close</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { GlomeNode } from "~/settings.json";
import { useAccount, useArweave, useAccountTools, useWallet } from "~/composables/useState";
import setArweave from "~/plugins/arweave";
import ansResolver from "~/plugins/ans-resolver";
import fetchComments from "~/plugins/fetch-comments";

const WinstonToAR_fixed = winston => parseFloat(parseFloat(arweave.ar.winstonToAr(winston)).toFixed(3));

const encodeTags = tags => tags.map(tag => ({
  name: btoa(tag.name),
  value: btoa(tag.value),
}));

const setNftForsale = v => {
  nftState.value.forSale = v;
};

const arweave = useArweave().value;
if (!arweave) 
  setArweave();

const wallet = useWallet();
const account = useAccount();
const accountTools = useAccountTools().value;

const comments = ref([]);
const editing = ref(false);

let height = ref((await $fetch(`${GlomeNode}/info`)).height);
let nftId = useRoute().params.id || useRoute().hash.slice(1);
let initialState = await $fetch(`${GlomeNode}/state/` + nftId);

let transferModalOpened = ref(false);
let nftState = ref(JSON.parse(JSON.stringify(initialState)));

let nft = ref({
  id: nftId,
  state: nftState.value,
});

comments.value = await fetchComments(nft.value.id);

let isBuying = computed(
  () => nftState.value.reservationTxId
    && height.value - nftState.value.reservationBlockHeight < 12
    && nftState.value.reserver == account.value?.addr
);

let isSomeoneElseBuying = computed(
  () => nftState.value.reservationTxId
    && height.value - nftState.value.reservationBlockHeight < 16
    && nftState.value.reserver != account.value?.addr
);

let payingRoyalty = ref(false);
let buyStatus = ref(0);
let transferRecipient = ref("");
let nftPrice = ref(WinstonToAR_fixed(nftState.value.price));
let nftRoyalty = ref(parseFloat(nftState.value.royalty * 100));

let nftOwner = ref(await accountTools
    .get(nftState.value.owner)
    .catch(e => null)
);

let nftMinter = await accountTools
  .get(nftState.value.minter)
  .catch(e => null);

let nftOwnerANS = ref(await ansResolver(nftState.value.owner));

let nftMinterANS = await ansResolver(nftState.value.minter);

let isNftOwner = computed(() => account.value 
  && account.value.addr 
  && account.value.addr == nftState.value.owner
);

let changed = computed(() => nftPrice.value != WinstonToAR_fixed(initialState.price)
  || nftState.value.description != initialState.description
  || nftState.value.forSale != initialState.forSale
);

let updaterInterval = setInterval(async () => {
  height.value = (await $fetch(`${GlomeNode}/info`)).height;

  if (!changed.value) {
    await fetchState();
    
    if (!initialState.value.reservationTxId
      && height.value - initialState.value.reservationBlockHeight < 12
      && initialState.value.reserver == account.value?.addr
      && initialState.value.reservationTxId != nftState.value.reservationTxId
    )
      finalizeBuy();

    nftState.value = JSON.parse(JSON.stringify(initialState.value));
    nftPrice.value = parseFloat(parseFloat(arweave.ar.winstonToAr(nftState.value.price)).toFixed(3));

    const getAccounttools = async () => await accountTools
      .get(nftState.value.owner)
      .catch(e => ({ addr: nftState.value.owner}));

    nftOwner.value = await getAccounttools();
    console.log(await getAccounttools());

    nftOwnerANS.value = await ansResolver(nftState.value.owner);
  }
}, 50_000);

const setEditing = v => {
    editing.value = v;
    if (v)
      setTimeout(() => {
        document.body.querySelector("#desc").focus();
      }, 100);
};

const fetchState = async () => {
    initialState.value = await fetch(`${GlomeNode}/state/${nftId}`)
      .then(res => res.json());
};

const resetState = async () => {
  await fetchState();
  
  nftState.value = JSON.parse(JSON.stringify(initialState.value));

  nftPrice.value = WinstonToAR_fixed(nftState.value.price);
  nftRoyalty.value = parseFloat(nftState.value.royalty * 100);

  setEditing(false);
};

onBeforeUnmount(() => clearInterval(updaterInterval));

async function saveChangesToNft() {
  let tags = [
    {
      name: "Contract",
      value: nftId,
    },
    {
      name: "Input",
      value: JSON.stringify({
        function: "edit-nft",
        description: nftState.value.description,
        forSale: nftState.value.forSale,
        price: parseInt(arweave.ar.arToWinston(nftPrice.value)),
      }),
    },
    {
      name: "App-Name",
      value: "SmartWeaveAction",
    },
    {
      name: "App-Version",
      value: "0.3.0",
    },
    {
      name: "Nonce",
      value: Date.now().toString(),
    },
    {
      name: "SDK",
      value: "0.3.0",
    },
  ];

  let tx = await arweave.createTransaction({
    data: "Glome Contract Call",
    tags: encodeTags(tags),
  });

  try {
    await wallet.value.dispatch(tx);
  } catch (e) {
    console.log(e);
    alert("Failed to post the transaction to update your NFT");
  }

  initialState.value = JSON.parse(
    JSON.stringify({
      ...nftState.value,
      price: arweave.ar.arToWinston(nftPrice.value),
    })
  );
  console.log(
    nftPrice.value !=
      parseFloat(
        parseFloat(arweave.ar.winstonToAr(initialState.value.price)).toFixed(3)
      ),
    initialState.value.description != nftState.value.description,
    initialState.value.forSale != nftState.value.forSale
  );
}

function buy() {}

async function payRoyalty() {
  buyStatus.value = 1;
  payingRoyalty.value = true;

  let tags = [
    {
      name: "Contract",
      value: nftId,
    },
    {
      name: "Input",
      value: JSON.stringify({
        function: "reserve-buying-zone",
        price: parseInt(arweave.ar.arToWinston(nftPrice.value)),
      }),
    },
    {
      name: "App-Name",
      value: "SmartWeaveAction",
    },
    {
      name: "App-Version",
      value: "0.3.0",
    },
    {
      name: "Nonce",
      value: Date.now().toString(),
    },
    {
      name: "SDK",
      value: "0.3.0",
    },
  ];

  let feeEstimate = await fetch(`https://g8way.io/price/1000000/${nftState.value.minter}`)
    .then(res => res.text())
    .catch(err => {
      alert("Failed to get the fee estimate");
      payRoyalty.value = false;
    });

  let tx = await arweave.createTransaction({
    tags: encodeTags(tags),
    target: nftState.value.minter,
    quantity: (
      parseInt(arweave.ar.arToWinston(nftPrice.value)) * nftState.value.royalty
    ).toString(),
    reward: feeEstimate,
  });

  try {
    await arweave.transactions.sign(tx);
  } 
  catch (e) {
    alert("You need to sign the transaction to pay the royalty");
    payRoyalty.value = false;
  };

  try {
    await arweave.transactions.post(tx);
  } 
  catch (e) {
    alert("Failed to post the transaction to pay the royalty");
    payRoyalty.value = false;
  };
}

async function finalizeBuy() {
  buyStatus.value = 2;
  let reservationTxId = nftState.value.reservationTxId;
  let tags = [
    {
      name: "Contract",
      value: nftId,
    },
    {
      name: "Input",
      value: JSON.stringify({
        function: "finalize-buy",
        price: parseInt(arweave.ar.arToWinston(nftPrice.value)),
        reservationTxId: reservationTxId,
      }),
    },
    {
      name: "App-Name",
      value: "SmartWeaveAction",
    },
    {
      name: "App-Version",
      value: "0.3.0",
    },
    {
      name: "Nonce",
      value: Date.now().toString(),
    },
    {
      name: "SDK",
      value: "0.3.0",
    },
  ];

  let royaltyAnchor = (
    await fetch(`https://g8way.io/graphql`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
           transaction(id: "${reservationTxId}") {
              id
              block {
              id
             }
           }
        }`,
      }),
    }).then((tx) => tx.json())
  ).data.transaction.block.id;

  let feeEstimate = await fetch(`https://g8way.io/price/1000000/${nftState.value.owner}`)
    .then(res => res.text());

  let tx = await arweave.createTransaction({
    tags: encodeTags(tags),
    target: nftState.value.owner,
    quantity: arweave.ar.arToWinston(nftPrice.value),
    reward: feeEstimate,
    last_tx: royaltyAnchor,
  });

  try {
    await arweave.transactions.sign(tx);
  } 
  catch (e) {
    alert("Transaction was not signed. Please try again.");
  };

  try {
    await arweave.transactions.post(tx);
  } 
  catch (e) {
    alert("Transaction post failed. Please try again.");
  };

  let finalizationCheckInterval = setInterval(() => {
    if (nftState.value.owner == account.value.addr) {
      buyStatus.value = 3;
      clearInterval(finalizationCheckInterval);
    };
  });
}

async function transfer() {
  let tags = [
    {
      name: "Contract",
      value: nftId,
    },
    {
      name: "Input",
      value: JSON.stringify({
        function: "transfer",
        target: transferRecipient.value,
      }),
    },
    {
      name: "App-Name",
      value: "SmartWeaveAction",
    },
    {
      name: "App-Version",
      value: "0.3.0",
    },
    {
      name: "Nonce",
      value: Date.now().toString(),
    },
    {
      name: "SDK",
      value: "0.3.0",
    },
  ];

  let tx = await arweave.createTransaction({
    data: "Glome Contract Call",
    tags: encodeTags(tags),
  });

  try {
    console.log(wallet);
    await wallet.value.dispatch(tx);
  } 
  catch (e) {
    console.log(e);
    alert("Failed to post the transaction to transfer your nft");
  };

  nftState.value.owner = transferRecipient.value;
  initialState.value = JSON.parse(JSON.stringify(nftState.value));
  nftOwner.value = await accountTools.get(nftState.value.owner);

  nftOwnerANS.value = await ansResolver(nftState.value.owner);
  transferModalOpened.value = false;
};

const messagesStream = new EventSource(`https://socioweave.rareweave.store/comment-stream/${nftId}`);

function addMessage(ev) {
  comments.value.unshift(JSON.parse(ev.data));
};

messagesStream.addEventListener("newMessage", addMessage)

onUnmounted(() => {
    messagesStream.removeEventListener("newMessage", addMessage)
    messagesStream.close()
});

definePageMeta({
  layout: "without-auth",
});
</script>

<style>
.purchased {
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  transition: transform 1s ease 0s;
}

.purchased:hover {
  transition: transform 0.5s ease 0s;
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}
.pagewidth {
  width: calc((100% - var(--page-spacing) * 2));
  max-width: var(--page-max-width);
}
</style>
