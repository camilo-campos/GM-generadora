<template>
  <div class="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6 mb-10">
    <!-- Bitacoras Totales Chart -->
    <div class="rounded-lg shadow p-4 sm:p-6 bg-white">
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <h3 class="text-base sm:text-lg font-medium text-[#2E4053]">
          Bitacoras Totales
        </h3>
      </div>

      <div class="flex flex-col md:flex-row items-center">
        <div class="w-full md:w-3/5 h-48 sm:h-60">
          <canvas ref="clasificacionCanvas"></canvas>
        </div>
        <div class="w-full md:w-2/5 mt-4 md:mt-0 md:pl-4">
          <h4 class="text-sm font-semibold mb-3 text-gray-700">
            Resumen de Clasificaciones
          </h4>
          <div class="space-y-3">
            <div
              v-for="(item, index) in bomba1Stats"
              :key="index"
              class="flex items-center justify-between p-2 rounded-md"
              :style="{ backgroundColor: item.bgColor + '20' }"
            >
              <div class="flex items-center">
                <div
                  class="w-3 h-3 rounded-full mr-2"
                  :style="{ backgroundColor: item.bgColor }"
                ></div>
                <span class="text-sm font-medium">{{ item.label }}</span>
              </div>
              <span class="text-sm font-bold">{{ item.value }}</span>
            </div>
          </div>
          <div class="mt-4 text-xs text-gray-500">
            <p>Total de registros: {{ totalRegistros }}</p>
            <p class="mt-1">Última actualización: {{ formattedDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6 mb-10">
    <!-- Bitacoras de Error Chart -->
    <div class="rounded-lg shadow p-4 sm:p-6 bg-white">
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <h3 class="text-base sm:text-lg font-medium text-[#2E4053]">
          Bitacoras de Error
        </h3>
      </div>

      <div class="flex flex-col md:flex-row items-center">
        <div class="w-full md:w-3/5 h-48 sm:h-60">
          <canvas ref="hrsgSubCanvas"></canvas>
        </div>
        <div class="w-full md:w-2/5 mt-4 md:mt-0 md:pl-4">
          <h4 class="text-sm font-semibold mb-3 text-gray-700">
            Detalle de Errores
          </h4>
          <div class="space-y-3">
            <div
              v-for="(item, index) in bomba2Stats"
              :key="index"
              class="flex items-center justify-between p-2 rounded-md"
              :style="{ backgroundColor: item.bgColor + '20' }"
            >
              <div class="flex items-center">
                <div
                  class="w-3 h-3 rounded-full mr-2"
                  :style="{ backgroundColor: item.bgColor }"
                ></div>
                <span class="text-sm font-medium">{{ item.label }}</span>
              </div>
              <span class="text-sm font-bold">{{ item.value }}</span>
            </div>
          </div>
          <div class="mt-4 text-xs text-gray-500">
            <p>Total de errores: {{ totalErrores }}</p>
            <p class="mt-1">Porcentaje del total: {{ porcentajeErrores }}%</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6">
    <!-- Bitacoras de Alerta y Aviso Chart -->
    <div class="rounded-lg shadow p-4 sm:p-6 bg-white">
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <h3 class="text-base sm:text-lg font-medium text-[#2E4053]">
          Bitacoras de Alerta y Aviso
        </h3>
      </div>

      <div class="flex flex-col md:flex-row items-center">
        <div class="w-full md:w-3/5 h-48 sm:h-60">
          <canvas ref="alertaAvisoCanvas"></canvas>
        </div>
        <div class="w-full md:w-2/5 mt-4 md:mt-0 md:pl-4">
          <h4 class="text-sm font-semibold mb-3 text-gray-700">
            Distribución de Alertas y Avisos
          </h4>
          <div class="space-y-3">
            <div
              v-for="(item, index) in bomba3Stats"
              :key="index"
              class="flex items-center justify-between p-2 rounded-md"
              :style="{ backgroundColor: item.bgColor + '20' }"
            >
              <div class="flex items-center">
                <div
                  class="w-3 h-3 rounded-full mr-2"
                  :style="{ backgroundColor: item.bgColor }"
                ></div>
                <span class="text-sm font-medium">{{ item.label }}</span>
              </div>
              <span class="text-sm font-bold">{{ item.value }}</span>
            </div>
          </div>
          <div class="mt-4 text-xs text-gray-500">
            <p>Total de alertas y avisos: {{ totalAlertasAvisos }}</p>
            <p class="mt-1">
              Proporción alertas/avisos: {{ proporcionAlertasAvisos }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick } from "vue";
import { Chart, registerables } from "chart.js";
import { useBitacoras } from "@/composables/useBitacoras";

Chart.register(...registerables);

// Referencias para los canvas de cada gráfico
const clasificacionCanvas = ref(null);
const hrsgSubCanvas = ref(null);
const alertaAvisoCanvas = ref(null);

// Obtener las bitácoras mediante Tanstack Query
const { bitacoras, isLoading } = useBitacoras();

// Paleta de colores personalizada para los gráficos
const colorPalette = [
  "#FF6384", // Rosa
  "#36A2EB", // Azul
  "#FFCE56", // Amarillo
  "#4BC0C0", // Turquesa
  "#9966FF", // Púrpura
  "#FF9F40", // Naranja
  "#8AC926", // Verde lima
  "#1982C4", // Azul claro
  "#6A4C93", // Morado
  "#F94144", // Rojo
  "#F3722C", // Naranja claro
  "#F8961E", // Ámbar
  "#F9C74F", // Amarillo claro
  "#90BE6D", // Verde claro
  "#43AA8B", // Verde azulado
  "#577590", // Azul grisáceo
];

// Fecha formateada para mostrar la última actualización
const formattedDate = computed(() => {
  return new Date().toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

// --- Gráfico 1: Conteo de cada clasificación ---
const clasificacionCounts = computed(() => {
  const counts = {};
  if (!bitacoras.value) return counts;
  bitacoras.value.forEach((b) => {
    // Si no hay clasificación, lo etiquetamos como "Sin Clasificación"
    const clas = b.clasificacion?.trim() || "Sin Clasificación";
    counts[clas] = (counts[clas] || 0) + 1;
  });
  return counts;
});
const clasificacionLabels = computed(() =>
  Object.keys(clasificacionCounts.value)
);
const clasificacionValues = computed(() =>
  Object.values(clasificacionCounts.value)
);
const totalRegistros = computed(() => {
  return clasificacionValues.value.reduce((sum, val) => sum + val, 0);
});

// --- Gráfico 2: Subcategorías de HRSG Pump Failures ---
const hrsgSubcategoryCounts = computed(() => {
  const counts = {};
  if (!bitacoras.value) return counts;
  bitacoras.value.forEach((b) => {
    if (b.clasificacion && b.clasificacion.includes("HRSG Pump Failures")) {
      // Se asume que el formato es "HRSG Pump Failures - <subcategoría>"
      const parts = b.clasificacion.split("-");
      const subcategory = parts[1]?.trim() || "Sin Subcategoría";
      counts[subcategory] = (counts[subcategory] || 0) + 1;
    }
  });
  return counts;
});
const hrsgSubLabels = computed(() => Object.keys(hrsgSubcategoryCounts.value));
const hrsgSubValues = computed(() =>
  Object.values(hrsgSubcategoryCounts.value)
);
const totalErrores = computed(() => {
  return hrsgSubValues.value.reduce((sum, val) => sum + val, 0);
});
const porcentajeErrores = computed(() => {
  if (totalRegistros.value === 0) return 0;
  return ((totalErrores.value / totalRegistros.value) * 100).toFixed(1);
});

// --- Gráfico 3: Conteo de alertas y avisos ---
const alertaAvisoCounts = computed(() => {
  let alertaCount = 0;
  let avisoCount = 0;
  if (!bitacoras.value) return { alertaCount, avisoCount };
  bitacoras.value.forEach((b) => {
    if (b.alerta_aviso) {
      const txt = b.alerta_aviso.toUpperCase().trim();
      if (txt.includes("ALERTA")) alertaCount++;
      if (txt.includes("AVISO")) avisoCount++;
    }
  });
  return { alertaCount, avisoCount };
});
const alertaAvisoLabels = ["ALERTA", "AVISO"];
const alertaAvisoValues = computed(() => [
  alertaAvisoCounts.value.alertaCount,
  alertaAvisoCounts.value.avisoCount,
]);
const totalAlertasAvisos = computed(() => {
  return alertaAvisoValues.value.reduce((sum, val) => sum + val, 0);
});
const proporcionAlertasAvisos = computed(() => {
  const alertas = alertaAvisoCounts.value.alertaCount;
  const avisos = alertaAvisoCounts.value.avisoCount;
  if (avisos === 0) return "N/A";
  return (alertas / avisos).toFixed(2) + ":1";
});

// Estadísticas para mostrar en el panel lateral
const bomba1Stats = computed(() => {
  return clasificacionLabels.value.map((label, index) => ({
    label,
    value: clasificacionValues.value[index],
    bgColor: colorPalette[index % colorPalette.length],
  }));
});

const bomba2Stats = computed(() => {
  return hrsgSubLabels.value.map((label, index) => ({
    label,
    value: hrsgSubValues.value[index],
    bgColor: colorPalette[(index + 3) % colorPalette.length], // Offset para variar colores
  }));
});

const bomba3Stats = computed(() => {
  return alertaAvisoLabels.map((label, index) => ({
    label,
    value: alertaAvisoValues.value[index],
    bgColor: index === 0 ? "#FF6384" : "#36A2EB", // Rojo para alertas, azul para avisos
  }));
});

// Función genérica para crear gráficos con colores personalizados
const createChart = (canvas, type, labels, data, title, colors) => {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  return new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [
        {
          label: title,
          data,
          backgroundColor: colors.map((color) => color + "CC"), // Añadir transparencia
          borderColor: colors,
          borderWidth: 1,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            usePointStyle: true,
            padding: 15,
            font: {
              size: 11,
            },
          },
        },
        title: {
          display: true,
          text: title,
          font: {
            size: 14,
            weight: "bold",
          },
          padding: {
            top: 10,
            bottom: 15,
          },
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          titleColor: "#333",
          bodyColor: "#333",
          borderColor: "#ddd",
          borderWidth: 1,
          padding: 10,
          cornerRadius: 4,
          displayColors: true,
          callbacks: {
            label: (context) => {
              const value = context.raw;
              const total = context.chart.data.datasets[0].data.reduce(
                (sum, val) => sum + val,
                0
              );
              const percentage = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
      // Configuraciones específicas según el tipo de gráfico
      ...(type === "bar" && {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      }),
      ...(type === "pie" && {
        cutout: "0%",
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      }),
      ...(type === "doughnut" && {
        cutout: "50%",
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      }),
    },
  });
};

let clasificacionChart, hrsgSubChart, alertaAvisoChart;

const updateCharts = async () => {
  await nextTick();
  // Destruir gráficos anteriores si existen
  if (clasificacionChart) clasificacionChart.destroy();
  if (hrsgSubChart) hrsgSubChart.destroy();
  if (alertaAvisoChart) alertaAvisoChart.destroy();

  // Asignar colores para cada gráfico
  const clasificacionColors = clasificacionLabels.value.map(
    (_, i) => colorPalette[i % colorPalette.length]
  );

  const hrsgSubColors = hrsgSubLabels.value.map(
    (_, i) => colorPalette[(i + 3) % colorPalette.length]
  );

  const alertaAvisoColors = ["#FF6384", "#36A2EB"]; // Rojo para alertas, azul para avisos

  // Gráfico 1: Clasificación de registros (tipo 'bar')
  clasificacionChart = createChart(
    clasificacionCanvas.value,
    "bar",
    clasificacionLabels.value,
    clasificacionValues.value,
    "Clasificación de Registros",
    clasificacionColors
  );

  // Gráfico 2: Subcategorías de HRSG Pump Failures (tipo 'pie')
  hrsgSubChart = createChart(
    hrsgSubCanvas.value,
    "pie",
    hrsgSubLabels.value,
    hrsgSubValues.value,
    "Subcategorías de HRSG Pump Failures",
    hrsgSubColors
  );

  // Gráfico 3: Alertas y Avisos (tipo 'doughnut')
  alertaAvisoChart = createChart(
    alertaAvisoCanvas.value,
    "doughnut",
    alertaAvisoLabels,
    alertaAvisoValues.value,
    "Alertas y Avisos",
    alertaAvisoColors
  );
};

// Actualizar gráficos cuando la data (bitacoras) esté disponible
watch(bitacoras, (newVal) => {
  if (newVal && newVal.length > 0) {
    updateCharts();
  }
});

// Inicializar gráficos cuando el componente se monta
onMounted(() => {
  if (bitacoras.value && bitacoras.value.length > 0) {
    updateCharts();
  }
});
</script>
