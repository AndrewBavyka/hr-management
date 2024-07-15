<script lang="ts" setup>
const props = defineProps({
    type: String,
    name: String,
    disabled: Boolean,
})
</script>


<template>
    <button class="app-button" :name="props.name" :disabled="props.disabled" :type="props.type">
        <slot></slot>
    </button>
</template>


<style scoped>
.app-button {
    cursor: pointer;
    padding: 13px;
    border-radius: var(--corner-radius-10);
    background-color: #A2A1A81A;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>