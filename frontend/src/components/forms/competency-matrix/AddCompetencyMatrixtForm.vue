<script lang="ts" setup>
import { ref, onMounted } from 'vue'
// import {
//   fetchDepartments,
//   generateReport,
//   addCompetency,
//   removeCompetency,
//   type Competency
// } from '@/api/competency/competency'

// import DataWrapper from '../../layout/DataWrapper.vue'
</script>

<!-- Форма матрицы компнтенций:
Матрциа компетенций зависит от должности так как нужно как то критерии по каждой должности состать

должность
Заголвок комптеенции
критреии к кажому заголовку

-->

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
