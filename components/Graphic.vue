<template>
  <div class="relative w-full h-full overflow-hidden flex justify-center items-center transform-gpu max-h-[286px] rounded-t-lg">
    <img
      v-if="nft.state?.contentType?.startsWith('image')"
      :src="`${BASE_IMAGE_URL}/${nft.contractTxId || nft.id}`"
      :alt="nft.state.name || 'Nft'"
      class="relative flex justify-center items-center w-full min-w-full h-full min-h-full object-cover transition-all ease-in-out duration-300 hover:w-[108%] hover:min-w-[108%] hover:h-[108%] hover:min-h-[108%]"
      @load="imgHasBeenLoaded"
      @error="imgNotLoaded"
    />
    <video
      v-else-if="nft.state?.contentType?.startsWith('video')"
      autoplay
      muted
      controls
      loop
      class="relative flex justify-center items-center w-full min-w-full h-full min-h-full object-cover transition-all ease-in-out duration-75"
    >
      <source
        :src="`${BASE_URL}${nft.contractTxId || nft.id}`"
        :type="nft.state?.contentType"
      />
      Your browser does not support the video tag.
    </video>
    <span v-else-if="nft.state?.contentType?.startsWith('audio')">
      <img
        src="/rw-record-static.gif"
        data-src="/rw-record.gif"
        alt="Audio NFT"
        class="relative flex justify-center items-center w-full h-full object-cover transition-all duration-200 ease-in-out hover:w-full hover:h-full Record"
        @load="imgHasBeenLoaded"
        @error="imgNotLoaded"
        @mouseover="audioHover"
        @mouseout="audioFreeze"
      />
      <audio
        controls
        class="absolute bottom-0 w-[99%]"
        @mouseover="audioHoverParent"
        @mouseout="audioFreezeChild"
      >
        <source
          :src="`${BASE_URL}/${nft.contractTxId || nft.id}`"
          :type="nft.state?.contentType"
        />
      </audio>
    </span>
  </div>
</template>
<script setup>
const BASE_IMAGE_URL = "https://prophet.rareweave.store/_ipx/width_420,f_webp/https://arweave.net";
const BASE_URL = "https://prophet.rareweave.store";

const { nft } = defineProps(["nft"]);
function imgHasBeenLoaded(e) {
  e.target.parentNode.querySelector(".load").style.display = "none";
}
function imgNotLoaded(e) {
  e.target.parentNode.querySelector(".load").style.display = "none";
  e.target.parentNode.querySelector(".Image").src = `/placeholder.svg`;
  e.target.parentNode.querySelector(".Image").classList.add("--error");
}

function audioHover(e) {
  e.target.src = "/rw-record.gif";
}
function audioFreeze(e) {
  e.target.src = "/rw-record-static.gif";
}
function audioHoverParent(e) {
  e.target.parentNode.querySelector(".Record").src = "/rw-record.gif";
}
function audioFreezeChild(e) {
  e.target.parentNode.querySelector(".Record").src = "/rw-record-static.gif";
}
</script>
