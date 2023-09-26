<template>
  <!--  <div class="fixed top-0 left-0 w-full h-[128px] z-[99] ">-->
  <!--    <div class="absolute top-[88px] w-full h-0 m-0">-->
  <!--      <div class="relative w-full max-w-[1740px] mx-auto">-->
  <!--        <div-->
  <!--          class="mx-auto max-w-[85vw] flex flex-row flex-nowrap justify-end items-center px-3"-->
  <!--        >-->
  <!--          <div-->
  <!--            class="flex flex-col py-2 px-4 bg-blue-800 font-white rounded-lg"-->
  <!--          >-->
  <!--            <span class="text-l font-semibold"> RareWeave is in early preview </span>-->
  <!--            <span class="text-xs">-->
  <!--              Please report any bugs to-->
  <!--              <a-->
  <!--                class="text-blue-400"-->
  <!--                href="https://discord.gg/8qH2x3QZ"-->
  <!--                target="_blank"-->
  <!--              >Discord</a-->
  <!--              >-->
  <!--            </span>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <div class="flex flex-col justify-center items-center h-16 backdrop-blur-xl">
    <div
      class="relative flex justify-between items-center m-0 p-0 w-[calc(100%-var(--page-spacing)*2)] max-w-[var(--page-max-width)]">
      <NuxtLink
        class="bg-gradient-to-r bg-clip-text text-transparent from-[#897ce6] to-[#59c996] text-3xl font-semibold px-1"
        to="/">
        RareWeave
      </NuxtLink>

      <div class="flex-1 flex items-center justify-end">
        <NuxtLink
          class="bg-transparent ml-4 mr-1 p-2 text-lg font-bold"
          to="/explore"
        >
          Explore
        </NuxtLink>
        <NuxtLink class="bg-transparent ml-4 mr-1 p-2 text-lg font-bold" to="/">
          Home
        </NuxtLink>

        <template v-if="arweaveSigner.isSignerSet">
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
              alt="Avatar" />
            <span
              class="relative flex flex-row justify-center items-center bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text mx-2">
              {{ arweaveSigner.ans || arweaveSigner?.account?.handle }}
            </span>

          </span>
            <div class="relative flex justify-center items-center mx-1 w-8 h-8">
              <span class="AR"> a </span>
            </div>
            <span class="amount">
            {{ (Math.floor(arweaveSigner.spendable * 10_000) / 10_000).toFixed(3) }}
          </span>
          </NuxtLink>
        </template>

        <template v-else>
          <div class="ml-4 mr-1 p-1 pr-0 text-lg font-bold">
            <awesome-button @click="arweaveSigner.callOverlay()"> Login</awesome-button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const arweaveSigner = useArweaveSigner();
</script>
