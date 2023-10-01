<template>
      <div class="relative flex flex-col justify-center items-center w-full max-w-[1740px] mx-auto py-10">
          <div class="flex flex-col justify-center items-center h-full mx-auto mt-32">
              <div class="relative w-full h-full mt-16 max-w-[85vw] mx-auto">
                  <h2 class="text-white text-left max-w-[85vw] text-3xl font-semibold p-2">
                      Low costs for minting your own <span class="Amazing--green font-bold">NFT collection</span>
                  </h2>
                  <p class="max-w-[85vw] text-1xl my-4 p-2 text-lg">
                      The cost of minting NFTs on RareWeave depend on the storage rates of the Arweave network.
                      Pay once, store forever. Currently the RareWeave market does not charge any additional fees.
                      <span>Please note that this policy is most likely to change in the near future, to discourage spamming
                          of both network and marketplace.</span>
                  </p>
              </div>
              <div class="relative flex flex-wrap flex-row justify-between items-center w-max h-max m-[5rem_auto_0] gap-2 p-0 transform-gpu">
                  <div v-for="unit in Object.keys(SIZES)" class="relative flex flex-col justify-evenly items-center w-[286px] h-[186px] bg-black border-[1px] border-gray-800 rounded-[8px] m-2 cursor-default drop-shadow-2xl shadow-amber-200 --observe">
                    <span class="relative flex flex-row justify-center w-max h-[50px] text-2xl font-bold text-gray-400 bg-black rounded-[8px_8px_0_0]">
                      Per {{unit}}
                    </span>
                    <span class="relative flex text-3xl text-transparent bg-clip-text" :class="SIZES_GRADIENTS[unit]">
                      {{ (rates[unit] / AR).toFixed(7) }} AR
                    </span>
                    <span class="relative flex text-2xl font-bold text-gray-400">
                      ~{{ ((rates[unit] / AR) * price).toFixed(2) }} USD
                    </span>
                    <span class="relative flex text-xs font-semibold text-gray-700">
                      {{ rates[unit] }} winston
                    </span>
                  </div>
              </div>
              <div
                  class="relative flex flex-col justify-center items-center w-[calc(100% - var(--page-spacing) * 2)] h-full my-16 mx-auto max-w-[85vw] --observe">
                  <p class="my-4 text-lg">
                      Calculate the cost of minting your own NFT collection.
                  </p>
                  <div
                      class="relative flex flex-row flex-wrap justify-start items-center max-w-[820px] rounded-3xl bg-[rgba(17,23,32,1)]">
                      <div
                          class="relative flex flex-col justify-start items-start flex-[0.75_0.75_0px] h-auto m-4 min-w-[286px]">
                          <h4 class="m-8 text-3xl font-semibold text-white">
                              Arweave ${{ price }}
                          </h4>
                          <p class="m-8 mt-2">
                              All cost are depending on the arweave network.
                              Enter the number of NFTs you want to mint and the average size of each NFT and click on
                              calculate.
                          </p>
                      </div>
                      <form
                          class="relative flex flex-col justify-start items-stretch flex-1 h-full min-h-[168px] m-4 border-l-2 border-solid border-[rgba(255,255,255,0.125)]"
                          autocomplete="off">
                          <h4 class="m-8 text-3xl">
                              <span class="Amazing-text">Estimate mint cost</span>
                          </h4>
                          <div class="relative flex flex-wrap flex-row justify-between items-start flex-1 h-auto m-[0_2rem] p-0 last:flex-[0_0_96px] last:items-center">
                              <label class="relative flex-1 flex">
                                  The number of NFTs in the collection:
                              </label>
                              <span class="relative flex flex-[0_0_128px] rounded overflow-hidden">
                                  <input class="relative flex flex-1 text-white px-1" type="number"
                                      v-model="quantity" min="0" max="10000" required />
                              </span>
                          </div>
                          <div class="relative flex flex-wrap flex-row justify-between items-start flex-1 h-auto m-[0_2rem] p-0 last:flex-[0_0_96px] last:items-center">
                              <label class="relative flex-1 flex">
                                  The average size of a NFT:
                              </label>
                              <span class="relative flex flex-[0_0_128px] rounded overflow-hidden">
                                  <input class="relative flex flex-1 text-white px-1 w-0" type="number" v-model="size" min="0.01" max="10000" step="0.01" required />
                                  <select v-model="sizeUnit">
                                      <template v-for="(unit) in Object.keys(SIZES)">
                                        <option v-bind:value=unit>{{unit}}</option>
                                      </template>
                                  </select>
                              </span>
                          </div>
                          <div class="relative flex flex-wrap flex-row justify-between items-start flex-1 h-auto m-[0_2rem] p-0 last:flex-[0_0_96px] last:items-center text-xl text-white font-bold">
                              Estimate: ${{ ((size * quantity * rates[sizeUnit]) / AR * price).toFixed(5) }}
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
</template>

<script setup>
const SIZES = {
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4
};
const SIZES_GRADIENTS = {
  KB: "bg-gradient-to-r from-[#FF22F3] to-[#9c0cff]",
  MB: "bg-gradient-to-r from-[#33EB60] to-[#20F8C5]",
  GB: "bg-gradient-to-r from-[#22C7FF] to-[#0C9FFF]",
  TB: "bg-gradient-to-r from-[#FFA822] to-[#FF590C]"
}
const AR = 1e12;

const quantity = ref(0);
const size = ref(0);
const sizeUnit = ref('KB');

const { data: rates } = await useAsyncData("rates", async () => {
  const rates = await Promise.all(Object.entries(SIZES).map(async ([unit, size]) => [unit, await $fetch(`https://arweave.net/price/${size}`)]));

  return Object.fromEntries(rates);
});

const { data: price } = await useFetch("https://api.coingecko.com/api/v3/simple/price?ids=arweave&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true", {
  transform: (result) => result.arweave.usd
});
</script>
