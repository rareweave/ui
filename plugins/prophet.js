import { useIsLoading  } from "../composables/useState";

export default async function Api(endpoint, options = {}) {
    const config = {
        proto: "https",
        host: "prophet.rareweave.store",
        _ : {
            nfts: "nfts",
            collections: "collections"
        }
    };
    if (!config._[endpoint])
        return;

    const isLoading = useIsLoading();

    return new Promise(resolve => {
        isLoading.value[endpoint] = true;
        let params = "";
        const l = Object.keys(options).length;
        if (l > 0) {
            params += `?`;
            Object.keys(options)
                .forEach((key, i) => {
                    switch(key) {
                        // customize params here if needed.
                        // next example breaks out before appending 'startFrom=0' to the params string.
                        case 'startFrom':
                            if (options[key] === 0)
                                break;
                        default:
                            params += `${key}=${options[key]}`;
                            if (i < l - 1)
                                params += `&`;
                            break;
                    };
                });
        };
        const url = `${config.proto}://${config.host}/${endpoint}${params}`;
        console.log(url);
        $fetch(url)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                console.log(err);
                resolve({ result: [] });
            })
            .finally(() => {
                isLoading.value[endpoint] = false;
            });
    });
};