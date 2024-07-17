<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import DataWrapper from '@/layout/DataWrapper.vue'
import AppInput from '@/components/input/AppInput.vue'
import DepartmentsCard from '@/components/card/DepartmentsCard.vue'

interface UserInfo {
  name: string
  designation: string
  profileLink: string
}

interface Department {
  name: string
  countMembers: number
  users: UserInfo[]
}

const loading = ref(true)

// Демо статичные данные
const staticData: Department[] = [
  {
    name: 'Design Department',
    countMembers: 3,
    users: [
      { name: 'Виктор', designation: 'Designer', profileLink: 'https://example.com/viktor' },
      { name: 'Анна', designation: 'Designer', profileLink: 'https://example.com/anna' },
      { name: 'Дмитрий', designation: 'Designer', profileLink: 'https://example.com/dmitry' }
    ]
  },
  {
    name: 'Development Department',
    countMembers: 2,
    users: [
      { name: 'Иван', designation: 'Developer', profileLink: 'https://example.com/ivan' },
      { name: 'Мария', designation: 'Developer', profileLink: 'https://example.com/maria' }
    ]
  }
]

// Запрос на все департмаенты
const demoData = ref<Department[]>([])



onMounted(() => {
  axios
    .get('http://localhost:3000/api/departments/all-departments')
    .then((response) => {
      console.log(response);
      const data = response.data
      demoData.value = data
      loading.value = false
    })
    .catch((error) => {
      console.error(error)
      loading.value = false
    })
})
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
          Add New Department
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
    <awc-stack justify-content="space-between" v-else-if="staticData.length > 0">
      <DepartmentsCard
        v-for="department in staticData"
        :key="department.name"
        :name-department="department.name"
        :count-members="department.countMembers.toString()"
        :users="department.users"
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
