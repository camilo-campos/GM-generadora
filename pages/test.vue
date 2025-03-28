<template>
  <div class="text-center pt-20">
    <h1>test</h1>
    <div class="items-center justify-center w-[700px] h-[700px]">
      <!-- Contenedor donde se renderizará el gráfico -->
      <canvas id="lineChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const myChart = ref(null);
const labels = ref(["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"]);
const datasets = ref([
  {
    label: "Ventas A",
    data: [10, 20, 15, 30, 25, 50],
    borderColor: "rgb(75, 192, 192)",
    tension: 0.1,
  },
  {
    label: "Ventas B",
    data: [15, 2, 30, 15, 20, 40],
    borderColor: "rgba(255, 99, 132, 0.8)",
    tension: 0.1,
  },
  {
    label: "Ventas C",
    data: [12, 22, 17, 33, 30, 10],
    borderColor: "rgba(54, 162, 235, 0.8)",
    tension: 0.1,
  },
]);

const chartData_2 = ref({
  labels: labels.value,
  datasets: datasets.value,
});

const chartOptions_2 = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Gráfico de Ventas" },
  },
};

// ✅ Crear gráfico sin recursión infinita
const createChart = (chartData) => {
  const canvas = document.getElementById("lineChart");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      myChart.value = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: chartOptions_2,
      });
    }
  }
};

// ✅ Método corregido para actualizar el gráfico
function updateChart(newLabel, newData) {
  console.log("antes de agregar los nuevos valores", labels.value);
  console.log("antes de agregar los nuevos valores", datasets.value);
  labels.value = [...labels.value, newLabel]; // Crear un nuevo array con la nueva etiqueta

  datasets.value = datasets.value.map((dataset, index) => ({
    ...dataset,
    data: [...dataset.data, newData[index]], // Crear un nuevo array de datos
  }));

  console.log(labels.value);
  console.log(datasets.value);
  console.log("mi chart antes de eliminar : ", myChart.value);

  myChart.value.destroy();

  createChart({
    labels: labels.value,
    datasets: datasets.value,
  });
  console.log("mi chart despues de eliminar : ", myChart.value);
}

// ✅ Método corregido para agregar valores sin actualizar el gráfico
function addNewValue(newLabel, newData) {
  if (newLabel.length === 0) {
    console.error("Error: No hay etiqueta válida.");
    return;
  }

  labels.value = [...labels.value, newLabel];

  datasets.value = datasets.value.map((dataset, index) => ({
    ...dataset,
    data: [...dataset.data, newData[index]],
  }));
}

// Simulación de datos en tiempo real (5 segundos después)
const ejecutarDespuesDeTiempo = () => {
  updateChart("Julio", [20, 25, 18]);
};

// Limpiar gráfico antes de desmontar
onBeforeUnmount(() => {
  if (myChart.value) {
    myChart.value.destroy();
  }
});

onMounted(() => {
  createChart({
    labels: labels.value,
    datasets: datasets.value,
  });
  setTimeout(() => {
    updateChart("Julio", [20, 25, 18]);
  }, 5000);
  setTimeout(() => {
    updateChart("Agosto", [50, 2, 35]);
  }, 8000);
  setTimeout(() => {
    updateChart("Septiembre", [23, 35, 8]);
  }, 11000);
});
</script>

<style scoped></style>
