<template>
    <div :class="['Section','Highlights'].join(' ')">
        <div class="Layout">
            <h2 class="Title">
                Highlighted
            </h2>
            <div class="Showcase">
                <div
                    v-if="isLoading.nfts"
                >
                    <div class="Loading">
                        <span></span>
                    </div>
                </div>
                <div
                    class="Card --observe"
                    v-else
                    v-for="nft in nfts.result?.filter((nft,i) => i < 8)"
                    :key="nft.contractTxId"
                >
                    <NuxtLink 
                        class="Minter"
                        :to="`/`"
                    >
                        <span>
                            <img
                                src="https://avatars.githubusercontent.com/u/60869810?v=4"
                                alt="Minter"
                                class="Avatar"
                                object-fit="cover"
                                object-position="center"
                            />
                        </span>
                        <div class="Credentials">
                            <span class="Minter">
                                {{  nft.state.minter }}
                            </span>
                            <span class="Name">
                                {{  nft.state.name }}
                            </span>
                            <span class="Date">
                                {{  nft.state.description }}
                            </span>
                        </div>
                    </NuxtLink>
                    <div class="NFT">
                        <Graphic
                            :nft="nft"
                        />
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
    
    .Imagewrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
        /* border-radius: 1rem 1rem 0 0; */
    }

    .Image,
    .Video {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        max-height: 306px;
        object-fit: cover;
        object-position: center;
    }
</style>