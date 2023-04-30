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
        <div class="V1__menuHeader">
          <h2>
            Rarified
          </h2>
          <span>
            <img
              src="data:image/png;base64,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"
              alt="alpha icon"
              width="24"
              height="24"
            />
          </span>
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
            <button
              class="V1__Button"
              @click="searchCondition = rarifiedCollection.contractTxId; searchType = 'collection'; searchNFTs()"
            >
              {{ rarifiedCollection.name }}...[{{ rarifiedCollection.count }}]
            </button>
          </div>
        </div>
      </div>
      <div class="V1__menuSection">
        <div class="V1__menuHeader">
          <h2>
            Filter
          </h2>
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAoElEQVR4nO3YwQ2DMBAEQL/dfwfubptIGkgkCDgYbkbijVnWsnWtAQBMltFfn55WRQTQ79mAfFn4Wc/sdwngqGhAr70FzrL8AmcTwCjeAAAAdih/e0z163NWCCCT5wGzZwgCOCoL/HENGBdugSs98qP2EMAo3gAAAFaX6lfWCKA/twH50+TmH9MjAfwiGtBrb4EtnALjwafAFuUDAIB2S28BSYwLaddj9wAAAABJRU5ErkJggg=="
              alt="filter icon"
              width="24"
              height="24"
            />
          </span>
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
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEa0lEQVR4nO1ZXWgcVRS+1n+tbuaciVKtVqT6pljUor6IIv4QS8Gq+OI/KgXx5ykqrVGM4JN/KBi0JnPOruI++ODPi0UqitWCWhREWqsV27R77sSkxRqqaEfOdsfuTO5sdtfNzgbywUCY2XvPOff8fefGmAUsYAFdQTRijhWCu818hWW4Rwj37SsVPDPfEJXN0UKw3TJGluFJM98gDHceVh4jYZyaGi30mfmA8C08wwb+lUdOP37gFSn2XyTl/sWm12AJ1lmCrZbg96TS7kcI9gjDJxMlWGl6AZqkQrilGeXtEY88Z3oJGuOW8IsmlV9vehEa30KwKTt08JAleNT0MlTBRgZM9Xo1EsY3GoVPJfAuz1VBy/5ANGQWZX5P5AEcsIybE0YU/ftMXtg5uuwEYdxtCW5xfY8ic5QQ7hfGv4RhxLK/RN8LeVdo2ayF0YsmLwjBg9VTJPxOlU1/n2BYagnH9o4WznGtDwlXCeELJg9sf2n58UK467+EDOCmuZAzNVrom5NEF8K1iVgm2Orywv+Ww/iUJRjqOK+3jDtnVhRc3Uk5EwynCuGkUvCOeiEk/35nXWf4ppNesAzr6zy8rpOn/3NmbS/6N7a790QJVirtFsJhIXxHK1hd09tfezesv2mb+FmCe2dhll+16wXL3q1acmdnr/i3BHh7ywKiTeYYy7AjteHGKqdJCPCuN21CCNY0MqLaUwjWNKWsUP9yW/RusAQPVQcQgk9TJ/Hnb297Z1nCd1NCtLlxNYbJvy0s+RdrQjZrRCXA1dnUw1EoKgFco2VRGJ8Xgg+EYVtTrmQY0fU28FekvZBBm8UyfiaEG4TgcWG4uVI67dy0Ptr4svZwNkXL+GZzvD3pyvrNhOG9lvfQRhj458/Uxx/IXucPzAyXIbNICF5rQbDy+Ffr9wgDvMQSTDdtAOEvrtNXCOFgzcMfVxgu00f/rskeNC5o5bCEL2cI3KwLlS5Uit4FSuKy9pgMvLNDwqtDxgfUSGH8xxFKO/YU+5Y1qP8Pa1in3+s7/Za1LrZ+2CHwQFjEq0wLGB9ZcpJl/MiRN9uU5Jm5hBA+7TDiD9epuLCXTj85dnky9OAHvWYx3YDU4jAZtzAtDNc2WjdZ9gqW8XNH3nwfzwNdgzA+5ki+cJY1zzhO/uvdwSnYPc3rIITPphT60jSAENyVTthcL3Nt6lZBh/T67+l5OGS8NJ20Jk8I4YbUiT4Ss1Kl1UIwbhnLtuSfF1ef+tKpxOvX8tIT8zRgS+JEA+86HeLTpC4e3CfG4ExL8FPC6MBfkYvyUbW5JS9oayfeoMPCtE5RSaPboL6dgLb6VvlNT13choSrZlHsoBC+bhl+bMidGD7MxQDL8IRboWqSlmMyVvvn3R2uQT8mbrkYIASlVDc9JATvV8b6LnT9Piqb46oDP0ElvU47dNcNsIzf1imyUSer5q/VcVCvQ3K7xI0Oz78H9XK2VSYaQ+mDJnB1Tuj2Je54abHvnH7agM7NOiN0Yq8FmB7Ev9xuzCmMigjdAAAAAElFTkSuQmCC"
              alt="stars icon"
              width="24"
              height="24"
            />
          </span>
        </div>
      </div>
      <div class="V1__menuSection">
        <div class="V1__menuHeader">
          <h2>
            Collection detection
          </h2>
          <span>
            <img
              src="data:image/png;base64,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"
              alt="detection icon"
              width="24"
              height="24"
            />
          </span>
        </div>
        <div 
          v-if="isLoading.collections"
          class="Fetching__data loader"
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
            <button
              class="V1__Button"
              @click="searchCondition = collection.contractTxId; searchType = 'collection'; searchNFTs()"
            >
              {{ collection.state.name }}
            </button>
          </div>
        </div>
      </div>
      <div class="V1__menuSection">
        <div class="V1__menuHeader">
          <h2>
            Made with love
          </h2>
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADQklEQVR4nO2az2sTQRTHR6lk30t7Ejwo/gAP6lFED4I9qEgtCP4H9aKiRYuCehAUrAcRL0WxFApt3kv1ojdRxEOvhVZED5XGg6e2mdmoIFKs1K5MDHa7pk0yu9vd6HzgSyDsznvvO28m2WGFsFgsFovFYrFYLBaLxVIvhT6RUTnslIwDkuC1JJiRhPOVzwn9vcrjcX1dmmM0jDcqWlzCMzoJxejVFijF0KPvS1MMI2byznZF8Ka+pJZLz+DnnLMtDTGMKI3AAcUgTRL7I4Kiy7A/yRhGzOhZWSExyfhTMY6V1yPBXck4VSvBarO0WgwTEyLrBG9UtFRrSV24ZBgMBpLDmZ31tKp/va4UI4yCMYxxGc5WCfCtSHCy2vX1GFBWHk/XiBFevhhGFPpEJrgT65kPFj9L2U2SsUsS3JKEhfpmCKf1+NViRNcFv2MYG6By2Pl368Og/xrJeEURzhkm2FEtRsQmdBgbIPXGFph9/5ovFx8uwf5gjBjUb24A4URgsDF/25vOvM/Q8Soxou0AxvEQBkBw/Q/4Zr8rgvacjmv9+2OE6YD55QPCnSUDoDeC5Ba0YjZg3tgAxVAKdMCU/pkrq87dPnERuOYdwDX+1TWBJMOkuQEEz5veAIJnxgYoxhtJFxCBrhsbUOTskRQUEEouZQ8bG+Dph5SontASEShvQGwQYVCMD5MvxFgPRFjcEdyXgkLMlMO9oQ3QKIKXiRfTsOCFiAqVd9qTL6hB5Z32yAzQKManiRdVv56IqPn02NmqT4JSUNzqIpybHcrsEHGg2LmcfgPgkogLzxPr0v33GF55N8V6ESelYdiij51TOPNF9xFsFmuBJOegYvyeeNEVScYfke/6tZCEpyThYuLFEy7q0ymRBIqhJwUGXBVJIgluJ9f60CvSgCS8tvYGLJ1PpgLJcD7uA85Kyy9IgnMijUjGY5LhS4wt/9UlOCHSjDvSulsRvIuh5d+63LZLNAMfh4SjDyOi+JmsjHFfjymaDcXOIX0sHcKAD8Vc9qhoZgr6TS/9EEXgNtDuSt+zpm9/xY07uLFNEVyUBO9X2eQmJcMFfa34lynlWvdIgm5JcK+ibr15Jp2XxWKxWCwW8V/xCzLnVH4Afj5fAAAAAElFTkSuQmCC"
              alt="heart icon"
              width="24"
              height="24"
            />
          </span>
        </div>
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

const rarifiedCollections = ref([
  {
    contractTxId: `2CDW9_X9fjJEHiC4ibvtKOrRot-eIQp2F3TyrHwxNtA`,
    name: `ARnimals`,
    count: 3
  },
  {
    contractTxId: `EGmI9FpXY0DzWpALdYLjr939OPbc_H_lPyM6FSdWXGw`,
    name: `ARgonauts`,
    count: 1
  },
  {
    contractTxId: `TOAaqhPr81gXQCF1Q8pZE7xHlwpfVoRyjLjGy6dO9Ds`,
    name: `Ducks Collection`,
    count: 14
  },
  {
    contractTxId: `chpEFSGrE7p5vWvldOh5q76DgRCMdYUAe1hPdrSdj1Y`,
    name: `Pure Mattness`,
    count: 6
  },
  {
    contractTxId: `sW_SvVlY0j7T6K4jOEkLdAzF2q4_6KB5zz1HE8QHfGY`,
    name: `Perceptions`,
    count: 1
  },
  {
    contractTxId: `RmK6mqHGU_3YG3LBE55_cJRhBxOsZWu8B3hOhDaKNno`,
    name: `Kaleidoscopic Flower`,
    count: 4
  },
  {
    contractTxId: `l6yYypr2dzNo8AaVZVw8Uve7UpLHQvYodO_ldliCgCw`,
    name: `Awesome Sauce`,
    count: 3
  },
  {
    contractTxId: `jBf_ykTzUYZOlI7xf_JFLj77uS9hT77XMXXFa2P7-ks`,
    name: `Tom`,
    count: 3
  },
  {
    contractTxId: `nCYNTGdvj_kSRtkhl7M_zQvND38fufqv4OZNdShXwD4`,
    name: `Ducks`,
    count: 2
  }
]);

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
  justify-content: space-between;
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