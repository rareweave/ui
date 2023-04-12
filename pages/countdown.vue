<template>
    <div class="bg p-4 rounded-none backdrop-blur-sm hero h-full-navbared" :style="{
                                     backgroundImage: `radial-gradient(#000000a0, #000000ff,  #000000ff), url('/mandalas.jpg')`,
                                     backgroundAttachment: 'fixed',
                                     backgroundColor: 'rgb(2,2,2)',
                                     backgroundRepeat: 'no-repeat',
                                     objectFit: 'cover',
                                 }">
    </div>
    <div class="overlay-theme flex flex-row flex-wrap justify-center align-center">
        <div class="hero-content flex-col lg:flex-row justify-between w-full  ">
            <div class="text-center">
                <h1 class="text-8xl font-bold rareweave-font font-mono">
                    RareWeave
                </h1>
                <h2 class="text-2xl font-bold font-mono my-5 mx-auto">
                    World's first liquid NFT marketplace on Arweave
                </h2>
                <div class="flex flex-row justify-center align-center">
                    <div class="flex flex-col justify-center align-center my-5">
                        <span class="text-8xl font-tilt value-countdown">{{ days }}</span>
                        <br />
                        <span class="font-roboto w-32 label-countdown">Days</span>
                    </div>
                    <div class="flex flex-col justify-center align-center">
                        <span class="text-8xl font-tilt value-countdown">{{ hours }}</span>
                        <br />
                        <span class="font-roboto w-32 label-countdown">Hours</span>
                    </div>
                    <div class="flex flex-col justify-center align-center">
                        <span class="text-8xl font-tilt value-countdown">{{ minutes }}</span>
                        <br />
                        <span class="font-roboto w-32 label-countdown">Minutes</span>
                    </div>
                    <div class="flex flex-col justify-center align-center">
                        <span class="text-8xl font-tilt value-countdown">{{ seconds }}</span>
                        <br />
                        <span class="font-roboto w-32 label-countdown">Seconds</span>
                    </div>
                </div>
                <h2 class="flex flex-row justify-center align-center font-mono text-6xl my-5 to-launch-font">
                    to launch
                </h2>
            </div>
        
            <div class="wrapper__showcase">
                <div class="showcase">
                    <div class="flex flex-row justify-center align-center">
                        <div class="flex flex-col justify-center align-center card-0">
                            <div class="card-0 layout">
                                <NuxtLink class="randomNFT" :to="'/nft/' + NFTs['random-0'].contractTxId">
                                    <img :src="'https://prophet.rareweave.store/_ipx/width_384,f_webp/https://arweave.net/' + NFTs['random-0'].contractTxId"
                                    class="max-w-sm rounded-md shadow-2xl "
                                    />
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row justify-center align-center">
                        <div class="flex flex-col justify-center align-center card-1">
                            <div class="card-1 layout">
                                <NuxtLink class="randomNFT" :to="'/nft/' + NFTs['random-1'].contractTxId">
                                    <img :src="'https://prophet.rareweave.store/_ipx/width_384,f_webp/https://arweave.net/' + NFTs['random-1'].contractTxId"
                                    class="max-w-sm rounded-md shadow-2xl "
                                    />
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const R = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const nfts = await fetch('https://prophet.rareweave.store/nfts')
    .then(res => res.json());
    
const NFTs = {};
const l = nfts.result.length - 1;

NFTs['random-0'] = nfts.result[R(0, l)];
NFTs['random-1'] = nfts.result[R(0, l)];

definePageMeta({
    layout: "without-auth"
})
</script>

<script>
export default {
    data() {
        return {
            targetDate: new Date("2023-04-15T00:00:00.000Z").toISOString(),
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            countdown: null
        };
    },
    mounted() {
        this.countdown = setInterval(() => {
            let now = new Date().toISOString();
            let distance = Date.parse(this.targetDate) - Date.parse(now);
            this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000);
    },
    beforeDestroy() {
        clearInterval(this.countdown);
    }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Oswald:wght@300;400&family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Tilt+Prism&display=swap');
@keyframes morph-bg {
    from {
        filter: blur(3px) hue-rotate(180deg);
    }

    to {
        filter: blur(3px) hue-rotate(1980deg);
    }
    
}
.bg {
    animation: morph-bg 60s infinite;
}

.font-tilt {
    font-family: 'Tilt Prism', cursive;
}

.overlay-theme {
    position: absolute;
    top: var(--nav-height);
    left: 0;
    width: 100%;
    height: calc(100% - var(--nav-height));

    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-shadow:
        0px 1px 1px rgba(0, 0, 0, 0.2),
        1px 2px 2px rgba(0, 0, 0, 0.2),
        2px 4px 4px rgba(0, 0, 0, 0.2),
        4px 8px 8px rgba(0, 0, 0, 0.2),
        8px 16px 16px rgba(0, 0, 0, 0.2),
        16px 32px 32px rgba(0, 0, 0, 0.2);

}

.wrapper__showcase {
    position: relative;
    width: 100%;
    min-height: 420px;
    min-width: 216px;
}

.showcase {
    position: absolute;
    top: 0;
    left: 0;
    margin: 5em 0;
    padding: 0;
    min-width: 187px;
    max-width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: 1s cubic-bezier(.19,1,.22,1);
    transform: rotate(-2.5deg) translate(0, -6.75vh) scale(0.8);
}

@KEYFRAMES switchcard-0 {
  0% {
    transform: rotate(3.6deg) translate3d(12.5% , 0, 0);
    z-index: 2;
  }
  50% {
    transform: rotate(-6deg) translate3d(0% , 0%, 0);
    z-index: 2;
  }
  100% {
    transform: rotate(3.6deg) translate3d(12.5% , 0, 0);
    z-index: 1;
  }
}

@KEYFRAMES switchback-0 {
  0% {
    transform: rotate(3.6deg) translate3d(12.5% , 0, 0);
    z-index: 1;
  }
  50% {
    transform: rotate(-6deg) translate3d(-5% , 0%, 0);
    z-index: 1;
  }
  100% {
    transform: rotate(3.6deg) translate3d(12.5% , 0, 0);
    z-index: 2;
  }
}

@KEYFRAMES switchcard-1 {
  0% {
    transform: rotate(10deg) translate3d(-25%, 5%, 0);
    z-index: 1;
  }
  50% {
    transform: rotate(25deg) translate3d(5%, 5%, 0);
    z-index: 1;
  }
  100% {
    transform: rotate(10deg) translate3d(-25%, 5%, 0);
    z-index: 3;
  }
}

@KEYFRAMES switchback-1 {
  0% {
    transform: rotate(10deg) translate3d(-25%, 5%, 0);
    z-index: 3;
  }
  50% {
    transform: rotate(25deg) translate3d(5%, 5%, 0);
    z-index: 3;
  }
  50.1% {
    transform: rotate(25deg) translate3d(5%, 5%, 0);
    z-index: 1;
  }
  100% {
    transform: rotate(10deg) translate3d(-25%, 5%, 0);
    z-index: 1;
  }
}

.card-0 {
    transform: rotate(3.6deg) translate3d(12.5%,0,0);
    animation: switchback-0 1s ease-in-out 1 forwards;
    z-index: 2;
}

.card-1 {
    transform: rotate(10deg) translate3d(-25%,5%,0);
    animation: switchback-1 1s ease-in-out 1 forwards;
    z-index: 1;
}

.overlay-theme:hover .card-0 {
    animation: switchcard-0 1s ease-in-out 1 forwards;
    z-index: 2;
}

.overlay-theme:hover .card-1 {
    animation: switchcard-1 1s ease-in-out 1 forwards;
    z-index: 3;
}

.layout img {
    position: relative;
    background-color: rgba(17,23,32,1);
    margin: 0;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    aspect-ratio: 1;
    border-radius: .375em;
    box-shadow: 
        0px 1px 1px rgba(0, 0, 0, 0.2),
        1px 2px 2px rgba(0, 0, 0, 0.2),
        2px 4px 4px rgba(0, 0, 0, 0.2),
        4px 8px 8px rgba(0, 0, 0, 0.2),
        8px 16px 16px rgba(0, 0, 0, 0.2),
        16px 32px 32px rgba(0, 0, 0, 0.2);
    ;
}

.to-launch-font {
    text-decoration: underline 1px solid rgba(255, 18, 18, 0.99);
}

body {
    overflow-x: hidden !important;
    overflow-y: hidden !important;
}

@media only screen and (max-width: 768px) {
    h1 {
        font-size: 32pt !important;
        margin: 10rem 0;
    }

    h2 {
        font-size: 18pt !important;
    }

    .countdown-theme {
        font-size: 10pt !important;
    }

    .overlay-theme {
        top: 0;
        height: 100%;
        font-size: 10pt !important;
    }

    .value-countdown {
        font-size: 38pt !important;
    }

    .label-countdown {
        width: 64px !important;
    }

    .wrapper__showcase {
        min-height: 280px;
    }

    .showcase {
        transform: rotate(-2.5deg) translate(-7.5%, -12.5%) scale(0.75);
    }
}

@media only screen and (max-width: 468px) {
    .showcase {
        transform: rotate(-2.5deg) translate(0, -25%) scale(0.5);
    }
}
</style>