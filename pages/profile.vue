<template>
    <div class="h-full-navbared w-full flex flex-col items-center justify-center" :style="{
        backgroundImage: ` linear-gradient(-200deg,rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),radial-gradient(#000000a0, #000000ff), url('${user.profile.banner != 'ar://a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k' ? user.profile.bannerURL : '/profile-default-bg.jpg'}')`,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundClip: 'border-box',
        backgroundSize: 'auto 100%'

    }">
        <template v-if="selfProfile">
            <div class="flex flex-col items-center justify-center w-full md:w-96 m-4 pt-4 px-4">
                <label for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full md:w-64 min-h-64 border-2 border-dashed rounded-lg cursor-pointer bg-base-300 hover:bg-base-200 border-zinc-800">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">

                        <img v-if="!avatarObjectUrl" :src="user.profile.avatarURL" class="inline-flex w-48" />
                        <img :src="avatarObjectUrl" class=" inline-flex w-48" />


                        <p class="mb-2 mt-4 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                                upload new avatar </span></p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, GIF</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" required @change="uploadNewPfp" />
                </label>

                <div
                    class="bg-black bg-opacity-50 backdrop-blur-[2px] font-mono mt-2 text-white px-4 flex flex-col justify-center items-center w-full">
                    <label class="input-group mt-2 w-max"> <input
                            class="input input-sm max-w-[8rem] input-bordered bg-black bg-opacity-75 text-lg"
                            v-model="user.profile.handleName" />
                        <span>#{{ user.addr.slice(0, 6) }}</span>
                    </label>
                    <div v-if="userAnsName" class="m-2">ANS Name: <a :href="'https://www.ans.gg/dashboard/' + user.addr"
                            class="link hover:text-orange-600">{{ userAnsName
                            }}</a></div>
                    <div v-else class="m-2">ANS Name: <a href="https://ans.gg" class="btn btn-sm amazing-button">Get one</a>
                    </div>
                    <textarea
                        class=" textarea textarea-bordered p-1 m-2 max-w-[16rem] w-full min-h-[6rem] font-mono text-sm font-light text-gray-200 bg-black bg-opacity-70 text-center whitespace-pre-wrap "
                        v-model="user.profile.bio"></textarea>
                    <label class="input-group my-1 w-full"> <span
                            class="min-w-[7rem] text-center justify-center">Github:</span><input
                            class="input input-sm w-full input-bordered bg-black bg-opacity-75 text-lg"
                            v-model="user.profile.links.github" />

                    </label>
                    <label class="input-group my-1 w-full"> <span
                            class="min-w-[7rem] text-center justify-center">Twitter:</span><input
                            class="input input-sm w-full input-bordered bg-black bg-opacity-75 text-lg"
                            v-model="user.profile.links.twitter" />

                    </label>
                    <label class="input-group my-1 w-full"> <span
                            class="min-w-[7rem] text-center justify-center">Discord:</span><input
                            class="input input-sm w-full input-bordered bg-black bg-opacity-75 text-lg"
                            v-model="user.profile.links.discord" />

                    </label>
                    <label class="input-group my-1 w-full"> <span
                            class="min-w-[7rem] text-center justify-center">Instagram:</span><input
                            class="input input-sm w-full input-bordered bg-black bg-opacity-75 text-lg"
                            v-model="user.profile.links.instagram" />

                    </label>

                </div>
                <button :class="['btn', 'amazing-button2', 'rounded-md', 'w-full', 'my-2', , changed ? '' : 'btn-disabled']"
                    :disabled="!changed" @click="saveChangesToProfile">Save
                    changes</button>
            </div>


        </template>
        <template v-else>
            <img :src="user.profile.avatarURL" class="w-64 rounded-xl mx-4 backdrop-blur-sm" />
            <h1 class="text-xl font-mono text-white">{{ user.handle }}</h1>
            <span class="text-xs text-gray-500">{{ user.addr }}</span>
            <div class="bg-black bg-opacity-50 font-mono mt-2 text-white px-4 flex flex-col justify-center items-center">

                <div v-if="userAnsName" class="m-2">ANS Name: <a :href="'https://www.ans.gg/dashboard/' + user.addr"
                        class="link hover:text-orange-600">{{ userAnsName
                        }}</a></div>
                <div v-else class="m-2">ANS Name: <a href="https://ans.gg" class="btn btn-sm amazing-button">Get one</a>
                </div>
                <div
                    class="m-2 max-w-[16rem] w-max font-mono text-sm font-light text-gray-400 text-center whitespace-pre-wrap">
                    {{
                        user.profile.bio }}</div>
            </div>
        </template>
    </div>
</template>

<script setup>
import Arweave from "arweave"
import Account from "arweave-account";
import { Buffer } from "buffer";
const { Warp, Contract, WarpFactory } = await import('warp-contracts')
let profileAddress = useRoute().hash.slice(1)
let account = useState("account", () => null);
let ansAddr = useState("ansAddr", () => null)

let accountToolsState = useState("accountTools", () => new Account({
    cacheIsActivated: true,
    cacheSize: 100,
    cacheTime: 60,
}))
let walletState = useState("wallet", () => null);
let wallet = walletState.value
const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 60_000,
    logging: false,
});
let avatarObjectUrl = ref(null)
let height = ref((await $fetch("https://arweave.net/info")).height)
const accountTools = accountToolsState.value
const warp = WarpFactory.forMainnet({
    inMemory: true,
}, false, arweave)
let userProfileOrig = ref(await accountTools.get(profileAddress))
let user = ref(JSON.parse(JSON.stringify(userProfileOrig.value)))
let userAnsName = (await $fetch(`https://ans-resolver.herokuapp.com/resolve/${user.value.addr}`))?.domain
let changed = computed(() => {
    let ch = JSON.stringify(user.value) != JSON.stringify(userProfileOrig.value)
    return ch
})
let selfProfile = profileAddress == account?.value?.addr
console.log(selfProfile)
function encodeTags(tags) {
    return tags.map(tag => ({ name: btoa(tag.name), value: btoa(tag.value) }))
}
let pfpMeta = ref(null)
async function uploadNewPfp(e) {
    if (e.target.files && e.target.files[0]) {
        if (avatarObjectUrl.value) { URL.revokeObjectURL(avatarObjectUrl.value) }
        avatarObjectUrl.value = URL.createObjectURL(e.target.files[0])
        pfpMeta.value = e.target.files[0]
        let pfpContent = await readAsArrayBuffer(e.target.files[0])
        let tx = await arweave.createTransaction({

            data: Buffer.from(new Uint8Array(pfpContent)), tags: encodeTags([
                { name: "App-Name", value: "RareWeave" },
                { name: "App-Version", value: "0.3.0" },

            ])
        })
        if (pfpContent.byteLength > 100000) {
            await arweave.transactions.sign(tx)
            let uploader = await arweave.transactions.getUploader(tx);

            while (!uploader.isComplete) {
                await uploader.uploadChunk();
                console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
            }
        } else {
            tx = await wallet.dispatch(tx)
        }
        user.value.profile.avatar = "ar://" + tx.id
        console.log(tx.id)
    }
}
function readAsArrayBuffer(file) {
    return new Promise(resolve => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            resolve(reader.result)
        }, false)
        reader.readAsArrayBuffer(file)
    })
}
async function saveChangesToProfile() {
    await accountTools.connect()
    await accountTools.updateProfile(user.value.profile);
    userProfileOrig.value = JSON.parse(JSON.stringify(user.value))
}
definePageMeta({
    layout: "without-auth",
});
</script>