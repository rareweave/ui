import Arweave from "arweave";
import { useArweave } from "../composables/useState";

const config = {
    host: "prophet.rareweave.store",
    port: 443,
    protocol: "https",
    timeout: 60_000,
    logging: false,
};

export default async function initArweave() {
    const arweave = useArweave();
    arweave.value = Arweave.init(config);
};