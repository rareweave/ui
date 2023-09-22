<template>
    <div class="m-2 p-0 mt-6 flex flex-col">
          <img v-if="nftState?.contentType?.startsWith('image')" :src="'https://prophet.rareweave.store/_ipx/width_320,animated,f_webp/https://prophet.rareweave.store/' +
              nftId
              " class=" rounded inline-flex max-h-[20rem] max-w-20rem border-gray-800 border hover:border-gray-700" />
          <video v-else-if="nftState?.contentType?.startsWith('video')" autoplay muted loop controls class=" rounded inline-flex max-h-[20rem] max-w-20rem">
            <source :src="'https://prophet.rareweave.store/' + nftId" :type="nftState?.contentType" />
            Your browser does not support the video tag.
          </video>

          <audio v-else-if="nftState?.contentType?.startsWith('audio')" controls>
            <source :src="'https://prophet.rareweave.store/' + nftId" :type="nftState?.contentType" />
            Your browser does not support the audio tag.
          </audio>
          <a  target="_blank" :href="txExplorer+nftId" class="text-xs mt-2 text-blue-700 hover:text-blue-900 inline-flex flex-row justify-between">View transaction <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-4 w-4 ml-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg></a>
        </div>
</template>
<script setup>
import {txExplorer} from "../config/config.json"
let { nftState, nftId } = defineProps(["nftState", "nftId"])
</script>