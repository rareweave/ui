<template>
    <div class="Nav">
        <div class="Nav__view">
            <div class="Nav__left">
                <NuxtLink class="Logo" to="/">
                    RareWeave
                </NuxtLink>
            </div>
            <div class="Nav__right --desktop" v-if="account">
                <NuxtLink class="Nav__link" to="/create">
                    Mint NFT
                </NuxtLink>
                <NuxtLink class="Nav__link" to="/collection/create">
                    Create collection
                </NuxtLink>
                <NuxtLink class="Nav__link" to="/v1">
                    Explore
                </NuxtLink>
                <NuxtLink class="Nav__button" :replace="false" :to="'/profile/' + account.addr">
                    <span class="Accountname Amazing--red">
                        <img class="Pfp" :src="account.profile.avatarURL" />
                        {{ ansAddr || account.handle }}
                    </span>
                </NuxtLink>
                <div class="Nav__balance">
                    <span class="icon">
                        a
                    </span>
                    <span class="amount">
                        {{ (Math.floor(spendable * 10_000) / 10_000).toFixed(3) }}
                    </span>
                </div>
            </div>
            <div class="Nav__right --mobile" v-if="account">
                <div class="Nav__menu__mobile">
                    <button class="Amazing--button Nav__button" @click="showMenu = !showMenu">
                        Menu
                    </button>
                    <div v-if="showMenu" @mouseleave="showMenu = false" @focusout="showMenu = false"
                        class="Nav__menu__dropdown">
                        <NuxtLink class="Amazing--red Nav__dropdown__item" to="/create">
                            Mint NFT
                        </NuxtLink>
                        <NuxtLink class="Amazing--red Nav__dropdown__item" to="/collection/create">
                            Create collection
                        </NuxtLink>
                        <NuxtLink class="Amazing--red Nav__dropdown__item" to="/v1">
                            Explore
                        </NuxtLink>
                        <NuxtLink class="Nav__dropdown__item Account" :replace="false" :to="'/profile/' + account.addr">
                            <span class="Accountname--m">
                                <img class="Pfp" :src="account.profile.avatarURL" />
                                {{ ansAddr || account.handle }}
                            </span>
                            <span v-if="true">
                                {{ Math.floor(spendable * 100) / 100 + " AR" }}
                            </span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div v-if="!account" class="Nav__right --desktop">
                <NuxtLink class="Nav__link" to="/">
                    Home
                </NuxtLink>
                <NuxtLink class="Nav__link" to="/v1">
                    Explore
                </NuxtLink>
                <NuxtLink class="Amazing--button Nav__button" to="/login">
                    Login
                </NuxtLink>
            </div>
            <div v-if="!account" class="Nav__right --mobile">
                <div class="Nav__menu__mobile">
                    <button class="Amazing--button Nav__button" @click="showMenu = !showMenu">
                        Menu
                    </button>
                    <div v-if="showMenu" @mouseleave="showMenu = false" class="Nav__menu__dropdown">
                        <NuxtLink class="Nav__dropdown__item" to="/">
                            Home
                        </NuxtLink>
                        <NuxtLink class="Nav__dropdown__item" to="/v1">
                            Explore
                        </NuxtLink>
                        <NuxtLink class="Amazing--button Nav__dropdown__item" to="/login">
                            Login
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="Nav__border"></div> -->
    </div>
</template>
<script setup>
import { useCollections, useAccount, useNfts, useIsLoading } from '../composables/useState';

let ansAddr = useState("ansAddr", () => null);
let showMenu = useState("showMenu", () => false);

const account = useAccount();
const spendable = useSpendable();

const collections = useCollections();
const nfts = useNfts();
const isLoading = useIsLoading();

</script>

<style>
@keyframes amazing-bg {
    from {
        background-position-x: 0%;
    }

    50% {
        background-position-x: 200%;
    }

    to {
        background-position-x: 0%;
    }
}

.Nav {
    position: sticky !important;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 100%;
    height: auto;
    min-height: 48px;
    color: var(--color-primary);
    background-color: #00000030;
    backdrop-filter: blur(20px);
    z-index: 9;
}

.Nav__view {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;
    width: calc((100% - var(--page-spacing) * 2));
    max-width: var(--page-max-width);
}

.Nav__left {
    flex: 0 0 max-content;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.Logo {
    font-size: 18pt;
    font-weight: 600;
    margin: .25rem;
    background: rgba(137, 255, 183, 1);
    background: linear-gradient(175deg, rgba(137, 255, 183, 1), rgba(137, 255, 183, 1), rgb(12 176 255));
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
}

.Nav__right {
    flex: 1 1 0px;
    align-items: center;
    justify-content: flex-end;
}

.Nav__right.--desktop {
    display: flex;
}

.Nav__right.--mobile {
    display: none;
}

.Nav__link {
    background: rgba(0, 0, 0, 0) !important;
    margin: .25rem 0 .25rem 2.5vw;
}

.Nav__balance {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: .25rem .25rem .25rem 1.25vw;
    padding: 0;
    width: auto;
    height: auto;
    color: var(--color-primary);
    border-radius: 2px;
}

.Nav__balance .icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px 0 0;
    padding: 0;
    width: 24px;
    aspect-ratio: 1;
    font-weight: 700;
    border-radius: 50%;
    background-color: aliceblue;
    color: rgba(17, 23, 32, 1);
}

.Nav__balance .icon::after {
    content: "";
    position: absolute;
    inset: 2px;
    display: block;
    width: calc((100% - (2px * 2)));
    height: calc((100% - (2px * 2)));
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid rgba(17, 23, 32, 1);
}

.Nav__menu__mobile {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 100%;
    height: auto;
}

.Nav__button {
    position: relative;
    display: flex;
    margin: .25rem 0 .25rem 2.5vw;
    padding: 4px 8px;
    margin: 0 0 0 32px;
    padding: 0.25rem calc((0.5rem) + 6px);
    border-radius: 18px;
    color: rgba(17, 23, 32, 1);
}

.Nav__button span img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 1);
    color: rgba(255, 255, 255, 1);
    margin: 3px;
}

.Nav__menu__dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
    grid-gap: 0;
    width: max-content;
    background: var(--bg-dropdown);
    box-shadow:
        -0px 1px 1px rgba(0, 0, 0, .12),
        -1px 2px 2px rgba(0, 0, 0, .12),
        -2px 4px 4px rgba(0, 0, 0, .12),
        -4px 8px 8px rgba(0, 0, 0, .12),
        -8px 16px 16px rgba(0, 0, 0, .12);
    border-radius: 4px;
    width: 100%;
    min-width: 232px;
    max-width: 380px;
    margin: 0;
    font-size: 15pt;
    z-index: 99999;
}

.Nav__dropdown__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: .375rem .75rem;

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border-left: 1px solid rgba(143, 156, 172, .5);
    border-right: 1px solid rgba(143, 156, 172, .5);
    border-top: 1px solid rgba(143, 156, 172, .5);
}

.Nav__dropdown__item:last-child {
    border-bottom: 1px solid rgba(143, 156, 172, .5);
}

.Pfp {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 48px;
    height: 48px;
    border-radius: 5%;
    background-color: var(--bg-secondary);
    overflow: hidden;
}

.Accountname {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

/* .Nav__border {
    position: relative;
    width: calc((100% - var(--page-spacing) * 2));
    max-width: var(--page-max-width);
    margin: 0 calc(var(--page-spacing));
    height: 1px;
    background: rgba(17,23,32,1);
} */
@media screen and (max-width: 1080px) {
    .Nav__right.--mobile {
        display: flex !important;
    }

    .Nav__right.--desktop {
        display: none !important;
    }
}
</style>