<template>
  <div class="V1__select">
    <div class="V1__padding"></div>
    <div class="V1__forsale">
      <button
        :class="{ active: forSaleOnly === false }"
        @click="forSaleOnly = false; searchType !== '' ? searchNFTs() : getNFTs()"
      >
        Show all
      </button>
      <button
        :class="{ active: forSaleOnly === true }"
        @click="nfts = nfts.result.reduce((acc, cur) => {
          if (cur.state.forSale) {
              acc.result.push(cur);
              acc.total++;
          }
          return acc;
        }, {
          result: [],
          total: 0}
        );"
      >
        For sale only
      </button>
      <div class="V1__currentcount">
        items: {{ nfts.result?.length }}
      </div>
    </div>
    <!-- <div class="V1__sort">
      <button>
        Sort by
      </button>
      <button>
        Newest
      </button>
      <button>
        Oldest
      </button>
      <button>
        Price
      </button>
    </div> -->
    <div class="V1__search">
      <label>
        Search:
      </label>
      <span class="V1__searchInputWrapper">
        <input 
          type="text" 
          placeholder="Name, description etc" 
          v-model="searchInput"
          @keydown.enter="searchCondition = searchInput; searchNFTs()"
          class="V1__searchInput"
        />
        <span 
          class="V1__searchIcon"
          @click="searchCondition = searchInput; searchNFTs()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
      </span>
      <span
        @click="searchInput = ''; searchCondition = ''; searchType = ''; forSaleOnly = false; filter = { minPrice: 0, maxPrice: 0 }; getNFTs()"
        class="V1__reset"
      >
        Reset
      </span>
      

    </div>
    <div class="V1__views">
      <button
        :class="{ active: view === 'grid' }"
        @click="view = 'grid'"
      >
        grid
      </button>
      <button
        :class="{ active: view === 'list' }"
        @click="view = 'list'"
      >
        list
      </button>
    </div>
  </div>
  <div class="V1__border"></div>
  <div class="V1__page">
    <div class="V1__menu">
      <div class="V1__menuSection">
        <h2 
          class="V1__menuHeader"
        >
          Rarified
        </h2>
        <div class="V1__menuOptions">
          <div 
            class="highlite V1__menuOption"
            :style="{
              animationDuration: `${0.1266 + (0.1266 * 1)}s`
            }"
          >
            <button
              class="V1__Button"
              @click="searchCondition = `2CDW9_X9fjJEHiC4ibvtKOrRot-eIQp2F3TyrHwxNtA`; searchType = 'collection'; searchNFTs()"
            >
              ARnimals...[3]
            </button>
          </div>
          <div class="highlite V1__menuOption"
            :style="{
              animationDuration: `${0.1266 + (0.1266 * 2)}s`
            }"
          >
            <button
              class="V1__Button"
              @click="searchCondition = `EGmI9FpXY0DzWpALdYLjr939OPbc_H_lPyM6FSdWXGw`; searchType = 'collection'; searchNFTs()"
            >
              ARgonauts...[1]
            </button>
          </div>
          <div class="highlite V1__menuOption"
            :style="{
              animationDuration: `${0.1266 + (0.1266 * 3)}s`
            }"
          >
            <button
              class="V1__Button"
              @click="searchCondition = `TOAaqhPr81gXQCF1Q8pZE7xHlwpfVoRyjLjGy6dO9Ds`; searchType = 'collection'; searchNFTs()"
            >
              Ducks Collection...[14]
            </button>
          </div>
          <div class="highlite V1__menuOption"
            :style="{
              animationDuration: `${0.1266 + (0.1266 * 4)}s`
            }"
          >
            <button
              class="V1__Button"
              @click="searchCondition = `chpEFSGrE7p5vWvldOh5q76DgRCMdYUAe1hPdrSdj1Y`; searchType = 'collection'; searchNFTs()"
            >
              Pure Mattness...[5]
            </button>
          </div>
          <div class="highlite V1__menuOption"
            :style="{
              animationDuration: `${0.1266 + (0.1266 * 5)}s`
            }"
          >
            <button
              class="V1__Button"
              @click="searchCondition = `sW_SvVlY0j7T6K4jOEkLdAzF2q4_6KB5zz1HE8QHfGY`; searchType = 'collection'; searchNFTs()"
            >
              Perceptions...[1]
            </button>
          </div>
          <div class="highlite V1__menuOption"
            :style="{
              animationDuration: `${0.1266 + (0.1266 * 6)}s`
            }"
          >
            <button
              class="V1__Button"
              @click="searchCondition = `RmK6mqHGU_3YG3LBE55_cJRhBxOsZWu8B3hOhDaKNno`; searchType = 'collection'; searchNFTs()"
            >
              Kaleidoscopic Flower...[4]
            </button>
          </div>
          <div class="highlite V1__menuOption"
            :style="{
              animationDuration: `${0.1266 + (0.1266 * 7)}s`
            }"
          >
            <button
              class="V1__Button"
              @click="searchCondition = `l6yYypr2dzNo8AaVZVw8Uve7UpLHQvYodO_ldliCgCw`; searchType = 'collection'; searchNFTs()"
            >
              Awesome Sauce...[3]
            </button>
          </div>
          <div class="highlite V1__menuOption"
            :style="{
              animationDuration: `${0.1266 + (0.1266 * 8)}s`
            }"
          >
            <button
              class="V1__Button"
              @click="searchCondition = `nCYNTGdvj_kSRtkhl7M_zQvND38fufqv4OZNdShXwD4`; searchType = 'collection'; searchNFTs()"
            >
              Ducks...[2]
            </button>
          </div>
        </div>
      </div>
      <div class="V1__menuSection">
        <h2 class="V1__menuHeader">
          Filter
        </h2>
        <div class="V1__menuOptions">
          <div class="V1__menuOption">
            <div class="V1__menuRow">
              <label>
                Min:
              </label>
              <input
                type="number"
                v-model="filter.minPrice"
                min="0"
                max="1000000000"
                step="0.1"
              >
              <span>
                AR
              </span>
            </div>
          </div>
          <div class="V1__menuOption">
            <div class="V1__menuRow">
              <label>
                Max:
              </label>
              <input
                type="number"
                v-model="filter.maxPrice"
                min="0"
                max="1000000000"
                step="0.1"
              >
              <span>
                AR
              </span>
            </div>
          </div>
          <div class="V1__menuOption">
            <span class="V1__menuFilterbuttons">
              <button 
                class="V1__menuButton"
                @click="forSaleOnly = true; searchNFTs()"
              >
                Apply
              </button>
              <button 
                class="V1__menuResetbutton"
                @click="filter = { minPrice: 0, maxPrice: 0 }; forSaleOnly = false; searchNFTs()"
              >
                Remove filter
              </button>
            </span>
          </div>
        </div>
      </div>
      <div class="V1__menuSection">
        <h2 class="V1__menuHeader">
          Collection detection
        </h2>
        <div 
          v-if="isLoading.collections"
          class="Fetching__data loader"
        >
          <span></span>
        </div>
        <div 
          v-else-if="collections.result?.length > 0"   
          class="V1__menuOptions"
          v-for="(collection, index) in [...new Set(collections.result?.filter(collection => collection.state.name !== undefined && collection.state.name !== ''))]"
          :key="collection.contractTxId"
        >
          <div 
            class="V1__menuOption highlite"  
          >
            <button
              class="V1__Button"
              @click="searchCondition = collection.contractTxId; searchType = 'collection'; searchNFTs()"
            >
              {{ collection.state.name }}
            </button>
          </div>
        </div>
      </div>
      <div
        class="V1__menuFoldOverlay"
        v-if="!isFolded.menu"
      >
        <span>
          >
        </span>
      </div>
    </div>
    <div class="V1__nfts">
      <div
        v-if="isLoading.nfts"
        class="Fetching__data"
      >
        <span></span>
      </div>
      <div 
        v-else-if="nfts.result?.length === 0" 
        class="V1__empty"
      >
        <span class="Empty__nfts"></span>
        <h2>
          No NFTs found
        </h2>
      </div>
      <div 
        v-else v-if="view === 'grid'" 
        class="V1__showcase"
      >
        <NftCard 
          v-for="nft in nfts.result" 
          :key="nft.contractTxId" 
          :nft="nft"
        />
      </div>
      <div 
        v-if="view === 'list'" 
        class="V1__details"
      >
        <NftDetail 
          v-for="nft in nfts.result" 
          :key="nft.contractTxId" 
          :nft="nft"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NftCard from '../components/NftCard.vue';
import NftDetail from '../components/NftDetail.vue';

const nfts = ref([]);
const collections = ref([]);

const isLoading = ref({
  nfts: false,
  collections: false
});
const isFolded = ref({
  menu: false
});

const view = ref('grid');

const searchCondition = ref('');
const searchType = ref('');
const forSaleOnly = ref(false);
const searchInput = ref('');
const filter = ref({
  minPrice: 0,
  maxPrice: 0
});

function api(endpoint, params = {}) {
  const proto = 'https';
  const host = 'prophet.rareweave.store';
  const _ = {
    nfts: 'nfts',
    collections: 'collections'
  };
  // TODO: add params
  return `${proto}://${host}/${_[endpoint]}`;  
}

function filterIfNeeded(nfts) {
  const winston = 1_000_000_000_000;
  const _min = filter.value.minPrice * winston;
  const _max = filter.value.maxPrice * winston;
  const res = nfts.filter(nft => {
    if (_min > 0 && nft.state.price < _min)
      return false;
    if (_max > 0 && nft.state.price > _max)
      return false;
    return true;
  });
  return { ...nfts, result: res };
}

function searchNFTs() {
  if (!isLoading.value.nfts)
    isLoading.value.nfts = true;

  const params = searchType.value === "collection"
    ? `collection=${searchCondition.value}`
    : `search=${searchCondition.value}`
    + (forSaleOnly.value ? "&forSaleOnly=true" : "");

  $fetch(`${api('nfts')}?${params.toString()}`)
    .then(res => {
      nfts.value = filterIfNeeded(res.result);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      isLoading.value.nfts = false;
    });
}

function getNFTs() {
  if (!isLoading.value.nfts)
    isLoading.value.nfts = true;

  $fetch(api('nfts'))
    .then(res => {
      nfts.value = filterIfNeeded(res.result);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      isLoading.value.nfts = false;
    });
}

function getCollections() {
  if (!isLoading.value.collections)
    isLoading.value.collections = true;

  $fetch(api('collections'))
    .then(res => {
      collections.value = res;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      isLoading.value.collections = false;
    });
}

onMounted(async () => {
  getCollections();
  getNFTs();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target.querySelector('img');
        const loader = entry.target.querySelector('.NftCard__Loader');
        loader.style.display = 'none';
        img.src = img.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const nftCards = document.querySelectorAll('.NftCard');
  nftCards.forEach((card) => {
    observer.observe(card);
  });
});

definePageMeta({
  layout: "without-auth"
})
</script>

<style scoped>
.V1__select {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 48px;
  margin: 0;
  padding: 0 var(--page-spacing);
  color: var(--text-primary);
  overflow: hidden;
}
.V1__padding {
  flex: 0 0 23%;
}
.V1__forsale,
.V1__sort {
  flex: 1 1 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.V1__currentcount {
  margin: 2px 4px;
  padding: .375rem .75rem;
  color: rgba(146, 158, 161, .75);
}
.V1__search {
  position: relative;
  flex: 1 1 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.V1__search label {
  margin: 2px 4px;
  padding: .375rem .75rem;
}
.V1__searchInputWrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
.V1__searchInput {
  position: relative;
  margin: 2px 4px;
  padding: .1875rem .375rem;
  border: 1px solid rgba(146, 158, 161, .75);
  border-radius: 4px;
  background-color: var(--bg-primary);
  width: 228px;
}
.V1__searchInput:focus {
  outline: none;
  border: 1px solid rgba(219,174,98,1);
}
.V1__searchIcon {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  aspect-ratio: 1/1;
  margin: 3px 0;
  z-index: 1;
  fill: rgba(146, 158, 161, .75);
  transform: scale(0.75);
  cursor: pointer;
}
.V1__reset {
  margin: 2px 4px;
  padding: .375rem .75rem;
  cursor: pointer;
}
.V1__resetIcon {
  width: 16px;
  height: 16px;
  margin: 0 4px;
  padding: 0;
  fill: rgba(146, 158, 161, .75);
}
.V1__reset:hover {
  text-decoration: underline 1px rgba(219,174,98,1);
}
.V1__reset:hover .V1__resetIcon {
  fill: rgba(219,174,98,1);
}
.V1__views {
  flex: .75 .75 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.V1__select div button {
  margin: 2px 4px;
  padding: .375rem .75rem;
}
.V1__border {
  width: calc((100vw) - var(--page-spacing) * 2);
  height: 1px;
  margin: 0 var(--page-spacing) 1.375rem;
  padding: 0;
  background: repeating-linear-gradient(45deg,
      var(--bg-primary) 0,
      var(--bg-primary) 2px,
      grey 2px,
      grey 4px);
}
.V1__page {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 var(--page-spacing);
  color: var(--text-primary);
  flex-wrap: wrap;
}
.V1__menu {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex: .21 .21 0px;
  height: var(--page-height);
  margin: .375rem 1.375rem .375rem 0.125rem;
  padding: 0;
  padding-right: 1.375rem;
  border-right: 1px dotted rgba(146, 158, 161, .75);
  overflow-x: hidden;
  overflow-y: scroll;
  /* margin: 0 auto; */
  min-width: 306px;
}
.V1__menuSection {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  height: max-content;
  
  margin: 0 0 1.375rem;
  padding: .375rem .75rem;
  border: 1px dotted rgba(146, 158, 161, .75);
  border-radius: 6px;
}
.V1__menuHeader {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 0;
  padding: .375rem .75rem;
  background: rgba(253, 175, 8, 0.938);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
  font-size: 15pt;
}
.V1__menuOptions {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.V1__menuOption {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 2px 4px;
  padding: .375rem .75rem;
}
  
.V1__menuRow {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
}
.V1__menuRow input[type="number"] {
  width: 68px;
  border: none !important;
  outline: none !important;
  margin: 0 4px;
}
.V1__menuFilterbuttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: max-content;
  height: auto;
  margin: 0;
  padding: 0;
}
.V1__menuButton {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: max-content;
  height: auto;
  margin: 0 2px 0 -2px !important;
  padding: .1875rem .375rem !important;
  background: rgba(219, 174, 57, 0.938) !important;
  color: rgba(23, 32, 42, 1) !important;
  border-radius: 2px;
  border: var(--border-primary) !important;
}

.V1__menuResetbutton {
  color: crimson !important;
  text-decoration: 1px underline currentcolor;
  padding: .375rem .75rem !important
}

.V1__menuOption.highlite:hover {
  background: linear-gradient(217deg, rgba(253, 175, 8, 0.938), rgba(206, 8, 156, 0.938));
  background-size: 150% 1%;
  background-position: 0% 0%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.V1__menuOption button {
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
  color: var(--text-primary);
  font-weight: 500;
  font-size: 12pt;
  cursor: pointer;
}
.V1__nfts {
  position: relative;
  display: flex;
  justify-items: flex-start;
  align-items: flex-start;
  flex: .99 .99 0px;
  height: var(--page-height);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 0 auto;
}
.V1__empty {
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
.V1__showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 308px));
  grid-template-rows: repeat(auto-fill, 420px);
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin: 0;
}
.V1__details {
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


.V1__menu {
  animation: fold-out .63s forwards linear 1;
}
.V1__menuHeader,
.V1__menuOption {
    animation: slide-in .63s forwards linear 1;
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
      background: rgba(17,23,32, 0);
    }
    100% {
      background: rgba(17,23,32, 0.999);
    }
  }

@media screen and (max-width: 860px) {
  .V1__menu {
    animation: fold-in .63s forwards linear 1;
    overflow-y: hidden;
  }
  .V1__select {
    flex-wrap: wrap;
  }
  .V1__padding {
    display: none;
  }
  .V1__menuFoldOverlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--page-height);
    background: rgba(17,23,32, 0);
    animation: darken .63s forwards linear 1;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
  .V1__menuSection {
    overflow: hidden;
  }  
  .V1__menuHeader,
  .V1__menuOption {
    animation: slide-out .63s forwards linear 1;
  }
}
</style>