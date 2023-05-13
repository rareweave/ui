<template>
    <div
        :class="['About','Section'].join(' ')"
    >
        <div class="About__wrapper">
            <h2 class="About__title">
                Top collections
            </h2>
            <div class="About__rarified">
                <div 
                    v-for="collection in rarified.filter((c, i) => i < 10)"
                    class="About__collection"
                >
                    <span class="About__collectionname Amazing-text">
                        {{ collection.name }}
                    </span>
                    <span class="About__collectionstat">
                        {{ collection.floorprice }} AR
                    </span>
                    <span class="About__collectionstat">
                        {{ collection.volume }} AR
                    </span>
                    <span class="About__collectionstat">
                        {{ collection.percentage_change_24h > 0 ? '+' : '-' }}{{ collection.percentage_change_24h }}%
                    </span>
                    <span class="About__collectionstat">
                        {{ collection.percentage_change_7d > 0 ? '+' : '-' }}{{ collection.percentage_change_7d }}%
                    </span>
                </div>
            </div>
            <div>
                <h4>
                    Collections on the RareWeave market
                </h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam
                    ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl ut nisl. Sed euismod, diam quis
                    aliquam ultricies, nunc nisl ultricies nunc, quis aliquam nisl nisl ut nisl.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import Api from '../../plugins/prophet';

const rarified = ref([]);

onMounted(async () => {
    Api(`collections`)
        .then(res => {
            const limit = 10;
            rarified.value = res.result.filter((c,i) => ![
                undefined, 'undefined', '', ' ', 'test', 'Test' // excluded collection names
            ].includes(c.state.name) && i < limit)
                .map(c => ({
                    name: c.state.name,
                    floorprice: 0.0,
                    volume: 0.0,
                    percentage_change_24h: 0.0,
                    percentage_change_7d: 0.0
                }));
        })
        .catch(err => {
            console.log(err);
        });
});
</script>

<style scoped>
    .About__wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: calc((100%) - var(--page-spacing) * 2);
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .About__title {
        font-size: 24pt;
        font-weight: 600;
        margin-bottom: 60px;
        background: linear-gradient(117deg,  rgba(255, 8, 132, 0.932), rgba(245, 119, 2, 0.932));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .About__rarified {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 100%;
        min-height: 628px;
        padding: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        background: rgb(45 47 51 / 50%)
    }

    .About__collection {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: 
            "name floorprice volume percentage_change_24h percentage_change_7d";
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
</style>