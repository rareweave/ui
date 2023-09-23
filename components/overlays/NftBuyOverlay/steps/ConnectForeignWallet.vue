<template>
    <div class="w-full flex flex-col max-w-sm justify-center items-center">
        <p class="text-sm text-center w-full mt-2">Connect your {{ nftFactory.nftState.listingChain.at(0).toUpperCase()+nftFactory.nftState.listingChain.slice(1) }}</p>
        <div class="w-max text-center flex flex-col mt-2">

        </div>


    </div>
</template>
<script setup>
import config from "~/config/config.json"
const { signer, nftFactory } = defineProps(["signer", "nftFactory"])
let emit = defineEmits(['broadcasted', 'finalized'])
const notifications = useNotifications()

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
                        reservationTxId: nftFactory.nftState.reservationTxId
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
                notifications.showNotification('success', 'Transaction finalized', 'Your transaction is included in block ' + finalized.height + " and will be executed soon.", { title: "View transaction", href: config.txExplorer + id })
            }
        })
    }
}
</script>