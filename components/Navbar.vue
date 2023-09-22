<template>
  <div class="fixed top-0 left-0 w-full h-[128px] z-[99] ">
    <div class="absolute top-[88px] w-full h-0 m-0">
      <div class="relative w-full max-w-[1740px] mx-auto">
        <div
          class="mx-auto max-w-[85vw] flex flex-row flex-nowrap justify-end items-center px-3"
        >
          <div
            class="flex flex-col py-2 px-4 bg-blue-800 font-white rounded-lg"
          >
            <span class="text-l font-semibold"> RareWeave is in early preview </span>
            <span class="text-xs">
              Please report any bugs to
              <a
                class="text-blue-400"
                href="https://discord.gg/8qH2x3QZ"
                target="_blank"
                >Discord</a
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="Nav">
    <div class="View">
      <div class="Leftside">
        <NuxtLink class="Logo--bar text-3xl font-semibold px-1" to="/">
          RareWeave
        </NuxtLink>
      </div>
      <div v-if="arweaveSigner.isSignerSet" class="Rightside --desktop">
        <NuxtLink
          class="bg-transparent ml-4 mr-1 p-2 text-lg font-bold"
          to="/create"
        >
          Create
        </NuxtLink>
        <NuxtLink
          class="bg-transparent ml-4 mr-1 p-2 text-lg font-bold"
          to="/collection/create"
        >
          New collection
        </NuxtLink>
        <NuxtLink
          class="bg-transparent ml-4 mr-1 p-2 text-lg font-bold"
          to="/explore"
        >
          Explore
        </NuxtLink>
        <NuxtLink
          class="flex flex-row justify-between items-center bg-[rgba(255,255,255,0.06)] hover:border-[rgba(240,246,252,0.3)] border-[rgba(240,246,252,0.1)] border border-solid transition-colors ml-4 mr-1 rounded-lg pr-2"
          :replace="false"
          :to="'/profile/' + arweaveSigner.address"
        >
          <span
            class="flex flex-row px-1 py-0 my-1 border-r-[1px] border-dashed border-gray-600"
          >
            <img
              class="rounded-md max-w-[32px] max-h-[32px]"
              :src="arweaveSigner?.account?.profile?.avatarURL"
            />
            <span class="Accountname Amazing--red mx-2">
              {{ arweaveSigner.ans || arweaveSigner?.account?.handle }}
            </span>
          </span>
          <div class="Icon">
            <span class="AR"> a </span>
          </div>
          <span class="amount">
            {{ (Math.floor(arweaveSigner.spendable * 10_000) / 10_000).toFixed(3) }}
          </span>
        </NuxtLink>
      </div>
      <div v-if="arweaveSigner.isSignerSet" class="Rightside --mobile">
        <div class="Menu">
          <button
            class="Amazing--button py-1 px-2 text-lg font-semibold rounded-md"
            @click="setShow(`menu`, !show.menu)"
          >
            Menu
          </button>
          <div
            v-if="show.menu"
            @mouseleave="setShow(`menu`, false)"
            @focusout="setShow(`menu`, false)"
            class="Dropdown--mobile"
          >
            <NuxtLink class="Amazing--red Item" to="/create"> Create </NuxtLink>
            <NuxtLink class="Amazing--red Item" to="/collection/create">
              New collection
            </NuxtLink>
            <NuxtLink class="Amazing--red Item" to="/explore">
              Explore
            </NuxtLink>
            <NuxtLink
              class="Item Account"
              :replace="false"
              :to="'/profile/' + arweaveSigner.address"
            >
              <span class="Accountname">
                <img class="Pfp" :src="arweaveSigner.account.profile.avatarURL" />
              </span>
              <span class="Account--connected">
                {{ arweaveSigner.ans|| arweaveSigner.account.handle }}
                <span v-if="true">
                  {{ Math.floor(arweaveSigner.spendable * 100) / 100 + " AR" }}
                </span>
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
      <template v-if="!arweaveSigner.isSignerSet">
      <div class="Rightside --desktop">
        <NuxtLink class="bg-transparent ml-4 mr-1 p-2 text-lg font-bold" to="/">
          Home
        </NuxtLink>
        <NuxtLink
          class="bg-transparent ml-4 mr-1 p-2 text-lg font-bold"
          to="/explore"
        >
          Explore
        </NuxtLink>
        <div  class="ml-4 mr-1 p-1 pr-0 text-lg font-bold">
          <awesome-button @click="arweaveSigner.callOverlay()"> Login </awesome-button>
        </div>
      </div>
      <div class="Rightside --mobile">
        <div class="Menu">
          <button
            class="Amazing--button py-1 px-2 text-lg font-semibold rounded-md"
            @click="setShow(`menu`, !show.menu)"
          >
            Menu
          </button>
          <div
            v-if="show.menu"
            @mouseleave="setShow(`menu`, false)"
            class="Dropdown--mobile"
          >
            <NuxtLink class="Item" to="/"> Home </NuxtLink>
            <NuxtLink class="Item" to="/explore"> Explore </NuxtLink>
            <button class="Item Amazing--red" @click="arweaveSigner.callOverlay()" > Login </button>
          </div>
        </div>
      </div>
      </template>
    </div>
  </div>
</template>
<script setup>

const arweaveSigner=useArweaveSigner()

const setShow = (k, v) => {
  show.value[k] = v;
};

const show = ref({
  menu: false,
});
</script>
<style scoped>
.Nav {
  position: sticky !important;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: var(--nav-height);
  color: var(--color-primary);
  background-color: rgba(2, 3, 4, 0.375);
  backdrop-filter: blur(20px);
  z-index: 999;
}

.View {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  width: calc((100% - var(--page-spacing) * 2));
  max-width: var(--page-max-width);
}

.Leftside {
  flex: 0 0 max-content;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.Logo--bar {
  background: url("./assets/logo-01.png");
  background-size: 100%;
  background-position: bottom right;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
}

.Rightside {
  flex: 1 1 0px;
  align-items: center;
  justify-content: flex-end;
}

.Rightside.--desktop {
  display: flex;
}

.Rightside.--mobile {
  display: none;
}

.Balance {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.25rem 0.25rem 0.25rem 1.25vw;
  padding: 0;
  width: auto;
  height: auto;
  color: var(--color-primary);
  border-radius: 2px;
}

.Icon {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.25rem;
  padding: 0;
  width: 32px;
  height: 32px;
}

.--mobile .Menu {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: auto;
}

.Dropdown--mobile {
  position: absolute;
  top: calc((100%) + 0.5rem);
  right: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 0;
  width: max-content;
  background: var(--bg-dropdown);
  box-shadow: -0px 1px 1px rgba(0, 0, 0, 0.12), -1px 2px 2px rgba(0, 0, 0, 0.12),
    -2px 4px 4px rgba(0, 0, 0, 0.12), -4px 8px 8px rgba(0, 0, 0, 0.12),
    -8px 16px 16px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  width: 100%;
  min-width: 232px;
  max-width: 380px;
  margin: 0;
  z-index: 10;
}

.Item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0.375rem 0.75rem;
  background: rgba(129, 234, 174, 1);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-left: 1px solid rgba(143, 156, 172, 0.5);
  border-right: 1px solid rgba(143, 156, 172, 0.5);
  border-top: 1px solid rgba(143, 156, 172, 0.5);
}

.Item:last-child {
  border-bottom: 1px solid rgba(143, 156, 172, 0.5);
}

.Pfp {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 48px;
  height: 48px;
  border-radius: 5%;
  background-color: var(--bg-secondary);
  color: rgba(255, 255, 255, 1);
  overflow: hidden;
}

.Accountname {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.Account--connected {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

@media screen and (max-width: 1080px) {
  .Rightside.--mobile {
    display: flex !important;
  }

  .Rightside.--desktop {
    display: none !important;
  }
}
</style>
