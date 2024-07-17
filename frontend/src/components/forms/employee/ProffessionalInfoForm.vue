<script setup lang="ts">
import { reactive } from 'vue'
import axios from 'axios'
import AppInput from '@/components/input/AppInput.vue'
import AppSelect from '@/components/select/AppSelect.vue'

interface FormData {
  employeeId: string
  employeeType: string
  department: string
  workingDays: string
  dateOfBirth: string
  userName: string
  email: string
  designation: string
  officeLocation: string
  joingDate: string
}

const formData = reactive<FormData>({
  employeeId: '',
  employeeType: '',
  department: '',
  workingDays: '',
  dateOfBirth: '',
  userName: '',
  email: '',
  designation: '',
  joingDate: '',
  officeLocation: ''
})

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleSubmit = () => {
  if (!isValidEmail(formData.email)) {
    alert('Please enter a valid email address')
    return
  }

  console.log(formData)

  axios
    .post('/api/employee/professional-info', formData)
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
      <awc-stack full-width gap="l">
        <awc-stack gap="l" full-width flex-direction="column">
          <AppInput
            name="test"
            type="text"
            placeholder="Employee ID"
            v-model="formData.employeeId"
          />
          <AppSelect
            v-model="formData.employeeType"
            placeholder="Select Employee Type"
            autoselect-off
            :options="['Male', 'Female', 'Other']"
          />
          <AppSelect
            v-model="formData.department"
            placeholder="Select Department"
            autoselect-off
            :options="['Male', 'Female', 'Other']"
          />
          <AppSelect
            v-model="formData.workingDays"
            placeholder="Select Working Days"
            autoselect-off
            :options="['Male', 'Female', 'Other']"
          />
        </awc-stack>

        <awc-stack gap="l" full-width flex-direction="column">
          <AppInput
            name="lastName"
            type="text"
            placeholder="User Name"
            v-model="formData.userName"
          />
          <AppInput type="email" placeholder="Email Address" v-model="formData.email" />
          <AppInput type="text" placeholder="Enter Designation" v-model="formData.designation" />
          <AppInput type="date" placeholder="Select Joining Date" v-model="formData.joingDate" />
        </awc-stack>
      </awc-stack>
      <awc-stack full-width>
        <AppSelect
          v-model="formData.officeLocation"
          placeholder="Select Office Location"
          autoselect-off
          :options="['Male', 'Female', 'Other']"
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
