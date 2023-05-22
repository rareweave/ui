
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-lazy-load'
    ],
    plugins: [
        "~/plugins/prophet.js",
    ],
    target: "static",
    mode: "spa",
    typescript: false,
    ssr: false,
    css: [
        "~/assets/styles/theme.css",
        "~/assets/styles/main.css",
        "~/assets/styles/loader.css"
    ],
    colorMode: {
        dataValue: "luxury"
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    app: {
        head: {
            link: [
                {
                    rel: "icon",
                    type: "image/x-icon",
                    href: "/favicon.ico"
                }
            ],
            title: "RareWeave | Nft Marketplace"
        }
    },
    builder: "vite",
    experimental: {
        payloadExtraction: false

    },
    generate: {
        fallback: "index.html",

    },
    nitro: {
        prerender: {
            ignore: ["404.html"],

        }
    },

});