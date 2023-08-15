<template>
  <template v-if="chain == 'solana'">
    <div
      class="card card-compact m-2 w-1/3 bg-base-200 cursor-pointer"
      @click="Connect('phantom')"
    >
      <figure>
        <img
          src="https://asdz5ntcfrwuhrvlyea7dniausgrdikhhh4nbnfqr5ooikllcrfa.arweave.net/BIeetmIsbUPGq8EB8bUApI0RoUc5-NC0sI9c5ClrFEo"
          alt="Phantom"
          height="200"
        />
      </figure>
      <div class="card-body w-full flex bg-neutral">
        <h2 class="card-title w-full block text-center font-mono">Phantom</h2>
      </div>
    </div>
    <div
      class="card card-compact m-2 w-1/3 bg-base-200 cursor-pointer"
      @click="Connect('solflare')"
    >
      <figure>
        <img
          src="https://7ztb26r7r5exjbtvvoo2cryqras6byq3zgnwxmq6cptdw44dpisa.arweave.net/_mYdej-PSXSGdaudoUcQiCXg4hvJm2uyHhPmO3ODeiQ"
          alt="Solflare"
          height="200"
        />
      </figure>
      <div class="card-body w-full flex bg-neutral">
        <h2 class="card-title w-full block text-center font-mono">Solflare</h2>
      </div>
    </div>
  </template>
</template>

<script setup>
let { chain, Connect } = defineProps(["chain", "Connect"]);
</script>
