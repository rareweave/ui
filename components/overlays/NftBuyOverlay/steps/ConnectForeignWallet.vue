<template>
    <div class="w-full flex flex-col max-w-sm justify-center items-center">
        <p class="text-base text-center w-full mt-2">Connect your {{ nftFactory.nftState.listingChain.at(0).toUpperCase()+nftFactory.nftState.listingChain.slice(1) }} wallet</p>
        <div class="w-max text-center flex flex-col mt-2 gap-2" >
            <button :class="['p-2', 'pr-4', 'w-full','bg-zinc-800', 'text-white', 'rounded-xl', 'text-lg', 'flex', 'flex-row', 'items-center', 'justify-center']" v-for="wallet in wallets[nftFactory.nftState.listingChain]" @click="loadSigner(wallet)">
            <img :src="'https://'+config.arweaveGateway+'/'+wallet.logo" class="w-10 mr-2"/>
            <p class="w-max">{{ wallet.name }}</p>
            </button>
        </div>
    </div>
</template>
<script setup>
import config from "~/config/config.json"
import wallets from "~/config/wallets.json"
const { signer, nftFactory } = defineProps(["signer", "nftFactory"])
let emit = defineEmits(['connected'])
const notifications = useNotifications()


// const imported=await import('https://'+config.arweaveGateway+'/'+config.)/* @vite-ignore */
// console.log(imported)
async function loadSigner(wallet) {
    

    const {default:importedSignerClass}=await import('https://'+config.arweaveGateway+'/'+wallet.api/* @vite-ignore */) 
    const importedSigner = new importedSignerClass(wallet.gateway)
    await importedSigner.connect()
    emit('connected',shallowRef(importedSigner))
}
</script>