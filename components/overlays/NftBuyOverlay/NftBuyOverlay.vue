<template>
    <div class="bg-zinc-900 rounded-xl p-4 flex flex-col fixed left-0 top-0 m-auto right-0 bottom-0 min-w-[24rem] w-max h-max bg-opacity-80 backdrop-blur-md items-center max-w-[90%] "
        v-if="nftFactory.nftBuyOverlayShown">
        <button
            class="absolute top-0 right-0 p-1 rounded-tr-xl rounded-bl-xl rounded-br-none rounded-tl-none hover:bg-zinc-900 transition-colors border-l border-b border-gray-700 bg-zinc-800"
            @click="() => nftFactory.nftBuyOverlayShown = false">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <p class="text-xl">Buy {{ nftFactory.nftState.name }}</p>


        <ol
            class="flex mt-2 items-center w-full p-3 space-x-2 text-sm font-medium text-center border rounded-b-none rounded-lg shadow-sm text-gray-400 border-gray-700  sm:space-x-4 justify-center">

            <li v-for="(step, stepIndex) in steps"
                :class="['flex','font-bold', 'items-center', stepIndex < currentStep ? 'text-green-600' : '', stepIndex == currentStep ? 'text-blue-500' : '']">

                <span v-if="stepIndex >= currentStep"
                    :class="['flex', 'items-center', ' justify-center', 'w-5', 'h-5', 'mr-2', 'text-xs', 'border', 'rounded-full', 'shrink-0', , stepIndex < currentStep ? 'border-green-600' : '', stepIndex == currentStep ? 'border-blue-500' : '']">
                    {{ stepIndex + 1 }}
                </span>

                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 mr-2 text-xs shrink-0 text-green-600">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                {{ step }}

                <svg v-if="stepIndex != steps.length - 1" class="w-3 h-3 ml-2 sm:ml-4" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                </svg>

            </li>

        </ol>
        <div v-show="!isLoading" v-if="nftFactory.version==1"
            class="p-2 border border-t-0 flex items-center w-full text-sm font-medium text-center rounded-t-none rounded-lg shadow-sm text-gray-400 border-gray-700 justify-center">
            <PayRoyaltyV1 :nftFactory="nftFactory" :signer="paymentSigner" v-if="currentStep == 1"
                @broadcasted="()=>setLoading('Wait for your transaction to be included in block', 'It may take several minutes')" 
                @finalized="()=>setLoading('Wait for execution','You\'re almost there! You transaction is included in block, just wait for Glome (our smart contract engine) to it. It shouldn\'t take too long','spinner')" />
            <PayFinalizationV1 :nftFactory="nftFactory" :signer="paymentSigner" v-if="currentStep == 2"
                    @broadcasted="() => setLoading('Wait for your transaction to be included in block', 'It may take several minutes')" 
                    @finalized="() => setLoading('Wait for execution', 'You\'re almost there! You transaction is included in block, just wait for Glome (our smart contract engine) to it. It shouldn\'t take too long', 'spinner')" />
            <AfterBuying :nftFactory="nftFactory" v-if="currentStep==3"/>
        </div>


                <div v-show="!isLoading" v-if="nftFactory.version == 2"
                class="p-2 border border-t-0 flex items-center w-full text-sm font-medium text-center rounded-t-none rounded-lg shadow-sm text-gray-400 border-gray-700 justify-center">
                 <ConnectForeignWallet v-if="currentStep==0" :nftFactory="nftFactory" @connected="setSigner"/>
                <PayRoyalty :nftFactory="nftFactory" :signer="paymentSigner" v-if="currentStep == 1"
                    @broadcastedOnSourceChain="() => setLoading('Wait for your transaction to be processed by '+nftFactory.nftState.listingChain, 'It may take some time')" 
                    @sentToGlome="() => setLoading('Wait for execution', 'You\'re almost there! You transaction is included in block, just wait for Glome (our smart contract engine) to it. It shouldn\'t take too long', 'spinner')" />
                <PayFinalization :nftFactory="nftFactory" :signer="paymentSigner" v-if="currentStep == 2"
                     @broadcastedOnSourceChain="() => setLoading('Wait for your transaction to be processed by ' + nftFactory.nftState.listingChain, 'It may take some time')" 
                        @sentToGlome="() => setLoading('Wait for execution', 'You\'re almost there! You transaction is included in block, just wait for Glome (our smart contract engine) to it. It shouldn\'t take too long', 'spinner')" />
                <AfterBuying :nftFactory="nftFactory" v-if="currentStep == 3"/>
            </div>
        <div v-if="isLoading"
            class="p-2 border border-t-0 flex items-center w-fulltext-sm font-medium text-center rounded-t-none rounded-lg shadow-sm flex-col text-gray-400 border-gray-700 justify-center">

            <p class="text-white w-full text-center text-lg mt-2 mx-2">{{ loadingMessage }}</p>
            <p class="text-gray-400 w-full text-center text-sm max-w-md">{{ loadingSubMessage }}</p>

            <div class="w-full text-center p-2">
                <div class="w-full h-4 mb-4 rounded-full bg-gray-700" v-if="loadingType=='loadbar'">
                    <div ref="loadbar" class="h-4 bg-blue-600 rounded-full dark:bg-blue-500 loadbar"></div>
                </div>
               
                   <div class="relative mx-auto w-24 h-24 animate-spin rounded-full bg-gradient-to-r  from-purple-400 via-blue-500 to-red-400 mt-2" v-else-if="loadingType=='spinner'">
                     <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-zinc-900 rounded-full  animate-pulse"></div>
                   
                </div>
            </div>

        </div>

    </div>
</template>
<script setup>


const arweaveSigner = useArweaveSigner()
const notifications = useNotifications()
const nftFactory = useNft()
const steps = ref(["Connect wallet", "Pay royalty", "Get NFT"])
const currentStep = ref(0)
const paymentSigner = ref(null)

const isLoading = ref(false)
const loadingMessage = ref("")
const loadingSubMessage = ref('')
const time= ref(Date.now())
const loadbar = ref(null)
const reserverAddress = ref(null)
const loadingType = ref('loadbar')

setInterval(()=>time.value=Date.now(),3000)

function setSigner(signer) {
    paymentSigner.value = signer
    currentStep.value=1
}


watch(() => ({ ...nftFactory.nftState, _currentheight: arweaveSigner?.networkInfo?.height, currentStep: currentStep.value }), function reloadReserverAddress() {

    if (!nftFactory.loaded) { reserverAddress.value = null; return }
    if (!nftFactory.nftState.reserver || nftFactory.version==1?((arweaveSigner?.networkInfo?.height - nftFactory.nftState.reservationBlockHeight) > 13): ((time.value - nftFactory.nftState.reservationTimestamp) > 600000))// reservation is 15 blocks, gateways is most likely lagging 1 block behind, and it's too late/dengerous to broadcast on block 14 
    { reserverAddress.value = null; } else {
            reserverAddress.value = nftFactory.nftState.reserver
    }

    if (arweaveSigner.address == nftFactory.nftState.owner && currentStep.value == 2) {
        currentStep.value = 3;
        setLoading(false)
    }

    if (reserverAddress.value == arweaveSigner.address && currentStep.value==1) {
        currentStep.value = 2
        setLoading(false);
    }


})

watch(()=>nftFactory.nftBuyOverlayShown, function reset() {

    loadingType.value = 'loadbar'
    isLoading.value = false;
    currentStep.value = 0

    if (nftFactory.version == 1) {
        if (currentStep.value == 0) {
            currentStep.value = 1
            paymentSigner.value = arweaveSigner
        }
        else if (reserverAddress.value == arweaveSigner.address&& currentStep.value==1) {
            currentStep.value=2
        }
    } else if (nftFactory.version == 2) {
        if (!paymentSigner.value) {
            currentStep.value = 0
            return
        } else if(currentStep.value==0) {
            currentStep.value=1
        } 
        if(reserverAddress.value == arweaveSigner.address && currentStep.value == 1) {
            currentStep.value = 2
        }
        
    }


})



function setLoading(msg, subMsg, loadType) {
    console.log(msg)
    if (!msg) {
        isLoading.value = false
    } else {
        loadingMessage.value = msg
        loadingSubMessage.value = subMsg
        loadingType.value = loadType || 'loadbar'
        isLoading.value = true
        nextTick(() => {
            if(!loadbar.value){return}
            loadbar.value.getAnimations().map(a => a.play())
        })
        
       
    }

}




</script>

<style scoped>
@keyframes loadbar {
    0% {
        width: 5%;
    }

    20% {
        width: 25%;
    }

    40% {
        width: 60%;
    }

    80% {
        width: 80%;
    }

    100% {
        width: 90%;
    }
}

.loadbar {
    animation: loadbar 200s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1;
}</style>