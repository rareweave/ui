<template>
    <div :class="['Section','Collections'].join(' ')">
        <div class="Layout">
            <div class="Header">
                <h2 class="Title Amazing--red">
                    Top collections
                </h2>
                <p class="Desc">
                    Explore the most popular collections on the RareWeave market.
                </p>
            </div>
            <div class="Rarified --observe">
                <div 
                    class="Collection Headers"  
                >
                    <span>
                        Collection
                    </span>
                    <span>
                        Total / For sale
                    </span>
                    <span>
                        Price volume
                    </span>
                    <span>
                        Marketcap
                    </span>
                    <span>
                        FP
                    </span>
                    <span>
                        ~avg price
                    </span>
                    <span>
                        
                    </span>
                </div>
                <NuxtLink 
                    v-for="collection in rarified.filter((c, i) => i < 10 && c.cap > 0)"
                    :key="collection.contractTxId"
                    class="Collection"
                    :to="`/collection/${collection.contractTxId}`"
                >
                    <span class="Amazing-text">
                        {{ collection.state.name }}
                    </span>
                    <span>
                        {{ collection.count }} / {{ collection.forSaleCount > 0 ? collection.forSaleCount : 0 }}
                    </span>
                    <span>
                        {{ collection.volume > 1 ? collection.volume.toFixed(3)+` AR` : ( collection.volume <= 0 ? `--` : collection.volume.toFixed(7)+` AR`) }}
                    </span>
                    <span>
                        {{ collection.cap > 0 ? collection.cap.toFixed(2)+`%` : `--` }}
                    </span>
                    <span>
                        {{ collection.volume > 0 ? collection.floorprice > 1 ? collection.floorprice.toFixed(3)+` AR` : ( collection.floorprice <= 0 ? `--` : collection.floorprice.toFixed(3)+` AR`) : `--` }}
                    </span>
                    <span>
                        {{ collection.avarage > 0 ? collection.avarage.toFixed(3)+` AR` : `--` }}
                    </span>
                    <span>
                        {{ new Date(collection.timestamp).toLocaleDateString("en-GB") }}
                    </span>
                    <span>

                    </span>
                    <span>
                        {{ collection.cap > 0 ? `$`+(collection.cap * totalRequestPricings.usd / 100).toFixed(2) : `` }}
                    </span>
                </NuxtLink>
                <div class="Notification">
                    <p>
                        
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Api from '../../plugins/prophet';
import { useNfts, useRates } from '../../composables/useState';

const nfts = useNfts(),
rates = useRates();

const rarified = ref([]),
children = ref([]), // any nft that is a child of a collection
totalRequestPricings = ref({
    ar: 0,
    usd: 0
});

onMounted(async () => {
setTimeout(() => {
    Api(`collections`)
        .then(res => {
            const limit = 10;
            const nftIds = nfts.value.result.map(nft => nft.contractTxId);
            rarified.value = res.result.filter((c,i) => ![
                undefined, 'undefined', '', ' ', 'test', 'Test' // excluded collection names
            ].includes(c.state.name))
                .filter((c, i) => c.state.name.length > 0) // filter out empty names
                .filter((c, i) => i < limit)
                .map(c => {
                    let volume = [];
                    c.state.items.forEach(id => {
                        if (nftIds.includes(id))
                        volume.push(nfts.value.result.find(nft => nft.contractTxId === id).state.price / 1e12);
                        children.value.push(nfts.value.result.filter(nft => nft.contractTxId === id));
                    });
                    c.volume = volume.reduce((a, b) => a + b, 0);
                    c.count = c.state.items.filter(id => nftIds.includes(id)).length;
                    c.forSaleCount = c.state.items.filter(id => nftIds.includes(id)).filter(id => nfts.value.result.find(nft => nft.contractTxId === id).state.forSale === true).length;
                    c.floorprice = Math.min(...volume.filter(v => v > 0));
                    volume.forEach((val, i) => {
                        const min = Math.min(...volume);
                        console.log(val, min, val === min);
                    });
                    c.avarage = c.volume / c.forSaleCount;
                    c.percentage_change_24h = 0.0; // todo
                    c.percentage_change_7d = 0.0; // todo
                    return c;
                })
                .filter(c => c.count > 0)
                .sort((a, b) => b.volume - a.volume); // sort by volume
                // .sort((a, b) => b.state.items.length - a.state.items.length); // sort by nft count
        })
        .then(() => {
            const ar = children.value.map(c => c[0]).filter(c => c !== undefined).reduce((a, b) => a + b.state.price / 1e12, 0);
            const usd = parseInt(ar * rates.value.arweave.usd * 1e2) / 1e2;
            totalRequestPricings.value = {
                usd,
                ar
            };
            rarified.value.forEach((c, i) => {
                c.cap = (c.volume / totalRequestPricings.value.ar) * 100;
            });
        })
        .catch(err => {
            console.log(err);
        });
     
}, 3_000);   
});
</script>

<style scoped>
    .Header {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0 auto 48px;
        padding: 0;
    }

    .Desc {
        font-size: 12pt;
        font-weight: 400;
        text-align: center;
        margin: .5rem 0;
    }
    
    .Rarified {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 1rem 2rem 10rem;
        background: rgba(17, 23, 32, 0.5);
        border-radius: 3.75rem;
        padding-bottom: 2rem;
    }

    .Collection {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: 
            "name floorprice volume percentage_change_24h percentage_change_7d";
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 12px 38px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .Collection:hover {
        background: rgba(17, 23, 32, 0.5);
    }


    .Collection.Headers {
        color: rgba(221,232,255,0.33);
        margin-top: 1.5rem;
    }

    .Collection.Headers span:nth-child(1) {
        font-weight: 900;
    }

    .Notification {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
    }

    .Notification p {
        font-size: 12pt;
        font-weight: 400;
        text-align: center;
        margin: .5rem 0;
        padding: 1.125rem 2.25rem;
    }

</style>