<template>
    <div class="Nav">
        <div class="Nav__view">
            <div class="Nav__left">
                <NuxtLink 
                    class="rareweave-font Logo"
                    to="/"
                    >
                    RareWeave
                </NuxtLink>
            </div>
            <div 
                class="Nav__right"
                v-if="account"
            >
                
                <div class="Nav__menu__mobile">
                    <button 
                        class="Amazing__theme Nav__menu__button"
                        @click="showMenu = !showMenu"
                    >
                        Menu
                    </button>
                    <div 
                        v-if="showMenu" 
                        @mouseleave="showMenu = false"
                        class="Nav__menu__dropdown"
                    >
                        <NuxtLink 
                            class="Amazing__theme Nav__dropdown__item" 
                            to="/v1"
                        >
                            Marketplace
                        </NuxtLink>
                        <NuxtLink 
                            class="Amazing__theme Nav__dropdown__item" 
                            to="/create"
                        >
                            MINT
                        </NuxtLink>
                        <NuxtLink 
                            class="Amazing__theme Nav__dropdown__item" 
                            to="/collection/create"
                        >
                            Create collection
                        </NuxtLink>
                        <NuxtLink
                            class="Amazing__them Nav__dropdown__item Account"
                            :replace="false" 
                            :to="'/profile/' + account.addr"
                        >
                            <span
                                :style="{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }"
                            >
                                <img 
                                    class="Pfp" 
                                    :src="account.profile.avatarURL"
                                />
                                {{ ansAddr || account.handle }}
                            </span>
                            {{ Math.floor(spendable * 100) / 100 + " AR" }}
                        </NuxtLink>
                        <!-- <NuxtLink 
                            class="amazing-button" 
                            to="/logout"
                        >
                            Logout
                        </NuxtLink> -->
                    </div>
                </div>
            </div>
            <div 
                v-else 
                class="Nav__right"
            >
                <div class="Nav__menu__mobile">
                    <button 
                        class="Amazing__theme Nav__menu__button" 
                        @click="showMenu = !showMenu"
                    >
                        Menu
                    </button>
                    <div 
                        v-if="showMenu" 
                        @mouseleave="showMenu = false"
                        class="Nav__menu__dropdown"
                    >
                        <NuxtLink 
                            class="Amazing__theme Nav__dropdown__item" 
                            to="/v1"
                        >
                            Marketplace
                        </NuxtLink>
                        <NuxtLink 
                            class="Amazing__theme Nav__dropdown__item" 
                            to="/login"
                        >
                            Login
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="Nav__border"
        ></div>
    </div>
</template>
<script setup>
let account = useState("account", () => null);
let ansAddr = useState("ansAddr", () => null);
let showMenu = useState("showMenu", () => false);
let spendable = useState("spendable", () => 0);
console.log(account.value+`\n`+spendable.value);
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
.Amazing__theme {
    background: rgb(97, 9, 168);
    background: radial-gradient(circle,
        rgba( 97,  9,168, 1)  0%,
        rgba(121, 41,  9, 1) 25%,
        rgba(179, 22, 83, 1) 50%,
        rgba(171, 49,107, 1) 61%,
        rgba(167, 40, 83, 1) 73%,
        rgba(185, 25, 36, 1)100%);
    background-size: 300% 300%;
    animation: amazing-bg 10s linear infinite;
}

.Nav {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 100%;
    height: auto;
    min-height: 48px;
    color: var(--color-primary);
    font-size: 16pt;
    font-weight: 600;
    font-family: var(--font-secondary);
    border-radius: 0;
    z-index: 999;
}

.Nav__view {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;
    width: calc((100% - var(--page-spacing) * 2));
}

.Nav__left {
    flex: 1 1 0px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.Logo {
    font-size: 24pt;
    margin: .375rem .75rem;
}

.Nav__right {
    flex: 1 1 0px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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

.Nav__menu__button {
    position: relative;
    margin: .25rem .5rem;
    padding: 4px 8px;
    font-size: 15pt;
    border: 1px solid rgba(143, 156, 172, .5);
    border-radius: 2px;
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
        -8px 16px 16px rgba(0, 0, 0, .12)
    ;
    border-radius: 4px;
    width: 100%;
    min-width: 232px;
    max-width: 380px;
    margin: -4px 8px;
    font-size: 15pt;
    z-index: 999;
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

.Account {
    background: rgba(219, 174, 89, .5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.Nav__border {
    position: relative;
    width: calc((100% - var(--page-spacing) * 2));
    margin: 0 calc(var(--page-spacing));
    height: 1px;
    background: linear-gradient(
        to right,
        rgba(219, 174, 89, .5) 0%,
        rgba(219, 174, 89, .5) 50%,
        rgba(219, 174, 89, .5) 50%,
        rgba(219, 174, 89, .5) 100%
    );
}
</style>