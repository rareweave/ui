<template>
    <div class="Pricing">
        <div class="Pricing__wrapper">
            <div>
                <h2 class="Pricing__title">
                    Low costs for minting your own <span class="Amazing-text">NFT collection</span>
                </h2>
                <p class="Pricing__desc">
                    The cost of minting NFTs on RareWeave depend on the storage rates of the Arweave network.
                    Pay once, store forever. Currently the RareWeave market does not charge any additional fees.
                    <span>Please note that this policy is most likely to change in the near future, to discourage spamming of both network and marketplace.</span>
                </p>
            </div>
            <div class="Pricing__tiers">
                <div 
                    v-for="(size, index) in Object.keys(Size)"
                    class="Pricing__tier --observe"
                >
                    <span class="Pricing__tiername">
                        Per {{ size }}
                    </span>
                    <div>
                        <span
                            v-if="isLoadingTiers"
                            class="Pricing__loading"
                        >
                            Loading...
                        </span>
                        <div
                            v-if="priceTiers.length > 3"
                            class="Pricing__content"
                        >
                            <span 
                                :class="['Pricing__ar',`--${size.toLowerCase()}`].join(' ')">
                                {{ (priceTiers[index].ar).toFixed(7) }} AR
                            </span>
                            <span class="Pricing__usd">
                                ~${{ (priceTiers[index].usd).toFixed(index === 0 ? 7 : (index < 2 ? 3 : 2)) }} USD
                            </span>
                            <span class="Pricing__winston">
                                {{ priceTiers[index].winston }} winston
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="Pricing__calcualtor">
                <p class="Pricing__calculator_intro">
                    Calculate the total cost of creating your collection
                </p>
                <div class="Pricing__calculator_content">
                    <div class="Pricing__rate">
                        <h4 class="Pricing__rate_title">
                            Arweave ${{ rates.arweave?.usd?.toFixed(2) }}
                        </h4>
                        <p class="Pricing__rate_desc">
                            All cost are depending on the arweave network.
                            Enter the number of NFTs you want to mint and the average size of each NFT and click on calculate.
                        </p>
                    </div>
                    <form
                        class="Pricing__form"
                        autocomplete="off"
                        @submit.stop.prevent="prevent"
                    >
                        <h4 class="Pricing__form_title">
                            <span class="Amazing-text">Estimate cost of your NFT collection</span>
                        </h4>
                        <div class="Row">
                            <label>
                                Enter the number of NFTs you want to mint:
                            </label>
                            <span class="Pricing__calculate_inputWrapper">
                                <input
                                    class="Pricing__calculate_input"
                                    type="number"
                                    name="quantity"
                                    ref="quantity"
                                    placeholder="0"
                                    min="0"
                                    max="10000"
                                    required
                                />
                            </span>
                        </div>
                        <div class="Row">
                            <label>
                                Enter the average size of the NFTs:
                            </label>
                            <span class="Pricing__calculate_inputWrapper">
                                <input
                                    class="Pricing__calculate_input"
                                    type="number"
                                    name="size"
                                    ref="size"
                                    placeholder="0"
                                    min="0.01"
                                    max="10000"
                                    step="0.01"
                                    required
                                />
                                <select
                                    name="sizeUnit"
                                    ref="sizeUnit"
                                >
                                    <option value="KB">KB</option>
                                    <option value="MB">MB</option>
                                    <option value="GB">GB</option>
                                    <option value="TB">TB</option>
                                </select>
                            </span>
                        </div>
                        <div class="Row">
                            <button
                                type="submit"
                                class="Button --primary"
                                @click="handleSubmit"
                            >
                                Calculate
                            </button>
                            Estimate: {{ collectionSizeInBytes.value  }} ${{ collectionPrice > 0.01 ? collectionPrice.toFixed(2) : collectionPrice.toFixed(7) }}
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
    .Pricing {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: var(--page-max-width);
        margin: 20rem auto 5rem;
        flex: 1 1 0px;

    }
    .Pricing__wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: calc((100%) - var(--page-spacing) * 2);
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .Pricing__title {
        color: rgba(251,250,255,1);
        text-align: center;
        white-space: nowrap;
        width: min-content;
        height: auto;
        margin: 0;
        padding: 0;font-size: 24pt;
        font-weight: 600;
    }

    .Pricing__desc {
        font-size: 14pt;
        margin: 1rem 0;
    }

    .Pricing__tiers {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 3rem auto 0;
        padding: 0;
        transform-style: preserve-3d;
    }

    .Pricing__tier {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 286px;
        height: 186px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 8px;
        margin: 0 auto 1rem;
        transition: 0.7s ease-out;
        background-color: rgba(0,0,0,1);
    }

    .Pricing__tier:hover {
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

    .Pricing__tiername {
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

    .Pricing__content {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0 1.5rem;
    }

    .Pricing__ar {
        position: relative;
        display: flex;
        font-size: 1.75rem;
    }

    .--kb {
        background: linear-gradient(144deg, rgba(255, 34, 243, 1), rgba(156, 12, 255, 1));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .--mb {
        background: linear-gradient(87deg, rgba(51, 235, 96, 1), rgba(32, 248, 197, 1));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .--gb {
        background: linear-gradient(143deg, rgba(34, 199, 255, 1), rgba(12, 159, 255, 1));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .--tb {
        background: linear-gradient(139deg, rgba(255, 168, 34, 1), rgba(255, 89, 12, 1));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .Pricing__usd {
        position: relative;
        display: flex;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--color-white);
    }

    .Pricing__winston {
        position: relative;
        display: flex;
        font-size: .875rem;
        font-weight: 400;
        color: rgba(103,103,118,1);
    }

    .Pricing__calcualtor {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: calc(100% - var(--page-spacing) * 2);
        height: 100%;
        margin: 3rem auto 0;
        padding: 0;

    }

    .Pricing__calculator_intro {
        margin: 1rem 0;
    }

    .Pricing__calculator_content {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        max-width: 820px;
        border-radius: 1.5rem;
        background: rgba(17,23,32,.75)
    }

    .Pricing__rate {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        flex: .75 .75 0px;
        height: auto;
        margin: 1rem 0;
        padding: 0;
    }

    
    .Pricing__rate_title {
        margin: 1rem 2rem;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--color-white);
    }

    .Pricing__rate_desc {
        margin: 1rem 2rem;
        box-sizing: border-box;
    }

    .Pricing__form {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: stretch;
        flex: 1 1 0px;
        height: auto;
        min-height: 168px;
        margin: 2rem 0;
        padding: 0;
        border-left: 1px solid rgba(255,255,255,1);
    }

    .Pricing__form_title {
        margin: 1rem 2rem;
    }
    
    .Row {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex: 1 1 0px;
        height: auto;
        margin: 0 2rem;
        padding: 0;
    }

    .Row:nth-child(4) {
        flex: 0 0 96px;
    }

    .Row span {
        position: relative;
        display: flex;
        flex: 0 0 156px;
    }

    .Pricing__calculate_input {
        position: relative;
        display: flex;
        flex: 1 1 0px;
        color: var(--color-white);
        padding: 0 .375rem;
    }

    .Pricing__calculate_inputWrapper {
        border-radius: 4px;
        overflow: hidden;
    }
</style>