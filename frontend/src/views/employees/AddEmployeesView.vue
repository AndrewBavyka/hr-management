<script lang="ts" setup>
import { ref } from 'vue'
import DataWrapper from '../../layout/DataWrapper.vue'
import AppTabs from '../../components/tabs/AppTabs.vue'
import PersonalInfoForm from '../../components/forms/employee/PersonalInfoForm.vue'
import ProffessionalInfoForm from '../../components/forms/employee/ProffessionalInfoForm.vue'
import AccountAccessForm from '../../components/forms/employee/AccountAccessForm.vue'

const tabs = [
  { name: 'personal-info', label: 'Personal Information' },
  { name: 'professional-info', label: 'Proffessional Information' },
  { name: 'account-access', label: 'Account Access' }
]

const selectedTab = ref(tabs[0].name)

const changeTab = (tabName: string) => {
  selectedTab.value = tabName
}
</script>

<template>
  <DataWrapper>
    <AppTabs :names="tabs" :selectedTab="selectedTab" @changeTab="changeTab">
      <PersonalInfoForm v-if="selectedTab === 'personal-info'" />
      <ProffessionalInfoForm v-if="selectedTab === 'professional-info'" />
      <AccountAccessForm v-if="selectedTab === 'account-access'" />
    </AppTabs>
  </DataWrapper>
</template>
