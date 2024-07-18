<script setup lang="ts">
import { reactive, watch, defineProps, defineEmits } from 'vue'
import AppInput from '@/components/input/AppInput.vue'
import AppSelect from '@/components/select/AppSelect.vue'

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
  <AppInput type="photo" placeholder="UserPhoto" v-model="formData.user_photo" />

  <awc-stack full-width align-items="center" gap="l">
    <awc-stack gap="l" full-width flex-direction="column">
      <AppInput required name="test" type="text" placeholder="Имя" v-model="formData.first_name" />
      <AppInput type="text" placeholder="Телефон" v-model="formData.mobile_number" />
      <AppInput type="date" placeholder="День Рождения" v-model="formData.date_of_birth" />

      <AppSelect
        v-model="formData.gender"
        placeholder="Пол"
        autoselect-off
        :options="['Мужской', 'Женский']"
      />
    </awc-stack>

    <awc-stack gap="l" full-width flex-direction="column">
      <AppInput required type="text" placeholder="Фамилия" v-model="formData.last_name" />
      <AppInput type="email" placeholder="Email" v-model="formData.email" />
      <AppInput type="text" placeholder="Семейное положение" v-model="formData.material_status" />
      <AppInput type="text" placeholder="Национальность" v-model="formData.nationality" />
    </awc-stack>
  </awc-stack>

  <awc-stack align-items="center" justify-content="space-between" full-width>
    <AppSelect
      v-model="formData.city"
      placeholder="Город"
      :options="['City A', 'City B', 'City C']"
    />
  </awc-stack>

  <awc-stack full-width>
    <AppInput type="text" placeholder="Адрес" v-model="formData.address" />
  </awc-stack>
</template>
