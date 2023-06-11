<template>
    <div class="flex flex-col items-center justify-start w-full flex-1 mx-auto py-10"
        style="background: radial-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url(/s23-00.jpg); background-position: center; background-size: cover; background-repeat: no-repeat;"
    >
        <div class="relative flex flex-wrap justify-start items-start h-full mt-32">
            <div class="Column flex-row justify-start align-center w-100 max-w-[600px]">
                <div class="Header max-w-[85vw]">
                    <h1 class="text-white text-left text-2xl lg:text-5xl font-semibold justify-center text-center">
                        A liquid market on <br />Arweave
                    </h1>
                    <p class="flex justify-center text-center mt-8">
                        Here you can find the most amazing NFTs on the Arweave blockchain and easily trade them with a price
                        of just few gold ounces.
                    </p>
                    <div class="relative flex justify-around mt-8 mb-8">
                        <NuxtLink to="/explore" class="Button --primary">
                            Explore NFTs
                        </NuxtLink>
                        <a href="#howto" class="Button">
                            &gt; learn more
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col justify-center items-center h-full mx-auto mt-16 max-w-[85vw]">
        <div class="flex flex-col justify-start align-stretch max-w-[1740px] w-full">
            <h2 class="text-white text-left max-w-[85vw] text-4xl font-semibold mt-16">
                Explore the <span class="Amazing--br">marketplace</span>
            </h2>
            <p class="max-w-[85vw] text-1xl my-4">
                In the market you will find our curated collections and the different NFTs that are available for sale.
                Our powerful filters and sorting methods will help you find the perfect NFT for your collection. 
                As the marketplace keeps growing, our algorithms will be updated to bring you the best experience possible, while keeping our cost and carbon footprint as low as possible.
            </p>
            <h4 class="text-white text-2xl mt-16 max-w-[85vw]">
                Pixelated
            </h4>
            <div class="relative w-full h-full">
                <div class="Row relative mt-8 max-w-[85vw]">
                    <template v-for="(item, index) in Rows[0][0].slice(0, w)">
                        <div class="Card mx-2 --observe">
                            <span class="Picture"
                                :style="`background-image: radial-gradient(rgba(0,0,0,0), rgba(0,0,0,.25)), url(${item.img}); background-size: cover; background-position: center;`"
                            >
                                
                            </span>
                            <div class="absolute right-0 w-full h-min flex flex-col justify-end align-stretch text-start bg-[rgba(17,23,32,1)] p-2"
                                style="bottom: 0;"
                            >
                                <h4>
                                    {{item.title}}
                                </h4>
                                <p>
                                    {{item.desc}}
                                </p>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="absolute w-full h-min flex justify-between align-center z-1 inset-y-[50%]">
                    <span class="rounded-full bg-white w-[24px] h-[24px] flex justify-center align-center z-99 Button --primary">
                        &lt;
                    </span>
                    <span class="rounded-full bg-white w-[24px] h-[24px] flex justify-center align-cente z-99 Button --primary">
                        &gt;
                    </span>
                </div>
            </div>
            <h4 class="text-white text-2xl mt-16 max-w-[85vw]">
                Rarified
            </h4>
            <div class="relative w-full h-full">
                <div class="Row relative mt-8">
                    <template v-for="(item, index) in Rows[1][0].slice(0, w)">
                        <div 
                            class="Card mx-2 --observe"
                        >
                            <span class="Picture"
                                :style="`background-image: radial-gradient(rgba(0,0,0,0), rgba(0,0,0,.25)), url(${item.img}); background-size: cover; background-position: center;`"
                            >
                                
                            </span>
                            <div class="absolute right-0 w-full h-min flex flex-col justify-end align-stretch text-start bg-[rgba(17,23,32,1)] p-2"
                                style="bottom: 0;"
                            >
                                <h4>
                                    {{item.title}}
                                </h4>
                                <p>
                                    {{item.desc}}
                                </p>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="absolute w-full h-min flex justify-between align-center z-1 inset-y-[50%]">
                    <span class="rounded-full bg-white w-[24px] h-[24px] flex justify-center align-center z-99 Button --primary">
                        &lt;
                    </span>
                    <span class="rounded-full bg-white w-[24px] h-[24px] flex justify-center align-cente z-99 Button --primary">
                        &gt;
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Rows } from '~/contents/june23.js';
const NFTwidth = 316;
const setN = () => window.innerWidth / NFTwidth > 5 ? 5 : Math.floor(window.innerWidth / NFTwidth);
const initialN = setN();
const w = ref(initialN);
window.addEventListener('resize', () => {
    w.value = setN();
});
</script>
<style scoped>
.Row {
    position: relative;     
    display: flex;
    justify-content: space-between;
    height: min-content;
    max-height: 316px;
    transform-style: preserve-3d;
}

.Card {
    position: relative;
    flex: 1 1 0px;
    max-width: 316px;
    min-width: 268px;
    border-radius: .75rem;
    overflow: hidden;
    aspect-ratio: 1/1;
    transform: translateY(0px);
}

.Card:hover {
    transform: translateY(-10px);
    transition: transform .25s ease-in-out;
}

.Picture {
    position: relative;
    display: block;
    width: 100%;
    height: 82%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>