<template>
  <div class="V1__select">
    <div class="V1__padding"></div>
    <div class="V1__topbar">
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
  </div>
  <div class="V1__border"></div>
  <div class="V1__page">
    <div class="V1__menu">
      <div class="V1__menuSection">
        <div class="V1__menuHeader">
          <h2>
            Rarified
          </h2>
          <span></span>
        </div>
        <div 
          v-for="(rarifiedCollection, index) in rarifiedCollections"
          class="V1__menuOptions"
        >
          <div 
            class="highlite V1__menuOption"
            :style="{
              animationDuration: `${0.12 + (0.12 * index)}s`
            }"
          >
            <div class="V1__button_wrapper">
              <span class="V1__button_decoration"></span>
              <button
                class="V1__button"
                @click="searchCondition = rarifiedCollection.contractTxId; searchType = 'collection'; searchNFTs(); activate($event)"
              >
                {{ rarifiedCollection.name }}...[{{ rarifiedCollection.count }}]
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="V1__menuSection">
        <div class="V1__menuHeader">
          <h2>
            Filter
          </h2>
          <span></span>
        </div>
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
                @click="forSaleOnly = true; nfts = nfts.result.reduce((acc, cur) => {
                  if (cur.state.forSale) {
                      acc.result.push(cur);
                      acc.total++;
                  }
                  return acc;
                }, {
                  result: [],
                  total: 0}
                ); searchNFTs()"
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
        <div class="V1__menuHeader">
          <h2>
            Highlights
          </h2>
          <span></span>
        </div>
      </div>
      <div class="V1__menuSection">
        <div class="V1__menuHeader">
          <h2>
            Collection detection
          </h2>
          <span></span>
        </div>
        <div 
          v-if="isLoading.collections"
          class="Blocks__loader"
        >
          <span></span>
        </div>
        <div 
          v-else-if="collections.result?.length > 0"   
          class="V1__menuOptions"
          v-for="(collection, index) in [...new Set(collections.result?.filter(collection => collection.state.name !== undefined && collection.state.name !== ''))].filter(collection => ![...rarifiedCollections.map(_ => _.name)].includes(collection.state.name))"
          :key="collection.contractTxId"
        >
          <div 
            class="V1__menuOption highlite"  
          >
            <div class="V1__button_wrapper">
              <span class="V1__button_decoration"></span>
              <button
                class="V1__button"
                @click="searchCondition = collection.contractTxId; searchType = 'collection'; searchNFTs(); activate($event)"
              >
                {{ collection.state.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="V1__menuSection">
        <div class="V1__menuHeader">
          <h2>
            Made with love
          </h2>
          <span></span>
        </div>
      </div>
    </div>
    <div class="V1__nfts">
      <div
        v-if="isLoading.nfts"
        class="Blocks__loader"
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
import { useNfts, useCollections, useIsLoading } from '../composables/useState';
import { useRarifiedcollections } from '../composables/useRarifiedcollections';
import Api from '../plugins/prophet';

const nfts = useNfts();
const collections = useCollections();
const isLoading = useIsLoading();

const rarifiedCollections = useRarifiedcollections();

const view = ref('grid');

const searchCondition = ref('');
const searchType = ref('');
const forSaleOnly = ref(false);
const searchInput = ref('');

const filter = ref({
  minPrice: 0,
  maxPrice: 0
});

function getCollections() {
  Api('collections')
    .then(res => {
      collections.value = res;
    });
}

function filterIfNeeded(nfts) {
  const winston = 1000000000000;
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
};

function activate(e) {
  const target = e.target.parentElement;
  const options = document.body.querySelectorAll('.V1__button_wrapper');
  options.forEach(o => o.classList.remove('--active'));
  target.classList.add('--active');
};

function searchNFTs() {
  if (!searchCondition.value)
    return getNFTs();
    
  const options = {};
  if (searchType.value === "collection")
    options.collection = searchCondition.value;
  else
    options.search = searchCondition.value;
  if (forSaleOnly.value)
    options.forSaleOnly = true;

  getNFTs(options);
};

function getNFTs(options = {}) {
  const ThousandandamillionNfts = new Array(options.pages||2)
    .fill(0)
    .map((_, i) => Api('nfts', {
      ...options, 
      startFrom: i * 100
    }));

  Promise.all(ThousandandamillionNfts)
    .then(res => {
      const flattend = res.map(r => r.result).flat();
      nfts.value = filterIfNeeded(flattend);
    });
};

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
  }, 
  { 
    threshold: 0.5
  });

  const nftCards = document.querySelectorAll('.NftCard');

  Array.from(nftCards).forEach((card) => {
    observer.observe(card);
  });
});

definePageMeta({
  layout: "without-auth"
});
</script>

<style scoped>
.V1__select {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: calc((100%) - (var(--page-spacing) * 2));
  height: 48px;
  color: var(--text-primary);
  overflow: hidden;
  max-width: var(--page-max-width);
  margin: 0 auto;
}

.V1__padding {
  flex: 1 1 0px;
}

.V1__topbar {
  position: relative;
  display: flex;
  width: 1226px;
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
  text-decoration: underline 1px rgb(18, 243, 119);
}

.V1__reset:hover .V1__resetIcon {
  fill: rgb(59, 238, 103);
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
  max-width: var(--page-max-width);
  background: repeating-linear-gradient(
    45deg, 
    var(--bg-primary) 0, 
    var(--bg-primary) 2px,
    grey 2px,
    grey 4px
  );
  margin: 0 auto;
}

.V1__page {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: calc((100%) - (var(--page-spacing) * 2));
  height: 100%;
  color: var(--text-primary);
  /* flex-wrap: wrap; */
  max-width: var(--page-max-width);
  margin: 1rem auto;
}

.V1__menu {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex: 1 1 0px;
  margin: .375rem 1.375rem .375rem 0.125rem;
  padding: 0;
  padding-right: 1.375rem;
  border-right: 1px dotted rgba(146, 158, 161, .75);
  overflow-x: hidden;
  overflow-y: scroll;
  min-width: 306px;
  height: var(--page-height);
}

.V1__menuSection {
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

.V1__menuHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 0;
  padding: .375rem .75rem;
  background: linear-gradient(93deg, rgba(216,221,232,1), rgb(187, 183, 176));
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
  height: 100%;
  margin: 2px 4px;
  padding: .375rem .75rem;
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
    border-left: 1px solid rgba(146, 158, 161, .33);
    transform: scaleY(1.6183);
  }

  .V1__button_decoration::after {
    content: '';
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
  background: rgba(129, 249, 174, 0.938) !important;
  color: rgba(23, 32, 42, 1) !important;
  border-radius: 2px;
  border: var(--border-primary) !important;
}

.V1__menuResetbutton {
  color: rgba(218, 21, 218, 0.911) !important;
  text-decoration: 1px underline currentcolor;
  padding: .375rem .75rem !important
}

/* .V1__menuOption.highlite:hover {
  background: linear-gradient(217deg, rgba(253, 175, 8, 0.938), rgba(206, 8, 156, 0.938));
  background-size: 150% 1%;
  background-position: 0% 0%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
} */


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
  color: rgba(238, 242, 255, .75);
  font-weight: 500;
  font-size: 12pt;
  cursor: pointer;
}

.V1__nfts {
  position: relative;
  display: flex;
  justify-items: flex-start;
  align-items: flex-start;
  flex: 0 0 1226px;
  height: var(--page-height);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 0.375rem auto;
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
  grid-template-columns: repeat(auto-fill, minmax(288px, 300px));
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

@media screen and (max-width: 1776px) {
  .V1__nfts {
    flex: 0 0 928px;
    margin-right: 0;
  }
}

@media screen and (max-width: 1380px) {
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

@media screen and (max-width: 1128px) {
  .V1__nfts {
    flex: 0 0 628px;
    margin-right: 0;
  }
}

@media screen and (max-width: 724px) {
  .V1__nfts {
    flex: 0 0 328px;
    margin-right: 0;
  }
}

@media screen and (max-width: 460px) {
  .V1__menu {
    display: none;
    visibility: collapse;
  }

  .V1__showcase {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fill, 420px);
  }
}
</style>