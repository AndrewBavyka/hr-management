<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {fetchCompetencies} from '@/api/competency/competency'

import DataWrapper from '../../layout/DataWrapper.vue'


const dataCompitencies = ref();

const fetchAllCompitencies = async () => {
  dataCompitencies.value = await fetchCompetencies()
}

onMounted(fetchAllCompitencies)

</script>

<template>
  <DataWrapper>
    <template #data-wrapper-add-button>
      <RouterLink to="/competency/new" custom v-slot="{ navigate, href }">
        <awc-button size="large" filling :href="href" @click="navigate">
          <awc-icon type="icon" size="24" name="add_medium"></awc-icon>
          Добавить матрицу компетенций
        </awc-button>
      </RouterLink>
    </template>

    <pre>{{ dataCompitencies }}</pre>
  </DataWrapper>
</template>
