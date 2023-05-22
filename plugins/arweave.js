import Arweave from "arweave";
import { useArweave } from "../composables/useState";

export default async function setArweave() {
    const arweave = useArweave();
    arweave.value = Arweave.init({
        host: "prophet.rareweave.store",
        port: 443,
        protocol: "https",
        timeout: 60_000,
        logging: false,
    });
};