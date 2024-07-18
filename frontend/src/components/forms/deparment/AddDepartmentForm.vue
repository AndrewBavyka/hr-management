<script setup lang="ts">
import { reactive } from 'vue'
import {
  addDepartments,
  addPosition,
  type NewDepartment,
  type NewPosition
} from '@/api/departments/departments'
import AppInput from '../../input/AppInput.vue'

const departmentData = reactive<NewDepartment>({
  name_department: ''
})

const positionData = reactive<NewPosition>({
  name: '',
  department_id: 0
})

const handleSubmit = async () => {
  console.log({ ...departmentData })
  console.log({ ...positionData })

  const createdDepartment = await addDepartments({
    name_department: departmentData.name_department
  })

  positionData.department_id = createdDepartment.id

  await addPosition({ name: positionData.name, department_id: positionData.department_id })

  departmentData.name_department = ''
  positionData.name = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form__wrapper">
      <awc-stack full-width align-items="center" gap="l">
        <AppInput
          name="department"
          type="text"
          placeholder="Название отдела"
          v-model="departmentData.name_department"
        />
      </awc-stack>

      <awc-stack full-width align-items="center" gap="l">
        <AppInput name="position" type="text" placeholder="Должность" v-model="positionData.name" />
      </awc-stack>

      <awc-stack justify-content="end">
        <awc-button
          @click="$router.back()"
          type="reset"
          size="large"
          variant="transparent"
          background="gray"
          >Отмена</awc-button
        >
        <awc-button size="large" type="submit">Создать</awc-button>
      </awc-stack>
    </div>
  </form>
</template>

<style scoped>
.form__wrapper {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
