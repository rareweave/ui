<template>
  <div v-if="arweaveSigner.address === address" class="text-sm rounded-xl p-2 ml-2 bg-zinc-700 flex-row inline-flex items-center">
    You
  </div>
  <NuxtLink :to="`/profile/${address}`" v-else class="flex flex-row justify-between items-center bg-[rgb(17,18,22)] hover:border-[rgba(240,246,252,0.3)] border-[rgba(240,246,252,0.1)] border border-solid transition-colors mx-1 rounded-lg pr-2">
    <img :src="account?.profile?.avatarURL" v-if="account?.profile?.avatarURL" class="rounded-md max-w-[32px] max-h-[32px] my-1 mx-1" />
    <span class="Accountname Amazing--red mx-2">
      {{
        addressAns ||
        account?.handle
      }}
    </span>
  </NuxtLink>
</template>
<script setup>
const { address } = defineProps(["address"])

const utils = useUtils()
const arweaveSigner = useArweaveSigner()
const { data: addressAns } = useFetch(`https://ans-resolver.herokuapp.com/resolve/${address}`, {
  transform: (result) => result.domain
})

const account = ref(await utils.account.get(address))
</script>
