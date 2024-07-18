<script setup lang="ts">
import { reactive } from 'vue'
import {
  addDepartmentsWithPositions,
  type NewDepartment,
  type NewPosition
} from '@/api/departments/departments'
import AppInput from '../../input/AppInput.vue'

const departmentData = reactive<NewDepartment>({
  name: ''
})

const positionsData = reactive<NewPosition[]>([
  {  name: ''}
])

const handleSubmit = async () => {
  const createdDepartment = await addDepartmentsWithPositions(departmentData, positionsData)

  departmentData.name = ''
  positionsData.splice(0, positionsData.length, { name: '' })
}

const addPositionField = () => {
  positionsData.push({ name: '' })
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
          v-model="departmentData.name"
        />
      </awc-stack>

      <div v-for="(position, index) in positionsData" :key="index">
        <awc-stack full-width align-items="center" gap="l">
          <AppInput name="position" type="text" placeholder="Должность" v-model="position.name" />
        </awc-stack>
      </div>

      <awc-button @click="addPositionField" type="button">Добавить должность</awc-button>

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
