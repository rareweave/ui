<template>
  <div class="NftCard__Wrapper">
    <NuxtLink 
      :to="'/nft/' + nft.contractTxId"
      class="NftCard__Card"
      :style="{
        backgroundColor: nft.state.background || '',
        color: nft.state.textColor || '#ffffff'
      }"
    >
      <span class="AR">
        {{ nft.state.listingDenom || "a" }}
      </span>
      <div class="NftCard__ImageWrapper">  
        <div class="NftCard__ImageLoading">
          <span class=""></span>
        </div>
        <img
          v-if="nft.state?.contentType?.startsWith('image')"
          class="NftCard__Image"
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
          class="NftCard__Video"
        >
          <source
            :src="`https://prophet.rareweave.store/${nft.contractTxId}`"
            :type="nft.state?.contentType"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="NftCard__buttons">
        <button 
          v-if="disposable" 
          @click.prevent.stop="$emit('remove-item', nft.contractTxId)"
          class="nft-button"
        >
          ✕
        </button>
      </div>
      <div class="NftCard__Info">
        <div class="NftCard__Row">
          <h4 class="NftCard__Title">
            {{ nft.state.name.slice(0, 30) }}
          </h4>
          <!-- <p v-if="nft.state.description">{{ nft.state.description.length < 80 ? nft.state.description :
                    nft.state.description.slice(0, 77) + "..." }}</p> -->
          <span 
            class="NftCard__Price" 
            v-if="nft.state.forSale"
          >
            <!-- price -->
            {{ parseFloat(
                parseFloat(arweave.ar.winstonToAr(nft.state.price)).toFixed(3)
              ) }}
            {{ nft.state.listingDenom || "AR" }}
          </span>
        </div>
        <div class="NftCard__Row">
        <span 
          class="NftCard__Owner" 
          v-if="nft.owner"
        >
          <!-- owner addy -->Owned:&nbsp; 
          <NuxtLink class="link" :to="'/profile/' + nft.owner.address">
            {{ nft.owner.ansName || nft.owner.account?.handle }}  
          </NuxtLink>
        </span>
      </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup>
  import Arweave from "arweave";
  const { nft, disposable } = defineProps(["nft", "disposable"]);
  const arweaveState = await useState("arweave", () =>
    Arweave.init({
      host: "prophet.rareweave.store",
      port: 443,
      protocol: "https",
      timeout: 60_000,
      logging: false,
    })
  );
  const arweave = arweaveState.value;
  function imgHasBeenLoaded(e) {
    e.target.parentNode.parentNode.querySelector(".NftCard__ImageLoading").style.display =
      "none";
  }
  function vidHasBeenLoaded(e) {
    e.target.parentNode.parentNode.querySelector(".NftCard__ImageLoading").style.visibility =
      "collapse";
  }
</script>
<style>
.NftCard__Wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.NftCard__Card {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 286px;
  height: 382px;
  background-color: rgba(17,23,32,1);
  margin: 6px 9px 18px;
  padding: 0;
  box-sizing: content-box;
  border: 1px solid rgba(43, 56, 68, .33);
  border-radius: 6px;
  box-shadow:
    0px 1px 1px rgba(0,0,0,0.17),
    1px 2px 2px rgba(0,0,0,0.17),
    2px 4px 4px rgba(0,0,0,0.17),
    4px 8px 8px rgba(0,0,0,0.17),
    8px 16px 16px rgba(0,0,0,0.17),
    16px 32px 32px rgba(0,0,0,0.17)
  ;
  text-shadow: 
    0px 1px 1px rgba(0,0,0,0.17),
    1px 2px 2px rgba(0,0,0,0.17),
    2px 4px 4px rgba(0,0,0,0.17),
    4px 8px 8px rgba(0,0,0,0.17),
    8px 16px 16px rgba(0,0,0,0.17)
  ;
}

.NftCard__Card::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  width: calc((100%) + (2 * 2px));
  height: calc((100%) + (2 * 2px));
  background: radial-gradient(ellipse at center,
    rgba(8, 219, 71, 1),
    rgba(85, 139, 219, 1),
    rgba(218, 90, 218, 1),
    rgba(232, 241, 93, 1)
  ) !important;
  background: conic-gradient(
    rgba(236, 236, 236, 0.999),
    rgba(252, 252, 252, 0.004),
    rgba(236, 236, 236, 0.999),
    rgba(252, 252, 252, 0.004),
    rgba(236, 236, 236, 0.999),
    rgba(252, 252, 252, 0.004),
    rgba(236, 236, 236, 0.999),
    rgba(252, 252, 252, 0.004),
    rgba(236, 236, 236, 0.999),
    rgba(252, 252, 252, 0.004),
    rgba(236, 236, 236, 0.999),
    rgba(252, 252, 252, 0.004),
    rgba(236, 236, 236, 0.999),
    rgba(252, 252, 252, 0.004),
    rgba(236, 236, 236, 0.999)
  ) !important;
  border-radius: 6px;
  z-index: -1;
  background-size: 200% 200%;
}

.NftCard__Card:hover {
  border: 1px solid rgba(255, 255, 255, 0);
}

.NftCard__Wrapper:hover .NftCard__Card::after {
  background: conic-gradient(
    rgba(252, 252, 252, 0.004),
    rgba(236, 236, 236, 0.999),
    rgba(252, 252, 252, 0.004),
    rgba(236, 236, 236, 0.999),
    rgba(252, 252, 252, 0.004),
    rgba(236, 236, 236, 0.999),
    rgba(252, 252, 252, 0.004),
    rgba(236, 236, 236, 0.999),
    rgba(252, 252, 252, 0.004),
    rgba(236, 236, 236, 0.999),
    rgba(252, 252, 252, 0.004),
    rgba(236, 236, 236, 0.999),
    rgba(252, 252, 252, 0.004),
    rgba(236, 236, 236, 0.999),
    rgba(236, 236, 236, 0.004)
  ) !important;
}

.NftCard__ImageWrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 286px; */
  aspect-ratio: 1;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
  transition: .36s ease-in-out;
}

.NftCard__Image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: rgba(0,0,0,0);
  object-fit: cover;
  transition: .36s ease-in-out;
}

.NftCard__Video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: rgba(0,0,0,0);
  object-fit: cover;
  z-index: 1;
}

.NftCard__Image:hover {
  transform: scale(1.08);
}

.NftCard__ImageLoading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.NftCard__ImageLoading span {
    position: relative;
    display: flex;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow:
        inset 0 0 20px -5px rgba(255, 255, 255, 0.5),
        inset 0 -40px 40px -20px rgba(255, 255, 255, 0.5)
    ;
    background: linear-gradient(rgba(172, 8, 194, 0.33) 120px, transparent 0) no-repeat;
    background-position: 0px 120px;
    animation: fillLq 1.3s linear infinite forwards;
    transition: .36s ease-in-out;
}
.NftCard__ImageLoading span:after {
    position: absolute;
    content: '';
    width: 40%;
    height: 25%;
    top: 20px;
    right: 10px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    transform: rotate(45deg);
    transition: .36s ease-in-out;
}

.NftCard__buttons {
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  margin: 0.5em 1em;
}

.NftCard__Info {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  margin: 3px 0;
  padding: 0;
  box-sizing: border-box;
}

.NftCard__Row {
  display: flex;
  margin: 0;
  padding: .375em;
  height: 56px;
}

.NftCard__Title {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 32px;
  margin: 0;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 12pt;
  font-weight: 600;
  font-family: 'Arimo', sans-serif;
  color: rgba(251,250,255,1);
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.NftCard__Price {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 32px;
  margin: 0;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 12pt;
  font-weight: 600;
  font-family: 'Arimo', sans-serif;
  color: rgba(251,250,255,1);
  text-align: right;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.NftCard__Owner {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 0;
  padding: 0 12px 12px;
  box-sizing: border-box;
  font-size: 12pt;
  font-family: 'Arimo', sans-serif;
  color: rgba(251,250,255,1);
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-decoration: none !important;
}

.NftCard__Owner a {
  color: rgba(251,250,255,1);
  text-decoration: none !important;
}

.NftCard__Owner a:hover {
  color: rgba(251,250,255,1);
  text-decoration: 1px underline !important;
}
/* 
.details {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 0;
  padding: 0 12px 12px;
  box-sizing: border-box;
  font-size: 12pt;
  font-family: 'Arimo', sans-serif;
  color: rgba(251,250,255,1);
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
} */

.AR {
  position: absolute;
  bottom: 18px;
  right: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: rgba(251,250,255,.75);
  color: rgba(17,23,32,1);
  font-size: 16pt;
  font-weight: 600;
  font-family: 'Arimo', sans-serif;
  border-radius: 50%;
  z-index: 99;
  /* display: none; */
}
.AR::before {
  content: "";
  position: absolute;
  top: 2px;
  right: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  margin: 0;
  padding: 0;
  box-sizing: border-box; 
  background-color: rgba(0,0,0,0);
  border-radius: 50%;
  z-index: -1;
  border: 1px solid rgba(17,23,32,1);
}
</style>