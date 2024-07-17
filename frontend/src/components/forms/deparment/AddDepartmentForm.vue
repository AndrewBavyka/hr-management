<script setup lang="ts">
import { reactive } from 'vue'
import axios from 'axios'
import AppInput from '@/components/input/AppInput.vue'

interface FormData {
  nameDepartment: string
}

const formData = reactive<FormData>({
  nameDepartment: ''
})

const handleSubmit = () => {
  console.log(formData)

  axios
    .post('/api/departments/new-department', formData)
    .then((response) => {
      console.log('Response:', response.data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form__wrapper">
      <awc-stack full-width align-items="center" gap="l">
        <AppInput
          name="test"
          type="text"
          placeholder="Enter Department Name"
          v-model="formData.nameDepartment"
        />
      </awc-stack>

      <awc-stack justify-content="end">
        <awc-button
          @click="$router.back()"
          type="reset"
          size="large"
          variant="transparent"
          background="gray"
          >Cancel</awc-button
        >
        <awc-button size="large" type="submit">Next</awc-button>
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
