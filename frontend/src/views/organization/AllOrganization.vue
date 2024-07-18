<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import DataWrapper from '../../layout/DataWrapper.vue'
import AppInput from '../../components/input/AppInput.vue'
import { fetchAllOrganization } from '@/api/organization/organization'

const organizations = ref<string[]>([])

const getAllOrganization = async () => {
  organizations.value = await fetchAllOrganization()
}

onMounted(() => getAllOrganization())
</script>

<template>
  <DataWrapper>
    <template #data-wrapper-search>
      <AppInput type="search" placeholder="Поиск организации" />
    </template>
    <template #data-wrapper-add-button>
      <RouterLink to="/organization/new" custom v-slot="{ navigate, href }">
        <awc-button size="large" filling :href="href" @click="navigate">
          <awc-icon type="icon" size="24" name="add_medium"></awc-icon>
          Добавить организацию
        </awc-button>
      </RouterLink>
    </template>

    <p v-if="organizations.length <= 0">Данные организаций отсутвуют</p>

    <p v-else>
      {{ organizations }}
    </p>
  </DataWrapper>
</template>
