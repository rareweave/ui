<template>
  <div class="Imagewrapper">
    <div class="Fetching__data load">
      <span class=""></span>
    </div>
    <img
      v-if="nft.state?.contentType?.startsWith('image')"
      :src="`https://prophet.rareweave.store/_ipx/width_420,f_webp/https://arweave.net/${
        nft.contractTxId || nft.id
      }`"
      :alt="nft.state.name || 'Nft'"
      class="Image"
      @load="imgHasBeenLoaded"
      @error="imgNotLoaded"
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
        :src="`https://prophet.rareweave.store/${nft.contractTxId || nft.id}`"
        :type="nft.state?.contentType"
      />
      Your browser does not support the video tag.
    </video>
    <audio v-else-if="nft.state?.contentType?.startsWith('audio')">
      <source
        :src="`https://prophet.rareweave.store/${nft.contractTxId || nft.id}`"
        :type="nft.state?.contentType"
      />
      Your browser does not support the video tag.
    </audio>
  </div>
</template>
<script setup>
const { nft } = defineProps(["nft"]);
function imgHasBeenLoaded(e) {
  e.target.parentNode.querySelector(".load").style.display = "none";
}
function imgNotLoaded(e) {
  e.target.parentNode.querySelector(".load").style.display = "none";
  e.target.parentNode.querySelector(".Image").src = `/placeholder.svg`;
  e.target.parentNode.querySelector(".Image").classList.add("--error");
}
</script>
<style scoped>
.Imagewrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
}

.load {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.--error {
  mix-blend-mode: luminosity;
  height: 100% !important;
}

.Image,
.Video {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 100%;
  object-fit: cover;
  transition: 0.23s ease-in-out;
}

.Image:hover {
  width: 108%;
  min-width: 108%;
  height: 108%;
  min-height: 108%;
}
</style>
