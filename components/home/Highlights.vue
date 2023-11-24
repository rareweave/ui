<template>
    <div class="_Section Highlights flex flex-col items-center justify-center w-full flex-1 mx-auto py-10">
        <div class="flex flex-col justify-center items-center h-full mx-auto mt-32">
            <h2 class="text-white text-left whitespace-nowrap max-w-[85vw] text-3xl font-semibold">
                Highlighted
            </h2>
            <div class="grid grid-cols-auto-fill min-w-[288px] max-w-[300px] auto-rows-[420px] justify-start items-start w-full h-full m-0">
                <div v-if="isLoading.nfts">
                    <div class="Loading">
                        <span></span>
                    </div>
                </div>
                <div class="Card --observe" v-else v-for="nft in nfts.result?.filter((nft, i) => i < 8)"
                    :key="nft.contractTxId">
                    <NuxtLink class="Minter" :to="`/`">
                        <span>
                            <img src="https://avatars.githubusercontent.com/u/60869810?v=4" alt="Minter" class="Avatar"
                                object-fit="cover" object-position="center" />
                        </span>
                        <div class="Credentials">
                            <span class="Minter">
                                {{ nft.state.minter }}
                            </span>
                            <span class="Name">
                                {{ nft.state.name }}
                            </span>
                            <span class="Date">
                                {{ nft.state.description }}
                            </span>
                        </div>
                    </NuxtLink>
                    <div class="NFT">
                        <Graphic :nft="nft" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Graphic from '../Graphic.vue';
import { useNfts, useIsLoading } from '../../composables/useState';

const nfts = useNfts();
const isLoading = useIsLoading();
</script>

<style scoped>
.Highlights {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.Layout {
    justify-content: flex-start;
}

.Title {
    /* font-size: 24px;
        font-weight: 600;
        color: var(--text-primary); */
    margin-bottom: 24px;
}

.Showcase {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
}

.Card {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start
}

.Minter {
    position: relative;
    flex: 0 0 144px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.Avatar {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    overflow: hidden;
}

.NFT {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 306px;
    aspect-ratio: 1/1;
    margin: 0 auto 48px;
    background: var(--bg-secondary);
    overflow: hidden;
}
</style>
