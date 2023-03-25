<template>
    <div class="h-full-navbared w-full flex flex-col items-center justify-center" :style="{
        backgroundImage: ` linear-gradient(-200deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('${user.profile.banner != 'ar://a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k' ? user.profile.bannerURL : 'https://y5sx5rsd43kdnqpxti4e7ebgg22ns7vftdzu57pxik4teolqlkuq.arweave.net/x2V-xkPm1DbB95o4T5AmNrTZfqWY807990K5MjlwWqk'}')`, backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat',

    }">
        <img :src="user.profile.avatarURL" class="w-64 rounded-xl mx-4 backdrop-blur-sm" />
        <h1 class="text-xl font-mono text-white">{{ user.handle }}</h1>
        <span class="text-xs text-gray-500">{{ user.addr }}</span>
        <div class="bg-black bg-opacity-50 font-mono mt-2 text-white px-4 flex flex-col justify-center items-center">

            <div v-if="userAnsName" class="m-2">ANS Name: <a :href="'https://www.ans.gg/dashboard/' + user.addr"
                    class="link hover:text-orange-600">{{ userAnsName
                    }}</a></div>
            <div v-else class="m-2">ANS Name: <a href="https://ans.gg" class="btn btn-sm amazing-button">Get one</a>
            </div>
            <div class="m-2 max-w-[16rem] w-max font-mono text-sm font-light text-gray-400 text-center whitespace-pre-wrap">
                {{
                    user.profile.bio }}</div>
        </div>
    </div>
</template>

<script setup>
import Arweave from "arweave"
import Account from "arweave-account";
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

let height = ref((await $fetch("https://arweave.net/info")).height)
const accountTools = accountToolsState.value
const warp = WarpFactory.forMainnet({
    inMemory: true,
}, false, arweave)
let user = ref(await accountTools.get(profileAddress))
let userAnsName = (await $fetch(`https://ans-resolver.herokuapp.com/resolve/${user.addr}`))?.domain
console.log(user.value)
let selfProfile = profileAddress == account?.value?.addr
console.log(selfProfile)
function encodeTags(tags) {
    return tags.map(tag => ({ name: btoa(tag.name), value: btoa(tag.value) }))
}




definePageMeta({
    layout: "without-auth",
});
</script>