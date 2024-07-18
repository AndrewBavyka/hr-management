<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  fetchDepartmentsAndPositions,
  addEmployee,
  type EmployeePersonalInfo,
  type EmployeeProffessionalInfo,
  type EmployeeAccountAccess
} from '../../api/employee/employee'

import { type Department } from '../../api/departments/departments'
import DataWrapper from '@/layout/DataWrapper.vue'
import AppTabs from '../../components/tabs/AppTabs.vue'
import PersonalInfoForm from '../../components/forms/employee/PersonalInfoForm.vue'
import ProffessionalInfoForm from '../../components/forms/employee/ProffessionalInfoForm.vue'
import AccountAccessForm from '../../components/forms/employee/AccountAccessForm.vue'

const tabs = [
  { name: 'personal-info', label: 'Личная информация' },
  { name: 'professional-info', label: 'Профессиональная информация' },
  { name: 'account-access', label: 'Аккаунты в платформах' }
]

const selectedTab = ref(tabs[0].name)

const personalInfoData = ref<EmployeePersonalInfo>({
  user_photo: '',
  first_name: '',
  last_name: '',
  email: '',
  date_of_birth: '',
  material_status: '',
  mobile_number: '',
  gender: '',
  nationality: '',
  city: '',
  address: ''
})

const professionalInfoData = ref<EmployeeProffessionalInfo>({
  employee_type: '',
  working_days: [],
  grade: '',
  work_mail: '',
  office_location: '',
  joing_date: '',
  department: "", 
  position: "", 
})

const accountAccessData = ref<EmployeeAccountAccess>({
  slack_link: '',
  telegram_link: '',
  github_link: ''
})

const departments = ref<Department[]>([])
const positions = ref<string[]>([]) 

const changeTab = (tabName: string) => {
  selectedTab.value = tabName
}

onMounted(async () => {
  const departmentsAndPositions = await fetchDepartmentsAndPositions()

  departments.value = departmentsAndPositions.departments.map(dep => dep.department.name)
  positions.value = departmentsAndPositions.departments.flatMap(dep => dep.positions.map(pos => pos.name))


  professionalInfoData.value.departments = departments.value
  professionalInfoData.value.positions = positions.value
})


const submitFormData = async () => {
  const employeeData = {
    ...personalInfoData.value,
    ...professionalInfoData.value,
    ...accountAccessData.value
  }

  const { departments, positions, ...cleanedEmployeeData } = employeeData

await addEmployee(cleanedEmployeeData)

}

const handleNext = () => {
  const currentIndex = tabs.findIndex((tab) => tab.name === selectedTab.value)

  if (currentIndex < tabs.length - 1) {
    selectedTab.value = tabs[currentIndex + 1].name
  } 
}
</script>

<template>
  <DataWrapper>
    <AppTabs :names="tabs" :selectedTab="selectedTab" @changeTab="changeTab">
      <form class="form__wrapper" @submit.prevent="submitFormData">
        <PersonalInfoForm v-if="selectedTab === 'personal-info'" v-model="personalInfoData" />
        <ProffessionalInfoForm
          v-if="selectedTab === 'professional-info'"
          v-model="professionalInfoData"
        />
        <AccountAccessForm v-if="selectedTab === 'account-access'" v-model="accountAccessData" />

        <awc-stack justify-content="end">
          <awc-button
            @click="$router.back()"
            type="reset"
            size="large"
            variant="transparent"
            background="gray"
            >Отмена</awc-button
          >
          <awc-button
            @click="handleNext"
            size="large"
            :type="selectedTab === 'account-access' ? 'submit' : 'button'"
          >
            {{ selectedTab === 'account-access' ? 'Добавить сотрудника' : 'Далее' }}
          </awc-button>
        </awc-stack>
      </form>
    </AppTabs>
  </DataWrapper>
</template>

<style scoped>
.form__wrapper {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
