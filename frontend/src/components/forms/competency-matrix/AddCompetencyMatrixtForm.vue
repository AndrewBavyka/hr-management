<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import AppInput from '../../input/AppInput.vue'
import AppSelect from "../../select/AppSelect.vue"
import { type Criterion, type Department, type Position, addCompetency, fetchDepartmentsAndPositions } from "@/api/competency/competency"

interface FormData {
  department: string;
  position: string;
  criteria: Criterion[];
}

// Инициализация реактивных данных
const formData = reactive<FormData>({
  department: '',
  position: '',
  criteria: []
});

const newCriterion = reactive<Criterion>({
  name: '',
  descriptions: []
});

const newDescription = ref('');

// Добавление нового описания к критерию
const addDescription = () => {
  if (newDescription.value) {
    newCriterion.descriptions.push(newDescription.value);
    newDescription.value = '';
  }
};

// Добавление нового критерия
const addCriterion = () => {
  if (newCriterion.name && newCriterion.descriptions.length) {
    formData.criteria.push({ ...newCriterion });
    newCriterion.name = '';
    newCriterion.descriptions = [];
  }
};

// Обработка отправки формы
const handleSubmit = async () => {
  await addCompetency({ name: formData.position, criteria: formData.criteria });
};

const departments = ref<Department[]>([]);
const allPositions = ref<{ [key: string]: Position[] }>({});
const filteredPositions = ref<string[]>([]);

onMounted(async () => {
  const departmentsAndPositions = await fetchDepartmentsAndPositions();

  departments.value = departmentsAndPositions.departments.map(dep => dep.department.name);
  allPositions.value = departmentsAndPositions.departments.reduce((acc, dep) => {
    acc[dep.department.name] = dep.positions;
    return acc;
  }, {} as { [key: string]: Position[] });

  console.log(departmentsAndPositions);
});

watch(() => formData.department, (newDepartment) => {
  if (newDepartment && allPositions.value[newDepartment]) {
    filteredPositions.value = allPositions.value[newDepartment].map(pos => pos.name);
  } else {
    filteredPositions.value = [];
  }
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form__wrapper">
      <awc-stack full-width flex-direction="column" gap="l">
        <AppSelect
          v-model="formData.department"
          placeholder="Выбор отдела"
          :options="departments"
        />
        <AppSelect
          v-model="formData.position"
          placeholder="Выбор позиции сотрудника"
          :options="filteredPositions"
        />
      </awc-stack>

      <awc-stack v-if="formData.position" flex-direction="column" full-width gap="l">
        <AppInput
          v-model="newCriterion.name"
          placeholder="Название компетенции"
        />
        <awc-textarea
        style="width: 100%;"
          v-model="newDescription"
          placeholder="Критерии компетенций"
        />
        
        <awc-stack full-width>
        <awc-button @click="addDescription" type="button" size="large">
          Добавить компетенцию
        </awc-button>
        <awc-button  @click="addCriterion" type="button" size="large">
          Создать новое поле
        </awc-button>
        </awc-stack>
      </awc-stack>

      <div v-if="formData.criteria.length">
        <awc-stack full-width align-items="center" gap="l">
          <h3>Критерии:</h3>
        </awc-stack>
        <awc-stack full-width flex-direction="column" gap="l">
          <div v-for="(criterion, index) in formData.criteria" :key="index">
            <h4>{{ criterion.name }}</h4>
            <ul>
              <li v-for="(description, dIndex) in criterion.descriptions" :key="dIndex">{{ description }}</li>
            </ul>
          </div>
        </awc-stack>
      </div>

      <awc-stack justify-content="end">
        <awc-button
          @click="$router.back()"
          type="reset"
          size="large"
          variant="transparent"
          background="gray"
        >
          Отмена
        </awc-button>
        <awc-button size="large" type="submit">
          Создать
        </awc-button>
      </awc-stack>
    </div>
  </form>
</template>

<style scoped>
.form__wrapper {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
