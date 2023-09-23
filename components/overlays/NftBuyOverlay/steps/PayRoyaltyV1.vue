<template>

    <div class="w-full flex flex-col max-w-sm justify-center items-center">
    <p class="text-sm text-center w-full mt-2">To protect from lock spam attacks, our protocol requires buyers to pay royalty to NFT uploader</p>
    <div class="w-max text-center flex flex-col mt-2">
        <p class="text-md text-center w-full flex flex-row mt-2 border border-zinc-700  bg-opacity-75 p-1 pl-2 pr-0 rounded-xl text-white justify-center items-center rounded-b-none">NFT uploader: <AddressBadge class="text-base ml-2" :address="nftFactory.nftState.minter"/></p>
        <p class="text-md text-center w-full flex flex-row border border-zinc-700  bg-opacity-75 p-1 pl-2 pr-0  text-white justify-center items-center rounded-none border-t-0">Royalty: {{ nftFactory.nftState.royalty*100 }}%</p>
        <p class="text-md text-center w-full flex flex-row border border-zinc-700  bg-opacity-75 p-1 pl-2 pr-0 rounded-xl text-white justify-center items-center rounded-t-none border-t-0">
        To pay: {{ nftFactory.displayRoyaltyAmount}} {{nftFactory.version==1?'AR (Arweave)':nftFactory.nftState.listingCoin+" ("+nftFactory.nftState.listingChain+")"}}
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
        let { id, waitUntilFinalization, broadcast } = await signer.sendCoins(nftFactory.nftState.minter, nftFactory.royaltyAmount,
           [
                {
                    name: "Contract",
                    value: nftFactory.nftId,
                },
                {
                    name: "Input",
                    value: JSON.stringify({
                        function: "reserve-buying-zone",
                        price: nftFactory.nftState.price,
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
            ]
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