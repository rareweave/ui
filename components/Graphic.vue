<template>
    <div class="Imagewrapper">
        <div class="Fetching__data load">
            <span class=""></span>
        </div>
        <img 
            v-if="nft.state?.contentType?.startsWith('image')"
            :src="`https://prophet.rareweave.store/_ipx/width_420,f_webp/https://arweave.net/${nft.contractTxId}`"
            :alt="nft.state.name || 'Nft'" 
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
            />
            Your browser does not support the video tag.
        </video>
    </div>
</template>
<script setup>
const { nft } = defineProps([
    "nft"
]);
function imgHasBeenLoaded(e) {
    e.target.parentNode.querySelector(".load").style.display = "none";
};
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
}
.load {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.Image,
.Video {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.36s ease-in-out;
}
.Image:hover {
    transform: scale(1.08);
}
</style>