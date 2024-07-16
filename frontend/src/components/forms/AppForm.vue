<!-- <script setup lang="ts">
import { defineEmits, reactive, provide } from 'vue';
import axios from 'axios';

const emit = defineEmits(['submit']);
const formData = reactive<{ [key: string]: any }>({});

const updateFormData = (fieldName: string, value: any) => {
  formData[fieldName] = value;
};

provide('updateFormData', updateFormData);

const handleSubmit = () => {
  axios.post('/api/submit', formData)
    .then(response => {
      emit('submit', response.data);
    })
    .catch(error => {
      emit('error', error);
    });
};

</script>

<template>
    <form @submit.prevent="handleSubmit">
        <slot></slot>
    </form>
</template> -->