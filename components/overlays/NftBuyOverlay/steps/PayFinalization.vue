<template>
     <div class="w-full flex flex-col max-w-sm justify-center items-center">
        <p class="text-sm text-center w-full mt-2">You're almost there! You paid royalty, reserving buyer spot. Now it's time to commit actual payment to seller</p>
        <div class="w-max text-center flex flex-col mt-2">
            <p class="text-md text-center w-full flex flex-row mt-2 border border-zinc-700  bg-opacity-75 p-1 pl-2 pr-0 rounded-xl text-white justify-center items-center rounded-b-none">Seller: <AddressBadge class="text-base ml-2" :address="nftFactory.nftState.owner"/></p>
        
            <p class="text-md text-center w-full flex flex-row border border-zinc-700  bg-opacity-75 p-1 pl-2 pr-0 rounded-xl text-white justify-center items-center rounded-t-none border-t-0">
            To pay: {{ nftFactory.displayPrice }} {{ nftFactory.version == 1 ? 'AR (Arweave)' : nftFactory.nftState.listingCoin + " (" + nftFactory.nftState.listingChain + ")" }}
            </p>
            <amazing-button class="mt-4 mb-2 min-w-[50%] w-max px-4 mx-auto" @click="signPayment">Sign payment</amazing-button>
        </div>

  
        </div>
</template>
<script setup>
import config from "~/config/config.json"
const { signer, nftFactory } = defineProps(["signer", "nftFactory"])
let emit=defineEmits(['broadcastedOnSourceChain','finalizedOnSourceChain','sentToGlome'])
const notifications=useNotifications()
const arweaveSigner=useArweaveSigner()

async function signPayment() {

    const sent = await signer.value.sendCoins(await signer.value.getActiveAddress(), nftFactory.nftState.listingAddress, nftFactory.nftState.price,{})
    emit('broadcastedOnSourceChain', sent)
    notifications.showNotification('success', 'Transaction broadcated', 'Transaction is broadcated to ' + nftFactory.nftState.listingChain + ' network and waiting to be included in block', { title: "View transaction", href: config.blockExplorers[nftFactory.nftState.listingChain] + sent })
    await signer.value.waitForFinality(sent)
    emit("finalizedOnSourceChain")
    notifications.showNotification('success', 'Transaction finalized', "Your transaction is included in block", { title: "View transaction", href: config.blockExplorers[nftFactory.nftState.listingChain] + sent })
    await arweaveSigner.interactWithGlome(nftFactory.nftId, 'finalize-buy', {
        price: nftFactory.nftState.price,
        transferTxID: sent,
        reservationTxId: nftFactory.nftState.reservationTxId
    })
    emit("sentToGlome")
   
}
</script>