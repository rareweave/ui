import config from "~/config/config.json"
export const useArweaveSigner = defineStore("arweaveSigner", () => {

    const utils = useUtils()
    const notifications = useNotifications()


    const signer = ref(null)
    const isSignerSet = ref(false)
    const overlayShown = ref(false)
    const address = ref("")
    const account = ref(null)
    const ans = ref(null)
    const spendable = ref(0)
    const networkInfo = ref({})

    async function refetchNetworkInfo(){
        networkInfo.value=await $fetch('https://'+config.arweaveGateway+'/info')
    }
    refetchNetworkInfo()
    setInterval(refetchNetworkInfo,20000)

    watch(address, async () => {
        if (isSignerSet) {
            utils.account.connect("use_wallet")
            $fetch("https://ans-resolver.herokuapp.com/resolve/" + address.value).then(ansResult => {
                ans.value = ansResult?.domain
            })

            utils.account.get(address.value).then(accountResult => {
                account.value = accountResult
            })
            utils.arweave.wallets.getBalance(address.value).then(winston => {
                spendable.value = utils.arweave.ar.winstonToAr(winston);
            });



        }
    })



    async function setSigner(singerInterface) {
        signer.value = singerInterface
        address.value = await singerInterface.getActiveAddress()
        overlayShown.value = false
        isSignerSet.value = true
        notifications.showNotification('success', 'Logged in successfully', 'You can continue using app',)
    }
    async function callOverlay(close) {

        if (close) { overlayShown.value = false; return false } else if (!isSignerSet.value) {
            overlayShown.value = true
            return false
        } else {
            return true
        }
    }
    async function interactWithGlome(contractId, methodName, input) {
        const signedDataItem = await signDataItem({
            data: "Glome contract call",
            tags: [{
                name: "Contract",
                value: contractId
            },
                {
                    name: "Input",
                    value: JSON.stringify({
                        function: methodName,
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
                    name: "SDK",
                    value: "Glome",
                },
            ]
        })
        
        await $fetch(`${config.GlomeNode}/tx`, {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream"
            },
            body: signedDataItem
        });
    }
    async function signDataItem(dataItem) {
        if (isSignerSet.value == true) {
            return await signer.value.signDataItem(dataItem)
        } else {
            callOverlay()
            return null
        }
    }
    async function sendCoins(to, amount, tags = [], anchor) {
        let feeEstimate = await fetch(`https://${config.arweaveGateway}/price/10000000/${to}`)
            .then((res) => res.text())
            .catch((err) => {
                notifications.showNotification('error', 'Could not fetch fee estimate', JSON.stringify(err))
                return null
            });

        if (feeEstimate == null) { return null }

        let tx = await utils.arweave.createTransaction({
            data: "Payment",
            target: to,
            tags: encodeTags(tags),
            quantity: amount.toString(),
            reward: feeEstimate,
            anchor: anchor ? await fetchBlockForTx(anchor).hash :undefined
        });

        try {
            tx = { ...await signer.value.sign(tx), data: tx.data }
        } catch (e) {
            notifications.showNotification('error', 'Could not sign transaction', JSON.stringify(e))
            return null
        }
        return {
            id: tx.id,
            broadcast: () => utils.arweave.transactions.post(tx),
            waitUntilFinalization: async function waitUntilFinalization(tries = 0) {
                if (tries >= 100) {
                    return "error";
                }
                try {
                    await (
                        await fetch("https://" + config.arweaveGateway + "/tx/" + tx.id)
                    ).json();
                    // if it didn't throw error it's in block
                    
                    let txBlock = await fetchBlockForTx(tx.id)
                    if (!txBlock) {
                        console.log("couldn't fetch gql",txBlock)
                        throw new Error("Not finalized yet")
                    } else {
                        console.log("could fetch gql",txBlock)
                        return txBlock
                    }


                } catch (e) {
                    await wait(10000);
                    return await waitUntilFinalization(tx.id, ++tries);
                }
            }
        }

    }
    async function fetchBlockForTx(txid){
        return (await $fetch('https://' + config.arweaveGateway + '/graphql', {
            method: "POST", headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `query {
                                transaction(id:"${txid}") {
                                    id
                                    
    		                        block{
      			                        height
      			                        id
    		                        }
                                }
    }`,
            }),
        }))?.data?.transaction?.block
    }
    async function logout() {
        signer.value = null
        address.value = null
        isSignerSet.value = false
    }


    return { setSigner, isSignerSet, callOverlay, signDataItem, logout, sendCoins, account, address, signer, overlayShown, ans, spendable, networkInfo,interactWithGlome }
})

function encodeTags(tags) {
    return tags.map((tag) => ({
        name: btoa(tag.name),
        value: btoa(tag.value),
    }));
}
function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}