<script setup lang="ts">
import { reactive, watch, defineProps, defineEmits } from 'vue'
import AppInput from '@/components/input/AppInput.vue'
import AppSelect from '@/components/select/AppSelect.vue'

const props = defineProps({
  modelValue: Object
})

const emits = defineEmits(['update:modelValue'])

const formData = reactive({ ...props.modelValue })

console.log(formData)
watch(
  formData,
  (newVal) => {
    emits('update:modelValue', newVal)
  },
  { deep: true }
)
</script>

<template>
  <awc-stack full-width gap="l">
    <awc-stack gap="l" full-width flex-direction="column">
      <AppSelect
        v-model="formData.department"
        placeholder="Выберите отдел"
        autoselect-off
        :options="formData.departments"
      />
      <AppSelect
        v-model="formData.position"
        placeholder="Выберите должность"
        autoselect-off
        :options="formData.positions"
      />
      <AppInput
        static-error
        required
        readonly
        custom-error="Обновляется автоматически*"
        type="text"
        placeholder="Оценка"
        v-model="formData.grade"
      />
    </awc-stack>

    <awc-stack gap="l" full-width flex-direction="column">
      <AppSelect
        v-model="formData.employee_type"
        placeholder="Выберите статус занятости  "
        autoselect-off
        :options="['Работник', 'Стажер', 'Студент']"
      />
      <AppInput type="email" placeholder="Рабочий email" v-model="formData.work_mail" />
      <AppInput type="date" placeholder="Дата принятия на работу " v-model="formData.joing_date" />
      <AppSelect
        v-model="formData.working_days"
        placeholder="Выбор рабочих дней"
        multiple
        autoselect-off
        :options="[
          'Понедельник',
          'Вторник',
          'Среда',
          'Четверг',
          'Пятница',
          'Суббота',
          'Воскресенье'
        ]"
      />
    </awc-stack>
  </awc-stack>
  <awc-stack full-width>
    <AppSelect
      v-model="formData.office_location"
      placeholder="Расположение офиса"
      autoselect-off
      :options="['Moscow', 'Chelyabinsk', 'Other']"
    />
  </awc-stack>
</template>
