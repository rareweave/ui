<template>
  <div class="flex flex-col align-start justify-start w-full flex-1">
    <div
      class="flex flex-col justify-center items-center h-full mt-32 mx-auto w-[1200px] min-w-[316px] max-w-[85vw]"
    >
      <div
        class="relative flex flex-col justify-evenly w-full items-start h-full mx-auto"
      >
        <h2
          class="text-white text-center w-full text-4xl font-semibold font-mono p-2 Amazing--red"
        >
          New collections
        </h2>
        <p class="text-lg my-4 p-2 text-center w-full">
          Explore recently created collections on the RareWeave market.
        </p>
      </div>
      <div
        class="relative flex flex-col justify-start items-center w-full h-full mx-auto rounded-[1.5rem] mt-4 pt-4 pb-8 max-w-[85vw] bg-[rgba(17,23,32,1)] text-xl --observe"
      >
        <div
          class="relative flex w-full flex-wrap text-[rgba(221, 232, 255, 0.33)] py-2 px-16 border-b-2 border-gray-800"
        >
          <span
            class="font-bold w-1/2 min-w-[200px] underline underline-offset-1"
          >
            Collection
          </span>
          <span class="w-1/2 min-w-[200px] underline underline-offset-1">
            Quantity
          </span>
        </div>
        <NuxtLink
          v-if="!isLoading.collections"
          v-for="(collection, i) of collections"
          :key="collection.id"
          class="relative flex w-full flex-wrap hover:bg-gray-800 py-2 px-16 border-b-2 border-gray-800"
          :to="`/collection/${collection.id}`"
        >
          <span
            :class="`Amazing--${['green', 'green'][i % 2]}`"
            class="font-bold w-1/2 min-w-[200px]"
          >
            {{ collection.state.name }}
          </span>
          <span class="font-semibold w-1/2 min-w-[200px]">
            {{ collection.state.items?.length }}
          </span>
        </NuxtLink>
      </div>
      <div
        class="relative flex flex-col justify-start items-center w-1/2 min-w[316px] max-w-[85vw] h-max mx-auto rounded-[1.5rem] mt-0 py-2 px-4 max-w-[85vw] text-lg mt-16 text-center text-gray-500 --observe"
      >
        <p>
          Please note that on the RareWeave market a &apos;collection&apos; is
          defined as: &apos;A group of NFTs that a user has categorized
          together&apos;, rather then: &apos;A group of NFTs that share the same
          contract&apos;.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import setArweave from "../../plugins/arweave";
import {
  useIsLoading,
  useArweave,
  useCollections,
} from "../../composables/useState";
import { collectionContractId } from "../../config/contracts.json";
import { GlomeNode } from "../../config/config.json";

const isLoading = useIsLoading(),
  collections = useCollections(),
  arweave = useArweave().value;

const getData = () => {
  $fetch(
    `${GlomeNode}/contracts-under-code/${collectionContractId}?expandStates=true&limit=10`,
    {
      method: "POST",
      body: {
        sortScript: `secondContract.creationTime-firstContract.creationTime`,
        filterScript: `"type"!state.name="string"&("len"!state.items>3)`,
      },
    }
  )
    .then((res) => {
      collections.value = res;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      isLoading.collections = false;
    });
};

onMounted(async () => {
  if (!arweave) setArweave();

  getData();
});
</script>

<style scoped></style>
