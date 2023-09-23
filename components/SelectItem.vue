<template>
    <div class="relative w-max min-w-[12rem]  rounded-lg" @click.prevent ref="element">
        <button @click="toggleDropdown" :class="['w-full', 'text-left',isOpen?'rounded-b-none':'','bg-zinc-800','font-mono','text-white','p-2','rounded-lg',isOpen?'border-b-0':'','border','border-zinc-700',isOpen?'mb-px':'']">
            {{ selected ? selected.label : "Select an option" }}
            <span class="float-right">&#x25BC;</span>
        </button>
        <ul v-if="isOpen" class="absolute w-full rounded-t-none -mt-px bg-zinc-900 rounded-lg shadow z-50 border border-t-0 border-zinc-700">
            <li v-for="(option, optionIndex) in props.options" :key="option.value" @click="selectOption(option)"
                :class="['p-2', 'transition-colors', 'border-b', 'border-zinc-800', 'hover:bg-gray-700', 'text-white', 'cursor-pointer', 'max-h-48',optionIndex==options.length-1?'rounded-b-lg':'']">
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core'

const element = ref(null)
// Define props
const props = defineProps(["options", "modelValue"]);
let options = props.options
let modelValue=props.modelValue
console.log(modelValue)

// Define emits
const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selected = ref(options.find(o=>o.value==modelValue));

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
    selected.value = option;
    isOpen.value = false;
    console.log(option)
    emit('update:modelValue', option.value);
};

watch(
    () => props.modelValue,
    (newValue) => {
        console.log("new value")
        console.log(newValue,props.options, props.options.find(o => o.value == newValue))
        selected.value = props.options.find(o => o.value == newValue);
    }
);

onMounted(() => {
      onClickOutside(element, (event) => isOpen.value=false)
})
</script>
