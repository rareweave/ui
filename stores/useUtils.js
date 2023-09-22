import Account from "arweave-account/lib/index"
import Arweave from "arweave"
import { arweaveGateway } from "../config/config.json"
export const useUtils = defineStore("utils", () => {
    const account = new Account({
        gateway: {
            host: arweaveGateway,
            port: 443,
            protocol: "https",
            timeout: 60_000,
            logging: false,
        },
        cacheIsActivated: true,
        cacheSize: 100,
        cacheTime: 3600000,
    })
    const arweave = Arweave.init({
        host: arweaveGateway,
        port: 443,
        protocol: "https",
        timeout: 60_000,
        logging: false,
    });

    return { arweave,account }
})