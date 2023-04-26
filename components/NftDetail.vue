<template>
  <div class="detail-Detail__Wrapper">
    <NuxtLink 
      :to="'/nft/' + nft.contractTxId"
      class="detail-line"
    >
      <span class="wrapper image">
        <img
          v-if="nft.state?.contentType?.startsWith('image')"
          class="NftDetail__Image"
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
          class="NftDetail__Video"
        >
          <source
            :src="`https://prophet.rareweave.store/${nft.contractTxId}`"
            :type="nft.state?.contentType"
          />
          Your browser does not support the video tag.
        </video>
      </span>  
      <div class="details-info">
        <span class="title-label">
          Name:
        </span>
        <span class="title-value">
          {{ nft.state.name }}
        </span>
        <span class="description-label">
          Description:
        </span>
        <span class="description-value">
          {{ nft.state.description }}
        </span>
        <span class="owner-label">
          Owner:
        </span>
        <span class="owner-value">
          {{ nft.owner.ansName || nft.owner.address }}
        </span>
        <span class="minter-label">
          Minter:
        </span>
        <span class="minter-value">
          {{ nft.state.minter }}
        </span>
        <span class="forsale-label">
          For Sale:
        </span>
        <span class="forsale-value">
          {{ nft.state.forSale ? "Yes" : "No" }}
        </span>
        <span class="price-label">
          {{ nft.state.listingDenom || "AR" }}
        </span>
        <span class="price-value">
          {{ nft.state.price > 0 ? (parseFloat(parseFloat(arweave.ar.winstonToAr(nft.state.price)).toFixed(3))).toFixed(2)+" ("+(nft.state.price)+" winston)" : "free" }}
        </span>
        <span class="royalty-label">
          Royalty:
        </span>
        <span class="royalty-value">
          {{ nft.state.royalty }} %
        </span>
        <span class="reservationBlockheight-label">
          Reservation bh:
        </span>
        <span class="reservationBlockheight-value">
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

<style>
.detail-Detail__Wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  background: var(--card-primary);
  width: 100%;
}

.detail-line {
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

.img {
  width: 216px;
  aspect-ratio: 1;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  transition: 100ms ease-in-out;
  transition: .36s ease-in-out;
}
.img:hover {
  background-size: 117%;
}

.details-info {
  display: grid;
  grid-template-columns: 186px 1fr;
  width: 100%;
  height: calc((100%) - 1rem * 2);
  margin: 1rem 0;
  padding: 0 1rem;
}

.NftDetail__Image,
.NftDetail__Video {
  width: 286px;
  height: 100%;
  object-fit: contain;
  aspect-ratio: 1;
  border-radius: 0.5rem;
  transition: 100ms ease-in-out;
  transition: .36s ease-in-out;
}
</style>