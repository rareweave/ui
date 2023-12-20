<template>
    <TresCanvas clear-color="rgba(4,2,8,1)">
        <TresPerspectiveCamera 
            :position="[10.5,5.5,15.5,10]" 
            :look-at="[0, 0, 0]" 
            :rotate="[-0.5, Math.PI, 0]"    
        />
        <OrbitControls />
        <TresAmbientLight />
        <Suspense>
            <primitive :object="model" />
        </Suspense>
        <TresGridHelper />
    </TresCanvas>
</template>
<script setup>
const { src } = defineProps([
    "src"
]);
const { scene: model } = await useGLTF(src);
console.log(model);
</script>