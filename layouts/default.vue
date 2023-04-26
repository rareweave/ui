<template>
    <div 
        v-if="wallet"
        class="antialiased" 
    >
        <Navbar />
        <slot />
    </div>
    <div 
        v-else
    >
        <connect-wallet 
            :show="true"
        />
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