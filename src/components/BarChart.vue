<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  labelField: {
    type: String,
    required: true,
  },
  valueField: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "График",
  },
});

const chartCanvas = ref(null);
let chartInstance = null;

const createChart = () => {
  if (!chartCanvas.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const labels = [...new Set(props.data.map((item) => item[props.labelField]))];
  const datasets = [
    {
      label: props.title,
      data: labels.map((label) => {
        const items = props.data.filter(
          (item) => item[props.labelField] === label
        );
        return items.reduce(
          (sum, item) => sum + (Number(item[props.valueField]) || 0),
          0
        );
      }),
      backgroundColor: [
        "#42b883",
        "#3498db",
        "#e74c3c",
        "#f39c12",
        "#9b59b6",
        "#1abc9c",
        "#d35400",
        "#c0392b",
        "#16a085",
        "#8e44ad",
      ],
      borderColor: "#2c3e50",
      borderWidth: 1,
    },
  ];

  chartInstance = new Chart(chartCanvas.value, {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets,
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: props.title,
        },
      },
    },
  });
};

watch(
  () => props.data,
  () => {
    createChart();
  }
);

onMounted(() => {
  createChart();
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<style scoped>
.chart-container {
  max-height: 550px;
  width: 100%;
  margin: 20px 0;
}
</style>
