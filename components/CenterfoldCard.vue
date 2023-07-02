<template>
    <NuxtLink :to="nft.link" class="Squarecard relative flex-1 w-max-[316px] w-min-[286px] h-[356px] rounded-lg overflow-hidden mx-2 bg-[rgba(17,23,32,1)] hover:bg-gray-800 transform translate-y-0 transition-transform duration-300 ease-in-out --observe">
        <span class="relative block w-full h-[66%] bg-cover bg-center bg-no-repeat"
            :style="`background-image: radial-gradient(rgba(0,0,0,0), rgba(0,0,0,.25)), url(${nft.img}); background-size: cover; background-position: center;`"
        ></span>
        <div class="absolute right-0 w-full h-min flex flex-col justify-end align-stretch text-start p-2"
            style="bottom: 0;"
        >
            <h4 class="relative flex flex-nowrap text-gray-100 mt-2 px-2 w-full items-center justify-start w-max-[100%]">
                <span class="mr-2 whitespace-nowrap text-ellipsis overflow-hidden">
                    {{ nft.title }}
                </span>
                <span class="py-[1px] px-[4px] border rounded-lg">
                    NEW
                </span>
            </h4>
            <p class="text-gray-500 mt-2 px-2 flex flex-row justify-between items-center">
                {{ nft.minter }}
            </p>
            <div class="m-1 flex flex-row justify-between items-center mr-4 pb-2">
                <span class="ml-1">
                    Royalty: {{ nft.royalties }}%
                </span>
                <span class="flex flex-row justify-between items-center mr-4">
                    <span class="mx-4 font-semibold">
                        {{ (nft.price).toFixed(2) }}
                    </span>
                    <span class="relative">
                        <span class="AR">
                            a
                        </span>
                    </span>
                </span>
            </div>
        </div>
    </NuxtLink>
</template>
<script setup>
const { nft } = defineProps(['nft']);
</script>
<style scoped>
.Squarecard {
    transform: translateY(0px);
}

.Squarecard:hover {
    transform: translateY(-10px);
}
</style>