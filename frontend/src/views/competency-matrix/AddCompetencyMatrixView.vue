<script lang="ts" setup>
import DataWrapper from '../../layout/DataWrapper.vue'
import AddCompetencyMatrixtForm from '../../components/forms/competency-matrix/AddCompetencyMatrixtForm.vue'

</script>

<template>
  <DataWrapper>
    <AddCompetencyMatrixtForm />

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
