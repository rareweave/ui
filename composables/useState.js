import Account from "arweave-account";
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
export const useAnsaddr = () => useState("ansaddr", () => null);

// Arweave
export const useArweave = () => useState("arweave", () => null);

export const useAccountTools = () => useState("accountTools", () => new Account({
    gateway: {
        host: "prophet.rareweave.store",
        port: 443,
        protocol: "https",
        timeout: 60_000,
        logging: false,
    },
    cacheIsActivated: true,
    cacheSize: 100,
    cacheTime: 60,
}));

// Exchange rates
export const useRates = () => useState("rates", () => ({
    arweave: {}
}));