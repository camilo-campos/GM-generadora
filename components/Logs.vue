<template>
  <!-- Estado de carga -->
  <div v-if="isLoading" class="text-xl font-semibold p-4">
    Cargando gráficos, por favor espere...
  </div>
  
  <!-- Contenido principal -->
  <div v-else class="space-y-6">
    <!-- Bitacoras Totales Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6 mb-10">
      <div class="rounded-lg shadow p-4 sm:p-6 bg-white">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-base sm:text-lg font-medium text-[#2E4053]">
            Bitacoras Totales
          </h3>
          <div class="flex gap-2">
            <button @click="toggleChartType" 
                    class="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors">
              {{ isPie ? 'Ver Donut' : 'Ver Pastel' }}
            </button>
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-center">
          <div class="w-full md:w-3/5 h-48 sm:h-60 relative">
            <!-- Contenedor centrado para el total -->
            <div v-if="!isPie" class="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span class="text-2xl font-bold text-gray-700">{{ totalRegistros }}</span>
              <span class="text-sm text-gray-500">Total</span>
            </div>
            <canvas ref="clasificacionCanvas"></canvas>
          </div>
          <div class="w-full md:w-2/5 mt-4 md:mt-0 md:pl-4">
            <h4 class="text-sm font-semibold mb-3 text-gray-700">
              Resumen de Clasificaciones
            </h4>
            <div class="space-y-3">
              <div
                v-for="(item, index) in clasificacionStats"
                :key="index"
                @mouseover="highlightSegment(index, 'clasificacion')"
                @mouseleave="resetHighlight('clasificacion')"
                class="flex items-center justify-between p-2 rounded-md cursor-pointer transition-all duration-200 hover:transform hover:scale-105"
                :style="{ backgroundColor: item.bgColor + '20' }"
              >
                <div class="flex items-center">
                  <div
                    class="w-3 h-3 rounded-full mr-2"
                    :style="{ backgroundColor: item.bgColor }"
                  ></div>
                  <span class="text-sm font-medium">{{ item.label }}</span>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-sm font-bold">{{ item.value }}</span>
                  <span class="text-xs text-gray-500">{{ calculatePercentage(item.value, totalRegistros) }}%</span>
                </div>
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

    <!-- Bitacoras de Error Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6 mb-10">
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
                v-for="(item, index) in errorStats"
                :key="index"
                @mouseover="highlightSegment(index, 'error')"
                @mouseleave="resetHighlight('error')"
                class="flex items-center justify-between p-2 rounded-md cursor-pointer transition-all duration-200 hover:transform hover:scale-105"
                :style="{ backgroundColor: item.bgColor + '20' }"
              >
                <div class="flex items-center">
                  <div
                    class="w-3 h-3 rounded-full mr-2"
                    :style="{ backgroundColor: item.bgColor }"
                  ></div>
                  <span class="text-sm font-medium">{{ item.label }}</span>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-sm font-bold">{{ item.value }}</span>
                  <span class="text-xs text-gray-500">{{ calculatePercentage(item.value, totalErrores) }}%</span>
                </div>
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

    <!-- Bitacoras de Alerta y Aviso Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6">
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
                v-for="(item, index) in alertaAvisoStats"
                :key="index"
                @mouseover="highlightSegment(index, 'alerta')"
                @mouseleave="resetHighlight('alerta')"
                class="flex items-center justify-between p-2 rounded-md cursor-pointer transition-all duration-200 hover:transform hover:scale-105"
                :style="{ backgroundColor: item.bgColor + '20' }"
              >
                <div class="flex items-center">
                  <div
                    class="w-3 h-3 rounded-full mr-2"
                    :style="{ backgroundColor: item.bgColor }"
                  ></div>
                  <span class="text-sm font-medium">{{ item.label }}</span>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-sm font-bold">{{ item.value }}</span>
                  <span class="text-xs text-gray-500">{{ calculatePercentage(item.value, totalAlertasAvisos) }}%</span>
                </div>
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

// Referencias para los objetos Chart
const clasificacionChart = ref(null);
const hrsgSubChart = ref(null);
const alertaAvisoChart = ref(null);

// Estado para alternar entre tipo pie y doughnut
const isPie = ref(false);

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
const clasificacionStats = computed(() => {
  return clasificacionLabels.value.map((label, index) => ({
    label,
    value: clasificacionValues.value[index],
    bgColor: colorPalette[index % colorPalette.length],
  }));
});

const errorStats = computed(() => {
  return hrsgSubLabels.value.map((label, index) => ({
    label,
    value: hrsgSubValues.value[index],
    bgColor: colorPalette[(index + 3) % colorPalette.length], // Offset para variar colores
  }));
});

const alertaAvisoStats = computed(() => {
  return alertaAvisoLabels.map((label, index) => ({
    label,
    value: alertaAvisoValues.value[index],
    bgColor: index === 0 ? "#FF6384" : "#36A2EB", // Rojo para alertas, azul para avisos
  }));
});

// Función para crear un gráfico
const createChart = (
  canvas,
  type,
  labels,
  values,
  title,
  colors,
  isClasificacion = false
) => {
  const ctx = canvas.getContext("2d");
  
  // Configuración especial para gráfico de clasificación
  if (isClasificacion) {
    const chart = new Chart(ctx, {
      type: isPie.value ? 'pie' : 'doughnut',
      data: {
        labels,
        datasets: [
          {
            label: title,
            data: values,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
            hoverOffset: 15,
            borderRadius: 5,
            spacing: 2
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: isPie.value ? 0 : '65%',
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${context.label}: ${value} (${percentage}%)`;
              }
            },
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: 10,
            bodyFont: { size: 14 },
            usePointStyle: true
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 800,
          easing: 'easeOutQuart'
        }
      }
    });
    return chart;
  }
  
  // Configuración para otros gráficos
  const chart = new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [
        {
          label: title,
          data: values,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
          hoverOffset: 8
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.raw;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
  return chart;
};

// Función para actualizar los gráficos
const updateCharts = () => {
  // Limpiar gráficos anteriores si existen
  if (clasificacionChart.value) clasificacionChart.value.destroy();
  if (hrsgSubChart.value) hrsgSubChart.value.destroy();
  if (alertaAvisoChart.value) alertaAvisoChart.value.destroy();

  // 1. Gráfico de Clasificaciones con configuración especial
  clasificacionChart.value = createChart(
    clasificacionCanvas.value,
    isPie.value ? "pie" : "doughnut",
    clasificacionLabels.value,
    clasificacionValues.value,
    "Clasificaciones",
    clasificacionStats.value.map((stat) => stat.bgColor),
    true // indica que es el gráfico de clasificación
  );

  // Gráfico 2: Subcategorías de HRSG Pump Failures con mejorada visualización
  hrsgSubChart.value = createChart(
    hrsgSubCanvas.value,
    isPie.value ? "pie" : "doughnut",
    hrsgSubLabels.value,
    hrsgSubValues.value,
    "Subcategorías de HRSG Pump Failures",
    errorStats.value.map((stat) => stat.bgColor),
    true // Usar mismo estilo mejorado para este gráfico
  );

  // Gráfico 3: Alertas y Avisos con mejorada visualización
  alertaAvisoChart.value = createChart(
    alertaAvisoCanvas.value,
    isPie.value ? "pie" : "doughnut",
    alertaAvisoLabels,
    alertaAvisoValues.value,
    "Alertas y Avisos",
    alertaAvisoStats.value.map((stat) => stat.bgColor),
    true // Usar mismo estilo mejorado para este gráfico
  );
};

// Funciones para interactividad

// Calcular porcentaje para un valor
const calculatePercentage = (value, total) => {
  if (!total) return '0.0';
  return ((value / total) * 100).toFixed(1);
};

// Alternar entre gráfico de pastel y donut
const toggleChartType = () => {
  isPie.value = !isPie.value;
  if (clasificacionChart.value) {
    updateCharts();
  }
};

// Resaltar segmento al pasar el mouse sobre la leyenda
const highlightSegment = (index, chartType) => {
  let chart;
  switch(chartType) {
    case 'clasificacion':
      chart = clasificacionChart.value;
      break;
    case 'error':
      chart = hrsgSubChart.value;
      break;
    case 'alerta':
      chart = alertaAvisoChart.value;
      break;
  }
  
  if (chart) {
    const dataset = chart.data.datasets[0];
    const backgroundColors = [...dataset.backgroundColor];
    
    // Hacer transparentes todos excepto el seleccionado
    const newColors = backgroundColors.map((color, i) => 
      i === index ? color : color + '80'
    );
    
    dataset.backgroundColor = newColors;
    chart.update('none'); // Actualizar sin animación
  }
};

// Restaurar colores originales
const resetHighlight = (chartType) => {
  let chart, colors;
  switch(chartType) {
    case 'clasificacion':
      chart = clasificacionChart.value;
      colors = clasificacionStats.value.map(stat => stat.bgColor);
      break;
    case 'error':
      chart = hrsgSubChart.value;
      colors = errorStats.value.map(stat => stat.bgColor);
      break;
    case 'alerta':
      chart = alertaAvisoChart.value;
      colors = alertaAvisoStats.value.map(stat => stat.bgColor);
      break;
  }
  
  if (chart) {
    chart.data.datasets[0].backgroundColor = colors;
    chart.update('none');
  }
};

// Actualizar gráficos cuando la data (bitacoras) esté disponible
watch(bitacoras, (newVal) => {
  if (newVal && newVal.length > 0) {
    updateCharts();
  }
});

// Actualizar gráficos si cambia el tipo (pie/doughnut)
watch(isPie, () => {
  updateCharts();
});

// Inicializar gráficos cuando el componente se monta
onMounted(() => {
  if (bitacoras.value && bitacoras.value.length > 0) {
    updateCharts();
  }
});


defineProps({
  currentView: {
    type: Object,
    default: () => ({
      chartTitle: "Clasificación de registros",
    }),
  },
  isDarkMode: {
    type: Boolean,
    default: false,
  },
});
</script>
