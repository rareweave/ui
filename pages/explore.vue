<template>
  <div
    class="w-[calc(100%-var(--page-spacing)*2)] text-slate-200 md:flex-wrap flex justify-start items-center max-w-[1740px] min-h-12 mx-auto overflow-hidden">
    <div class="flex-1 md:hidden"></div>
    <div class="relative flex w-full">
      <div class="m-[2px_4px] p-[0.375rem_0.75rem] text-zinc-600">items: {{ nfts.length }}</div>
      <div class="relative flex flex-1 flex-row justify-end items-center">
        <span class="releative flex flex-row justify-center items-center">
          <input
            class="relative m-[2px_4px] p-[0.1875rem_0.375rem] border border-solid rounded border-zinc-600 bg-[#1117267F] w-56 focus:outline-none focus:border-green-500"
            type="text" placeholder="Search..." v-on:input="onSearch" v-model="searchInput" />
          <span class="absolute scale-75 aspect-square top-0 right-0 h-full m-[3px_0]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="feather feather-search">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </span>
      </div>
      <div class="flex flex-row justify-end items-center">
        <button class="m-[2px_4px] p-[0.375rem_0.75rem]" :class="{ active: view === 'grid' }" @click="view = 'grid'">
          grid
        </button>
        <button class="m-[2px_4px] p-[0.375rem_0.75rem]" :class="{ active: view === 'list' }" @click="view = 'list'">
          list
        </button>
      </div>
    </div>
  </div>
  <div
    class="w-[calc(100vw-var(--page-spacing)*2)] h-0.5 max-w-[var(--page-max-width)] bg-[#111720FF] m-[0_auto]"></div>
  <div
    class="flex flex-row items-stretch w-[calc(100%-((var(--page-spacing))*2))] h-[var(--page-height)] text-[var(--text-primary)] max-w-[var(--page-max-width)] m-auto mt-4 mb-4">
    <div
      class="relative flex flex-col justify-start items-stretch flex-[1_1_0] m-[0.375rem_1.375rem_0.375rem_0.125rem] p-0 pr-[1.375rem] border-r border-dotted border-opacity-75 overflow-x-hidden overflow-y-scroll min-w-[306px] h-full">
      <div class="flex flex-col justify-start items-stretch w-full h-auto rounded-lg m-0 mb-6 p-2 px-4">
        <div
          class="whitespace-nowrap relative flex flex-row justify-between items-center w-full h-auto m-0 p-3 font-bold text-2xl">
          <h2 class="bg-gradient-to-r bg-clip-text text-transparent from-[#897ce6] to-[#59c996]">Exploration</h2>
          <span></span>
        </div>
        <div class="flex flex-col justify-start items-center w-full h-full m-0 p-0">
          <div
            class="flex flex-row justify-start items-center w-full h-full m-[2px_4px] p-[0.375rem_0.75rem] whitespace-nowrap">
            <div class="flex flex-row justify-start items-center w-auto h-full m-0 ml-2 p-0">
              <span class="border border-gray-600 mr-3 h-full"></span>
              <button
                class="flex flex-row justify-start items-center w-full h-auto m-0 p-0 border-none bg-transparent text-[rgba(238,242,255,0.75)] font-medium text-base cursor-pointer"
                @click="
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
      <template v-if="(loggedIn && isCollectionOwner)">
        <div class="flex flex-col justify-start items-stretch w-full h-auto rounded-lg m-0 mb-6 p-2 px-4">
          <div
            class="whitespace-nowrap relative flex flex-row justify-between items-center w-full h-auto m-0 p-3 font-bold text-2xl">
            <h2 class="bg-gradient-to-r bg-clip-text text-transparent from-[#897ce6] to-[#59c996]">Admin Only</h2>
            <span></span>
          </div>
          <div class="flex flex-col justify-start items-center w-full h-full m-0 p-0">
            <div
              class="flex flex-row justify-start items-center w-full h-full m-[2px_4px] p-[0.375rem_0.75rem] whitespace-nowrap">
              <div class="flex flex-row justify-start items-center w-auto h-auto space-x-1.5 m-0 p-0">
                <label for="add-modal"
                       class="btn btn-xl text-lg amazing-button rounded-md hover:rounded-lg transition-all font-mono m-1 w-full">Add
                  NFTS</label>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="flex flex-col justify-start items-stretch w-full h-auto rounded-lg m-0 mb-6 p-2 px-4">
        <div
          class="whitespace-nowrap relative flex flex-row justify-between items-center w-full h-auto m-0 p-3 font-bold text-2xl">
          <h2 class="bg-gradient-to-r bg-clip-text text-transparent from-[#897ce6] to-[#59c996]">Filter</h2>
          <span></span>
        </div>
        <div class="flex flex-col justify-start items-center w-full h-full m-0 p-0">
          <div
            class="flex flex-row justify-start items-center w-full h-full m-[2px_4px] p-[0.375rem_0.75rem] whitespace-nowrap">
            <div class="flex flex-row justify-start items-center w-full h-auto m-0 p-0">
              <label> Min: </label>
              <input class="w-[68px] border-none focus:outline-none m-0 mx-2 p-0 px-2 rounded-md" type="number"
                     v-model="filter.minPrice" min="0" max="1000000000" step="0.1" />
              <span> AR </span>
            </div>
          </div>
          <div
            class="flex flex-row justify-start items-center w-full h-full m-[2px_4px] p-[0.375rem_0.75rem] whitespace-nowrap">
            <div class="flex flex-row justify-start items-center w-full h-auto m-0 p-0">
              <label> Max: </label>
              <input class="w-[68px] border-none focus:outline-none m-0 mx-2 p-0 px-2 rounded-md" type="number"
                     v-model="filter.maxPrice" min="0" max="1000000000" step="0.1" />
              <span> AR </span>
            </div>
          </div>
          <div
            class="flex flex-row justify-start items-center w-full h-full m-[2px_4px] p-[0.375rem_0.75rem] whitespace-nowrap">
            <div class="flex flex-row justify-start items-center w-full h-auto m-0 p-0">
              <label class="cursor-pointer label">
                <input type="checkbox" v-model="forSaleOnly" class="checkbox checkbox-warning" />
                <span class="label-text ml-2">For sale only</span>
              </label>
            </div>
          </div>
          <div
            class="flex flex-row justify-start items-center w-full h-full m-[2px_4px] p-[0.375rem_0.75rem] whitespace-nowrap">
            <div class="flex flex-row justify-start items-center w-full h-auto m-0 p-0">
              <label class="mr-2">Type</label>
              <select v-model="filter.type" class="relative py-1 px-2">
                <option value="all">All</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>
            </div>
          </div>
          <div
            class="flex flex-row justify-start items-center w-full h-full m-[2px_4px] p-[0.375rem_0.75rem] whitespace-nowrap">
            <div class="flex flex-row justify-start items-center w-auto h-auto space-x-1.5 m-0 p-0">
              <button
                class="flex flex-row justify-start items-center w-auto h-auto m-0 mx-1 mb-[-2px] p-2 px-3 bg-[rgba(129,249,174,0.938)] text-[rgba(23,32,42,1)]"
                @click="refreshResults()">
                Apply
              </button>
              <button class="text-[rgb(216,221,231)] mr-32 p-2 px-3" @click="
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
      <div class="flex flex-col justify-start items-stretch w-full h-max mb-5 p-[0.5rem_1rem]">
        <div
          class="whitespace-nowrap relative flex flex-row justify-between items-center w-full h-auto m-0 p-3 font-bold text-2xl">
          <h2 class="bg-gradient-to-r bg-clip-text text-transparent from-[#897ce6] to-[#59c996]">Collection
            detection</h2>
          <span></span>
        </div>
        <div v-if="collections.length > 0" class="flex justify-start items-center w-full h-full"
             v-for="(collection) in [...new Set(collections.filter((nullableCollection) => nullableCollection?.state?.name))]"
             :key="collection.id">
          <div
            class="flex flex-row justify-start items-center w-full h-full m-[2px_4px] p-[0.375rem_0.75rem] whitespace-nowrap">
            <div class="flex flex-row justify-start items-center w-auto h-full m-0 ml-2 p-0">
              <span
                class="border border-gray-600 mr-3 h-full"></span>
              <button
                class="flex flex-row justify-start items-center w-full h-auto m-0 p-0 border-none bg-transparent text-[rgba(238,242,255,0.75)] font-medium text-base cursor-pointer"
                @click="
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
    <div
      class="relative flex justify-start items-start flex-none h-full w-[1226px] m-auto my-1 p-0 overflow-x-hidden overflow-y-scroll">
      <div v-if="isLoading" class="relative flex w-full h-full flex-col justify-center items-center">
        <span class="h-20 w-20 animate-spin rounded-full border-8 border-t-gray-500" />
      </div>
      <div v-else-if="nfts.length === 0"
           class="relative flex w-full h-full m-0 p-0 flex-col justify-center items-center">
        <h2>No NFTs found</h2>
      </div>
      <div v-else v-if="view === 'grid'"
           class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center h-screen w-screen">
        <NftCard v-for="nft in nfts" :key="nft.id" :nft="nft" />
      </div>
      <div v-if="!isLoading && view === 'list'"
           class="relative flex flex-col justify-start items-start flex-[1_1_0] h-full m-0 p-0">
        <NftRow v-for="nft in nfts" :key="nft.id" :nft="nft" />
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
import { useArWallet, useAccount, useArweave, useAccountTools } from "../composables/useState";
import NftRow from "../components/NftRow.vue";
import debounce from "lodash.debounce";
import { nftContractId, collectionContractId, legacyNftContract } from "../config/contracts.json";
import { GlomeNode } from "../config/config.json";
import setArweave from "../plugins/arweave";
import { ar } from "date-fns/locale";

const router = useRouter();
const urlParams = new URLSearchParams(window.location.search);

const arweaveSigner = useArweaveSigner();
const arweave = useArweave();
if(!arweave) setArweave();

const loggedIn = computed(() => !!arweaveSigner.address);
const isCollectionOwner = computed(() => selectedCollection.value?.admins?.includes(account.addr));

const isLoading = ref(true);
const collections = ref([]);
const selectedCollection = ref({});
const nfts = ref([]);
const view = ref("grid");

let addModalOpened = ref(false);
let nftBeingAdded = ref("");

const forSaleOnly = ref(false);
const searchInput = ref("");
const filter = ref({
  minPrice: 0,
  maxPrice: 0,
  type: "all"
});

const debouncedWatch = debounce(() => refreshResults(), 500);
watch(searchInput, debouncedWatch);

function updateUrl(collection) {
  if (collection == null) {
    router.push({
      path: `/explore`,
      query: {}
    });
  } else {
    router.push({
      path: `/explore`,
      query: { collection: collection }
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
        } and state.price>=tonumber(variables.minPrice) and state.price<=tonumber(variables.maxPrice))`,
        variables: {
          search: searchInput.value,
          forSale: forSaleOnly.value,
          minPrice: (filter.value.minPrice * 1e12).toString(),
          maxPrice: (filter.value.maxPrice * 1e12).toString(),
          items: selectedCollection.value?.state?.items
        }
      }
    }
  );
}

async function addNft() {
  const newNfts = nftBeingAdded.value.split(" ").map((item) => ({ function: "add-item", item }));

  await arweaveSigner.dispatch(await arweave.createTransaction({
    data: "Glome Contract Call",
    tags: encodeTags(createTags(
      selectedCollection.value?.id
        ? selectedCollection.value.id
        : urlParams.get("collection"),
      {
        function: "bulk",
        inputs: newNfts
      }
    ))
  }));

  addModalOpened.value = false;
  await refreshResults();
}

onMounted(async () => {
  if (urlParams.has("collection")) {
    selectedCollection.value = await $fetch(`${GlomeNode}/state/${urlParams.get("collection")}`);
  }

  nfts.value = await $fetch(
    `${GlomeNode}/contracts-under-code/${nftContractId}|${legacyNftContract}?expandStates=true`,
    {
      method: "POST",
      body: {
        filterScript: `return ${selectedCollection.value?.items ? `includes(variables.items,id)` : "true"
        } and state.owner~="0"`,
        variables: {
          items: selectedCollection.value?.items
        }
      }
    }
  );

  collections.value = await $fetch(
    `${GlomeNode}/contracts-under-code/${collectionContractId}?expandStates=true`,
    {
      method: "POST"
    }
  );

  isLoading.value = false;
});

function createTags(contract, input) {
  return [
    {
      name: "Contract",
      value: JSON.stringify(contract)
    },
    {
      name: "Input",
      value: JSON.stringify(input)
    },
    {
      name: "App-Name",
      value: "SmartWeaveAction"
    },
    {
      name: "App-Version",
      value: "0.3.0"
    },
    {
      name: "Nonce",
      value: Date.now().toString()
    },
    {
      name: "SDK",
      value: "0.3.0"
    }
  ];
}

definePageMeta({
  layout: "without-auth"
});
</script>
