<template>
    <div :class="['Section','Highlights'].join(' ')">
        <div class="Layout">
            <h2 class="Title">
                Highlighted
            </h2>
            <div class="Showcase --observe">
                <div
                    v-if="isLoading.nfts"
                    v-for="i in 8"
                    :key="i+`loading`"
                    class="NFT --loading"
                >
                    <div class="loading">
                        <span></span>
                    </div>
                </div>
                <div
                    class="NFT"
                    v-else
                    v-for="nft in selectionNfts"
                    :key="nft.contractTxId"
                >
                    <div class="Imagewrapper">
                        <img
                            v-if="nft.state?.contentType?.startsWith('image')"
                            :src="`https://prophet.rareweave.store/_ipx/width_420,f_webp/https://arweave.net/${nft.contractTxId}`"
                            :alt="nft.state.name  || 'NFT'"
                            class="Image"
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
                                @load="imgHasBeenLoaded"
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
        border-radius: 1rem 1rem 0 0;
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