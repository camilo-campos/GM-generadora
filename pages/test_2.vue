<template>
  <div class="text-center pt-20">
    <h1>Detección de Anomalías</h1>
    <div class="items-center justify-center w-[700px] h-[700px]">
      <!-- Contenedor donde se renderizará el gráfico -->
      <div>
        <canvas id="anomalyChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";

// Registra todos los componentes de Chart.js
Chart.register(...registerables);

const anomalyScores = ref([
  0.5, 0.2, 0.8, 0.1, 0.9, 0.3, 0.4, 0.7, 0.8, 0.5, 0.2, 0.8, 0.1, 0.9, 0.3,
  0.4, 0.7, 0.8,
]);

const labels = ref([
  "21:02",
  "21:03",
  "21:04",
  "21:05",
  "21:06",
  "21:07",
  "21:08",
  "21:09",
  "21:10",
  "21:11",
  "21:12",
  "21:13",
  "21:14",
  "21:15",
  "21:16",
  "21:17",
  "21:18",
  "21:19",
]);

// Datasets con colores dinámicos
const datasets = ref([
  {
    label: "Medición del Sensor",
    data: anomalyScores.value,
    borderColor: "rgba(75, 192, 192, 1)",
    backgroundColor: "rgba(75, 192, 192, 0.2)",
    borderWidth: 2,
    pointRadius: 6,
    pointBackgroundColor: anomalyScores.value.map((val) =>
      val >= 0.3 && val <= 0.7 ? "green" : "red"
    ),
    tension: 0.3,
  },
]);

const myChart = ref(null);

// Función para crear el gráfico
const createChart = (chartData) => {
  const canvas = document.getElementById("anomalyChart");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      myChart.value = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: {
                generateLabels: (chart) => [
                  { text: "Normal (0.3 - 0.7)", fillStyle: "green" },
                  { text: "Anomalía (<0.3 o >0.7)", fillStyle: "red" },
                ],
              },
            },
            title: { display: true, text: "Detección de Anomalías" },
          },
        },
      });
    }
  }
};

// Función para actualizar el gráfico con nuevos datos
function updateChart(newLabel, newData) {
  labels.value = [...labels.value, newLabel];
  datasets.value = datasets.value.map((dataset) => ({
    ...dataset,
    data: [...dataset.data, ...newData],
    pointBackgroundColor: [
      ...dataset.pointBackgroundColor,
      ...newData.map((val) => (val >= 0.3 && val <= 0.7 ? "green" : "red")),
    ],
  }));

  // Destruir el gráfico existente y esperar un tick antes de recrearlo
  if (myChart.value) {
    myChart.value.destroy();
    myChart.value = null;
  }
  setTimeout(() => {
    createChart({
      labels: labels.value,
      datasets: datasets.value,
    });
  }, 50); // 50ms de retraso para evitar condiciones de carrera
}

onMounted(() => {
  // Crear el gráfico inicial
  createChart({
    labels: labels.value,
    datasets: datasets.value,
  });

  // Simulación de actualización de datos cada ciertos segundos
  setTimeout(() => updateChart("21:20", [0.3]), 5000);
  setTimeout(() => updateChart("21:21", [0.6]), 8000);
  setTimeout(() => updateChart("21:22", [0.1]), 11000);
  setTimeout(() => updateChart("21:23", [0.7]), 13000);
  setTimeout(() => updateChart("21:24", [0.7]), 16000);
  setTimeout(() => updateChart("21:25", [0.9]), 19000);
});
</script>
