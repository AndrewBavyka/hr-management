<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import DataWrapper from "@/layout/DataWrapper.vue"
import AppInput from "@/components/input/AppInput.vue"
</script>

<template>
    <DataWrapper>
        <template #data-wrapper-search>
            <AppInput type="search" placeholder="Search" />
        </template>
        <template #data-wrapper-add-button>
            <RouterLink to="/employees/new" custom v-slot="{ navigate, href }">
                <awc-button size="large" filling :href="href" @click="navigate">
                    <awc-icon type="icon" size="24" name="add_medium"></awc-icon>
                    Add New Employee
                </awc-button>
            </RouterLink>
        </template>
        <template #data-wrapper-filter>
            <awc-button variant="transparent" background="gray" size="large" filling>
                <awc-icon type="icon" size="24" name="filter"></awc-icon>
                Filter
            </awc-button>
        </template>
    </DataWrapper>
</template>
