<template>

    <div class="w-full flex flex-col max-w-sm justify-center items-center">
    <p class="text-sm text-center w-full mt-2">You're almost there! You paid royalty, reserving buyer spot. Now it's time to commit actual payment to seller</p>
    <div class="w-max text-center flex flex-col mt-2">
        <p class="text-md text-center w-full flex flex-row mt-2 border border-zinc-700  bg-opacity-75 p-1 pl-2 pr-0 rounded-xl text-white justify-center items-center rounded-b-none">Seller: <AddressBadge class="text-base ml-2" :address="nftFactory.nftState.owner"/></p>
        
        <p class="text-md text-center w-full flex flex-row border border-zinc-700  bg-opacity-75 p-1 pl-2 pr-0 rounded-xl text-white justify-center items-center rounded-t-none border-t-0">
        To pay: {{ nftFactory.displayPrice}} {{nftFactory.version==1?'AR (Arweave)':nftFactory.nftState.listingCoin+" ("+nftFactory.nftState.listingChain+")"}}
        </p>
        <amazing-button class="mt-4 mb-2 min-w-[50%] w-max px-4 mx-auto" @click="signPayment">Sign payment</amazing-button>
    </div>

  
    </div>
</template>
<script setup>
import config from "~/config/config.json"
const { signer, nftFactory } = defineProps(["signer", "nftFactory"])
let emit=defineEmits(['broadcasted','finalized'])
const notifications=useNotifications()

async function signPayment() {
    if (nftFactory.version == 1) {
        let { id, waitUntilFinalization, broadcast } = await signer.sendCoins(nftFactory.nftState.owner, nftFactory.nftState.price,
           [
                {
                    name: "Contract",
                    value: nftFactory.nftId,
                },
                {
                    name: "Input",
                    value: JSON.stringify({
                        function: "finalize-buy",
                        price: nftFactory.nftState.price,
                        reservationTxId:nftFactory.nftState.reservationTxId
                    }),
                },
                {
                    name: "App-Name",
                    value: "SmartWeaveAction",
                },
                {
                    name: "App-Version",
                    value: "0.3.0",
                },
                {
                    name: "SDK",
                    value: "Glome",
                },
            ],
            nftFactory.nftState.reservationTxId
        )
        broadcast();
        notifications.showNotification('success', 'Transaction broadcasted', 'Your transaction is broadcasted to network and will be finalized soon.', { title: "View transaction", href: config.txExplorer + id })
        emit('broadcasted', id);


        waitUntilFinalization().then(finalized => {
            if (finalized != 'error') {
                emit('finalized', finalized);
                notifications.showNotification('success', 'Transaction finalized', 'Your transaction is included in block '+finalized.height+" and will be executed soon.", { title: "View transaction", href: config.txExplorer + id })
            }
        })
    }
}
</script>