<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps(["modelValue", "options"]);
const emit = defineEmits(["update:modelValue"]);

const selectedOption = ref(props.modelValue);

const handleChange = (e: CustomEvent) => {
    const targetValue = e.detail;
    const { value } = targetValue[0];

    selectedOption.value = value;

    emit("update:modelValue", selectedOption.value);
};

const isSelected = (option: string) => {
    return option === props.modelValue;
};
</script>

<template>
    <awc-select search autoselect-off v-model="selectedOption" @awc-select-change="handleChange">
        <awc-select-item v-for="option in options" :value="option" :key="option" :selected="isSelected(option)">{{
        option }}</awc-select-item>
    </awc-select>
</template>
