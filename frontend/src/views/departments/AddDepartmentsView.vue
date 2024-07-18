<script lang="ts" setup>
import DataWrapper from '../../layout/DataWrapper.vue'
import AddDepartmentForm from '../../components/forms/deparment/AddDepartmentForm.vue'
</script>

<template>
  <DataWrapper>
    <AddDepartmentForm />

    <template #data-wrapper-button>
      <awc-button
        @click="$router.back()"
        type="reset"
        size="large"
        variant="transparent"
        background="gray"
        >Отмена</awc-button
      >
      <awc-button size="large" type="submit">Создать</awc-button>
    </template>
  </DataWrapper>
</template>
