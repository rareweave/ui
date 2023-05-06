
export default defineNuxtConfig({
    modules: [],
    target: "static",
    mode: "spa",
    typescript: false,
    ssr: false,
    css: ["~/assets/main.css"],
    colorMode: {
        dataValue: "luxury"
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        }
    },
    app: {
        head: {
            title: 'Rareweave',
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
            htmlAttrs: { "data-theme": "business", }

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