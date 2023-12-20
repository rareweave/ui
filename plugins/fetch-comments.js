import { SocioWeave } from "~/settings.json";

export default defineNuxtPlugin(async function fetchComments(id) {
    const url =  `${SocioWeave.endpoint}/${id}`;
    const res = await $fetch(url);
    if (res)
        return res;
    
    return [];
});