<template>
    <div class="Section Centerfold">
        <div class="Layout Hero">
            <div class="Column">
                <div class="Header">
                    <span class="Editionlabel">
                        Alpha Edition
                    </span>
                    <h1 class="Title">
                        RareWeave
                    </h1>
                    <p class="Desc">
                        Welcome to RareWeave! You have come to a magical land!
                        Here you can find the most amazing NFTs on the Arweave blockchain and easily trade them with a price
                        of just few gold ounces.
                        With our technology, you can now easily create your own NFTs and sell them on the market.
                    </p>
                    <div class="CTAs">
                        <NuxtLink to="/explore" class="Button --primary">
                            Explore
                        </NuxtLink>
                        <a href="#howto" class="Button">
                            &gt; learn more
                        </a>
                    </div>
                </div>
            </div>
            <div class="Column">
                <div class="Hero">
                    <div class="Imagewrapper" v-for="nft in NFTs.filter((nft, i) => i < 1)">
                        <img v-if="nft.state?.contentType?.startsWith('image')" class="Image"
                            :src="`https://prophet.rareweave.store/_ipx/width_420,f_webp/https://arweave.net/${nft.contractTxId}`"
                            :alt="nft.state.name || 'NFT'" @load="imgHasBeenLoaded" />
                        <video v-else-if="nft.state?.contentType?.startsWith('video')" autoplay muted controls loop
                            class="Video">
                            <source :src="`https://prophet.rareweave.store/${nft.contractTxId}`"
                                :type="nft.state?.contentType" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </div>
        <div :class="['Layout', 'Features'].join(' ')">
            <div>
                <h2 class="Title">
                    Explore the arweave market for <span class="Amazing-text">liquid NFTs</span>
                </h2>
                <p class="Desc">
                    Our powerful filters and sorting methods will help you find the perfect NFT for your collection.
                    As the marketplace keeps growing, our algorithms will be updated to bring you the best experience
                    possible,
                    while keeping our cost and carbon footprint as low as possible.
                </p>
            </div>
            <div class="NFTs">
                <div class="Controls">
                    <div class="Control --left" @click="decrementIndex">
                        &lt;
                    </div>
                    <div class="Control --right" @click="incrementIndex">
                        &gt;
                    </div>
                </div>
                <div v-if="NFTs.length === 0" class="Placeholders">
                    <div v-for="i in 4" class="Placeholder">
                        <div class="Detailholder">
                            <h4 class="Titleholder"></h4>
                        </div>
                    </div>
                </div>
                <div class="Figure">
                    <div v-for="nft in NFTs" :key="nft.contractTxId" class="NFT">
                        <NuxtLink :to="`nft/${nft.contractTxId}`" class="Link">
                            <div class="NFT__imagewrapper">
                                <img v-if="nft.state?.contentType?.startsWith('image')" class="NFT__image"
                                    :src="`https://prophet.rareweave.store/_ipx/width_420,f_webp/https://arweave.net/${nft.contractTxId}`"
                                    :alt="nft.state.name || 'NFT'" @load="imgHasBeenLoaded" />
                                <video v-else-if="nft.state?.contentType?.startsWith('video')" autoplay muted controls loop
                                    class="NFT__video">
                                    <source :src="`https://prophet.rareweave.store/${nft.contractTxId}`"
                                        :type="nft.state?.contentType" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div class="NFT_details">
                                <h4 class="NFT_title">
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
const NFTs = ref([]);
const index = ref(0);

const displayNfts = 1 + 4 + 1; // first and last are invisible for animation

function randomIndex() {
    if (!nfts.value.result)
        return 100;

    return Math.floor(Math.random() * nfts.value.result.length - displayNfts - 3);
};

function incrementIndex() {
    if (index.value + displayNfts >= nfts.value.result.length) {
        // index.value = 0;
    } else {
        index.value += 1;
    }
    NFTs.value = nfts.value.result.filter((nft, i) => i >= index.value && i <= index.value + (displayNfts - 1));
};

function decrementIndex() {
    if (index.value <= 0) {
        // index.value = nfts.value.result.length - 3;
    } else {
        index.value -= 1;
    }
    NFTs.value = nfts.value.result.filter((nft, i) => i >= index.value && i <= index.value + (displayNfts - 1));
};

onMounted(async () => {
    Api('nfts')
        .then(res => {
            nfts.value = res;
            index.value = randomIndex();
            NFTs.value = res.result.filter((nft, i) => i >= index.value && i <= index.value + (displayNfts - 1));
        })
        .catch(err => {
            console.log(err);
        });
});
</script>

<style scoped>
.Layout.Hero {
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 auto;
}

.Layout.Features {
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: var(--content-width);
    height: 100%;
    margin: 10rem auto 0;
    z-index: 0;
}

.Column {
    flex: 1 0 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
}

.Column:nth-child(2) {
    justify-content: flex-end;
}

.Desc {
    font-size: 14pt;
    margin: 1rem 0;
}

.CTAs {
    margin: .675rem .125rem;
}

.Editionlabel {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: max-content;
    height: auto;
    padding: .375rem .75rem;
    border-radius: .375rem;
    background-color: rgb(17, 23, 38);
    margin: 0 0 5rem;
    border: 1px solid rgba(251, 250, 255, 0);
}

.Hero {
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

.Imagewrapper {
    animation: hover-like-clouds 10s infinite forwards;
    object-fit: contain;
    object-position: center;
    width: 100%;
    max-width: 420px;
    max-height: 420px;
}

@keyframes hover-like-clouds {
    0% {
        transform: rotate3d(1, 1, 1, 7.2deg) translate3d(0, 0, 0);
    }

    5% {
        transform: rotate3d(1, 1, 1, 7.2deg) translate3d(0, -1%, 0);
    }

    25% {
        transform: rotate3d(1, 1, 1, 7.2deg) translate3d(0, -10%, 0);
    }

    50% {
        transform: rotate3d(1, 1, 1, 7.2deg) translate3d(0, 5%, 0);
    }

    75% {
        transform: rotate3d(1, 1, 1, 7.2deg) translate3d(0, -7.5%, 0);
    }

    100% {
        transform: rotate3d(1, 1, 1, 7.2deg) translate3d(0, 0, 0);
    }
}

.Image,
.Video {
    position: relative;
    transform-style: preserve-3d;
    transform: rotate3d(1, 1, 1, 6deg) translate3d(0, 25px, 0);
    border-radius: 3.75rem;
    box-shadow:
        0px 1px 1px rgba(0, 0, 0, 0.2),
        1px 2px 2px rgba(0, 0, 0, 0.2),
        2px 4px 4px rgba(0, 0, 0, 0.2),
        4px 8px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
}

.NFTs {
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

.Figure {
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

.Placeholders {
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

.Controls {
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

.Control {
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

.NFT {
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
    border: 1px solid rgba(0, 0, 0, 0);
    opacity: 1;
    transition: all .4s ease-in-out;
    /* transform: translate3d(calc((246px + 3.75rem) * -1), 0, 0); */
}

.Placeholder {
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
    border: 1px solid rgba(0, 0, 0, 0);
    opacity: 1;
    transition: all .4s ease-in-out;
    background: rgba(27, 32, 42, 1);

}

.Placeholder::before {
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

.NFT:nth-child(1) {
    opacity: 0;
}

.NFT:nth-last-child(1) {
    opacity: 0;
}

.NFT::before {
    content: "";
    position: absolute;
    top: -50px;
    left: calc((246 / -2) - (318 / 2) - 50px);
    height: 418px;
    aspect-ratio: 1/1;
    background: conic-gradient(rgba(37, 42, 51, 1),
            rgba(255, 254, 255, 1),
            rgba(37, 42, 51, 1),
            rgba(255, 254, 255, 1),
            rgba(37, 42, 51, 1),
            rgba(255, 254, 255, 1),
            rgba(37, 42, 51, 1),
            rgba(255, 254, 255, 1),
            rgba(37, 42, 51, 1));
    border-radius: 8px;
    z-index: -2;
}

.NFT::after {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    height: 314px;
    width: 242px;
    background: rgba(27, 32, 41, 1);
    border-radius: 8px;
    z-index: -1;
}

.NFT:hover::before {
    animation: stepper 2.2s linear infinite;
}

.Link {
    position: relative;
    flex: 0 0 246px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

.NFT__imagewrapper {
    position: relative;
    width: 100%;
    height: 246px;
    transform: scale(0.95);
    border-radius: 4px 4px 0 0;
    aspect-ratio: 1/1;
    object-fit: cover;
    overflow: hidden;
}

.NFT__image {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.NFT_title {
    position: relative;
    width: fit-content;
    max-width: 200px;
    height: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.Detailholder {
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

.Titleholder {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border-radius: 4px;
}

.Titleholder::after {
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
