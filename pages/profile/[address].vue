<template>
  <template 
    v-if="!user?.profile"
    class="Compontent 404"
  >
    <div class="Main">
      <div class="Col Header">
        <h1 class="Title">
          404
        </h1>
        <p class="Desc">
          This profile does not exist
        </p>
        <div class="Routes">
          <span 
            @click="historyBack"
            class="Button --primary"
          >
            Go back
          </span>
        </div>
      </div>
      <div class="Col Illustration">
        <img 
          src="/404.svg"
          class="Svg"  
        />
      </div>
    </div>
  </template>
  <template 
    v-else-if="selfProfile"
  >
    <!-- <div
      class="h-full-navbared w-full flex flex-col items-center justify-center"
      :style="{
        backgroundImage: ` linear-gradient(-200deg,rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),radial-gradient(#000000a0, #000000ff), url('${(user?.profile?.banner && user?.profile?.banner !=
          'ar://a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k')
          ? user?.profile?.bannerURL
          : '/profile-default-bg.jpg'
          }')`,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'repeat',
        backgroundClip: 'border-box',
        backgroundPosition: '0% 0%',
        backgroundSize: 'cover',
      }"
    > -->
    <div class="Main">
      
      <div class="flex flex-col items-center justify-center w-full md:w-96 m-4 pt-4 px-4">
        <label for="dropzone-file"
          class="flex flex-col items-center justify-center w-full md:w-64 min-h-64 border-2 border-dashed rounded-lg cursor-pointer bg-base-300 hover:bg-base-200 border-zinc-800">
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <img v-if="!avatarObjectUrl" :src="user?.profile?.avatarURL" class="inline-flex w-48" />
            <img :src="avatarObjectUrl" class="inline-flex w-48" />

            <p class="mb-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload new avatar </span>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Svg, PNG, JPG, GIF
            </p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" required @change="uploadNewPfp" />
        </label>

        <div
          class="bg-black bg-opacity-50 backdrop-blur-[2px] font-mono mt-2 text-white px-4 flex flex-col justify-center items-center w-full">
          <label class="input-group mt-2 w-max">
            <input class="input input-sm max-w-[8rem] input-bordered bg-black bg-opacity-75 text-lg"
              v-model="user.profile.handleName" />
            <span>#{{ user.addr.slice(0, 6) }}</span>
          </label>
          <div v-if="userAnsName" class="m-2">
            ANS Name:
            <a :href="'https://www.ans.gg/dashboard/' + user.addr" class="link hover:text-orange-600">{{ userAnsName
            }}</a>
          </div>
          <div v-else class="m-2">
            ANS Name:
            <a 
              href="https://ans.gg" 
              class="btn btn-sm Amazing--button"
            >
              Get one
            </a>
          </div>
          <textarea
            class="textarea textarea-bordered p-1 m-2 max-w-[16rem] w-full min-h-[6rem] font-mono text-sm font-light text-gray-200 bg-black bg-opacity-70 text-center whitespace-pre-wrap"
            v-model="user.profile.bio"></textarea>
          <label class="input-group my-1 w-full">
            <span class="min-w-[7rem] text-center justify-center">Github:</span><input
              class="input input-sm w-full input-bordered bg-black bg-opacity-75 text-lg"
              v-model="user.profile.links.github" />
          </label>
          <label class="input-group my-1 w-full">
            <span class="min-w-[7rem] text-center justify-center">Twitter:</span><input
              class="input input-sm w-full input-bordered bg-black bg-opacity-75 text-lg"
              v-model="user.profile.links.twitter" />
          </label>
          <label class="input-group my-1 w-full">
            <span class="min-w-[7rem] text-center justify-center">Discord:</span><input
              class="input input-sm w-full input-bordered bg-black bg-opacity-75 text-lg"
              v-model="user.profile.links.discord" />
          </label>
          <label class="input-group my-1 w-full">
            <span class="min-w-[7rem] text-center justify-center">Instagram:</span><input
              class="input input-sm w-full input-bordered bg-black bg-opacity-75 text-lg"
              v-model="user.profile.links.instagram" />
          </label>
        </div>
        <button 
          class="btn amazing-button2 rounded-md w-full my-2"
          :class="changed ? '' : 'btn-disabled'" 
          :disabled="!changed" 
          @click="saveChangesToProfile"
        >
          Save changes
        </button>
      </div>
      <h2 class="text-center text-2xl font-mono">
        Owned NFTs:
      </h2>
      <div
        class="Showcase"
      >
        <NftCard 
          v-for="nft in ownedNfts" 
          :key="nft.contractTxId" 
          :nft="nft"
        />
      </div>

      <h2 class="text-center text-2xl mt-2 font-mono">
        Owned Collections:
      </h2>
      <div class="flex flex-wrap justify-center flex-col">
        <CollectionCard 
          v-for="collection in ownedCollections" 
          :key="collection.contractTxId" 
          :collection="collection"
        />
      </div>
    </div>
  </template>
  <template
    v-else
  >
    <div class="Main">
      <div class="Profile">
        <div class="Banner">
          <span class="Imagewrapper">
            <img 
              :src="user?.profile?.bannerURL"
              class="Image"
            />
          </span>
        </div>
        <div class="Avatar">
          <div class="Pfp">
            <span class="Imagewrapper">
              <img
                :src="user?.profile?.avatarURL"
                class="Image"
              />
            </span>
          </div>
        </div>
        <div class="Info">
          <div class="About">
            <div class="Handle">
              <h2>
                {{ user?.profile?.handleName || `No data available` }}
              </h2>
              <span>
                {{ user?.handle }}
              </span>
            </div>
            <div class="Address">
              <div class="Ans">
                <div
                  v-if="userAnsName"
                >
                  {{ userAnsName }}
                </div>
                <div
                  v-else
                >
                  <a 
                    href="https://ans.gg" 
                    class="btn btn-sm Amazing--button"
                  >
                    Get an Ans name
                  </a>
                </div>
              </div>
              <div class="Addr">
                <span class="Icon">
                  <span class="AR">
                    a
                  </span>
                </span>
                {{ user?.addr }}
              </div>
            </div>
            <div class="Links">
              <h4>
                Links
              </h4>
              <div 
                v-if="user?.profile?.links?.github"
                class="Option"
              >
                <span>
                  Github: 
                </span>
                <a
                  :href="`https://github.com/${user.profile.links.github}`"
                  target="_blank"
                  class="Link"
                >
                  {{ user?.profile?.links?.github }}
                </a>
              </div>
              <div 
                v-if="user?.profile?.links?.twitter"
                class="Option"
              >
                <span>
                  Twitter: 
                </span>
                <a
                  :href="`https://twitter.com/${user.profile.links.twitter}`"
                  target="_blank"
                  class="Link"
                >
                  {{ user?.profile?.links?.twitter }}
                </a>
              </div>
              <div 
                v-if="user?.profile?.links?.discord"
                class="Option"
              >
                <span>
                  Discord: 
                </span>
                <a
                  :href="`https://discord.com/users/${user.profile.links.discord}`"
                  target="_blank"
                  class="Link"
                >
                  {{ user?.profile?.links?.discord }}
                </a>
              </div>
              <div 
                v-else
                class="Option"
              >
                <span>
                  No data available
                </span>
              </div>
            </div>
            <div class="Bio">
              <h4>
                Bio
              </h4>
              <div class="Content">
                {{ user?.profile?.bio || `No data available` }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- legacy -->
      <div style="visibility: collapse; display: none;">
      <img :src="user?.profile?.avatarURL" class="w-64 rounded-xl mx-4 backdrop-blur-sm mt-8" />
      <h1 class="text-xl font-mono text-white">{{ user?.handle }}</h1>
      <span class="text-xs text-gray-500">{{ user?.addr }}</span>
      <div class="bg-black bg-opacity-50 font-mono mt-2 text-white px-4 flex flex-col justify-center items-center">
        <div v-if="userAnsName" class="m-2">
          ANS Name:
          <a :href="'https://www.ans.gg/dashboard/' + user?.addr" class="link hover:text-orange-600">{{ userAnsName }}</a>
        </div>
        <div v-else class="m-2">
          ANS Name:
          <a href="https://ans.gg" class="btn btn-sm amazing-button">Get one</a>
        </div>
        <div class="m-2 max-w-[16rem] w-max font-mono text-sm font-light text-gray-400 text-center whitespace-pre-wrap">
          {{ user?.profile?.bio }}
        </div>
        <label class="input-group my-1 w-full">
          <span class="min-w-[7rem] text-center justify-center" v-if="user?.profile?.links?.github">Github:</span><span
            class="w-full border-t border-r border-b border-gray-700 box-border bg-black bg-opacity-75 text-lg">
            <a class="link-accent" :href="'https://github.com/' + user?.profile?.links?.github">
              {{ user?.profile?.links?.github }}</a>
          </span>
        </label>
        <label class="input-group my-1 w-full" v-if="user?.profile?.links?.twitter">
          <span class="min-w-[7rem] text-center justify-center">Twitter:</span><span
            class="w-full border-t border-r border-b border-gray-700 box-border bg-black bg-opacity-75 text-lg">
            <a class="link-accent" :href="'https://twitter.com/' + user?.profile?.links?.twitter">
              {{ user?.profile?.links?.twitter }}</a>
          </span>
        </label>
        <label class="input-group my-1 w-full" v-if="user?.profile?.links?.instagram">
          <span class="min-w-[7rem] text-center justify-center">Instagram:</span><span
            class="w-full border-t border-r border-b border-gray-700 box-border bg-black bg-opacity-75 text-lg">
            <a class="link-accent" :href="'https://instagram.com/' + user?.profile?.links?.instagram">@{{
              user?.profile?.links?.instagram }}</a>
          </span>
        </label>
        <label class="input-group my-1 mb-4 w-full" v-if="user?.profile?.links?.discord">
          <span class="min-w-[7rem] text-center justify-center">Discord:</span><span
            class="w-full border-t border-r border-b border-gray-700 box-border bg-black bg-opacity-75 text-lg">
            {{ user?.profile?.links?.discord }}
          </span>
        </label>
      </div>
      <h2 class="text-center text-2xl font-mono">
        Owned NFTs:
      </h2>
      <div class="Showcase">
        <NftCard 
          v-for="nft in ownedNfts" 
          :key="nft.contractTxId" 
          :nft="nft"
        />
      </div>

      <h2 class="text-center text-2xl mt-2 font-mono">
        Owned Collections:
      </h2>
      <div class="flex flex-wrap justify-center flex-col">
        <CollectionCard 
          v-for="collection in ownedCollections" 
          :key="collection.contractTxId" 
          :collection="collection"
        />
      </div>
      </div>
    </div>
  </template>
  <Footer />
</template>

<script setup>
import { Buffer } from "buffer";
import { useArweave, useAccount, useAccountTools, useWallet } from "../../composables/useState";
import setArweave from "../../plugins/arweave";
import Footer from "../../components/Footer.vue";
const { Warp, Contract, WarpFactory } = await import("warp-contracts");

let profileAddress = computed(() => useRoute().params.address || useRoute().hash.slice(1)).value;

const account = useAccount().value,
accountTools = useAccountTools().value,
wallet = useWallet().value,
arweave = useArweave().value;

if (!arweave) 
  setArweave();

let avatarObjectUrl = ref(null);

let userProfileOrig = ref(await accountTools.get(profileAddress).catch(e => null));
let user = ref(JSON.parse(JSON.stringify(userProfileOrig.value)));
console.log(user);

let userAnsName = (await $fetch(`https://ans-resolver.herokuapp.com/resolve/${user.value?.addr}`))?.domain;
let ownedNfts = (await $fetch(`https://prophet.rareweave.store/nfts?ownedBy=${user.value?.addr}`))?.result;

let ownedCollections = (await $fetch(`https://prophet.rareweave.store/collections?ownedBy=${user.value?.addr}`))?.result;
console.log(ownedCollections);

let changed = computed(() => {
  let ch = JSON.stringify(user.value) != JSON.stringify(userProfileOrig.value);
  return ch;
});

let selfProfile = profileAddress == account?.addr;
console.log(selfProfile);

function encodeTags(tags) {
  return tags.map((tag) => ({ name: btoa(tag.name), value: btoa(tag.value) }));
};

const pfpMeta = ref(null);

async function uploadNewPfp(e) {
  if (e.target.files && e.target.files[0]) {
    if (avatarObjectUrl.value) {
      URL.revokeObjectURL(avatarObjectUrl.value);
    }
    avatarObjectUrl.value = URL.createObjectURL(e.target.files[0]);
    pfpMeta.value = e.target.files[0];
    let pfpMain = await readAsArrayBuffer(e.target.files[0]);
    let tx = await arweave.createTransaction({
      data: Buffer.from(new Uint8Array(pfpMain)),
      tags: encodeTags([
        { name: "App-Name", value: "RareWeave" },
        { name: "App-Version", value: "0.3.0" },
      ]),
    });
    if (pfpMain.byteLength > 100000) {
      await arweave.transactions.sign(tx);
      let uploader = await arweave.transactions.getUploader(tx);

      while (!uploader.isComplete) {
        await uploader.uploadChunk();
        console.log(
          `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
        );
      }
    } else {
      tx = await wallet.dispatch(tx);
    }
    user.value.profile.avatar = "ar://" + tx.id;
    console.log(tx.id);
  }
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
  await accountTools.connect();
  await accountTools.updateProfile(user.value.profile);
  userProfileOrig.value = JSON.parse(JSON.stringify(user.value));
}

function historyBack() {
  useRouter().go(-1);
}

definePageMeta({
  layout: "without-auth",
});
</script>
<style scoped>
.Main {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  max-width: var(--page-max-width);
  min-width: 286px;
  margin: 0 auto;
  padding: 0;
}

/* 404 */
.Col {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 0px;
  height: 100%;
  aspect-ratio: 1/1;
}

.Col:first-child {
  align-items: flex-end;
  flex: .66 .66 0px;
  max-width: 580px;
}

.Col:last-child {
  align-items: flex-start;
}

.Title {
  font-size: 78px;
}

.Svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* Profile */
.Profile {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  overflow: hidden;
  margin: 2.5rem auto;
  border-radius: 1.25rem;
  background: linear-gradient(
    0deg,
    rgba(129,234,174,1),
    rgba(2,3,4,1)
  );
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 420px;
}

.Banner,
.Avatar,
.Info,
.About,
.Handle,
.Address,
.Links {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  white-space: nowrap;
}
.Banner {
  background-color: rgba(17,23,32,1);
}

.Pfp {
  position: absolute;
  top: -68px;
  left: 7.5%;
  width: 96px;
  height: 96px;
  border-radius: 1rem;
  border: 8px solid rgba(2,3,4,0.99);
  background-color: rgba(234,245,255,1);
}

.Info {
  margin: 3.75rem auto;
  width: 90%;
  background: rgba(46,64,78,1);
  border-radius: 1.25rem;
}

.About {
  margin: 2.5rem;
  width: calc((100%) - 2 * 2.5rem);
  background: rgba(46,64,78,1);
}

.About > div {
  margin: .5rem 1rem;
  width: calc(100% - 2 * 1rem);
}

.About > div > div {
  margin: .5rem 0;
  width: 100%;
}

.Handle,
.Address,
.Links {
  border-bottom: 1px solid rgba(255,255,255,0.5);
}


.Addr {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.Icon {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  margin-right: 0.5rem;
}

</style>