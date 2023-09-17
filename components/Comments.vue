<template >
    <div v-if="wallet" class="w-full flex flex-col m-2 max-w-2xl p-2 rounded-md mb-4">
        <h2 class="text-xl w-full text-center">
            Comments
        </h2>
        <div v-if="wallet.type=='Arweave.app'" class="mt-2 p-2 rounded-md w-full flex flex-row">
            <div class="flex items-start space-x-3 p-2 shadow-sm rounded-md w-full">
                <img 
                    class="w-10 h-10 rounded-full"
                    :src="account.profile.avatarURL" 
                    alt="Profile Image"
                >
                <div class="flex-1 block">
                    <div class="flex flex-row">
                        <div class="text-sm text-gray-500 font-medium p-[2px]">
                            {{ account.handle }}
                        </div>
                        <p class="text-xs ml-2 p-[2px] text-gray-700">
                            Very soon
                        </p>
                    </div>
                    <div class="flex flex-row items-base">
                        <textarea v-model="content"
                            class="mt-1 text-white min-h-6 w-full bg-transparent text-sm p-2 outline-none border-gray-700 focus:border-zinc-400/50 border"
                            placeholder="Type your comment..."
                        ></textarea>
                        <amazing-button class="place-self-end ml-2" @click="post">
                            Post
                        </amazing-button>
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="wallet.type == 'Arconnect'" class="w-full flex flex-col items-center justify-center">
            <h2 class="text-red-500 text-md w-full text-center">
                We're sorry, currently ArConnect wallet is not supported yet, due to an issue with the decryption. We're investigating the issue and will fix this as soon as possible. For now, please use Arweave.app to comment.
            </h2>
        </div>
     
        <div v-for="comment of comments" :key="comment.id" class="flex w-full py-2 border-b border-1 border-gray-800">
            <div class="flex items-start space-x-3 w-full p-2 shadow-sm rounded-md">
                <img 
                    class="w-10 h-10 rounded-full my-1 mx-2" 
                    :src="comment?.profile?.profile?.avatarURL" 
                    alt="Profile Image"
                >
                <div class="flex-1 flex flex-col">
                    <div class="flex justify-start items-start px-2">
                        <span class="flex text-sm text-gray-500 font-medium">
                            {{ comment.profile.handle }}
                        </span>
                        <span class="flex justify-start items-center text-xs ml-1 p-[2px] text-gray-600">
                            {{ timeToRelative(comment.timestamp) }}
                        </span>
                    </div>
                    <div v-if="comment.contentType === 'text/plain'"
                        class="mt-1 text-white min-h-6 w-full bg-transparent text-sm p-2 outline-none"
                    >
                        {{ comment.content }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { formatDistance} from "date-fns";
import SubaccountsLib from "arweave-subaccounts";
import { ArweaveSigner, createData } from "arbundles";

const { comments, id, account, wallet } = defineProps([
    'comments',
    'id',
    'account',
    'wallet',
    'arweave'
]);

const timeToRelative = ts => formatDistance(ts, new Date(), { addSuffix: true });

const content = ref("");

async function post() {
    if(!content.value.length)
        return;

    let subaccount;
    
    if (localStorage.getItem("subaccount") && JSON.parse(localStorage.getItem("subaccount")).master === account.value.addr) {
        subaccount = JSON.parse(localStorage.getItem("subaccount")).subaccount;
    }
    else {
        let Subaccounts = new SubaccountsLib(arweave, wallet.value, `https://g8way.io/graphql`,`https://g8way.io/`);
        subaccount = await Subaccounts.useSubaccount("Comments");
        localStorage.setItem("subaccount", JSON.stringify({
            master: account.value.addr, 
            subaccount: subaccount
        }));
    };

    const signer = new ArweaveSigner(subaccount.jwk);
    
    const dataItem = createData(content.value, signer, { 
        tags: [{ 
            name: "Content-Type", 
            value: "text/plain"
        }, { 
            name: "Data-Protocol", 
            value: "Comment" 
        }, { 
            name: "Data-Source", 
            value: id 
        }] 
    });

    await dataItem.sign(signer);

    const body = new Blob([dataItem.getRaw()], { 
        type: 'application/octet-stream'
    });

    await $fetch(`https://socioweave.rareweave.store/tx`, {
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream"
        },
        body
    });

    content.value = "";
};
</script>