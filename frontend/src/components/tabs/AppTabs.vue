<script lang="ts" setup>

interface Tab {
    name: string;
    label: string;
}

const props = defineProps<{
    names: Tab[],
    selectedTab?: string
}>();

const emit = defineEmits(['changeTab']);

const clickOnTab = (tabName: string) => {
    emit('changeTab', tabName);
}
</script>

<template>
    <awc-tabs-group>
        <awc-tab v-for="tab in props.names" :key="tab.name" :active="tab.name === props.selectedTab"
            @click="clickOnTab(tab.name)">
            {{ tab.label }}
        </awc-tab>
    </awc-tabs-group>

    <div class="tab-content">
        <slot />
    </div>
</template>

<style scoped>
.tab-content {
    padding: 20px;
    border-radius: 7px;
    background: #fff;
}
</style>
