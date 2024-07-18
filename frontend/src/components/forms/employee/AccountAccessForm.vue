<script setup lang="ts">
import { reactive, watch, defineProps, defineEmits } from 'vue'
import AppInput from '@/components/input/AppInput.vue'

const props = defineProps({
  modelValue: Object
})

const emits = defineEmits(['update:modelValue'])

const formData = reactive({ ...props.modelValue })

watch(
  formData,
  (newVal) => {
    emits('update:modelValue', newVal)
  },
  { deep: true }
)
</script>

<template>
  <awc-stack full-width align-items="center" gap="l">
    <awc-stack gap="l" full-width flex-direction="column">
      <AppInput type="text" placeholder="Ссылка на Telegram" v-model="formData.telegram_link" />
      <AppInput type="text" placeholder="Ссылка на Slack" v-model="formData.slack_link" />
      <AppInput type="text" placeholder="Ссылка на GitHub" v-model="formData.github_link" />
    </awc-stack>
  </awc-stack>
</template>
