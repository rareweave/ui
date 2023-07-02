<template>
    <div class="flex flex-col align-start justify-start w-full flex-1 py-10 ">
        <div class="flex flex-col justify-center items-center h-full mt-32 mx-auto ">

            <div class="relative flex flex-col justify-evenly w-full items-start h-full  mx-auto">
                <h2 class="text-white text-center w-full text-4xl font-semibold font-mono p-2 Amazing--red">
                    Top collections
                </h2>
                <p class="text-1xl my-4 p-2 text-center w-full">
                    Explore recently created collections on the RareWeave market.
                </p>
            </div>
            <div class="Rarified --observe mt-0 max-w-[85vw]">
                <div class="Collection Headers">
                    <span>
                        Collection
                    </span>
                    <span>
                        Quantity
                    </span>



                </div>
                <NuxtLink v-if="!isLoading.collections" v-for="collection of collections" :key="collection.id"
                    class="Collection" :to="`/collection/${collection.id}`">
                    <span class="Amazing-text"> <!-- Collection -->
                        {{ collection.state.name }}
                    </span>
                    <span> <!-- Total / For sale -->
                        {{ collection.state.items?.length }}
                    </span>

                </NuxtLink>

            </div>
        </div>
    </div>
</template>

<script setup>

import initArweave from '../../plugins/arweave';
import { useNfts, useIsLoading, useIsError, useArweave } from '../../composables/useState';
import base64urlencode from 'base64url-encode';
let collections = ref([])
const
    isLoading = useIsLoading(),
    isError = useIsError(),
    arweave = useArweave().value;

const children = ref([]), // any nft that is a child of a collection
    rare = ref([]);

onMounted(async () => {
    if (!arweave) initArweave();

    $fetch(`https://glome.rareweave.store/contracts-under-code/mhbnvFZFgAEjiP-islmBgox8_qD70xNcR1CCcNPo3ps?expandStates=true&limit=10`, {
        method: "POST",
        body: {
            sortScript: `secondContract.creationTime-firstContract.creationTime`,
            filterScript: `"type"!state.name="string"&("len"!state.items>3)`
        }
    }
    )
        .then(res => {
            collections.value = res
            console.log(collections)
        })




});
</script>

<style scoped>    .Rarified {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background: rgba(17, 23, 32, 0.5);
        border-radius: 1.5rem;

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

    @media only screen and (max-width: 1440px) {
        .Collection {
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: repeat(auto-fill, 1fr);
            grid-template-areas:
                "name floorprice sweep"
                "percentage_change_24h percentage_change_7d percentage_change_7d";
        }
    }

    @media only screen and (max-width: 768px) {
        .Collection {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(auto-fill, 1fr);
            grid-template-areas:
                "name floorprice"
                "sweep percentage_change_24h"
                "percentage_change_7d percentage_change_7d";
        }
    }

    @media only screen and (max-width: 480px) {
        .Collection {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(auto-fill, 1fr);
            grid-template-areas:
                "name"
                "floorprice"
                "sweep"
                "percentage_change_24h"
                "percentage_change_7d";
        }
    }



    .Collection:hover {
        background: rgba(17, 23, 32, 0.5);
    }


    .Collection.Headers {
        color: rgba(221, 232, 255, 0.33);

    }

    .Collection.Headers span:nth-child(1) {
        font-weight: 900;
    }

    .Winston {
        font-size: 11pt;
        font-weight: 400;
        color: rgba(221, 232, 255, 0.25);
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