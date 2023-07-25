<template>
  <input
    type="checkbox"
    id="connectWallet"
    class="modal-toggle"
    :checked="show"
  />

  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold font-mono text-3xl text-center">
        Select your arweave wallet
      </h3>
      <div class="py-4 flex justify-center">
        <div
          class="card card-compact m-2 w-1/3 bg-base-200 cursor-pointer"
          @click="connectArconnect"
        >
          <figure>
            <img
              src="https://7qx7gbohuua3h7r32vf6ddrjoi7mkdmczz6cdtcq2e3dhdpavd3q.arweave.net/_C_zBcelAbP-O9VL4Y4pcj7FDYLOfCHMUNE2M43gqPc"
              alt="ArConnect"
              height="200"
            />
          </figure>
          <div class="card-body w-full flex bg-neutral">
            <h2 class="card-title w-full block text-center font-mono">
              ArConnect
            </h2>
          </div>
        </div>
        <!-- ArConnect uses own encryption method, which is not normal RSA encryption and not compatible with most software -->
        <div
          class="card card-compact m-2 w-1/3 bg-base-200 cursor-pointer"
          @click="connectArweaveApp"
        >
          <figure>
            <img
              src="https://yctstiqqys3b4j5qb55sxtn6airb6a56tlwxtkfi36of6cbg2a5a.arweave.net/wKcpohDEth4nsA97K82-AiIfA76a7XmoqN-cXwgm0Do"
              alt="Arweave.app"
              width="900"
            />
          </figure>
          <div class="card-body w-full flex bg-neutral">
            <h2 class="card-title w-full block text-center font-mono">
              Arweave.app
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ArweaveWebWallet } from "arweave-wallet-connector";
import {
  useWallet,
  useAccount,
  useSpendable,
  useAnsaddr,
  useArweave,
  useAccountTools,
} from "../composables/useState";
import setArweave from "../plugins/arweave";

const arweave = useArweave().value;
if (!arweave) setArweave();

const account = useAccount();
const accountTools = useAccountTools().value;
const ansAddr = useAnsaddr();
const spendable = useSpendable();
const wallet = useWallet();
const walletState = useState("wallet", () => null);

const props = defineProps(["show"]);
const show = ref(props.show || false);

async function connectArweaveApp() {
  let webwallet = new ArweaveWebWallet(
    {
      name: "RareWeave",
      logo: "https://uww52thwbamkjai5oi7pi6hfiqigwn5skuaklgmebscumieurkta.arweave.net/pa3dTPYIGKSBHXI-9HjlRBBrN7JVAKWZhAyFRiCUiqY",
    },
    {
      state: {
        url: "arweave.app",
      },
    }
  );

  webwallet.setUrl("arweave.app");

  await webwallet.connect();

  const address = webwallet.namespaces.arweaveWallet.getActiveAddress();

  account.value = await accountTools.get(address);
  ansAddr.value = (
    await $fetch(`https://ans-resolver.herokuapp.com/resolve/${address}`)
  )?.domain;
  webwallet.namespaces.arweaveWallet.type = "Arweave.app";
  webwallet.namespaces.arweaveWallet.signature = async (message) => {
    return await webwallet.signMessage(message, { hashAlgorithm: "SHA-256" });
  };
  walletState.value = webwallet.namespaces.arweaveWallet;

  setSpendable(address);
}
async function connectArconnect() {
  if (!("arweaveWallet" in window && "connect" in window.arweaveWallet)) return;

  await window.arweaveWallet.connect([
    "ACCESS_ADDRESS",
    "DECRYPT",
    "ACCESS_PUBLIC_KEY",
    "DISPATCH",
    "SIGN_TRANSACTION",
    "ACCESS_ARWEAVE_CONFIG",
  ]);

  const address = await window.arweaveWallet.getActiveAddress();

  account.value = await accountTools.get(address);
  ansAddr.value = (
    await $fetch(`https://ans-resolver.herokuapp.com/resolve/${address}`)
  )?.domain;
  window.arweaveWallet.type = "Arconnect";
  walletState.value = window.arweaveWallet;

  setSpendable(address);
}
async function setSpendable(address) {
  const winston = await arweave.wallets.getBalance(address);
  spendable.value = arweave.ar.winstonToAr(winston);
}
</script>
