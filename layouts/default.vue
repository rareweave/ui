<template>
  <div v-if="wallet" class="antialiased">
    <Navbar />
    <slot></slot>
  </div>
  <div v-else>
    <connect-wallet :show="true" />
  </div>
</template>
<script setup>
import { useArWallet } from "~/composables/useState";
const wallet = useArWallet();
</script>
