<template>
  <div class="Wrapper">
    <NuxtLink 
      :to="'/nft/' + nft.contractTxId"
      class="Link"
    >
      <span class="Imagewrapper">
        <img
          v-if="nft.state?.contentType?.startsWith('image')"
          class="Image"
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
          class="Video"
        >
          <source
            :src="`https://prophet.rareweave.store/${nft.contractTxId}`"
            :type="nft.state?.contentType"
          />
          Your browser does not support the video tag.
        </video>
      </span>
      <div class="Info">
        <span class="Label title">
          Name:
        </span>
        <span class="Value title">
          {{ nft.state.name }}
        </span>
        <span class="Label description">
          Description:
        </span>
        <span class="Value description">
          {{ nft.state.description }}
        </span>
        <span class="Label owner">
          Owner:
        </span>
        <span class="Value owner">
          {{ nft.owner.ansName || nft.owner.address }}
        </span>
        <span class="Label minter">
          Minter:
        </span>
        <span class="Value minter">
          {{ nft.state.minter }}
        </span>
        <span class="Label forsale">
          For Sale:
        </span>
        <span class="Value forsale">
          {{ nft.state.forSale ? "Yes" : "No" }}
        </span>
        <span class="Label price">
          {{ nft.state.listingDenom || "AR" }}
        </span>
        <span class="Value price">
          {{ nft.state.price > 0 ? (parseFloat(parseFloat(arweave.ar.winstonToAr(nft.state.price)).toFixed(3))).toFixed(2)+" ("+(nft.state.price)+" winston)" : "free" }}
        </span>
        <span class="Label royalty">
          Royalty:
        </span>
        <span class="Value royalty">
          {{ nft.state.royalty }} %
        </span>
        <span class="Label reservationBlockheight">
          Reservation bh:
        </span>
        <span class="Value reservationBlockheight">
          {{ nft.state.reservationBlockheight }}
        </span>
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
</script>

<style scoped>
.Wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  background: rgba(17,23,32,.5);
  width: 100%;
}

.Link {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid rgba(172, 172, 172, 0.5);
  border-left: 1px solid rgba(172, 172, 172, 0.5);
  padding: 1rem;
}

.Imagewrapper {
  width: 216px;
  aspect-ratio: 1;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  transition: 100ms ease-in-out;
  transition: .36s ease-in-out;
}
.Imagewrapper:hover {
  background-size: 117%;
}

.Info {
  display: grid;
  grid-template-columns: 186px 1fr;
  width: 100%;
  height: calc((100%) - 1rem * 2);
  margin: 1rem 0;
  padding: 0 1rem;
}

.Image,
.Video {
  width: 286px;
  height: 100%;
  object-fit: contain;
  aspect-ratio: 1;
  border-radius: 0.5rem;
  transition: 100ms ease-in-out;
  transition: .36s ease-in-out;
}
</style>