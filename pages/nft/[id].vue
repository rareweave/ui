<template>
  <div class="h-full-navbared w-full flex flex-col items-center justify-center">
    <div class="m-2 rounded mt-6">
      <img
        v-if="nftState?.contentType?.startsWith('image')"
        :src="
          'https://prophet.rareweave.store/_ipx/width_320,animated,f_webp/https://prophet.rareweave.store/' +
          nftId
        "
        class="inline-flex max-h-[20rem] max-w-20rem"
      />
      <video
        v-else-if="nftState?.contentType?.startsWith('video')"
        autoplay
        muted
        loop
        controls
      >
        <source
          :src="'https://prophet.rareweave.store/' + nftId"
          :type="nftState?.contentType"
        />
        Your browser does not support the video tag.
      </video>

      <audio v-else-if="nftState?.contentType?.startsWith('audio')" controls>
        <source
          :src="'https://prophet.rareweave.store/' + nftId"
          :type="nftState?.contentType"
        />
        Your browser does not support the audio tag.
      </audio>
    </div>
    <h1 class="text-3xl text-center font-mono">{{ nftState.name }}</h1>
    <template v-if="account && account.addr && account.addr == nftState.owner">
      <textarea
        class="text-md textarea font-sans m-2 max-w-[32rem] w-full overflow-auto transition-none textarea-bordered rounded-md"
        v-model="nftState.description"
      ></textarea>
    </template>
    <template v-else>
      <p
        class="text-md text-center font-sans p-2 max-w-[32rem]"
        v-if="nftState.description"
      >
        {{ nftState.description }}
      </p>
      <p class="text-md text-center font-sans text-zinc-500" v-else>
        [This NFT has no description]
      </p>
    </template>
    <div class="my-2 w-max min-w-[14rem] font-mono">
      <div
        class="rounded-none w-full bg-zinc-900 border-b-2 border-black text-white p-2 flex flex-row items-center justify-between"
      >
        Owner:
        <div
          v-if="account && account.addr && account.addr == nftState.owner"
          class="text-sm rounded-xl p-2 ml-2 bg-zinc-700 flex-row flex items-center"
        >
          You
        </div>
        <NuxtLink
          :to="'/profile/' + nftState.owner"
          v-else
          class="text-sm rounded-xl p-1 ml-2 bg-zinc-700 flex-row flex items-center"
        >
          <img
            :src="nftOwner?.profile?.avatarURL"
            v-if="nftOwner?.profile?.avatarURL"
            class="w-8 rounded-xl mr-2"
          />
          {{
            nftOwnerANS ||
            nftOwner?.handle ||
            (nftState.owner.length > 11
              ? nftState.owner.slice(0, 4) + "..." + nftState.owner.slice(-4)
              : nftState.owner)
          }}
        </NuxtLink>
      </div>
      <div
        class="rounded-none w-full bg-zinc-900 border-b-2 border-black text-white p-2 flex flex-row items-center justify-between"
      >
        Minter:
        <div
          v-if="account && account.addr && account.addr == nftMinter.addr"
          class="text-sm rounded-xl p-2 ml-2 bg-zinc-700 flex-row flex items-center"
        >
          You
        </div>
        <NuxtLink
          :to="'/profile/' + nftState.minter"
          v-else
          class="text-sm rounded-xl p-1 ml-2 bg-zinc-700 flex-row flex items-center"
        >
          <img
            :src="nftMinter?.profile?.avatarURL"
            class="w-8 rounded-xl mr-2"
          />
          {{ nftMinterANS || nftMinter?.handle }}
        </NuxtLink>
      </div>
      <div
        class="rounded-none w-full bg-zinc-900 border-b-2 border-black text-white p-2 flex flex-row items-center justify-between"
      >
        For sale:
        <template v-if="isNftOwner">
          <input
            type="checkbox"
            :class="[
              'toggle',
              nftState.forSale ? 'toggle-success' : 'toggle-error',
            ]"
            v-model="nftState.forSale"
          />
        </template>
        <template v-else>
          <div v-if="nftState.forSale" class="p-2 bg-green-600 text-sm">
            Yes
          </div>
          <div v-else class="p-2 bg-red-600 text-sm">No</div>
        </template>
      </div>
      <template v-if="nftState.forSale">
        <div
          class="rounded-none w-full bg-zinc-900 border-b-2 border-black text-white p-2 flex flex-row items-center justify-between"
        >
          Price:
          <template v-if="isNftOwner">
            <div class="p-1 pr-2 bg-zinc-700 text-sm">
              <input
                v-model="nftPrice"
                type="number"
                step="0.1"
                class="input text-start appearance-[textfield] w-14 rounded-none px-1 input-sm bg-transparent"
                placeholder="Price"
              />
              AR
            </div>
          </template>
          <div v-else class="p-2 bg-zinc-700 text-sm">{{ nftPrice }} AR</div>
        </div>
        <div
          class="rounded-none w-full bg-zinc-900 border-b-2 border-black text-white p-2 flex flex-row items-center justify-between"
        >
          Royalty:
          <div class="p-2 bg-zinc-700 text-sm">{{ nftRoyalty }}%</div>
        </div>
      </template>
      <button
        v-if="isNftOwner"
        :class="[
          'btn',
          'amazing-button2',
          'rounded-md',
          'w-full',
          'my-2',
          ,
          changed ? '' : 'btn-disabled',
        ]"
        :disabled="!changed"
        @click="saveChangesToNft"
      >
        Save changes
      </button>
      <label
        v-if="isNftOwner"
        for="transfer-modal"
        :class="{
          btn: true,
          'btn-primary': true,
          'rounded-md': true,
          'w-full': true,
          'my-2': true,
          'text-md': true,
          'btn-disabled': isSomeoneElseBuying,
        }"
        >Transfer</label
      >
      <label
        v-else-if="account && account.addr && nftState.forSale"
        for="buy-modal"
      >
        <amazing-button
          :disabled="isSomeoneElseBuying"
          :non-btn="true"
          class="mt-2 w-full"
          for="buy-modal"
          >Buy</amazing-button
        >
      </label>
      <!-- Put this part before </body> tag -->
    </div>
    <input
      type="checkbox"
      id="buy-modal"
      class="modal-toggle"
      :checked="false"
    />
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
    <Comments class="mx-6" :content="nftId" />
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
import {
  useAccount,
  useArweave,
  useAccountTools,
  useWallet,
} from "../../composables/useState";
import setArweave from "../../plugins/arweave";

const arweave = useArweave().value;
if (!arweave) setArweave();

let wallet = useWallet();

const account = useAccount();
const accountTools = useAccountTools().value;

let height = ref((await $fetch("https://glome.rareweave.store/info")).height);

let nftId = useRoute().params.id || useRoute().hash.slice(1);

let nftStateOrig = await $fetch(`https://glome.rareweave.store/state/` + nftId);

let transferModalOpened = ref(false);
let nftState = ref(JSON.parse(JSON.stringify(nftStateOrig)));
let isBuying = computed(
  () =>
    nftState.value.reservationTxId &&
    height.value - nftState.value.reservationBlockHeight < 12 &&
    nftState.value.reserver == account.value?.addr
);
let isSomeoneElseBuying = computed(
  () =>
    nftState.value.reservationTxId &&
    height.value - nftState.value.reservationBlockHeight < 16 &&
    nftState.value.reserver != account.value?.addr
);
let payingRoyalty = ref(false);
let buyStatus = ref(0);
let transferRecipient = ref("");
let nftPrice = ref(
  parseFloat(
    parseFloat(arweave.ar.winstonToAr(nftState.value.price)).toFixed(3)
  )
);
let nftRoyalty = ref(parseFloat(nftState.value.royalty * 100));
let nftOwner = ref(
  await accountTools.get(nftState.value.owner).catch((e) => null)
);
let nftMinter = await accountTools
  .get(nftState.value.minter)
  .catch((e) => null);
let nftOwnerANS = ref(
  (
    await $fetch(
      `https://ans-resolver.herokuapp.com/resolve/${nftState.value.owner}`
    )
  )?.domain
);
let nftMinterANS = (
  await $fetch(
    `https://ans-resolver.herokuapp.com/resolve/${nftState.value.minter}`
  )
)?.domain;
let isNftOwner = computed(
  () =>
    account.value &&
    account.value.addr &&
    account.value.addr == nftState.value.owner
);
let changed = computed(() => {
  let ch =
    nftPrice.value !=
      parseFloat(
        parseFloat(arweave.ar.winstonToAr(nftStateOrig.price)).toFixed(3)
      ) ||
    nftStateOrig.description != nftState.value.description ||
    nftStateOrig.forSale != nftState.value.forSale;
  return ch;
});
let updaterInterval = setInterval(async () => {
  height.value = (await $fetch("https://glome.rareweave.store/info")).height;

  if (!changed.value) {
    nftStateOrig.value = await fetch(
      `https://glome.rareweave.store/state/` + nftId
    ).then((res) => res.json());
    if (
      !nftStateOrig.value.reservationTxId &&
      height.value - nftStateOrig.value.reservationBlockHeight < 12 &&
      nftStateOrig.value.reserver == account.value?.addr &&
      nftStateOrig.value.reservationTxId != nftState.value.reservationTxId
    ) {
      finalizeBuy();
    }
    nftState.value = JSON.parse(JSON.stringify(nftStateOrig.value));
    nftPrice.value = parseFloat(
      parseFloat(arweave.ar.winstonToAr(nftState.value.price)).toFixed(3)
    );
    nftOwner.value = await accountTools
      .get(nftState.value.owner)
      .catch((e) => ({ addr: nftState.value.owner }));
    console.log(
      await accountTools
        .get(nftState.value.owner)
        .catch((e) => ({ addr: nftState.value.owner }))
    );
    nftOwnerANS.value = (
      await $fetch(
        `https://ans-resolver.herokuapp.com/resolve/${nftState.value.owner}`
      )
    )?.domain;
  }
}, 50000);

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

  nftStateOrig.value = JSON.parse(
    JSON.stringify({
      ...nftState.value,
      price: arweave.ar.arToWinston(nftPrice.value),
    })
  );
  console.log(
    nftPrice.value !=
      parseFloat(
        parseFloat(arweave.ar.winstonToAr(nftStateOrig.value.price)).toFixed(3)
      ),
    nftStateOrig.value.description != nftState.value.description,
    nftStateOrig.value.forSale != nftState.value.forSale
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

  let feeEstimate = await fetch(
    `https://g8way.io/price/1000000/${nftState.value.minter}`
  )
    .then((res) => res.text())
    .catch((err) => {
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
  } catch (e) {
    alert("You need to sign the transaction to pay the royalty");
    payRoyalty.value = false;
  }

  try {
    await arweave.transactions.post(tx);
  } catch (e) {
    alert("Failed to post the transaction to pay the royalty");
    payRoyalty.value = false;
  }
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

  let feeEstimate = await fetch(
    `https://g8way.io/price/1000000/${nftState.value.owner}`
  ).then((res) => res.text());

  let tx = await arweave.createTransaction({
    tags: encodeTags(tags),
    target: nftState.value.owner,
    quantity: arweave.ar.arToWinston(nftPrice.value),
    reward: feeEstimate,
    last_tx: royaltyAnchor,
  });

  try {
    await arweave.transactions.sign(tx);
  } catch (e) {
    alert("Transaction was not signed. Please try again.");
  }
  try {
    await arweave.transactions.post(tx);
  } catch (e) {
    alert("Transaction post failed. Please try again.");
  }

  let finalizationCheckInterval = setInterval(() => {
    if (nftState.value.owner == account.value.addr) {
      buyStatus.value = 3;
      clearInterval(finalizationCheckInterval);
    }
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
  } catch (e) {
    console.log(e);
    alert("Failed to post the transaction to transfer your nft");
  }

  nftState.value.owner = transferRecipient.value;
  nftStateOrig.value = JSON.parse(JSON.stringify(nftState.value));
  nftOwner.value = await accountTools.get(nftState.value.owner);

  nftOwnerANS.value = (
    await $fetch(
      `https://ans-resolver.herokuapp.com/resolve/${nftState.value.owner}`
    )
  )?.domain;
  transferModalOpened.value = false;
}

function encodeTags(tags) {
  return tags.map((tag) => ({
    name: btoa(tag.name),
    value: btoa(tag.value),
  }));
}
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
</style>
