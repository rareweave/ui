import { GlomeNode } from "../config/config.json";
import exponents from "~/config/exponents.json";
import { BigFloat } from "bigfloat.js";

export const useNft = defineStore("currentNft", () => {
    //non-reactive declarations
    let updateInterval = null;
    
    //declarations
    const arweaveSigner=useArweaveSigner()
    const loaded = ref(false)
    const version = ref(1)
    const nftId = ref("")
    const nftState = ref({
            owner: null,
            minter: null,
            name: null,
            description: null,
            ticker: "RWNFT",
            balances: {
                [null]: 1,
            },
            contentType: null,
            createdAt: null,
            evolve: null,
            forSale: null,
            price: 0,
            reservationBlockHeight: 0,
            royalty: 0,
            royaltyAddresses: {},
            listingAddress: null,
            listingChain: null,
            listingCoin: null,
        
    })
    const nftBuyOverlayShown=ref(false)
    
    // computed properties
    const exponent = computed(() => {
        return version.value==1?12:exponents[nftState.value.listingChain][nftState.value.listingCoin]
    })
    const displayPrice = computed(() => {
        return new BigFloat(nftState.value.price).div(new BigFloat("10").pow(exponent.value)).toString()
    })
    const royaltyAmount = computed(() => {
        return new BigFloat(nftState.value.price).mul(new BigFloat(nftState.value.royalty)).toString()
        
    })
    const displayRoyaltyAmount = computed(() => {
        return new BigFloat(royaltyAmount.value).div(new BigFloat("10").pow(exponent.value)).toString()
       
    })
    

    // methods
    async function setId(id) {
        nftId.value = id
        await refetch()
    }
    async function refetch() {
        loaded.value = false
        nftState.value = await $fetch(`${GlomeNode}/state/` + nftId.value);
        if (!nftState.value) {
            throw new Error("Failed to fetch NFT state")
        }
        version.value = nftState.value.version || 1
        loaded.value = true
    }
    function keepUpdated() {
        updateInterval=setInterval(refetch, 10000)
    }
    function stopUpdates() {
        if (updateInterval != null) {
            clearInterval(updateInterval)
            updateInterval = null
        }
    }
    async function interact(signer, method, input) {
        let tags = [
            {
                name: "Contract",
                value: nftId.value,
            },
            {
                name: "Input",
                value: JSON.stringify({
                    function: method,
                    ...input
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
                name: "Nonce",
                value: Date.now().toString(),
            },
            {
                name: "SDK",
                value: "Glome 0.4.0",
            },
        ];

        let tx = {
            data: "Glome Contract Call",
            tags: tags,
        }

        try {
            const signed = await signer.signDataItem(tx)
            await fetch(`${GlomeNode}/tx`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/octet-stream"
                },
                body: signed
            });
        } catch (e) {
            console.error(e);
            alert("Failed to post tx");
        }
    }
    async function buy() {
        
        if (!await arweaveSigner.callOverlay()) {
            return
        }
        nftBuyOverlayShown.value=true
    }


    return { nftState, loaded, setId, refetch, nftId, exponent, displayPrice, royaltyAmount, keepUpdated, stopUpdates, buy, nftBuyOverlayShown,version, displayRoyaltyAmount }
})