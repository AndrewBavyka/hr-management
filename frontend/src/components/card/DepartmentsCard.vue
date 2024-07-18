<script setup lang="ts">
import { type PropType } from 'vue'
import AppTitle from '../title/AppTitle.vue'
import AppUserInfo from '../user-info/AppUserInfo.vue'
import { type EmployeesInfo } from '@/api/departments/departments'

const props = defineProps({
  nameDepartment: {
    type: String,
    required: true
  },
  countMembers: {
    type: String
  },
  users: {
    type: Array as PropType<EmployeesInfo[]>
  }
})
</script>

<template>
  <div class="departments-card">
    <div class="departments-card__head">
      <AppTitle :title="props.nameDepartment" :description="props.countMembers + ' Members'" />
      <awc-empty-state-link> View All </awc-empty-state-link>
    </div>
    <awc-divider></awc-divider>
    <div class="departments-card__main">
      <AppUserInfo
        v-for="user in props.users"
        :key="user.id"
        :name="`${user.first_name} ${user.last_name}`"
        :description="user.position"
      />
    </div>
  </div>
</template>

<style scoped>
.departments-card {
  width: 100%;
  min-height: 400px;
  padding: 20px;
  border: 1px solid var(--color-gray-20);
  border-radius: var(--corner-radius-10);
}

.departments-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.departments-card__main {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
