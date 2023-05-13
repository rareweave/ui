<template>
    <div
        :class="['Centerfold','Section'].join(' ')"
    >
        <div class="Hero__wrapper">
            <div class="Hero__col">
                <div>
                    <span class="Hero__editonLabel">
                        Alpha Edition
                    </span>
                    <h1 class="Hero__title">
                        RareWeave
                    </h1>
                    <p class="Hero__desc">
                        Welcome to RareWeave! You have come to a magical land!
                        Here you can find the most amazing NFTs on the Arweave blockchain and easily trade them for a few ounces of gold.
                        With our amazing technology, you can now easily create your own NFTs and sell them on the market.
                    </p>
                    <div class="Hero__actions">
                        <button
                            :onClick="() => {}"
                            class="Button --primary"
                        >
                            Explore
                        </button>
                        <button
                            :onClick="() => {}"
                            class="Button"
                        >
                            &gt; Learn about creating NFTs
                        </button>
                    </div>
                </div>
            </div>
            <div class="Hero__col">
                <div class="Hero__pick">
                    <div 
                        class="Hero__imageWrapper_pick"
                        v-for="nft in topNfts.filter((nft, i) => i < 1)"
                    >
                        <img
                            v-if="nft.state?.contentType?.startsWith('image')"
                            class="Hero__image_pick"
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
                            class="Hero__pickVideo"
                        >
                            <source
                                :src="`https://prophet.rareweave.store/${nft.contractTxId}`"
                                :type="nft.state?.contentType"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <!-- <div class="Hero__imageIcons">
                        <span>
                            <img
                                alt=""
                                src="data:image/png;base64,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"
                                width="48"
                                height="48"
                            />
                        </span>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="Hero__bar">
            <div>
                <h2 class="Hero__title">
                    Explore the arweave market for <span class="Amazing-text">liquid NFTs</span>
                </h2>
                <p class="Hero__desc">
                    Our powerful filters and sorting methods will help you find the perfect NFT for your collection.
                    As the marketplace keeps growing, our algorithms will be updated to bring you the best experience possible,
                    while keeping our cost and carbon footprint as low as possible.
                </p>
            </div>
            <div class="Hero__topNfts">
                <div class="Hero__topNfts_controls">
                    <div 
                        class="Hero__topNfts_control --left"
                        @click="decrementIndex"
                    >
                        &lt;
                    </div>
                    <div 
                        class="Hero__topNfts_control --right"
                        @click="incrementIndex"
                    >
                        &gt;
                    </div>
                </div>
                <div 
                    v-if="topNfts.length === 0"
                    class="Hero__topNfts_loader"
                >
                    <div class="Hero__topNft_placeholder">
                        <div class="Hero__topNft_detailsPlaceholder">
                            <h4 class="Hero__topNft_titlePlaceholder"></h4>
                        </div>
                    </div>
                    <div class="Hero__topNft_placeholder">
                        <div class="Hero__topNft_detailsPlaceholder">
                            <h4 class="Hero__topNft_titlePlaceholder"></h4>
                        </div>
                    </div>
                    <div class="Hero__topNft_placeholder">
                        <div class="Hero__topNft_detailsPlaceholder">
                            <h4 class="Hero__topNft_titlePlaceholder"></h4>
                        </div>
                    </div>
                    <div class="Hero__topNft_placeholder">
                        <div class="Hero__topNft_detailsPlaceholder">
                            <h4 class="Hero__topNft_titlePlaceholder"></h4>
                        </div>
                    </div>
                </div>
                <div class="Hero__topNfts_figure">
                    <div
                        v-for="nft in topNfts"
                        :key="nft.contractTxId"
                        class="Hero__topNft"
                    >
                        <NuxtLink
                            :to="`nft/${nft.contractTxId}`"
                        >
                            <div class="Hero__topNft_imageWrapper">
                                <img
                                    v-if="nft.state?.contentType?.startsWith('image')"
                                    class="Hero__image"
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
                                    class="Hero__video"
                                >
                                    <source
                                        :src="`https://prophet.rareweave.store/${nft.contractTxId}`"
                                        :type="nft.state?.contentType"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div class="Hero__topNft_details">
                                <h4 class="Hero__topNft_title">
                                    {{ nft.state.name || 'NFT' }}
                                </h4>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useNfts, useIsLoading } from '../../composables/useState';
import Api from '../../plugins/prophet';



const nfts = useNfts();
const topNfts = ref([]);
const topNftsIndex = ref(0);

const displayNfts = 1 + 4 + 1; // first and last are invisible for animation purposes

function randomIndex () {
    if (!nfts.value.result) 
        return 100;
    
    return Math.floor(Math.random() * nfts.value.result.length - displayNfts);
};

function incrementIndex() {
    if (topNftsIndex.value + displayNfts >= nfts.value.result.length) {
        // topNftsIndex.value = 0;
    } else {
        topNftsIndex.value += 1;
    }
    topNfts.value = nfts.value.result.filter((nft, i) => i >= topNftsIndex.value && i <= topNftsIndex.value + (displayNfts - 1));
};

function decrementIndex() {
    if (topNftsIndex.value <= 0) {
        // topNftsIndex.value = nfts.value.result.length - 3;
    } else {
        topNftsIndex.value -= 1;
    }
    topNfts.value = nfts.value.result.filter((nft, i) => i >= topNftsIndex.value && i <= topNftsIndex.value + (displayNfts - 1));
};

onMounted(async () => {
    Api('nfts', { forSaleOnly: true })
        .then(res => {
            nfts.value = res;
            topNftsIndex.value = randomIndex();
            topNfts.value = res.result.filter((nft, i) => i >= topNftsIndex.value && i <= topNftsIndex.value + (displayNfts - 1));
        })
        .catch(err => {
            console.log(err);
        });
});
</script>

<style scoped>
    .Centerfold {
        margin-top: 15rem;
    }

    .Hero__wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        width: calc((100%) - var(--page-spacing) * 2);
        height: 100%;
    }

    .Hero__bar {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: calc((100%) - var(--page-spacing) * 2);
        height: 100%;
        margin-top: 10rem;
        z-index: 0;
    }

    .Hero__col {
        flex: 1 0 50%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
    }
    .Hero__col:nth-child(2) {
        justify-content: flex-end;
    }

    h1.Hero__title {
        font-size: 28pt;
        font-weight: 600;
    }
    h2.Hero__title {
        font-size: 24pt;
        font-weight: 600;
    }
    .Hero__title {
        color: rgba(251,250,255,1);
        text-align: center;
        white-space: nowrap;
        width: min-content;
        height: auto;
        margin: 0;
        padding: 0;
    }

    .Hero__desc {
        font-size: 14pt;
        margin: 1rem 0;
    }
    .Hero__actions {
        margin: .675rem .125rem;
    }

    .Hero__editonLabel {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: max-content;
        height: auto;
        padding: .375rem .75rem;
        border-radius: .375rem;
        background-color: rgb(28, 27, 32);
        margin: 0 0 5rem;
        border: 1px solid rgba(251,250,255,.25);
    }

    .Hero__pick {
        height: 100%;
        aspect-ratio: 1/1;
        position: relative;
        flex: 1 1 0px;
        object-fit: cover;
        object-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
        transform-style: preserve-3d;
    }

    .Hero__imageWrapper_pick {
        transform: rotate3d(1,1,1,7.2deg);
        animation: hover-like-clouds 10s infinite forwards;
    }

    @keyframes hover-like-clouds {
        0% {
            transform: rotate3d(1,1,1,7.2deg) translate3d(0,0,0);
        }
        5% {
            transform: rotate3d(1,1,1,7.2deg) translate3d(0,-1%,0);
        }
        25% {
            transform: rotate3d(1,1,1,7.2deg) translate3d(0,-10%,0);
        }
        50% {
            transform: rotate3d(1,1,1,7.2deg) translate3d(0,5%,0);
        }
        75% {
            transform: rotate3d(1,1,1,7.2deg) translate3d(0,-7.5%,0);
        }
        100% {
            transform: rotate3d(1,1,1,7.2deg) translate3d(0,0,0);
        }
    }

    .Hero__pick span img,
    .Hero__pick span video {
        position: relative;
        transform-style: preserve-3d;
        transform: rotate3d(1,1,1,3.6deg);
        border-radius: 3.75rem;
        box-shadow: 
            0px 1px 1px rgba(0,0,0,0.2), 
            1px 2px 2px rgba(0,0,0,0.2), 
            2px 4px 4px rgba(0,0,0,0.2), 
            4px 8px 8px rgba(0,0,0,0.2)
        ;
    }

    .Hero__imageIcons {
        position: absolute;
        width: 66%;
        height: 66%;
        inset: 16.66%;
        display: flex;

    }

    .Hero__topNfts {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        max-width: calc((4 * 246px) + (3 * 3.75rem));
        height: 318px;
        margin: 96px auto 48px;
    }

    .Hero__topNfts_figure {
        position: absolute;
        top: 0;
        left: calc(((246px) + (3.75rem)) * -1);
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        width: calc((6 * 246px) + (5 * 3.75rem));
        height: 100%;
        transform-style: preserve-3d;
    }

    .Hero__topNfts_loader {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        width: calc((4 * 246px) + (3 * 3.75rem));
        height: 100%;
        transform-style: preserve-3d;
        z-index: 999;
    }

    .Hero__topNfts_controls {
        position: absolute;
        top: 48.75%;
        left: -0.675%;
        width: 101.25%;
        height: 0;
        transform: translateY(-50%);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        z-index: 1;
    }

    .Hero__topNfts_control {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        background: rgba(233, 235, 238, 0.75);
        border-radius: 50%;
        color: rgb(17, 7, 59);
        font-size: 1.5rem;
        font-weight: 600;
        cursor: pointer;
    }

    .Hero__topNft {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 246px;
        height: 318px;
        margin: 0 0.5rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.09s ease-in-out;
        overflow: hidden;
        border: 1px solid rgba(0,0,0,0);
        opacity: 1;
        transition: all .4s ease-in-out;
        /* transform: translate3d(calc((246px + 3.75rem) * -1), 0, 0); */
    }

    .Hero__topNft_placeholder {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: calc((246px) * 1);
        height: 318px;
        margin: 0 0.5rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.09s ease-in-out;
        overflow: hidden;
        border: 1px solid rgba(0,0,0,0);
        opacity: 1;
        transition: all .4s ease-in-out;
        background: rgba(27,32,42,1);
        
    }

    .Hero__topNft_placeholder::before {
        position: absolute;
        top: 0;
        left: -50%;
        content: '';
        width: 180%;
        height: 100%;
        max-height: 246px;
        background: linear-gradient(93deg, rgba(17, 18, 23, 0), rgba(75, 75, 77, 0.15), rgba(68, 68, 87, 0.99), rgba(61, 62, 63, 0.15), rgba(17, 18, 23, 0), rgba(17, 18, 23, 0), rgba(17, 18, 23, 0), rgba(75, 75, 77, 0.15), rgba(83, 83, 99, 0.99), rgba(61, 62, 63, 0.15), rgba(17, 18, 23, 0), rgba(17, 18, 23, 0));
        background-position: 0% 50%; 
        background-size: 100% 100%;
        background-repeat: no-repeat;
        animation: loadingGlimmer 1.5s ease-in-out infinite;
        transform: translate3d(-50%, 0, 0);
        z-index: 9999;
    }

    @keyframes loadingGlimmer {
        0% {
            transform: translate3d(-50%, 0, 0);
        }

        100% {
            transform: translate3d(0%, 0, 0);
        }
            
    }

    .Hero__topNft:nth-child(1) {
        opacity: 0;
    }

    .Hero__topNft:nth-last-child(1) {
        opacity: 0;
    }

    /* .Hero__topNft:nth-child(2) {
        transform: rotateY(67.5deg) translate3d(275%,0,-10px);
    }

    .Hero__topNft:nth-child(3) {
        transform: rotateY(45deg) translate3d(66%,0,10px);
    }

    .Hero__topNft:nth-child(4) {
        transform: rotateY(0deg) translate3d(0,0,20px);
    }

    .Hero__topNft:nth-child(5) {
        transform: rotateY(-45deg) translate3d(-66%,0,10px);
    }

    .Hero__topNft:nth-child(6) {
        transform: rotateY(-67.5deg) translate3d(-275%,0,-10px);
    } */

    .Hero__topNft::before {
        content: "";
        position: absolute;
        top: -50px;
        left: calc((246 / -2) - (318 / 2) - 50px);
        height: 418px;
        aspect-ratio: 1/1;
        background: conic-gradient(            
        rgba( 37, 42, 51, 1),
        rgba(255,254,255, 1),
        rgba( 37, 42, 51, 1),
        rgba(255,254,255, 1),
        rgba( 37, 42, 51, 1),
        rgba(255,254,255, 1),
        rgba( 37, 42, 51, 1),
        rgba(255,254,255, 1),
        rgba( 37, 42, 51, 1))
        ;
        border-radius: 8px;
        z-index: -2;
    }

    .Hero__topNft::after {
        content: "";
        position: absolute;
        top: 1px;
        left: 1px;
        height: 314px;
        width: 242px;
        background: rgba( 27, 32, 41, 1);
        border-radius: 8px;
        z-index: -1;
    }

    .Hero__topNft:hover::before {
        animation: stepper 2.2s linear infinite;
    }

    .Hero__topNft a {
        position: relative;
        flex: 0 0 246px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }

    .Hero__topNft_imageWrapper {
        position: relative;
        width: 100%;
        height: 246px;
        transform: scale(0.95);
        border-radius: 4px 4px 0 0;
        aspect-ratio: 1/1;
        object-fit: cover;
        overflow: hidden;
    }

    .Hero__image {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .Hero__imageWrapper::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(93deg, rgba(17, 18, 23, 0), rgba(75, 75, 77, 0.15), rgba(220, 220, 223, 0.99), rgba(61, 62, 63, 0.15), rgba(17, 18, 23, 0.05), rgba(17, 18, 23, 0), rgba(17, 18, 23, 0));
        animation: loadingGlimmer 1.5s ease-in-out infinite;
        z-index: 999;
    }

    .Hero__topNft_title {
        position: relative;
        width: min-content;
        max-width: 200px;
        height: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .Hero__topNft_detailsPlaceholder {
        position: absolute;
        top: 268px;
        left: 20px;
        width: calc((100%) - 2 * 20px);
        height: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        z-index: 99999;
    }

    .Hero__topNft_titlePlaceholder {
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        border-radius: 4px;
    }

    .Hero__topNft_titlePlaceholder::after {
        position: absolute;
        top: 0;
        left: 50%;
        content: '';
        width: 200%;
        height: 100%;
        max-height: 246px;
        background: linear-gradient(93deg, rgba(17, 18, 23, 0), rgba(75, 75, 77, 0.15), rgba(68, 68, 87, 0.99), rgba(61, 62, 63, 0.15), rgba(17, 18, 23, 0), rgba(17, 18, 23, 0), rgba(17, 18, 23, 0), rgba(75, 75, 77, 0.15), rgba(83, 83, 99, 0.99), rgba(61, 62, 63, 0.15), rgba(17, 18, 23, 0), rgba(17, 18, 23, 0));
        background-position: 0% 50%; 
        background-size: 100% 100%;
        background-repeat: no-repeat;
        animation: loadingGlimmer 1.5s ease-in-out infinite;
        transform: translate3d(0, 0, 0);
        z-index: 9999;
    }

    @keyframes stepper {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
