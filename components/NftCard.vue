<template>
  <div class="Component">
    <NuxtLink 
      :to="'/nft/' + nft.contractTxId"
      class="Card"
      :style="{
        backgroundColor: nft.state.background || '',
        color: nft.state.textColor || '#ffffff'
      }"
    >
      <span class="AR">
        {{ nft.state.listingDenom || "a" }}
      </span>
      <Graphic 
        :nft="nft"
      />
      <div class="Buttons">
        <button 
          v-if="disposable" 
          @click.prevent.stop="$emit('remove-item', nft.contractTxId)"
          class="nft-button"
        >
          ✕
        </button>
      </div>
      <div class="Info">
        <div class="Row">
          <h4 class="Nft Name Detail">
            {{ nft.state.name || "Unknown" }}
          </h4>
          <span 
            class="Nft PriceInAr Detail" 
            v-if="nft.state.forSale"
          >
            {{ (nft.state.price / 1e12).toFixed(3) }} {{ nft.state.listingDenom || "AR" }}
          </span>
        </div>
        <div class="Row">
        <span 
          class="Nft Owner Detail" 
          v-if="nft.owner"
        >
          Owned:&nbsp; 
          <NuxtLink 
            :to="'/profile/' + nft.owner.address"
            class="Nft Link" 
          >
            {{ nft.owner.ansName || nft.owner.account?.handle }}  
          </NuxtLink>
        </span>
      </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup>
  const { nft, disposable } = defineProps([
    "nft", 
    "disposable"
  ]);
</script>
<style scoped>
.Component {
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

.Card {
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

.Card::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  width: calc((100%) + (2 * 2px));
  height: calc((100%) + (2 * 2px));
  background: radial-gradient(ellipse at center,
    rgba(17,23,32,0),
    rgba(17,23,32,0)
  ) !important;
  border-radius: 6px;
  z-index: -1;
  background-size: 200% 200%;
}

.Card:hover {
  border: 1px solid rgba(255, 255, 255, 0);
}

.Component:hover .Card::after {
  background: conic-gradient(
    rgba(236, 236, 236, 0.333),
    rgba(236, 236, 236, 0.666),
    rgba(252, 252, 252, 0.333),
    rgba(236, 236, 236, 0.666),
    rgba(252, 252, 252, 0.333),
    rgba(236, 236, 236, 0.666),
    rgba(252, 252, 252, 0.333)
  ) !important;
}

.Imagewrapper {
  max-height: 286px;
}

.Buttons {
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  margin: 0.5em 1em;
}

.Info {
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

.Row {
  display: flex;
  margin: 0;
  padding: .375em;
  height: 56px;
}

.Nft {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  transition: .36s ease-in-out;
}

.Nft.Detail {
  height: 32px;
  padding: 0 12px;
  font-size: 12pt;
  font-weight: 600;
  font-family: 'Arimo', sans-serif;
  color: rgba(251,250,255,1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.Nft.Name {
  justify-content: flex-start;
  flex: 1 1 0px;
  text-align: left;
}

.Nft.PriceInAr {
  justify-content: flex-end;
  flex: 0 0 max-content;  
  text-align: right;
}

.Nft.Owner {
  justify-content: flex-start;
  flex: 1 1 0px;
  max-width: 80%;
  text-align: left;
  padding: 0 12px 12px;
}

.Link {
  color: rgba(221, 232, 255, 0.5) !important;
  text-decoration: none !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.Link:hover {
  color: rgba(251,250,255,.5);
  text-decoration: 1px underline !important;
}
</style>