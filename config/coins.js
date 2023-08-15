export const Chains = ["arweave", "everpay", "solana"];

export const everpay = [
  "AR",
  "ETH",
  "GLMR",
  "BNB",
  "WBTC",
  "U",
  "USDC",
  "USDT",
  "ARDRIVE",
  "DAI",
];

export const solana = ["SOL"];

export const arweave = ["AR"];

export const royaltyList = ["arweave", "solana", "everpay"];

export const Exponents = {
  AR: "1000000000000",
  ETH: "1000000000000000000",
  GLMR: "1000000000000000000",
  U: "1000000",
  BNB: "1000000000000000000",
  USDC: "1000000000000000000",
  DAI: "1000000000000000000",
  WBTC: "1000000000000000000",
  SOL: "1000000000",
};

const data = { Chains, everpay, solana, arweave, Exponents, royaltyList };

export default data;
