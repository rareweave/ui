
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
<<<<<<< HEAD
    css: ["~/assets/fonts.css", "~/assets/main.css"],
=======
    css: [
        "~/assets/styles/theme.css",
        "~/assets/styles/main.css",
        "~/assets/styles/loader.css"
    ],
>>>>>>> d395a6036db41f78bb8f0891fea656eba41b7064
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
<<<<<<< HEAD
            title: 'Rareweave',
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
            htmlAttrs: { "data-theme": "business", }

=======
            link: [
                {
                    rel: "icon",
                    type: "image/x-icon",
                    href: "/favicon.ico"
                }
            ],
            title: "RareWeave | Nft Marketplace"
>>>>>>> d395a6036db41f78bb8f0891fea656eba41b7064
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