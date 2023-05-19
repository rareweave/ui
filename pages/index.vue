<template>
  <div class="Page">
    <div class="Main">
      <Centerfold />
      <Pricing />
      <Collections />
      <!-- <Highlights /> -->
      <Howto />
      <!-- <Qa /> -->
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup>
import Centerfold from '../components/home/Centerfold.vue';
import Collections from '../components/home/Collections.vue';
import Highlights from '../components/home/Highlights.vue';
import Howto from '../components/home/Howto.vue';
import Pricing from '../components/home/Pricing.vue';
import Qa from '../components/home/Qa.vue';
import Footer from '../components/Footer.vue';
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('inview');
        observer.unobserve(entry.target);
      // }
      // else {
      //   entry.target.classList.remove('inview');
      };
    });
  },
  { 
    threshold: 0.1
  });
  const observables = document.querySelectorAll(`.--observe`);
  observables.forEach(observable => {
    observer.observe(observable);
  });
});
definePageMeta({
  layout: "without-auth"
});
</script>

<style scoped>
.Page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  height: calc(var(--page-height) + var(--filter-height) + var(--filter-padding) + var(--footer-height));
  overflow-x: clip;
  overflow-y: auto;
  padding: 0 var(--page-padding);
}
.Main {
  position: relative;
  width: 100%;
  max-width: var(--page-max-width);
  height: 100%;
  margin: 0 auto;
  /* padding: 0 0 0 12px; */
  text-align: left;
}
</style>