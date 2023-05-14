<template>
    <div :class="['Section','Highlights'].join(' ')">
        <div class="Wrapper">
            <h2 class="Title">
                Highlighted NFTs
            </h2>
            <div class="Showcase --observe">
                <div
                    class="NFT"
                    v-for="nft in selectionNfts"
                >
                    <div class="Imagewrapper">

                        <img
                            v-if="nft.state?.contentType?.startsWith('image')"
                            class="Image"
                            :src="`https://prophet.rareweave.store/_ipx/width_420,f_webp/https://arweave.net/${nft.contractTxId}`"
                            :alt="nft.state.name  || 'NFT'"
                            @load="imgHasBeenLoaded"
                        />
                        <video
                            v-else-if="nft.state?.contentType?.startsWith('video')" 
                            autoplay 
                            muted 
                            controls
                            loop
                            class="Video"
                        >
                            <source
                                :src="`https://prophet.rareweave.store/${nft.contractTxId}`"
                                :type="nft.state?.contentType"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useNfts, useIsLoading } from '../../composables/useState';

const nfts = useNfts();
const isLoading = useIsLoading();

const selectionNfts = ref([]);

const config = {
    l: 8 // length of array
};

onMounted(async () => {
    const poll = setInterval(() => {
        if (!isLoading.value.nfts) {
            clearInterval(poll);
            selectionNfts.value = nfts.value.result.filter((nft, i) => i < config.l);
        };
    }, 1_000);
    
});
</script>

<style scoped>
    .Highlights {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .Wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: calc((100%) - var(--page-spacing) * 2);
        height: 100%;
    }

    .Title {
        font-size: 24px;
        font-weight: 600;
        color: var(--text-primary);
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

    .NFT {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 306px;
        background: var(--bg-secondary);
    }

    .Imagewrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 306px;
        background: var(--bg-secondary);
    }
</style>