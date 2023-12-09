<template>
  <div
    class="h-full-navbared w-full flex flex-col items-center justify-center"
    :style="{
      backgroundImage: ` linear-gradient(-200deg,rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),radial-gradient(#000000a0, #000000ff), url('${
        user?.profile?.banner &&
        user?.profile?.banner !== DEFAULT_AVATAR
          ? user?.profile?.bannerURL
          : '/profile-default-bg.jpg'
      }')`,
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'repeat',
      backgroundClip: 'border-box',
      backgroundPosition: '0% 0%',
      backgroundSize: 'cover',
    }"
  >
    <template v-if="!user?.profile">
      <div
        class="flex-col lg:flex-row justify-center items-center content-center w-full"
      >
        <div class="text-center">
          <h1 class="text-6xl font-bold rareweave-font font-mono">
            Invalid profile
          </h1>
          <div class="flex flex-col items-center justify-center">
            <p class="font-mono mt-2 p-2 text-center max-w-[50rem]">
              <span>Uh oh</span>
              <br />
              <span
                >Looks like you've stumbled upon a profile that doesn't
                exist...</span
              >
              <br />
            </p>
            <div class="flex flex-row w-full flex-wrap justify-center">
              <NuxtLink
                to="/"
                class="btn btn-xl text-lg amazing-button2 rounded-md hover:rounded-lg transition-all font-mono m-1 w-48"
              >
                Go Home
              </NuxtLink>
            </div>
            <div id="gap" class="pt-4"></div>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="isSelfProfile">
      <div
        class="flex flex-col items-center justify-center w-full md:w-96 m-4 pt-4 px-4"
      >
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full md:w-64 min-h-64 border-2 border-dashed rounded-lg cursor-pointer bg-base-300 hover:bg-base-200 border-zinc-800"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <img
              v-if="!avatarObjectUrl"
              :src="user?.profile?.avatarURL"
              class="inline-flex w-48"
            />
            <img :src="avatarObjectUrl" class="inline-flex w-48" />

            <p class="mb-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload new avatar </span>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG, GIF
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            required
            @change="uploadNewPfp"
          />
        </label>

        <div
          class="bg-black bg-opacity-50 backdrop-blur-[2px] font-mono mt-2 text-white px-4 flex flex-col justify-center items-center w-full"
        >
          <label class="input-group mt-2 w-max">
            <input
              class="input input-sm max-w-[8rem] input-bordered bg-black bg-opacity-75 text-lg"
              v-model="user.profile.handleName"
            />
            <span>#{{ user.addr.slice(0, 6) }}</span>
          </label>
          <div v-if="userAnsName" class="m-2">
            ANS Name:
            <a
              :href="'https://www.ans.gg/dashboard/' + user.addr"
              class="link hover:text-orange-600"
              >{{ userAnsName }}</a
            >
          </div>
          <div v-else class="m-2">
            ANS Name:
            <a href="https://ans.gg" class="btn btn-sm Amazing--button">
              Get one
            </a>
          </div>
          <textarea
            class="textarea textarea-bordered p-1 m-2 max-w-[16rem] w-full min-h-[6rem] font-mono text-sm font-light text-gray-200 bg-black bg-opacity-70 text-center whitespace-pre-wrap"
            v-model="user.profile.bio"
          ></textarea>
          <label class="input-group my-1 w-full">
            <span class="min-w-[7rem] text-center justify-center">Github:</span
            ><input
              class="input input-sm w-full input-bordered bg-black bg-opacity-75 text-lg"
              v-model="user.profile.links.github"
            />
          </label>
          <label class="input-group my-1 w-full">
            <span class="min-w-[7rem] text-center justify-center">Twitter:</span
            ><input
              class="input input-sm w-full input-bordered bg-black bg-opacity-75 text-lg"
              v-model="user.profile.links.twitter"
            />
          </label>
          <label class="input-group my-1 w-full">
            <span class="min-w-[7rem] text-center justify-center">Discord:</span
            ><input
              class="input input-sm w-full input-bordered bg-black bg-opacity-75 text-lg"
              v-model="user.profile.links.discord"
            />
          </label>
          <label class="input-group my-1 w-full">
            <span class="min-w-[7rem] text-center justify-center"
              >Instagram:</span
            ><input
              class="input input-sm w-full input-bordered bg-black bg-opacity-75 text-lg"
              v-model="user.profile.links.instagram"
            />
          </label>
        </div>
        <button
          class="btn amazing-button2 rounded-md w-full my-2"
          @click="saveChangesToProfile"
        >
          Save changes
        </button>
      </div>
      <h2 class="text-center text-2xl font-mono">Owned NFTs:</h2>
      <div class="relative grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] auto-rows-[1fr] w-full max-w-[90vw] min-w-[286px] overflow-x-auto">
        <NftCard v-for="nft in ownedNfts" :key="nft.contractTxId" :nft="nft" />
      </div>

      <h2 class="text-center text-2xl mt-2 font-mono">Owned Collections:</h2>
      <div class="flex flex-wrap justify-center flex-col">
        <CollectionCard
          v-for="collection in ownedCollections"
          :key="collection.contractTxId"
          :collection="collection"
        />
      </div>
    </template>
    <template v-else>
      <img
        :src="user?.profile?.avatarURL"
        class="w-64 rounded-xl mx-4 backdrop-blur-sm mt-8"
      />
      <h1 class="text-xl font-mono text-white">{{ user?.handle }}</h1>
      <span class="text-xs text-gray-500">{{ user?.addr }}</span>
      <div
        class="bg-black bg-opacity-50 font-mono mt-2 text-white px-4 flex flex-col justify-center items-center"
      >
        <div v-if="userAnsName" class="m-2">
          ANS Name:
          <a
            :href="'https://www.ans.gg/dashboard/' + user?.addr"
            class="link hover:text-orange-600"
            >{{ userAnsName }}</a
          >
        </div>
        <div v-else class="m-2">
          ANS Name:
          <a href="https://ans.gg" class="btn btn-sm amazing-button"
            ><span>Get one</span></a
          >
        </div>
        <div
          class="m-2 max-w-[16rem] w-max font-mono text-sm font-light text-gray-400 text-center whitespace-pre-wrap"
        >
          {{ user?.profile?.bio }}
        </div>
        <label class="input-group my-1 w-full">
          <span
            class="min-w-[7rem] text-center justify-center"
            v-if="user?.profile?.links?.github"
            >Github:</span
          ><span
            class="w-full border-t border-r border-b border-gray-700 box-border bg-black bg-opacity-75 text-lg"
          >
            <a
              class="link-accent"
              :href="'https://github.com/' + user?.profile?.links?.github"
            >
              {{ user?.profile?.links?.github }}</a
            >
          </span>
        </label>
        <label
          class="input-group my-1 w-full"
          v-if="user?.profile?.links?.twitter"
        >
          <span class="min-w-[7rem] text-center justify-center">Twitter:</span
          ><span
            class="w-full border-t border-r border-b border-gray-700 box-border bg-black bg-opacity-75 text-lg"
          >
            <a
              class="link-accent"
              :href="'https://twitter.com/' + user?.profile?.links?.twitter"
            >
              {{ user?.profile?.links?.twitter }}</a
            >
          </span>
        </label>
        <label
          class="input-group my-1 w-full"
          v-if="user?.profile?.links?.instagram"
        >
          <span class="min-w-[7rem] text-center justify-center">Instagram:</span
          ><span
            class="w-full border-t border-r border-b border-gray-700 box-border bg-black bg-opacity-75 text-lg"
          >
            <a
              class="link-accent"
              :href="'https://instagram.com/' + user?.profile?.links?.instagram"
              >@{{ user?.profile?.links?.instagram }}</a
            >
          </span>
        </label>
        <label
          class="input-group my-1 mb-4 w-full"
          v-if="user?.profile?.links?.discord"
        >
          <span class="min-w-[7rem] text-center justify-center">Discord:</span
          ><span
            class="w-full border-t border-r border-b border-gray-700 box-border bg-black bg-opacity-75 text-lg"
          >
            {{ user?.profile?.links?.discord }}
          </span>
        </label>
      </div>
      <h2 class="text-center text-2xl font-mono">Owned NFTs:</h2>
      <div class="relative grid grid-cols-[repeat(auto-fill_minmax(300px,1fr))] auto-rows-fr w-full max-w-[90vw] min-w-[286px] overflow-x-auto">
        <NftCard v-for="nft in ownedNfts" :key="nft.contractTxId" :nft="nft" />
      </div>

      <h2 class="text-center text-2xl mt-2 font-mono">Owned Collections:</h2>
      <div class="flex flex-wrap justify-center flex-col">
        <CollectionCard
          v-for="collection in ownedCollections"
          :key="collection.id"
          :collection="collection"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { Buffer } from "buffer";
import {
  useArweave,
  useAccountTools,
} from "../../composables/useState";
import setArweave from "../../plugins/arweave";
import {
  nftContractId,
  legacyNftContract,
  collectionContractId,
} from "../../config/contracts.json";
import { GlomeNode } from "../../config/config.json";
const DEFAULT_AVATAR = "ar://a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k";

const arweave = useArweave();
if(!arweave) setArweave()

const arweaveSigner = useArweaveSigner();
const account = useAccountTools().value;

const route = useRoute();
const profileAddress = computed(() => route.params.address);

const avatarObjectUrl = ref(null);

const userProfileOrig = ref(await account.get(profileAddress.value));
const user = ref(userProfileOrig);

const { data: { domain: userAnsName } } = useFetch(`https://ans-resolver.herokuapp.com/resolve/${user.value?.addr}`);
const { data: ownedNfts } = useFetch(
  `${GlomeNode}/contracts-under-code/${nftContractId}|${legacyNftContract}?expandStates=true`,
  {
    method: "POST",
    body: {
      filterScript: `return state.owner == variables.address`,
      variables: {
        address: user.value?.addr,
      },
    },
  }
);
const { data: ownedCollections } = useFetch(
  `${GlomeNode}/contracts-under-code/${collectionContractId}?expandStates=true`,
  {
    method: "POST",
    body: {
      filterScript: `return includes(variables.address, state.admins)`,
      variables: {
        address: user.value?.addr,
      },
    },
  }
);

const isSelfProfile = profileAddress.value === arweaveSigner?.address;

async function uploadNewPfp(event) {
  const profilePicture = event.target.files[0];
  if(!profilePicture) return;
  const rawProfilePicture = new Uint8Array(await readAsArrayBuffer(profilePicture));

  const transaction = await arweaveSigner.dispatch(await arweave.value.createTransaction({
    data: Buffer.from(rawProfilePicture),
    tags: encodeTags([
      { name: "App-Name", value: "RareWeave" },
      { name: "App-Version", value: "0.3.0" },
    ])
  }))

  user.value.profile.avatar = `ar://${transaction.id}`
}
function readAsArrayBuffer(file) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        resolve(reader.result);
      },
      false
    );
    reader.readAsArrayBuffer(file);
  });
}

async function saveChangesToProfile() {
  await account.connect()
  await account.updateProfile(user.value.profile);
  userProfileOrig.value = user.value;
}

definePageMeta({
  layout: "without-auth",
});
</script>
