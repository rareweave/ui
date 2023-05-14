<template>
    <div 
        :class="['Section','Qa'].join(' ')"
    >
        <div class="Layout">
            <div class="Header">
                <h2 class="Title">
                    Frequently Asked <span class="Amazing-text">Questions</span>
                </h2>
                <p class="Desc">
                    Here we answer some of the most common questions that are asked, if you have any other questions please contact us at our Discord server.
                </p>
            </div>
            <div class="Questions">
                <div class="Question">
                    <h4 class="Question-title">
                        What is RareWeave?
                    </h4>
                    <p class="Question-desc">
                        RareWeave is a decentralized NFT marketplace built on the Arweave permaweb. It is a place where you can buy and sell NFTs, and where you can create your own NFT collections.
                    </p>
                </div>
                <div class="Question">
                    <h4 class="Question-title">
                        What is an NFT?
                    </h4>
                    <p class="Question-desc">
                        An NFT is a non-fungible token, which means that it is a unique token that cannot be replaced by another token. NFTs are used to represent ownership of digital assets, such as art, music, collectibles, and more.
                    </p>
                </div>
                <div class="Question">
                    <h4 class="Question-title">
                        What is Arweave?
                    </h4>
                    <p class="Question-desc">
                        Arweave is a decentralized storage network that allows you to store data permanently. It is a new type of blockchain that uses a novel consensus mechanism called proof-of-access to make permanent data storage cheap, reliable, and easy for anyone to use.
                    </p>
                </div>
                <div class="Question">
                    <h4 class="Question-title">
                        What is the Arweave permaweb?
                    </h4>
                    <p class="Question-desc">
                        The Arweave permaweb is a decentralized storage network that allows you to store data permanently. It is a new type of blockchain that uses a novel consensus mechanism called proof-of-access to make permanent data storage cheap, reliable, and easy for anyone to use.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

</script>
<style scoped>
.Layout {
    align-items: flex-start;
}

.Questions {
    display: flex;
    flex-direction: column;
    margin: 5rem auto 0;
}

.Question {
    display: flex;
    flex-direction: column;
    background: rgba(17, 23, 32, 1);
    border-radius: 1rem;
    margin: 1rem 0 0;
    padding: 1rem 2rem;
}

</style>