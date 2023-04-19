<template>
    <div class="h-full antialiased" v-if="wallet">
        <Navbar />
        <slot />
    </div>
    <div v-else class="h-full flex flex-row justify-center items-center">
        <connect-wallet :show="true" />
    </div>
</template>
<script setup>
let wallet = useState("wallet", () => null);
// router.push("#connectWallet");
</script>
<style>
#__nuxt {
    height: 100vh;
    width: 100%;

}
</style>