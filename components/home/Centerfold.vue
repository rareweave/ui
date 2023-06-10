<template>
            <div class="Column">
    <div class="flex flex-col items-center justify-start w-full flex-1 mx-auto py-10"
        style="background: radial-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url(/s23-00.jpg); background-position: center;"
    >
        <div class="relative flex flex-wrap justify-start items-start h-full mt-32">
            <div class="Column flex-row justify-start align-center w-100">
                <div class="Header max-w-[600px]">
                    <h1 class="text-white text-left text-2xl lg:text-5xl font-semibold justify-center text-center">
                        A liquid market on <br />Arweave
                    </h1>
                    <p class="flex justify-center text-center mt-8">
                        Here you can find the most amazing NFTs on the Arweave blockchain and easily trade them with a price
                        of just few gold ounces.
                    </p>
                    <div class="relative flex justify-around mt-8">
                        <NuxtLink to="/explore" class="Button --primary">
                            Explore NFTs
                        </NuxtLink>
                        <a href="#howto" class="Button">
                            &gt; learn more
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="FirstRow">

        </div>
    </div>
</template>
<script setup>
// 
</script>
<style scoped>
.Column {
    flex: 1 0 50%;
}
</style>