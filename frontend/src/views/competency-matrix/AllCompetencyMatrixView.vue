<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { fetchCompetencies } from '@/api/competency/competency'
import { Chart, registerables } from 'chart.js'
import DataWrapper from '../../layout/DataWrapper.vue'

// Регистрация необходимых компонентов Chart.js
Chart.register(...registerables)

const dataCompitencies = ref<any>(null)
const chartInstance = ref<Chart | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

// Преобразование данных для Radar Chart
const transformData = (data: any) => {
  const labels = data.map((item: any) => item.name); // Используйте имена для меток
  const descriptionsCount = data.map((item: any) => item.criteria.reduce((count: number, criterion: any) => count + criterion.descriptions.length, 0));

  return {
    labels,
    datasets: [
      {
        label: 'Criteria Count',
        data: descriptionsCount,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  }
}

// Инициализация графика
const initChart = () => {
  if (canvasRef.value && dataCompitencies.value) {
    if (chartInstance.value) {
      chartInstance.value.destroy() 
    }

    const data = transformData(dataCompitencies.value);

    chartInstance.value = new Chart(canvasRef.value, {
      type: 'radar', // Тип графика: Radar
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: Math.max(...data.datasets[0].data) + 1, // Максимальное значение на оси
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    })
  }
}

// Функция для получения данных
const fetchAllCompitencies = async () => {
  dataCompitencies.value = await fetchCompetencies();
}

// Обновление графика при изменении данных
watch(dataCompitencies, () => {
  initChart()
}, { immediate: true })

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

    <canvas ref="canvasRef" id="acquisitions"></canvas>
    <pre>{{ dataCompitencies }}</pre>
  </DataWrapper>
</template>

<style scoped>
/* Стили для canvas, если нужно */
#acquisitions {
  width: 100%;
  height: 400px;
}
</style>
