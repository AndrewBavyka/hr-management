<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { type Employee, fetchEmployeeData } from '@/api/employee/employee'

import DataWrapper from '@/layout/DataWrapper.vue'
import AppInput from '@/components/input/AppInput.vue'

const employee = ref<Employee | null>(null)

const fetchAllDepartments = async () => {
  employee.value = await fetchEmployeeData()
}

onMounted(fetchAllDepartments)
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
          Добавить сотрудника
        </awc-button>
      </RouterLink>
    </template>
    <template #data-wrapper-filter>
      <awc-button variant="transparent" background="gray" size="large" filling>
        <awc-icon type="icon" size="24" name="filter"></awc-icon>
        Filter
      </awc-button>
    </template>

    <awc-stack justify-content="space-between">
      <pre>
        {{ employee }}
    </pre
      >
    </awc-stack>
  </DataWrapper>
</template>
