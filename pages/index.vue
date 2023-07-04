<template>
  <div class="h-100 flex-column justify-start align-center mx-auto">
    <Centerfold />
    <Collections />
    <Pricing />
    <Howto />
    <Footer></Footer>
  </div>
</template>

<script setup>
import Centerfold from '~/components/home/Centerfold.vue';
import Collections from '~/components/home/Collections.vue';
import Howto from '~/components/home/Howto.vue';
import Pricing from '~/components/home/Pricing.vue';
import Footer from '~/components/Footer.vue';

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