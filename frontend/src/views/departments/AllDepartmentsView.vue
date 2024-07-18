<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { fetchDepartments, type AllDepartments } from '@/api/departments/departments'
import DataWrapper from '@/layout/DataWrapper.vue'
import AppInput from '@/components/input/AppInput.vue'
import DepartmentsCard from '@/components/card/DepartmentsCard.vue'

const departments = ref<AllDepartments[]>([])

const loading = ref(true)

const fetchAllDepartments = async () => {
  departments.value = await fetchDepartments()
  loading.value = false
}

onMounted(fetchAllDepartments)
</script>

<template>
  <DataWrapper>
    <template #data-wrapper-search>
      <AppInput type="search" placeholder="Search" />
    </template>

    <template #data-wrapper-add-button>
      <RouterLink to="/departments/new" custom v-slot="{ navigate, href }">
        <awc-button size="large" filling :href="href" @click="navigate">
          <awc-icon type="icon" size="24" name="add_medium"></awc-icon>
          Добавить отдел
        </awc-button>
      </RouterLink>
    </template>

    <div v-if="loading">
      <awc-stack flex-direction="column" gap="s">
        <awc-stack full-width align-items="center" justify-content="space-between">
          <awc-skeleton rounded="8"></awc-skeleton>
        </awc-stack>
        <awc-stack full-witdh align-items="center" justify-content="space-between">
          <awc-skeleton rounded="8"></awc-skeleton>
        </awc-stack>
      </awc-stack>
    </div>
    <awc-stack justify-content="space-between" v-else-if="departments.length > 0">
      <DepartmentsCard
        v-for="department in departments"
        :key="department.name_department"
        :name-department="department.name_department"
        :count-members="department.countMembers?.toString() || '0'"
        :users="department.employees"
      />
    </awc-stack>
    <div v-else>Нет данных для отображения.</div>
  </DataWrapper>
</template>

<style>
awc-skeleton {
  height: 400px;
  width: 100%;
}
</style>
