// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { nodePolyfills } from 'vite-plugin-node-polyfills'
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
    vite: {
        plugins: [
            nodePolyfills({
                // Whether to polyfill `node:` protocol imports.
                protocolImports: true,
            }),
        ],
    }
});