
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    target: "static",
    mode: "spa",
    typescript: false,
    ssr: false,
    css: ["~/assets/main.css"],
    colorMode: {
        dataValue: "luxury"
    },
    app: {
        head: {
            link: [],
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
    }
});