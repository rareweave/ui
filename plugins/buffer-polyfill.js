import { Buffer } from 'buffer'
export default defineNuxtPlugin((nuxtApp) => {
    globalThis.Buffer = Buffer
 })
