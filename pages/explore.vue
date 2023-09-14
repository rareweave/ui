<template>
  <div class="Select flex justify-start items-center max-w-[1740px] min-h-12 mx-auto overflow-hidden">
    <div class="Spacer"></div>
    <div class="Topbar">
      <div class="Current">items: {{ nfts.length }}</div>
      <div class="Search">
        <span class="InputWrapper">
          <input type="text" placeholder="Search..." v-on:input="onSearch" v-model="searchInput" class="Input__Search" />
          <span class="SearchIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-search">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </span>
      </div>
      <div class="V1__views">
        <button :class="{ active: view === 'grid' }" @click="view = 'grid'">
          grid
        </button>
        <button :class="{ active: view === 'list' }" @click="view = 'list'">
          list
        </button>
      </div>
    </div>
  </div>
  <div class="V1__border"></div>
  <div class="V1__page">
    <div class="Menu">
      <div class="MenuSection">
        <div
          class="MenuHeader relative flex flex-row justify-between items-center w-full h-auto m-0 p-3 font-bold text-2xl">
          <h2 class="Amazing--br">Exploration</h2>
          <span></span>
        </div>
        <div class="MenuOptions">
          <div class="MenuOption">
            <div class="V1__button_wrapper">
              <span class="V1__button_decoration"></span>
              <button class="V1__button" @click="
                selectedCollection = {};
              searchInput = '';
              forSaleOnly = false;
              filter = { minPrice: 0, maxPrice: 0, type: 'all' };
              updateUrl(null);
              refreshResults();
              ">
                All
              </button>
            </div>
          </div>
        </div>
      </div>
      <template v-if="(account &&
          account.addr &&
          selectedCollection?.state?.admins.includes(account.addr)) ||
        (account &&
          account.addr &&
          selectedCollection?.admins?.includes(account.addr))
        ">
        <div class="MenuSection">
          <div
            class="MenuHeader relative flex flex-row justify-between items-center w-full h-auto m-0 p-3 font-bold text-2xl">
            <h2 class="Amazing--br">Admin Only</h2>
            <span></span>
          </div>
          <div class="MenuOptions">
            <div class="MenuOption">
              <div class="FilterButton">
                <label for="add-modal"
                  class="btn btn-xl text-lg amazing-button rounded-md hover:rounded-lg transition-all font-mono m-1 w-full">Add
                  NFTS</label>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- <div class="MenuSection">
        <div
          class="MenuHeader relative flex flex-row justify-between items-center w-full h-auto m-0 p-3 font-bold text-2xl"
        >
          <h2 class="Amazing--br">Rarified</h2>
          <span></span>
        </div>
         <div
          v-for="(rarifiedCollection, index) in rarifiedCollections"
          class="MenuOptions"
        >
          <div
            class="highlite MenuOption"
            :style="{
              animationDuration: `${0.12 + 0.12 * index}s`,
            }"
          >
            <div class="V1__button_wrapper">
              <span class="V1__button_decoration"></span>
              <button
                class="V1__button"
                @click="
                  searchCondition = rarifiedCollection.contractTxId;
                  searchType = 'collection';
                  activate($event);
                "
              >
                {{ rarifiedCollection.name }}...[{{ rarifiedCollection.count }}]
              </button>
            </div>
          </div> 
        </div>
      </div> -->
      <div class="MenuSection">
        <div
          class="MenuHeader relative flex flex-row justify-between items-center w-full h-auto m-0 p-3 font-bold text-2xl">
          <h2 class="Amazing--br">Filter</h2>
          <span></span>
        </div>
        <div class="MenuOptions">
          <div class="MenuOption">
            <div class="Row">
              <label> Min: </label>
              <input type="number" v-model="filter.minPrice" min="0" max="1000000000" step="0.1" />
              <span> AR </span>
            </div>
          </div>
          <div class="MenuOption">
            <div class="Row">
              <label> Max: </label>
              <input type="number" v-model="filter.maxPrice" min="0" max="1000000000" step="0.1" />
              <span> AR </span>
            </div>
          </div>
          <div class="MenuOption">
            <div class="Row">
              <label class="cursor-pointer label">
                <input type="checkbox" v-model="forSaleOnly" class="checkbox checkbox-warning" />
                <span class="label-text ml-2">For sale only</span>
              </label>
            </div>
          </div>
          <div class="MenuOption">
            <div class="Row">
              <label class="mr-2">Type</label>
              <select v-model="filter.type" class="relative py-1 px-2">
                <option value="all">All</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>
            </div>
          </div>
          <div class="MenuOption">
            <div class="FilterButton">
              <button class="MenuButton" @click="refreshResults()">
                Apply
              </button>
              <button class="Reset" @click="
                filter = { minPrice: 0, maxPrice: 0, type: 'all' };
              forSaleOnly = false;
              forSaleOnly = false;
              refreshResults();
              ">
                Remove filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--Bring back later probably, just glome wont support this for now-->
      <div class="MenuSection">
        <div
          class="MenuHeader relative flex flex-row justify-between items-center w-full h-auto m-0 p-3 font-bold text-2xl">
          <h2 class="Amazing--br">Collection detection</h2>
          <span></span>
        </div>

        <div if="collections.length > 0" class="MenuOptions" v-for="(collection, index) in [
          ...new Set(
            collections?.filter(
              (collection) =>
                collection?.state?.name !== undefined &&
                collection.state.name !== ''
            )
          ),
        ]" :key="collection.id">
          <div class="MenuOption highlite">
            <div class="V1__button_wrapper">
              <span class="V1__button_decoration"></span>
              <button class="V1__button" @click="
                selectedCollection = collection;
              updateUrl(collection.id);
              refreshResults();
              ">
                {{ collection?.state?.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="NFTs">
      <div v-if="isLoading" class="Blocks__loader">
        <span></span>
      </div>
      <div v-else-if="nfts.length === 0" class="Empty">
        <span class="Empty__nfts"></span>
        <h2>No NFTs found</h2>
      </div>
      <div v-else v-if="view === 'grid'" class="Showcase">
        <NftCard v-for="nft in nfts" :key="nft.id" :nft="nft" :disposable="(account &&
            account.addr &&
            selectedCollection?.state?.admins.includes(account.addr)) ||
          (account &&
            account.addr &&
            selectedCollection?.admins?.includes(account.addr))
          " @remove-item="deleteNFT" />
      </div>
      <div v-if="!isLoading.nfts && view === 'list'" class="Details">
        <NftRow v-for="nft in nfts" :key="nft.id" :nft="nft" :disposable="(account &&
            account.addr &&
            selectedCollection?.state?.admins.includes(account.addr)) ||
          (account &&
            account.addr &&
            selectedCollection?.admins?.includes(account.addr))
          " @remove-item="deleteNFT" />
      </div>
    </div>
  </div>
  <input type="checkbox" id="add-modal" class="modal-toggle" :checked="false" v-model="addModalOpened" />
  <div class="modal">
    <div class="modal-box relative flex flex-col">
      <label for="add-modal" class="btn btn-sm absolute right-2 top-2">✕</label>
      <h3 class="font-bold text-lg text-center">
        {{ selectedCollection?.name }}
      </h3>
      <form class="modal-action flex flex-col" @submit.prevent="addNft">
        <input v-model="nftBeingAdded" class="input input-bordered w-full rounded-lg p-2" type="text" required
          placeholder="NFT IDs (Seperate with spaces)" />
        <button type="submit" class="btn btn-primary rounded-lg mt-4">
          Add
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NftCard from "../components/NftCard.vue";
import { useArWallet, useAccount, useArweave } from "../composables/useState";
import NftRow from "../components/NftRow.vue";
import debounce from "lodash.debounce";
import { nftContractId, collectionContractId, legacyNftContract } from "../config/contracts.json";
import { GlomeNode } from "../config/config.json";
import setArweave from "../plugins/arweave";
const router = useRouter();
let urlParams = new URLSearchParams(window.location.search);

const arweave = useArweave().value;
if (!arweave) setArweave();
const wallet = useArWallet();
const account = useAccount();

const isLoading = ref(true); // set false once nfts are fetched in onMount
const collections = ref([]); // List of all collections, also fetched in onMount
const selectedCollection = ref({}); // Data of collection being viewed
const nfts = ref([]);
const view = ref("grid");

let addModalOpened = ref(false);
let nftBeingAdded = ref("");

// All search params
const forSaleOnly = ref(false);
const searchInput = ref("");
const filter = ref({
  minPrice: 0,
  maxPrice: 0,
  type: "all",
});

const debouncedWatch = debounce(() => {

  refreshResults();
}, 500);

watch(searchInput, debouncedWatch);

// Hard coded temp

const rarifiedCollections = ref([
  {
    contractTxId: `2CDW9_X9fjJEHiC4ibvtKOrRot-eIQp2F3TyrHwxNtA`,
    name: `ARnimals`,
    count: 3,
  },
  {
    contractTxId: `EGmI9FpXY0DzWpALdYLjr939OPbc_H_lPyM6FSdWXGw`,
    name: `ARgonauts`,
    count: 1,
  },
  {
    contractTxId: `TOAaqhPr81gXQCF1Q8pZE7xHlwpfVoRyjLjGy6dO9Ds`,
    name: `Ducks Collection`,
    count: 14,
  },
  {
    contractTxId: `chpEFSGrE7p5vWvldOh5q76DgRCMdYUAe1hPdrSdj1Y`,
    name: `Pure Mattness`,
    count: 6,
  },
  {
    contractTxId: `sW_SvVlY0j7T6K4jOEkLdAzF2q4_6KB5zz1HE8QHfGY`,
    name: `Perceptions`,
    count: 1,
  },
  {
    contractTxId: `RmK6mqHGU_3YG3LBE55_cJRhBxOsZWu8B3hOhDaKNno`,
    name: `Kaleidoscopic Flower`,
    count: 4,
  },
  {
    contractTxId: `l6yYypr2dzNo8AaVZVw8Uve7UpLHQvYodO_ldliCgCw`,
    name: `Awesome Sauce`,
    count: 3,
  },
  {
    contractTxId: `jBf_ykTzUYZOlI7xf_JFLj77uS9hT77XMXXFa2P7-ks`,
    name: `Tom`,
    count: 3,
  },
  {
    contractTxId: `nCYNTGdvj_kSRtkhl7M_zQvND38fufqv4OZNdShXwD4`,
    name: `Ducks`,
    count: 2,
  },
]);

async function updateUrl(collection) {
  if (collection == null) {
    router.push({
      path: `/explore`,
      query: {},
    });
  } else {
    router.push({
      path: `/explore`,
      query: { collection: collection },
    });
  }
}

async function refreshResults() {

  nfts.value = await $fetch(
    `${GlomeNode}/contracts-under-code/${nftContractId}|${legacyNftContract}?expandStates=true`,
    {
      method: "POST",
      body: {
        filterScript: `return (${selectedCollection.value?.state?.items ? `includes(variables.items,id)` : "true"
          } and state.owner~="0" and ${forSaleOnly.value ? "state.forSale==variables.forSale" : "true"
          } and ${searchInput.value
            ? "(similarityScore(state.description,variables.search)>=0.2 or similarityScore(state.name,variables.search)>=0.7)"
            : "true"
          } and ${filter.value > 0 ? " state.price>=variables.minPrice" : "true"} and ${filter.value > 0 ? "state.price<=variables.maxPrice" : "true"
          })`,
        variables: {
          search: searchInput.value,
          forSale: forSaleOnly.value,
          minPrice: filter.value.minPrice * 1e12,
          maxPrice: filter.value.maxPrice * 1e12,
          items: selectedCollection.value?.state?.items,
        },
      },
    }
  );
}

async function deleteNFT(contract) {
  let tags = [
    {
      name: "Contract",
      value: selectedCollection.value.id
        ? selectedCollection.value.id
        : urlParams.get("collection"),
    },
    {
      name: "Input",
      value: JSON.stringify({
        function: "remove-item",
        item: contract,
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

  let tx = {
    tags: tags,
    data: "Glome Contract Call",
  };

  try {
    const signed = await arWallet.value.signDataItem(tx)
    await fetch(`${GlomeNode}/tx`, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream"
      },
      body: signed
    });
    nfts.value = nfts.value.filter((nft) => nft.id != contract);
  } catch (e) {
    console.log(e);
    alert("Failed to post the transaction to delete nft from collection");
  }
}

async function addNft() {
  let newNfts = nftBeingAdded.value.split(" ");
  let inputs = [];
  for (let nft of newNfts) {
    inputs.push({
      function: "add-item",
      item: nft,
    });
  }

  let tags = [
    {
      name: "Contract",
      value: selectedCollection.value.id
        ? selectedCollection.value.id
        : urlParams.get("collection"),
    },
    {
      name: "Input",
      value: JSON.stringify({
        function: "bulk",
        inputs: inputs,
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
    alert("Failed to post the transaction to add nfts to collection");
  }

  addModalOpened.value = false;
  refreshResults();
}

onMounted(async () => {
  if (urlParams.has("collection")) {
    console.log(urlParams.get("collection"));
    let FetchCollection = await $fetch(
      `${GlomeNode}/state/${urlParams.get("collection")}`
    );

    selectedCollection.value = FetchCollection;

    console.log(FetchCollection);
  }
  let nftList = await $fetch(
    `${GlomeNode}/contracts-under-code/${nftContractId}|${legacyNftContract}?expandStates=true`,
    {
      method: "POST",
      body: {
        filterScript: `return ${selectedCollection.value?.items ? `includes(variables.items,id)` : "true"
          } and state.owner~="0"`,
        variables: {
          items: selectedCollection.value?.items,
        },
      },
    }
  );


  isLoading.value = false;
  nfts.value = nftList;

  let collectionsRequest = await $fetch(
    `${GlomeNode}/contracts-under-code/${collectionContractId}?expandStates=true`,
    {
      method: "POST",
    }
  );

  collections.value = collectionsRequest;


});

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

<style scoped>
.Select {
  width: calc((100%) - (var(--page-spacing) * 2));
  color: var(--text-primary);
}

.Spacer {
  flex: 1 1 0px;
}

.Topbar {
  position: relative;
  display: flex;
  width: 1226px;
}

.Forsale {
  flex: 1 1 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.Current {
  margin: 2px 4px;
  padding: 0.375rem 0.75rem;
  color: rgba(146, 158, 161, 0.75);
}

.Search {
  position: relative;
  flex: 1 1 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.Search label,
.Label {
  margin: 2px 4px;
  padding: 0.375rem 0.75rem;
}

.InputWrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

.Input__Search {
  position: relative;
  margin: 2px 4px;
  padding: 0.1875rem 0.375rem;
  border: 1px solid rgba(146, 158, 161, 0.75);
  border-radius: 4px;
  background-color: var(--bg-primary);
  width: 228px;
}

.Input__Search:focus {
  outline: none;
  border: 1px solid rgba(18, 245, 177, 0.829);
}

.SearchIcon {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  aspect-ratio: 1/1;
  margin: 3px 0;
  z-index: 1;
  fill: rgba(146, 158, 161, 0.75);
  transform: scale(0.75);
}

.V1__reset {
  margin: 2px 4px;
  padding: 0.375rem 0.75rem;
  cursor: pointer;
}

.V1__resetIcon {
  width: 16px;
  height: 16px;
  margin: 0 4px;
  padding: 0;
  fill: rgba(146, 158, 161, 0.75);
}

.V1__reset:hover {
  text-decoration: underline 1px rgb(18, 243, 119);
}

.V1__reset:hover .V1__resetIcon {
  fill: rgb(59, 238, 103);
}

.V1__views {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.Select div button {
  margin: 2px 4px;
  padding: 0.375rem 0.75rem;
}

.V1__border {
  width: calc((100vw) - var(--page-spacing) * 2);
  height: 1px;
  max-width: var(--page-max-width);
  background: rgba(17, 23, 32, 1);
  margin: 0 auto;
}

.V1__page {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: calc((100%) - (var(--page-spacing) * 2));
  height: 100%;
  height: var(--page-height);
  color: var(--text-primary);
  /* flex-wrap: wrap; */
  max-width: var(--page-max-width);
  margin: 1rem auto;
}

.Menu {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex: 1 1 0px;
  margin: 0.375rem 1.375rem 0.375rem 0.125rem;
  padding: 0;
  padding-right: 1.375rem;
  border-right: 1px dotted rgba(146, 158, 161, 0.75);
  overflow-x: hidden;
  overflow-y: scroll;
  min-width: 306px;
  height: var(--page-height);
  height: 100%;
}

.MenuSection {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  height: max-content;
  border-radius: 0.75rem;
  /* background-color: rgba(17,23,32,1); */
  margin: 0 0 1.375rem;
  padding: 0.5rem 1rem;
}

.MenuOptions {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.MenuOption {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 2px 4px;
  padding: 0.375rem 0.75rem;
}

.V1__button_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: max-content;
  height: 100%;
  margin: 0 0 0 2px;
  padding: 0;
}

.V1__button_decoration {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 0 0 24px;
  height: 100%;
  margin-left: 2px;
  border-left: 1px solid rgba(146, 158, 161, 0.33);
  transform: scaleY(1.6183);
}

.V1__button_decoration::after {
  content: "";
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 5px;
  height: 4px;
  margin-top: 1px;
  margin-left: -3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  transition: opacity 0.07s ease-in-out;
}

.V1__button_wrapper:hover .V1__button_decoration::after {
  opacity: 1;
}

.V1__button_wrapper:hover .V1__button {
  color: rgba(216, 221, 232, 0.99);
}

.V1__button_wrapper.--active .V1__button_decoration::after {
  opacity: 1;
  background: rgba(110, 205, 147, 0.945);
}

.V1__button_wrapper.--active .V1__button {
  color: rgba(110, 205, 147, 0.945);
}

.Row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
}

.Row input[type="number"] {
  width: 68px;
  border: none !important;
  outline: none !important;
  margin: 0 8px;
  padding: 0 0.375rem;
  border-radius: 4px;
}

.FilterButton {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: max-content;
  height: auto;
  gap: 5px;
  margin: 0px;
  padding: 0;
}

.MenuButton {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: max-content;
  height: auto;
  margin: 0 2px 0 -2px !important;
  padding: 0.375rem 0.75rem !important;
  background: rgba(129, 249, 174, 0.938) !important;
  color: rgba(23, 32, 42, 1) !important;
}

.Reset {
  color: rgb(216, 221, 231) !important;
  margin-right: 100px !important;
  padding: 0.375rem 0.75rem !important;
}

.V1__button {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  color: rgba(238, 242, 255, 0.75);
  font-weight: 500;
  font-size: 12pt;
  cursor: pointer;
}

.NFTs {
  position: relative;
  display: flex;
  justify-items: flex-start;
  align-items: flex-start;
  flex: 0 0 1226px;
  height: var(--page-height);
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 0.375rem auto;
}

.Empty {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.Showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 300px));
  grid-template-rows: repeat(auto-fill, 420px);
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin: 0;
}

.Details {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 1 0px;
  height: 100%;
  margin: 0;
  padding: 0;
}

.Menu {
  animation: fold-out 0.63s forwards linear 1;
}

.MenuHeader,
.MenuOption {
  animation: slide-in 0.63s forwards linear 1;
  white-space: nowrap;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}

@keyframes slide-out {
  0% {
    opacity: 1;
    transform: translateX(0%);
  }

  100% {
    opacity: 0;
    transform: translateX(-100%);
  }
}

@keyframes fold-in {
  from {
    min-width: 306px;
  }

  to {
    min-width: 32px;
    max-width: 32px;
  }
}

@keyframes fold-out {
  from {
    min-width: 32px;
  }

  to {
    min-width: 306px;
  }
}

@keyframes darken {
  0% {
    background: rgba(17, 23, 32, 0);
  }

  100% {
    background: rgba(17, 23, 32, 0.999);
  }
}

@media screen and (max-width: 1776px) {
  .NFTs {
    flex: 0 0 928px;
    margin-right: 0;
  }
}

@media screen and (max-width: 1380px) {
  .Menu {
    animation: fold-in 0.63s forwards linear 1;
    overflow-y: hidden;
  }

  .Select {
    flex-wrap: wrap;
  }

  .Spacer {
    display: none;
  }

  .MenuFoldOverlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--page-height);
    background: rgba(17, 23, 32, 0);
    animation: darken 0.63s forwards linear 1;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }

  .MenuSection {
    overflow: hidden;
  }

  .MenuHeader,
  .MenuOption {
    animation: slide-out 0.63s forwards linear 1;
  }
}

@media screen and (max-width: 1128px) {
  .NFTs {
    flex: 0 0 628px;
    margin-right: 0;
  }
}

@media screen and (max-width: 724px) {
  .NFTs {
    flex: 0 0 328px;
    margin-right: 0;
  }
}

@media screen and (max-width: 460px) {
  .Menu {
    display: none;
    visibility: collapse;
  }

  .Showcase {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fill, 420px);
  }
}
</style>
