<template>
    <div class="bg-zinc-900 rounded-xl p-4 flex flex-col fixed left-0 top-0 m-auto right-0 bottom-0 w-96 h-max bg-opacity-80 backdrop-blur-md items-center max-w-[90%] " v-if="arweaveSigner.overlayShown">
    <button class="absolute top-0 right-0 p-1 rounded-tr-xl rounded-bl-xl rounded-br-none rounded-tl-none hover:bg-zinc-900 transition-colors border-l border-b border-gray-700 bg-[#1B2430]" @click="arweaveSigner.callOverlay(true)">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
    </button>
    <p class="text-xl">Connect your Arweave wallet</p>
    <div class="flex flex-col gap-2 items-center w-full mt-4 justify-center sm:flex-row">
    <button @click="connectArconnect()" class="p-4 bg-zinc-950 rounded-xl  border-zinc-800 border hover:border-zinc-700 transition-colors text-center flex flex-col items-center text-md"><div class="p-3 bg-zinc-900 w-32 h-32 mb-3 rounded-xl"><img src="~/assets/arconnect.webp" class="w-full h-full "/></div> ArConnect</button>
     <button @click="connectArweaveApp()" class="p-4 bg-zinc-950 rounded-xl  border-zinc-800 border hover:border-zinc-700 transition-colors text-center flex flex-col items-center text-md"><img src="~/assets/arweave.app.svg" class="w-32 h-32 mb-3 rounded-xl"/> Arweave.app</button>
    </div>
    </div>
</template>
<script setup>
import { arweaveAppUrl } from "~/config/config.json"
import { ArweaveWebWallet } from "arweave-wallet-connector";
const arweaveSigner = useArweaveSigner()
const notifications=useNotifications()


async function connectArconnect() {
    if (!("arweaveWallet" in window && "connect" in window.arweaveWallet)) {
        notifications.showNotification('error','Could not detect Arconnect','Please install Arconnect to proceed', {title:'Install',href:'https://www.arconnect.io/download'})
    }
      const permissions = await window.arweaveWallet.getPermissions();

    if (permissions.length <= 5) {
        await window.arweaveWallet.connect([
            "ACCESS_ADDRESS",
            "DECRYPT",
            "ACCESS_PUBLIC_KEY",
            "DISPATCH",
            "SIGN_TRANSACTION",
            "ACCESS_ARWEAVE_CONFIG",
        ]);
    }

    arweaveSigner.setSigner({
        ...window.arweaveWallet, decrypt: (actualData, opts) => {

            return window.arweaveWallet.decrypt(typedArrayToBuffer(actualData), {name:"RSA-OAEP"})        
    } })
    
}
async function connectArweaveApp() {
    let webwallet = new ArweaveWebWallet(
        {
            name: "RareWeave",
            logo: "https://uww52thwbamkjai5oi7pi6hfiqigwn5skuaklgmebscumieurkta.arweave.net/pa3dTPYIGKSBHXI-9HjlRBBrN7JVAKWZhAyFRiCUiqY",
        },
        {
            state: {
                url: arweaveAppUrl,
            },
        }
    );

    webwallet.setUrl(arweaveAppUrl);

    await webwallet.connect();
    webwallet.namespaces.arweaveWallet.type = "Arweave.app"
    webwallet.namespaces.arweaveWallet
    webwallet.namespaces.arweaveWallet.signDataItem = async (tx) => {
        return await webwallet.signDataItem(tx)
    };
    arweaveSigner.setSigner(webwallet.namespaces.arweaveWallet)
}

function typedArrayToBuffer(array) {
    return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
}
</script>