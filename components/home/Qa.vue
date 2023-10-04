<template>
    <div class="_Section Qa flex flex-col items-start justify-center w-full flex-1 mx-auto py-10">
        <div class="flex flex-col justify-center items-center h-full mx-auto mt-32">
            <div>
                <h2 class="text-white text-left whitespace-nowrap max-w-[85vw] text-4xl font-semibold">
                    Frequently Asked <span class="Amazing-text">Questions</span>
                </h2>
                <p class="Desc">
                    Here we answer some of the most common questions that are asked, if you have any other questions please
                    contact us at our Discord server.
                </p>
            </div>
            <div class="flex flex-col items-center justify-center w-full flex-1 mx-auto mt-20">
                <div v-for="{ question, answer } in QUESTIONS" :key="question.q"
                    class="flex flex-col bg-[#111720] rounded-lg py-4 px-8 mt-4">
                    <h4>
                        {{ question }}
                    </h4>
                    <p>
                        {{ answer }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const QUESTIONS = [
    {
      question: "What is RareWeave?",
      answer: "RareWeave is a decentralized NFT marketplace built on the Arweave permaweb. It is a place where you can buy and sell NFTs, and where you can create your own NFT collections."
    },
    {
      question: "What is an NFT?",
      answer: "An NFT is a non-fungible token, which means that it is a unique token that cannot be replaced by another token. NFTs are used to represent ownership of digital assets, such as art, music, collectibles, and more."
    },
    {
      question: "What is Arweave?",
      answer: "Arweave is a decentralized storage network that allows you to store data permanently. It is a new type of blockchain that uses a novel consensus mechanism called proof-of-access to make permanent data storage cheap, reliable, and easy for anyone to use."
    },
    {
      question: "What is the Arweave permaweb?",
      answer: "The Arweave permaweb is a decentralized storage network that allows you to store data permanently. It is a new type of blockchain that uses a novel consensus mechanism called proof-of-access to make permanent data storage cheap, reliable, and easy for anyone to use."
    }
];
</script>
<style scoped></style>
