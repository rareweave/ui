import { nodePolyfills } from 'vite-plugin-node-polyfills'
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-lazy-load'
    ],
    plugins: [
    ],
    target: "static",
    mode: "spa",
    typescript: false,
    ssr: false,
    css: [
        "~/assets/fonts.css",
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

    vite: {
        plugins: [
            nodePolyfills({
                // To exclude specific polyfills, add them to this list.
                exclude: [
                    'fs', // Excludes the polyfill for `fs` and `node:fs`.
                ],
                // Whether to polyfill specific globals.
                globals: {
                    Buffer: true, // can also be 'build', 'dev', or false
                    global: true,
                    process: true,
                },
                // Whether to polyfill `node:` protocol imports.
                protocolImports: true,
            }),
        ],
    }
});