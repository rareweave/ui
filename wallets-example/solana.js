import {
  Transaction,
  SystemProgram,
  Connection,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

import rpcEndpoints from "../config/rpc.json";

export async function solanaWalletFacotry(wallet) {
  switch (wallet) {
    case "solflare": {
      const provider = window.solflare;

      if (!provider.isConnected) {
        try {
          const resp = await provider.connect();
        } catch (e) {
          return alert("Declined Connection");
        }
      } else {
        console.log("Already Connected");
      }

      const connection = new Connection(rpcEndpoints.Solona);

      return {
        connection: () => {
          return new Connection(clusterApiUrl("mainnet-beta"));
        },
        getProvider: () => {
          return provider;
        },
        connect: () => {
          return provider.connect();
        },
        disconnect: () => {
          return provider.disconnect();
        },
        getAddress: () => {
          return provider.publicKey.toString();
        },
        send: async (from, to, amount) => {
          let fromPub = new PublicKey(from);
          let toPub = new PublicKey(to);

          const transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: fromPub,
              toPubkey: toPub,
              lamports: amount,
            })
          );
          transaction.feePayer = fromPub;

          let { blockhash } = await connection.getRecentBlockhash();
          transaction.recentBlockhash = blockhash;
          transaction.feePayer = fromPub;

          const signedTransaction = await provider.signTransaction(transaction);
          const signature = await connection.sendRawTransaction(
            signedTransaction.serialize()
          );

          return signature;
        },
        // etc
      };
    }

    case "phantom": {
      const provider = window.phantom?.solana;

      if (!provider.isConnected) {
        try {
          const resp = await provider.connect();
        } catch (e) {
          return alert("Declined Connection");
        }
      } else {
        console.log("Already Connected");
      }

      const connection = new Connection(rpcEndpoints.Solona);

      return {
        connection: () => {
          return new Connection(clusterApiUrl("mainnet-beta"));
        },
        getProvider: () => {
          return provider;
        },
        connect: () => {
          return provider.connect();
        },
        disconnect: () => {
          return provider.disconnect();
        },
        getAddress: () => {
          return provider.publicKey.toString();
        },
        send: async (from, to, amount) => {
          let fromPub = new PublicKey(from);
          let toPub = new PublicKey(to);

          console.log(amount);

          const transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: fromPub,
              toPubkey: toPub,
              lamports: amount,
            })
          );
          transaction.feePayer = fromPub;

          const anyTransaction = transaction;
          anyTransaction.recentBlockhash = (
            await connection.getLatestBlockhash()
          ).blockhash;

          const res = await provider.signAndSendTransaction(transaction);

          return res.signature;
        },
        // etc
      };
    }
  }
}
