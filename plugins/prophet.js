import { useIsLoading  } from "../composables/useState";

export default async function Api(route, options = {}) {
    const config = {
        protocol: "https",
        host: "prophet.rareweave.store",
        allowed : {
            info: "info",
            nfts: "nfts",
            collections: "collections",
            "contract-interactions": "contract-interactions/",
        }
    };

    if (config.allowed[route] === undefined)
        return;

    const endpoint = config.allowed[route];

    const isLoading = useIsLoading();

    return new Promise(resolve => {
        isLoading.value[route] = true;
        let params = "";
        const action = options.action || null;

        if (action) {
            params = `${options.contract}`;
        }
        else {
            const l = Object.keys(options).length;
            if (l > 0) {
                Object.keys(options)
                    .forEach((key, i) => {
                        switch(key) {
                            // customize params here if needed.
                            // next example breaks out before appending 'startFrom=0' to the params string.
                            case 'startFrom':
                                if (options[key] === 0)
                                    break;
                            default:
                                if (params === '') 
                                    params = `?`;
                                params += `${key}=${options[key]}`;
                                if (i < l - 1)
                                    params += `&`;
                                break;
                        };
                    });
            };
        };

        const url = `${config.protocol}://${config.host}/${endpoint}${params}`;
        console.log(url);
        $fetch(url)
            .then(res => {
                const r = action ? res.filter(tx => tx.tags.filter(tag => tag.name === 'Input' && tag.value.includes(action)).length > 0) 
                    : res;
                resolve({ result: r.result || r });
            })
            .catch(err => {
                console.log(err);
                resolve({ result: [] });
            })
            .finally(() => {
                isLoading.value[route] = false;
            });
    });
};