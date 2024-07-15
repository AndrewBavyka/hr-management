<template>
    <section class="data-wrapper">
        <slot></slot>
    </section>
</template>

<style scoped>
.data-wrapper {
    padding: 20px;
    border-radius: var(--corner-radius-10);
    border: 1px solid var(--color-gray-20);
}
</style>
