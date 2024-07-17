<script setup lang="ts">
import { reactive } from 'vue'
import axios from 'axios'
import AppInput from '@/components/input/AppInput.vue'
import AppSelect from '@/components/select/AppSelect.vue'

interface FormData {
  userPhoto: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  materialStatus: string
  mobileNumber: string
  gender: string
  nationality: string
  address: string
  city: string
  state: string
  zipCode: string
}

const formData = reactive<FormData>({
  userPhoto: '',
  firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: '',
  materialStatus: '',
  mobileNumber: '',
  gender: '',
  nationality: '',
  address: '',
  city: '',
  state: '',
  zipCode: ''
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
    .post('/api/employee/personal-info', formData)
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
    <AppInput type="photo" placeholder="UserPhoto" v-model="formData.userPhoto" />

    <div class="form__wrapper">
      <awc-stack full-width align-items="center" gap="l">
        <awc-stack gap="l" full-width flex-direction="column">
          <AppInput name="test" type="text" placeholder="First Name" v-model="formData.firstName" />
          <AppInput type="text" placeholder="Mobile Number" v-model="formData.mobileNumber" />
          <AppInput type="date" placeholder="Date of Birth" v-model="formData.dateOfBirth" />

          <AppSelect
            v-model="formData.gender"
            placeholder="Gender"
            autoselect-off
            :options="['Male', 'Female', 'Other']"
          />
        </awc-stack>

        <awc-stack gap="l" full-width flex-direction="column">
          <AppInput
            name="lastName"
            type="text"
            placeholder="Last Name"
            v-model="formData.lastName"
          />
          <AppInput type="email" placeholder="Email Address" v-model="formData.email" />
          <AppInput type="text" placeholder="Material Status" v-model="formData.materialStatus" />
          <AppInput type="text" placeholder="Nationality" v-model="formData.nationality" />
        </awc-stack>
      </awc-stack>
      <awc-stack full-width>
        <AppInput type="text" placeholder="Address" v-model="formData.address" />
      </awc-stack>

      <awc-stack align-items="center" justify-content="space-between" full-width>
        <AppSelect
          v-model="formData.city"
          placeholder="City"
          :options="['City A', 'City B', 'City C']"
        />
        <AppSelect
          v-model="formData.state"
          placeholder="State"
          :options="['State X', 'State Y', 'State Z']"
        />
        <AppSelect
          v-model="formData.zipCode"
          placeholder="ZIP Code"
          :options="['Zip 123', 'Zip 456', 'Zip 789']"
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
