<template>
  <div class="Page">
    <div class="Main">
      <Centerfold />
      <Pricing />
      <About />
      <Highlites />
      <Howto />
    </div>
  </div>
</template>

<script setup>
import Centerfold from '../components/home/Centerfold.vue';
import About from '../components/home/About.vue';
import Highlites from '../components/home/Highlights.vue';
import Howto from '../components/home/Howto.vue';
import Pricing from '../components/home/Pricing.vue';
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
    threshold: 0.5
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
  overflow-y: auto;
  padding: 0 var(--page-padding);
}

.Main {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 0 0 0 12px;
  text-align: left;
}
</style>