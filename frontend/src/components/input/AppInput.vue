<script lang="ts" setup>
const props = defineProps({
    type: String,
    name: String,
    value: String,
    placeholder: String,
    disabled: Boolean,
})
</script>


<template>
    <input class="app-input" :name="props.name" :value="props.value" :disabled="props.disabled"
        :placeholder="props.placeholder" :type="props.type">
</template>


<style scoped>
.app-input {
    padding: 16px 14px;
    height: 50px;
    width: 100%;
    border-radius: var(--corner-radius-10);
    border: 1px solid var(--color-gray-10);
}
</style>