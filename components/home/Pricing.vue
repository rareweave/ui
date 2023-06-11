<template>
    <div class="relative flex flex-col justify-center items-center w-full max-w-[var(--page-max-width)] mx-auto py-10">
        <div class="flex flex-col justify-center items-center h-full mx-auto mt-32">
            <div class="relative w-full h-full mt-16 max-w-[85vw] mx-auto">
                <h2 class="text-white text-left max-w-[85vw] text-4xl font-semibold">
                    Low costs for minting your own <span class="Amazing--green">NFT collection</span>
                </h2>
                <p class="max-w-[85vw] text-1xl my-4">
                    The cost of minting NFTs on RareWeave depend on the storage rates of the Arweave network.
                    Pay once, store forever. Currently the RareWeave market does not charge any additional fees.
                    <span>Please note that this policy is most likely to change in the near future, to discourage spamming
                    of both network and marketplace.</span>
                </p>
            </div>
            <div class="Tiers">
                <div v-for="(size, index) in Object.keys(Size)" class="Tier --observe">
                    <span class="Tier__title">
                        Per {{ size }}
                    </span>
                    <div>
                        <span v-if="isLoadingTiers">
                            Loading...
                        </span>
                        <div v-if="priceTiers.length > 3" class="Tier__price">
                            <span :class="['Ar', `--${size.toLowerCase()}`].join(' ')">
                                {{ (priceTiers[index].ar).toFixed(7) }} AR
                            </span>
                            <span class="Usd">
                                ~${{ (priceTiers[index].usd).toFixed(index === 0 ? 7 : (index < 2 ? 3 : 2)) }} USD </span>
                                    <span class="Winston">
                                        {{ priceTiers[index].winston }} winston
                                    </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative flex flex-col justify-center items-center w-[calc(100% - var(--page-spacing) * 2)] h-full my-16 mx-auto max-w-[85vw] --observe">
                <p class="my-4">
                    Calculate the cost of minting your own NFT collection.
                </p>
                <div class="relative flex flex-row flex-wrap justify-between items-center max-w-[820px] rounded-3xl bg-[rgba(17,23,32,1)]">
                    <div class="relative flex flex-col justify-center items-start flex-[0.75_0.75_0px] h-auto m-4 min-w-[286px]">
                        <h4 class="m-8 text-3xl font-semibold text-white">
                            Arweave ${{ rates.arweave?.usd?.toFixed(2) }}
                        </h4>
                        <p class="m-8 mt-2">
                            All cost are depending on the arweave network.
                            Enter the number of NFTs you want to mint and the average size of each NFT and click on
                            calculate.
                        </p>
                    </div>
                    <form class="relative flex flex-col justify-evenly items-stretch flex-1 h-auto min-h-[168px] my-8 border-l-2 border-solid border-[rgba(255,255,255,0.125)]" autocomplete="off" @submit.stop.prevent="prevent">
                        <h4 class="m-8 text-2xl">
                            <span class="Amazing-text">Estimate collection cost</span>
                        </h4>
                        <div class="Row">
                            <label class="relative flex-1 flex">
                                The number of NFTs in the collection:
                            </label>
                            <span class="relative flex flex-[0_0_128px] rounded overflow-hidden">
                                <input class="relative flex flex-1 text-white px-1" type="number" name="quantity" ref="quantity" placeholder="0" min="0"
                                    max="10000" required />
                            </span>
                        </div>
                        <div class="Row">
                            <label class="relative flex-1 flex">
                                The average size of a NFT:
                            </label>
                            <span class="relative flex flex-[0_0_128px] rounded overflow-hidden">
                                <input class="relative flex flex-1 text-white px-1" type="number" name="size" ref="size" placeholder="0" min="0.01"
                                    max="10000" step="0.01" required style="width:0px" />
                                <select name="sizeUnit" ref="sizeUnit">
                                    <option value="KB">KB</option>
                                    <option value="MB">MB</option>
                                    <option value="GB">GB</option>
                                    <option value="TB">TB</option>
                                </select>
                            </span>
                        </div>
                        <div class="Row">
                            <button type="submit" class="Button --primary" @click="handleSubmit">
                                Calculate
                            </button>
                            Estimate: {{ collectionSizeInBytes.value }}
                            ${{ collectionPrice.toFixed(collectionPrice > 0.01 ? 2 : 7) }}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRates } from '../../composables/useState';

const rates = useRates();

const priceTiers = ref([]);
const isLoadingTiers = ref(false);

const quantity = ref(0);
const size = ref(0);
const sizeUnit = ref('KB');

const collectionPrice = ref(0);
const collectionSizeInBytes = ref(0);

const Size = {
    KB: 1024,
    MB: 1048576,
    GB: 1073741824,
    TB: 1099511627776
};

async function fetchArweaveRate() {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=arweave&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true');
    const data = await res.json();
    rates.value.arweave = data.arweave;
};

async function fetchPriceTiers() {
    isLoadingTiers.value = true;
    console.log('state isLoadingTiers', isLoadingTiers.value)
    const { KB, MB, GB, TB } = Size;
    const tierEndpoints = [
        "https://arweave.net/price/" + KB,
        "https://arweave.net/price/" + MB,
        "https://arweave.net/price/" + GB,
        "https://arweave.net/price/" + TB
    ];
    const requestOptions = {
        body: null,
        method: 'GET',
        mode: 'cors'
    };
    const getTiers = tierEndpoints.map(endpoint => fetch(endpoint, requestOptions));
    Promise.all(getTiers)
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(prices => {
            Object.keys(Size)
                .forEach((size, i) => {
                    priceTiers.value.push({
                        size: size,
                        ar: prices[i] / 1000000000000,
                        usd: (prices[i] / 1000000000000) * rates.value.arweave.usd,
                        winston: prices[i]
                    });
                });
        })
        .then(() => {
            isLoadingTiers.value = false;
            console.log('state isLoadingTiers', isLoadingTiers.value)
        })
        .catch(err => {
            console.log(err);
        });
};

async function fetchPricing(size) {
    const options = {
        body: null,
        method: 'GET',
        mode: 'cors'
    };
    const res = await fetch(`https://arweave.net/price/` + size, options);
    const data = await res.json();
    return data / 1000000000000 * rates.value.arweave.usd;
};

async function handleSubmit() {
    const q = quantity.value.value;
    const s = size.value.value;
    const u = sizeUnit.value.selectedOptions[0].value;
    const sizeInBytes = Size[u] * s;
    const totalSizeInBytes = sizeInBytes * q;
    console.log(sizeInBytes, totalSizeInBytes / Size.MB)
    const price = await fetchPricing(parseInt(Math.round(totalSizeInBytes)));
    collectionPrice.value = price;
    collectionSizeInBytes.value = totalSizeInBytes;
};

onMounted(async () => {
    await fetchArweaveRate();
    await fetchPriceTiers();
});
</script>

<style scoped>
    .Tiers {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 5rem auto 0;
        padding: 0;
        transform-style: preserve-3d;
    }

    .Tier {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 286px;
        height: 186px;
        border: 1px solid rgba(221, 235, 255, 0.125);
        border-radius: 8px;
        margin: 0 auto 1rem;
        transition: 0.7s ease-out;
        background-color: rgba(0,0,0,1);
        cursor: default;
    }

    .Tier:hover {
        box-shadow:
            0px 0px 1px rgba(34, 255, 126, 0.2),
            1px 0px 2px rgba(34, 255, 133, 0.25),
            2px 0px 4px rgba(34,255,200,0.2),
            4px 0px 8px rgba(34,255,200,0.2),
            8px 0px 16px rgba(34,255,200,0.2),
            -1px 0px 2px rgba(34,255,200,0.2),
            -2px 0px 4px rgba(34,255,200,0.2),
            -4px 0px 8px rgba(34,255,200,0.2),
            -8px 0px 16px rgba(34,255,200,0.2)
        ;
    }

    .Tier__title {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--color-white);
        background-color: var(--color-black);
        border-radius: 8px 8px 0 0;
    }

    .Tier__price {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0 1.5rem;
    }
    .--kb {
        background: linear-gradient(144deg, rgba(255, 34, 243, 1), rgba(156, 12, 255, 1));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .--mb {
        background: linear-gradient(87deg, rgba(51, 235, 96, 1), rgba(32, 248, 197, 1));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .--gb {
        background: linear-gradient(143deg, rgba(34, 199, 255, 1), rgba(12, 159, 255, 1));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .--tb {
        background: linear-gradient(139deg, rgba(255, 168, 34, 1), rgba(255, 89, 12, 1));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .Ar {
        position: relative;
        display: flex;
        font-size: 1.75rem;
    }

    .Usd {
        position: relative;
        display: flex;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--color-white);
    }

    .Winston {
        position: relative;
        display: flex;
        font-size: .875rem;
        font-weight: 400;
        color: rgba(103,103,118,1);
    }
    
    .Row {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        flex: 1 1 0px;
        height: auto;
        margin: 0 2rem;
        padding: 0;
    }

    .Row:last-child {
        flex: 0 0 96px;
        align-items: center;
    }
</style>