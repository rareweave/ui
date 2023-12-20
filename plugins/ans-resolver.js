import { AnsResolver } from "~/settings.json";

export default defineNuxtPlugin(async function ansResolver(target) {
    const url = `${AnsResolver.endpoint}/${target}`;
    const res = await $fetch(url);
    return res?.domain;
});