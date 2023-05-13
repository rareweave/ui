export const useCollections = () => useState("collections", () => []);
export const useNfts = () => useState("nfts", () => []);
export const use_NFTs = () => useState("_NFTs", () => []);
export const useWallet = () => useState("wallet", () => null);
export const useAccount = () => useState("account", () => null);
export const useSpendable = () => useState("spendable", () => 0);
export const useIsLoading = () => useState("isLoading", () => ({
    collections: false,
    nfts: false
}));
export const useIsError = () => useState("isError", () => ({
    collections: false,
    nfts: false
}));
export const useRates = () => useState("rates", () => ({
    arweave: {}
}));