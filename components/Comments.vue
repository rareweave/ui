<template>
  <div
    v-if="comments?.length || arweaveSigner.isSignerSet"
    class="w-full flex flex-col m-2 max-w-2xl bg-zinc-900/50 p-2 rounded-md mb-4"
  >
    <h2 class="text-xl w-full text-center">Comments</h2>
    <div
      v-if="arweaveSigner.isSignerSet"
      class="mt-2 p-2 bg-[#02010488] rounded-md w-full flex flex-row"
    >
      <div
        class="flex items-start space-x-3 p-2 bg-zinc-900/20 shadow-sm rounded-md w-full"
      >
        <img
          class="w-10 h-10 rounded-full"
          :src="arweaveSigner?.account?.profile?.avatarURL"
          alt="Profile Image"
        />
        <div class="flex-1 block">
          <div class="flex flex-row">
            <div class="text-sm text-gray-700 font-medium">
              {{ arweaveSigner?.account?.handle }}
            </div>
            <p class="text-xs ml-2 p-[2px] text-gray-500">Very soon</p>
          </div>

          <textarea
            v-model="commentContent"
            class="mt-1 text-white min-h-6 w-full bg-transparent text-sm p-2 outline-none border-zinc-400/20 focus:border-zinc-400/50 border"
            placeholder="Comment content..."
          ></textarea>
        </div>
        <awesome-button class="place-self-end mb-2" @click="post"
          >Post</awesome-button
        >
      </div>
    </div>

    <div
      v-for="comment of comments"
      :key="comment.id"
      class="mt-2 p-2 bg-[#02010488] rounded-md w-full flex flex-row"
    >
      <div
        class="flex items-start space-x-3 p-2 bg-zinc-900/20 shadow-sm rounded-md w-full"
      >
        <img
          class="w-10 h-10 rounded-full"
          :src="comment?.profile?.profile?.avatarURL"
          alt="Profile Image"
        />
        <div class="flex-1 block">
          <div class="flex flex-row">
            <div class="text-sm text-gray-700 font-medium">
              {{ comment.profile.handle }}
            </div>
            <p class="text-xs ml-2 p-[2px] text-gray-500">
              {{ timeToRelative(comment.timestamp) }}
            </p>
          </div>

          <div
            v-if="comment.contentType == 'text/plain'"
            class="mt-1 text-white min-h-6 w-full bg-transparent text-sm p-2 outline-none border-zinc-400/20 focus:border-zinc-400/50 border"
          >
            {{ comment.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-2 bg-zinc-800 rounded-md border-zinc-700 border mt-4 text-white font-semibold cursor-pointer hover:bg-zinc-900 transition-colors " @click="arweaveSigner.callOverlay()">
  Log in to comment
  </div>
</template>

<script setup>
import { formatDistance } from "date-fns";
import SubaccountsLib from "arweave-subaccounts";
import { ArweaveSigner, createData } from "arbundles";

const utils = useUtils()
const arweaveSigner = useArweaveSigner()

let { content } = defineProps(["content"]);

const arweave = utils.arweave

const commentContent = ref("");
const comments = ref([]);
const commentsContents = { contents: {} };

async function post() {
  if (!commentContent.value.length) {
    return;
  }
  let subaccount;
  if (
    localStorage.getItem("subaccount") &&
    JSON.parse(localStorage.getItem("subaccount")).master === arweaveSigner.address
  ) {
    subaccount = JSON.parse(localStorage.getItem("subaccount")).subaccount;
  } else {
    let Subaccounts = new SubaccountsLib(
      arweave,
      arweaveSigner.signer,
      `https://ar-io.net/graphql`,
      `https://ar-io.net/`
    );
    subaccount = await Subaccounts.useSubaccount("Comments");
    localStorage.setItem(
      "subaccount",
      JSON.stringify({ master: arweaveSigner.address, subaccount: subaccount })
    );
  }

  let signer = new ArweaveSigner(subaccount.jwk);
  console.log({
    tags: [
      { name: "Content-Type", value: "text/plain" },
      { name: "Data-Protocol", value: "Comment" },
      { name: "Data-Source", value: content },
    ],
  })
  let dataItem = createData(commentContent.value, signer, {
    tags: [
      { name: "Content-Type", value: "text/plain" },
      { name: "Data-Protocol", value: "Comment" },
      { name: "Data-Source", value: content },
    ],
  });
  await dataItem.sign(signer);
  await $fetch(`https://socioweave.rareweave.store/tx`, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    body: new Blob([dataItem.getRaw()], { type: "application/octet-stream" }),
  });
  commentContent.value = "";
}
async function fetchComments() {
  let fetchedComments = await $fetch(
    `https://socioweave.rareweave.store/comments/` + content
  );
  comments.value = fetchedComments;
}
fetchComments();
const messagesStream = new EventSource(
  "https://socioweave.rareweave.store/comment-stream/" + content
);
function addMessage(ev) {
  comments.value.unshift(JSON.parse(ev.data));
}
messagesStream.addEventListener("newMessage", addMessage);
onUnmounted(() => {
  messagesStream.removeEventListener("newMessage", addMessage);
  messagesStream.close();
});
function timeToRelative(timestamp) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}
</script>
