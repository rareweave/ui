<template>
    <div v-if="account"
        class="py-4 px-2 bg-zinc-900 w-full flex flex-row justify-between items-center border-b border-b-zinc-900">
        <NuxtLink to="/" class="rareweave-font font-mono font-bold text-3xl ml-2">RareWeave</NuxtLink>
        <NuxtLink
            class="bg-neutral font-mono hover:bg-neutral-focus transition-all rounded-full p-2 inline-flex flex-row items-center border border-base-300 cursor-pointer"
            :replace="false" :to="'/profile/' + account.addr">
            <img class="h-[2rem] mr-2" :src="account.profile.avatarURL" />{{ ansAddr || account.handle }}
        </NuxtLink>
    </div>
    <div v-else class="py-4 px-2 bg-zinc-900 w-full flex flex-row justify-between items-center">
        <NuxtLink to="/" class="rareweave-font text-3xl font-bold ml-2 font-mono">RareWeave</NuxtLink>
        <NuxtLink class="btn amazing-button2 rounded-full transition-all font-mono" to="/login">Login
        </NuxtLink>
    </div>
</template>
<style>
@keyframes amazing-bg {
    from {

        background-position-x: 0%;
    }

    50% {

        background-position-x: 200%;
    }

    to {

        background-position-x: 0%;
    }
}

.amazing-button {
    background: rgb(97, 9, 168);
    background: radial-gradient(circle, rgba(97, 9, 168, 1) 0%, rgba(121, 41, 9, 1) 25%, rgba(179, 22, 83, 1) 50%, rgba(171, 49, 107, 1) 61%, rgba(167, 40, 83, 1) 73%, rgb(185, 25, 36) 100%);
    background-size: 300% 300%;
    animation: amazing-bg 10s linear infinite;
}
</style>
<script setup>
let account = useState("account", () => null);
let ansAddr = useState("ansAddr", () => null)
console.log(account.value)
</script>