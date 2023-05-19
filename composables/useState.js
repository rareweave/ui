// Rareweave state
export const useCollections = () => useState("collections", () => []);
export const useNfts = () => useState("nfts", () => []);
export const useContractInteractions = () => useState("contract-interactions", () => []);
export const useIsLoading = () => useState("isLoading", () => ({
    "collections": false,
    "nfts": false,
    "contract-interactions": false
}));
export const useIsError = () => useState("isError", () => ({
    "collections": false,
    "nfts": false,
    "contract-interactions": false
}));

// User
export const useWallet = () => useState("wallet", () => null);
export const useAccount = () => useState("account", () => null);
export const useSpendable = () => useState("spendable", () => 0);

// Arweave
export const useArweave = () => useState("arweave", () => null);

// Exchange rates
export const useRates = () => useState("rates", () => ({
    arweave: {}
}));