<script setup lang="ts">
import { reactive, ref } from 'vue'
import { type Organization, addOrganization } from '../../../api/organization/organization'
import AppInput from '../../input/AppInput.vue'

const formData = reactive<Organization>({
  city_organization: '',
  office_organization: ''
})

const addNewOrganization = async () => {
  console.dir({ ...formData })

  await addOrganization({
    city_organization: formData.city_organization,
    office_organization: formData.office_organization
  })

  formData.city_organization = ''
  formData.office_organization = ''
}
</script>

<template>
  <form @submit.prevent="addNewOrganization">
    <div class="form__wrapper">
      <awc-stack full-width align-items="center" gap="l">
        <awc-stack gap="l" full-width flex-direction="column">
          <AppInput
            required
            type="text"
            placeholder="Город организации"
            v-model="formData.city_organization"
          />
          <AppInput
            required
            type="email"
            placeholder="Адрес организации"
            v-model="formData.office_organization"
          />
        </awc-stack>
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
