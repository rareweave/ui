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
                        Quantity / For sale
                    </span>
                    <span>
                        Volume
                    </span>
                    <span>
                        Sweep price
                    </span>
                    <span>
                        FP
                    </span>
                    <span>
                        Average
                    </span>
                    <span>
                        
                    </span>
                </div>
                <NuxtLink
                    v-if="!isLoading.collections"
                    v-for="collection in rare.sort((a,b) => b.volume - a.volume)"
                    :key="collection.contractTxId"
                    class="Collection"
                    :to="`/collection/${collection.contractTxId}`"
                >
                    <span class="Amazing-text"> <!-- Collection -->
                        {{ collection.state.name }} 
                    </span>
                    <span> <!-- Total / For sale -->
                        {{ collection.count }} / {{ collection.forSaleCount }}
                    </span>
                    <span> <!-- Volume -->
                        {{ arweave.ar.winstonToAr(collection.volume, { decimals: 2 }) }} AR
                    </span>
                    <span> <!-- Price -->
                        {{ collection.totalprice !== 0 ? arweave.ar.winstonToAr(collection.totalprice, { decimals: 2 }) + ` AR` : `-` }}   
                    </span>
                    <span> <!-- FP -->
                        {{ collection.forSaleCount > 0 ? arweave.ar.winstonToAr(collection.floorprice, { decimals: 2 }) + ` AR` : `-` }}
                    </span>
                    <span> <!-- ~avg price -->
                        {{ collection.totalprice > 0 && collection.forSaleCount > 0 ? arweave.ar.winstonToAr(collection.totalprice / collection.forSaleCount, { decimals: 2 }) + ` AR` : `-` }}
                    </span>
                    <span> <!-- Collection -->
                        {{ new Date(collection.timestamp).toLocaleDateString(`en-GB`) }}
                    </span>
                    <span class="Winston"> <!-- Total / For sale -->
                        {{ `` }}
                    </span>
                    <span class="Winston"> <!-- Volume -->
                        {{ collection.volume > 0 ? collection.volume : 0 }}
                    </span>
                    <span class="Winston"> <!-- Marketcap -->
                        {{ `` }}
                    </span>
                    <span class="Winston"> <!-- FP -->
                        <!-- {{ collection.forSaleCount > 0 ? collection.floorprice : `` }} -->
                    </span>
                    <span class="Winston"> <!-- ~avg price -->
                        <!-- {{ collection.totalprice > 0 && collection.forSaleCount > 0 ? collection.totalprice / collection.forSaleCount : `` }} -->
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
import initArweave from '../../plugins/arweave';
import { useNfts, useIsLoading, useArweave } from '../../composables/useState';

const nfts = useNfts(),
isLoading = useIsLoading(),
arweave = useArweave();

const children = ref([]), // any nft that is a child of a collection
rare = ref([]);

onMounted(async () => {
    if (!arweave.value) 
        initArweave();

    const f = () => {
        Api(`collections`)
            .then(res => {
                const limit = 10;
                const nftIds = nfts.value.result.map(nft => nft.contractTxId);
                    
                res.result
                    .filter((c, i) => c.state.name.length > 0 && c.state.name !== undefined && c.state.name !== ' ')
                    .filter((c, i) => i < limit)
                    .forEach(async c => {
                        c.state.items.forEach(id => {
                            if (nftIds.includes(id))
                            children.value.push(nfts.value.result.filter(nft => nft.contractTxId === id));
                        });
                        c.nfts = c.state.items.filter(id => nftIds.includes(id));
                        c.count = c.nfts.length;
                        c.forSaleCount = c.state.items.filter(id => nftIds.includes(id)).filter(id => nfts.value.result.find(nft => nft.contractTxId === id).state.forSale === true).length;
                        c.volume = 0;
                        c.nfts = await Promise.all(c.nfts
                            .map(id => nfts.value.result.find(nft => nft.contractTxId === id))
                            .map(async nft => {
                                const res = await Api(`contract-interactions`, {
                                    action: `finalize-buy`, 
                                    contract: nft.contractTxId 
                                });
                                const result = await res.result;
                                const n = result.length > 0 ? Number(res.result.reduce((a, b) => a.block.height > b.block.height ? a : b).quantity.winston) : 0;
                                nft.salesHistory = result;
                                nft.lastSalePrice = n;
                                c.volume += n;
                                return nft;
                            }));
                        c.totalprice = c.count > 0 && c.nfts.filter(nft => nft.state.price != 0).length > 0 ? Number(c.nfts.filter(nft => nft.state.price != 0).reduce((a, b) => Number(a) + Number(b.state.price), 0)) : 0;
                        c.floorprice = c.count > 0 && c.nfts.filter(nft => nft.state.price != 0).length > 0 ? Number(c.nfts.filter(nft => nft.state.price != 0).reduce((a, b) => Number(a.state.price) < Number(b.state.price) ? a : b).state.price) : 0;
                        c.percentage_change_24h = 0.0; // todo
                        c.percentage_change_7d = 0.0; // todo
                        // console.log(c);
                        if (c.count > 0)
                            rare.value.push(c);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const checkIfAvailable = () => {
        if (nfts.value?.result?.length > 0)
            f();
        else
            setTimeout(() => {
                checkIfAvailable();
            }, 300);
    };

    checkIfAvailable();
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
            "name floorprice sweep percentage_change_24h percentage_change_7d";
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

    .Winston {
        font-size: 11pt;
        font-weight: 400;
        color: rgba(221,232,255,0.25);
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