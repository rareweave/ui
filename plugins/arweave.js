import Arweave from "arweave";
import { useArweave } from "../composables/useState";

export default defineNuxtPlugin(async function setArweave() {
    const arweave = useArweave();
    arweave.value = Arweave.init({
        host: "ar-io.net",
        port: 443,
        protocol: "https",
        timeout: 60_000,
        logging: false,
    });
})