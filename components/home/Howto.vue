<template>
    <div class="_Section Howto flex flex-col items-center justify-center w-full flex-1 mx-auto py-10 max-w-[1740px]" id="howto">
        <div class="flex flex-col justify-center items-center h-full mx-auto mt-32">
            <h2 class="text-white text-left max-w-[85vw] text-4xl font-semibold">
                Create and Sell
            </h2>
            <div class="flex flex-wrap justify-between items-stretch mt-20 w-full h-full preserve-3d">
                <div v-for="step in steps" class="flex-1 flex flex-col items-center justify-center p-6 m-6 text-center min-width-[-286px] --observe">
                    <div :class="['relative p-[16px] aspect-w-[64px] w-[64px] flex justify-center items-center rounded-full before:absolute before:inset-[-16px] before:border-1 before:border-black before:opacity-50 before:p-[16px] before:z-[-1] before:rounded-full', `--${step.color}`].join(' ')">
                        <span>
                            <img :src="step.icon" :alt="['no-', step.no].join('')" width="48" height="48" class="Image" />
                        </span>
                    </div>
                    <h4 class="mt-8 mx-0 mb-4 text-2xl font-bold text-white whitespace-nowrap">
                        {{ step.no }}. {{ step.title }}
                    </h4>
                    <p class="mb-4">
                        {{ step.description }}
                    </p>
                    <NuxtLink class="btn btn-sm mt-auto Amazing--button" v-if="step.button" :to="step.button.link">
                        {{ step.button.title }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const steps = [
    {
        no: 1,
        title: "Set up a wallet",
        description: "If you do not have an Arweave wallet yet, use arweave.app or ArConnect to create it.",
        color: "purple",
        button: {
            title: "Learn more",
            link: "https://docs.arweave.org/info/wallets/arweave-wallet",
        },
        icon: "data:image/png;base64,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"
    },
    {
        no: 2,
        title: "Create a collection",
        description: "After you connected your wallet, click on 'Create collection' to make your collection.",
        color: "green",
        button: { title: "Create collection", link: "/collection/create" },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFb0lEQVR4nO1bSY8bRRSuyUKQAAWYruqAkIDgE/sAJ3JGbFdAWbiBxAUSZUBCSKCO4vdsorBoCBwmHIBRBIMRP2DClQs5kHBjyQGFyYRh0divHCEYRKPX3Z4pt5d47Kpue+Qnlbx0q6req1dfva2E6IfCcMKrwwNKFw8ojYclwasuGvfNY/BYPKbIm5RGXxK+qwguKo1hpo1wURK84+tAZc95GE7IevEVpVFnznhLA1K6OJ2ZRtwaBldLwk/TE5EEv0rCeV4VpfFNF437jsfA5dbx8VQhnNnhfuUpxTzBt7JeekyEwRa3g5vzCLZ4dXhcEZ5NC8GpJshY7c19OCPCYJvIi8JgmyI80awNxWknY/k6UPF+M5gfElIE7xtCYFzyrQ8iGe0Nte935WW1VGBNajnm+L9qqdC/JsA5A4/e6qufjhSGE+ZRF+35PklpPN8F1X/st1+vXnrCWKBfrGLB5GV4yET7QQBPafjJhQBEWNlqng6RsWSLlMb9BtLOD9IXq7kieKPlmCN8XVaLdww4z0pjnr7GvYP01Rn9CY6LISVJ+LahTS/b61jjkTUN0HhEDCk5m6ccCwDHGqDGWwDHGKDGIIjjU0COj0Ec2wHCMXX0GK/Y8KuRN4RkHe6XGv4YNFY4kgLw6uUpG8wnkaEDIyUAL8W81Pin0nCszwDqfqvxAOlYAG3UfoVjEGJYSDoUwNAz71IAI8G8KwGMDPODCICzSHGwsjjtaTioND7CsbsY8Bjk1gHPagyvJQSHL0TJVYLnVbW8OxMB+Br3KsKlNimsn7NgPsljfKkI/ktlsvh35eZaadKZAJTGQz0aK06Y30UoOcLcfXz4oWchyA0IQGm8VxH8uy5xXJIaZ7mlNUJqeNoW081zgC9Sq74QJW0JFlLaOG9fAARzxrvf7FwJrm8821kt3yAJzhjPP7TAb/P41fLuZrVvtgiTIo617eCvFG+3LABcXHu3Vny4pS/CPcYqnO8IXN0zSL01goW2/ROcbrzjEz5nVQCS8O/Gu5O/H7su/Zz/M1Twr3Z9cEzfhj/QKUfI/xvvvJabBkjCC501oGsKrVcBnM5cAxThJ8YEzvC+74QBSuNHIncMKN9m+RQ4ek/zKQCXpIaT3Pi7cTqs+vroXRZ47pojbGhCXF6zvvLJ/585sQOkxpdaDJCUMSI1vCgc0U0UeHzOX2GLfH9LNbjRmSXoaXzGxANj5Rcl4VPCMSXGUKWdJcgr3zPzg/gCXLXFxRRxgSMelnV49M4wuEpkSJxyZx+AfQEGvJ72fF4hscSKnIs0h3A1/oQ5WS/fJ/IkmYEAIv/BBM/mbbPKz8VmFYDPnmMP5zrjithsAiiEMztMJ4n9Bzag/EvHr+FP/m0A2MWsMcS5AKKKz3VVXzINJyb+nfIiP+ihqvzZkYkKK8PuZ5e5/fhwctPmBZQjAYxMZsjb6BaIfY0OCRH4euQEUIhA0KhCZRAk3COXg2ujT9N5IlzsBoIjWyXmRWZzF9+hxxCas3kqc59aL0RucqA6GELwDz/fWKGkxbJ5pYv7bJXKdiNf492K4GMOlDDTXPTMv9nFzrVU1rtcftBWsbQz4mJpDb+tWY318pTlcnlcc20ZucWQkVeDJw0tvWD96oyML0M10Phsrldl0hTObpcE3znFqV1xgKFmANN7YkiIzeN18Iuu9fiOBipOp9zUE/lemprd3sx81A65vjZ3KnVEneMMMIOQu4HT86hs5T1vqn0ylznnYxc4zJUWQgw8y4rg8yT66uTucIJDFRPtTebdX5w0T4Uozmdco8uv1XKLFvk6UJH1xQZLxozzUcdoz+AscqeQr8+XpxKLkSPATu4OJ9fn93F5jasrsv8DhKYLHp3ees0AAAAASUVORK5CYII="
    },
    {
        no: 3,
        title: "Upload your NFTs",
        description: "Click on 'Mint NFT' to create and upload your NFTs and add them to your collection.",
        color: "blue",
        button: { title: "Upload NFT", link: "/create" },
        icon: "data:image/png;base64,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"
    },
    {
        no: 4,
        title: "Sell on chain",
        description: "Promote your collection and sell your NFTs through the RareWeave market!",
        color: "red",
        button: { title: "Explore NFTs", link: "/explore" },
        icon: "data:image/png;base64,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"
    }

];
</script>
<style scoped>
.--purple {
    background: rgba(248, 35, 248, 0.966);
    background: linear-gradient(203deg, rgba(248, 35, 248, 0.966), rgba(97, 4, 97, 0.952));
}

.--green {
    background: rgba(30, 231, 214, 0.966);
    background: linear-gradient(203deg, rgba(30, 231, 214, 0.966), rgba(5, 165, 45, 0.938));
}

.--blue {
    background: rgba(9, 230, 119, 0.966);
    background: linear-gradient(203deg, rgba(9, 230, 119, 0.966), rgba(8, 102, 243, 0.932));
}

.--red {
    background: rgba(236, 167, 18, 0.966);
    background: linear-gradient(203deg, rgba(236, 167, 18, 0.966), rgba(226, 56, 4, 0.932));
}

.--purple::before,
.--green::before,
.--blue::before,
.--red::before {
    background: inherit;
}
</style>