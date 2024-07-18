<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  fetchDepartments,
  generateReport,
  addCompetency,
  removeCompetency,
  type Competency
} from '@/api/competency/competency'

import DataWrapper from '../../layout/DataWrapper.vue'
</script>

<!-- Форма матрицы компнтенций:
Матрциа компетенций зависит от должности так как нужно как то критерии по каждой должности состать

должность
Заголвок комптеенции
критреии к кажому заголовку

-->

<template>
  <DataWrapper> </DataWrapper>
</template>
