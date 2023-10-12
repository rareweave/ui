<template>
  <input type="checkbox" id="connectWallet" class="modal-toggle" :checked="show" />

  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold font-mono text-3xl text-center">
        Select your arweave wallet required!
      </h3>
      <div class="py-4 flex justify-center">
        <div class="card card-compact m-2 w-1/3 bg-base-200 cursor-pointer" @click="connectArconnect">
          <figure>
            <img
              src="https://7qx7gbohuua3h7r32vf6ddrjoi7mkdmczz6cdtcq2e3dhdpavd3q.arweave.net/_C_zBcelAbP-O9VL4Y4pcj7FDYLOfCHMUNE2M43gqPc"
              alt="ArConnect" height="200" />
          </figure>
          <div class="card-body w-full flex bg-neutral">
            <h2 class="card-title w-full block text-center font-mono">
              ArConnect
            </h2>
          </div>
        </div>
        <!-- ArConnect uses own encryption method, which is not normal RSA encryption and not compatible with most software -->
        <div class="card card-compact m-2 w-1/3 bg-base-200 cursor-pointer" @click="connectArweaveApp">
          <figure>
            <img
              src="https://yctstiqqys3b4j5qb55sxtn6airb6a56tlwxtkfi36of6cbg2a5a.arweave.net/wKcpohDEth4nsA97K82-AiIfA76a7XmoqN-cXwgm0Do"
              alt="Arweave.app" width="900" />
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
import Everpay from "everpay";
import { DataItem } from "arbundles";
import {
  useArWallet,
  useAccount,
  useSpendable,
  useAnsaddr,
  useArweave,
  useAccountTools,
} from "../composables/useState";
import Coins from "../config/coins";
import setArweave from "../plugins/arweave";

// Arweave
import { ArweaveWebWallet } from "arweave-wallet-connector";
const arWallet = useArWallet();

const arweave = useArweave().value;
if (!arweave) setArweave();
const account = useAccount();
const accountTools = useAccountTools().value;
const ansAddr = useAnsaddr();
const spendable = useSpendable();

// Wallet States
const arWalletState = useState("arWallet", () => null);
const everypayWallet = useState("everypayWallet", () => null);
const arweaveWalletState = useState("arweaveWallet", () => null);

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

  let everpay = new Everpay({
    account: address,
    chainType: "arweave",
    arJWK: "use_wallet",
  });

  const { tokenList } = everpay ? await everpay.info() : { tokenList: null };

  everypayWallet.value = {
    getAddress: () => {
      return address;
    },

    send: async (from, to, amount, denom) => {
      const epay = everpay;
      const tList = tokenList;

      const payingCoin = tList?.find((element) => element.symbol === denom);

      let send = await epay.transfer({
        tag: payingCoin.tag,
        amount: (amount / Coins.Exponents[denom]).toString(),
        to: to,
      });

      return send.everHash;
    },
  };

  arweaveWalletState.value = {
    getAddress: () => {
      return address;
    },

    send: async (from, to, amount, denom, address) => {
      let feeEstimate = await fetch(`https://g8way.io/price/1000000/${address}`)
        .then((res) => res.text())
        .catch((err) => {
          alert("Failed to get the fee estimate");
          payRoyalty.value = false;
        });

      let tx = await arweave.createTransaction({
        data: "Payment",
        target: to,
        quantity: amount.toString (),
        reward: feeEstimate,
      });

      try {
        await arweave.transactions.sign(tx);
      } catch (e) {
        console.log(e);
        alert("You need to sign the transaction to be able to send it");
        payRoyalty.value = false;
      }

      try {
        let postedTx = await arweave.transactions.post(tx);
        console.log(await postedTx);

        console.log(await waitTillTxPublished(tx.id));

        return tx.id;
      } catch (e) {
        console.log(e);
        alert("You need to sign the transaction to be able to send it");
        payRoyalty.value = false;
      }

      async function waitTillTxPublished(TxId, tries = 0) {
        if (tries >= 100) {
          return "error";
        }
        try {
          const res = await (
            await fetch("https://ar-io.net" + "/tx/" + TxId)
          ).json();
          return "ok";
        } catch (e) {
          console.log(e);
          await wait(10000);
          return await waitTillTxPublished(TxId, ++tries);
        }
      }

      function wait(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
    },
  };

  account.value = await accountTools.get(address);
  ansAddr.value = (
    await $fetch(`https://ans-resolver.herokuapp.com/resolve/${address}`)
  )?.domain;
  webwallet.namespaces.arweaveWallet.type = "Arweave.app";
  webwallet.namespaces.arweaveWallet.signature = async (message) => {
    return await webwallet.signMessage(message, { hashAlgorithm: "SHA-256" });
  };
  webwallet.namespaces.arweaveWallet.signDataItem = async (tx) => {
    return await webwallet.signDataItem(tx)
  };
  arWalletState.value = webwallet.namespaces.arweaveWallet;

  setSpendable(address);
}

async function connectArconnect() {
  if (!("arweaveWallet" in window && "connect" in window.arweaveWallet)) return;

  const permissions = await window.arweaveWallet.getPermissions();

  if (permissions.length <= 0) {
    await window.arweaveWallet.connect([
      "ACCESS_ADDRESS",
      "DECRYPT",
      "ACCESS_PUBLIC_KEY",
      "DISPATCH",
      "SIGN_TRANSACTION",
      "ACCESS_ARWEAVE_CONFIG",
    ]);
  }

  const address = await window.arweaveWallet.getActiveAddress();

  let everpay = new Everpay({
    account: address,
    chainType: "arweave",
    arJWK: "use_wallet",
  });

  const { tokenList } = everpay ? await everpay.info() : { tokenList: null };

  everypayWallet.value = {
    getAddress: () => {
      return address.toString();
    },

    send: async (from, to, amount, denom) => {
      const epay = everpay;
      const tList = tokenList;

      const payingCoin = tList?.find((element) => element.symbol === denom);

      let send = await epay.transfer({
        tag: payingCoin.tag,
        amount: (amount / Coins.Exponents[denom]).toString(),
        to: to,
      });

      return send.everHash;
    },
  };

  arweaveWalletState.value = {
    getAddress: () => {
      return address;
    },

    send: async (from, to, amount, denom, address) => {
      let feeEstimate = await fetch(`https://g8way.io/price/1000000/${address}`)
        .then((res) => res.text())
        .catch((err) => {
          alert("Failed to get the fee estimate");
          payRoyalty.value = false;
        });

      let tx = await arweave.createTransaction({
        data: "Payment",
        target: to,
        quantity: amount.toString(),
        reward: feeEstimate,
      });

      try {
        await arweave.transactions.sign(tx);
      } catch (e) {
        console.log(e);
        alert("You need to sign the transaction to be able to send it");
        payRoyalty.value = false;
      }

      try {
        let postedTx = await arweave.transactions.post(tx);
        console.log(await postedTx);

        console.log(await waitTillTxPublished(tx.id));

        return tx.id;
      } catch (e) {
        console.log(e);
        alert("You need to sign the transaction to be able to send it");
        payRoyalty.value = false;
      }

      async function waitTillTxPublished(TxId, tries = 0) {
        if (tries >= 100) {
          return "error";
        }
        try {
          const res = await (
            await fetch("https://ar-io.net" + "/tx/" + TxId)
          ).json();
          return "ok";
        } catch (e) {
          console.log(e);
          await wait(10000);
          return await waitTillTxPublished(TxId, ++tries);
        }
      }

      function wait(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
    },
  };

  account.value = await accountTools.get(address);
  ansAddr.value = (
    await $fetch(`https://ans-resolver.herokuapp.com/resolve/${address}`)
  )?.domain;
  window.arweaveWallet.type = "Arconnect";
  arWalletState.value = window.arweaveWallet;

  setSpendable(address);
}
async function setSpendable(address) {
  const winston = await arweave.wallets.getBalance(address);

  spendable.value = arweave.ar.winstonToAr(winston);
}
</script>
