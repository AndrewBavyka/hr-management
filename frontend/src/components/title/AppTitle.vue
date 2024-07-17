<script setup lang="ts">
const props = defineProps({
    title: String,
    description: String,
})
</script>


<template>
    <div class="app-head">
        <h6 class="app-head__title">{{ props.title }}</h6>
        <p class="app-head__descripton">{{ props.description }}</p>
    </div>

</template>

<style scoped>
.app-head__title {
    font: var(--font-header-6-bold);
    color: var(--color-dark-500);
}

.app-head__descripton {
    font: var(--font-body-2-regular);
    color: var(--color-gray-500);
}
</style>