import {
  useArWallet,
  useSolWallet,
  useEverpayWallet,
  useArweaveWallet,
} from "../composables/useState";

export async function walletFacotry(wallet) {
  console.log(wallet);
  switch (wallet) {
    case "solana": {
      return useSolWallet().value;
    }

    case "arweave": {
      return useArweaveWallet().value;
    }

    case "everpay": {
      return useEverpayWallet().value;
    }
  }
}
