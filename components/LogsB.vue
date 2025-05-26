<template>
  <!-- Estado de carga -->
  <div v-if="isLoading" class="text-xl font-semibold p-4" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">
    Cargando gráficos, por favor espere...
  </div>
  
  <!-- Contenido principal -->
  <div v-else class="space-y-6">
    <!-- Bitacoras Totales Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6 mb-10">
      <div class="rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-base sm:text-lg font-medium" :class="props.isDarkMode ? 'text-gray-200' : 'text-[#2E4053]'">
            Bitacoras Totales
          </h3>
          
        </div>

        <div class="flex flex-col md:flex-row items-center">
          <div class="w-full md:w-3/5 h-48 sm:h-60 relative">
            <!-- Contenedor centrado para el total -->
            <div v-if="!isPie" class="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span class="text-2xl font-bold" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-700'">{{ totalRegistros }}</span>
              <span class="text-sm" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">Total</span>
            </div>
            <canvas ref="clasificacionCanvas"></canvas>
          </div>
          <div class="w-full md:w-2/5 mt-4 md:mt-0 md:pl-4">
            <h4 class="text-sm font-semibold mb-3" :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              Resumen de Clasificaciones
            </h4>
            <div class="space-y-3">
              <div
                v-for="(item, index) in clasificacionStats"
                :key="index"
                @mouseover="hoveredItem = {type: 'clasificacion', index}"
                @mouseleave="hoveredItem = null"
                :class="{'ring-2 ring-offset-2': hoveredItem && hoveredItem.type === 'clasificacion' && hoveredItem.index === index}"
                :style="{
                  backgroundColor: item.bgColor + '20',
                  ringColor: item.bgColor
                }"
                class="flex items-center justify-between p-2 rounded-md cursor-pointer transition-all duration-200 hover:transform hover:scale-105"
              >
                <div class="flex items-center">
                  <div
                    class="w-3 h-3 rounded-full mr-2"
                    :style="{ backgroundColor: item.bgColor }"
                  ></div>
                  <span class="text-sm font-medium" :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'">{{ item.label }}</span>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-sm font-bold" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">{{ item.value }}</span>
                  <span class="text-xs" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">{{ calculatePercentage(item.value, totalRegistros) }}%</span>
                </div>
              </div>
            </div>
            <div class="mt-4 text-xs" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">
              <p>Total de registros: {{ totalRegistros }}</p>
              <p class="mt-1">Última actualización: {{ formattedDate }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bitacoras de Error Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6 mb-10">
      <div class="rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-base sm:text-lg font-medium" :class="props.isDarkMode ? 'text-gray-200' : 'text-[#2E4053]'">
            Bitacoras de Error
          </h3>
        </div>

        <div class="flex flex-col md:flex-row items-center">
          <div class="w-full md:w-3/5 h-48 sm:h-60 relative">
            <!-- Contenedor centrado para el total de errores -->
            <div class="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span class="text-2xl font-bold" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-700'">{{ totalErrores }}</span>
              <span class="text-sm" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">Total</span>
            </div>
            <canvas ref="hrsgSubCanvas"></canvas>
          </div>
          <div class="w-full md:w-2/5 mt-4 md:mt-0 md:pl-4">
            <h4 class="text-sm font-semibold mb-3" :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              Detalle de Errores
            </h4>
            <div class="space-y-3">
              <div
                v-for="(item, index) in errorStats"
                :key="index"
                @mouseover="hoveredItem = {type: 'error', index}"
                @mouseleave="hoveredItem = null"
                :class="{'ring-2 ring-offset-2': hoveredItem && hoveredItem.type === 'error' && hoveredItem.index === index}"
                :style="{
                  backgroundColor: item.bgColor + '20',
                  ringColor: item.bgColor
                }"
                class="flex items-center justify-between p-2 rounded-md cursor-pointer transition-all duration-200 hover:transform hover:scale-105"
              >
                <div class="flex items-center">
                  <div
                    class="w-3 h-3 rounded-full mr-2"
                    :style="{ backgroundColor: item.bgColor }"
                  ></div>
                  <span class="text-sm font-medium" :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'">{{ item.label }}</span>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-sm font-bold" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">{{ item.value }}</span>
                  <span class="text-xs" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">{{ calculatePercentage(item.value, totalErrores) }}%</span>
                </div>
              </div>
            </div>
            <div class="mt-4 text-xs" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">
              <p>Total de errores: {{ totalErrores }}</p>
              <p class="mt-1">Porcentaje del total: {{ porcentajeErrores }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bitacoras de Alerta y Aviso Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-6">
      <div class="rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3 class="text-base sm:text-lg font-medium" :class="props.isDarkMode ? 'text-gray-200' : 'text-[#2E4053]'">
            Bitacoras de Alerta y Aviso
          </h3>
        </div>

        <div class="flex flex-col md:flex-row items-center">
          <div class="w-full md:w-3/5 h-48 sm:h-60 relative">
            <!-- Contenedor centrado para el total de alertas y avisos -->
            <div class="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span class="text-2xl font-bold" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-700'">{{ totalAlertasAvisos }}</span>
              <span class="text-sm" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">Total</span>
            </div>
            <canvas ref="alertaAvisoCanvas"></canvas>
          </div>
          <div class="w-full md:w-2/5 mt-4 md:mt-0 md:pl-4">
            <h4 class="text-sm font-semibold mb-3" :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              Distribución de Alertas y Avisos
            </h4>
            <div class="space-y-3">
              <div
                v-for="(item, index) in alertaAvisoStats"
                :key="index"
                @mouseover="hoveredItem = {type: 'alerta', index}"
                @mouseleave="hoveredItem = null"
                :class="{'ring-2 ring-offset-2': hoveredItem && hoveredItem.type === 'alerta' && hoveredItem.index === index}"
                :style="{
                  backgroundColor: item.bgColor + '20',
                  ringColor: item.bgColor
                }"
                class="flex items-center justify-between p-2 rounded-md cursor-pointer transition-all duration-200 hover:transform hover:scale-105"
              >
                <div class="flex items-center">
                  <div
                    class="w-3 h-3 rounded-full mr-2"
                    :style="{ backgroundColor: item.bgColor }"
                  ></div>
                  <span class="text-sm font-medium" :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'">{{ item.label }}</span>
                </div>
                <div class="flex flex-col items-end">
                  <span class="text-sm font-bold" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">{{ item.value }}</span>
                  <span class="text-xs" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">{{ calculatePercentage(item.value, totalAlertasAvisos) }}%</span>
                </div>
              </div>
            </div>
            <div class="mt-4 text-xs" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">
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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useBitacorasB } from "@/composables/useBitacorasB";

// Registramos los plugins básicos de Chart.js
Chart.register(...registerables);
// No registramos ChartDataLabels globalmente para evitar afectar otros componentes

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
const { bitacoras, isLoading } = useBitacorasB();

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
  // Verificar que el canvas existe antes de intentar obtener su contexto
  if (!canvas) {
    console.error(`Canvas para ${title} no está disponible`);
    return null;
  }
  
  const ctx = canvas.getContext("2d");
  
  // Configuración para los bordes de colores
  const borderColors = colors.map(color => color); // Usar los mismos colores para los bordes
  
  // Configuración del plugin datalabels (porcentajes en el gráfico)
  const datalabelsConfig = {
    formatter: (value, ctx) => {
      const dataset = ctx.chart.data.datasets[0];
      const total = dataset.data.reduce((acc, data) => acc + data, 0);
      const percentage = ((value / total) * 100).toFixed(1) + '%';
      return percentage;
    },
    color: '#fff',
    font: {
      weight: 'bold',
      size: 11
    },
    textStrokeColor: props.isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)',
    textStrokeWidth: 2,
    display: function(context) {
      // Solo mostrar etiquetas para segmentos con suficiente espacio
      return context.dataset.data[context.dataIndex] / context.dataset.data.reduce((a, b) => a + b, 0) > 0.05;
    }
  };
  
  // Configuración especial para gráfico de clasificación
  if (isClasificacion) {
    const config = {
      type: isPie.value ? 'pie' : 'doughnut',
      data: {
        labels,
        datasets: [
          {
            label: title,
            data: values,
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 2, // Borde más grueso
            hoverOffset: 15,
            borderRadius: 3,
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
            labels: {
              color: props.isDarkMode ? '#f3f4f6' : '#333333'
            }
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
            backgroundColor: props.isDarkMode ? 'rgba(50,50,50,0.9)' : 'rgba(0,0,0,0.7)',
            titleColor: props.isDarkMode ? '#f3f4f6' : '#ffffff',
            bodyColor: props.isDarkMode ? '#f3f4f6' : '#ffffff',
            padding: 10,
            bodyFont: { size: 14 },
            usePointStyle: true
          },
          // Añadir configuración de datalabels
          datalabels: datalabelsConfig
        },
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 800,
          easing: 'easeOutQuart'
        }
      },
      plugins: [ChartDataLabels] // Aplicar el plugin solo a este gráfico
    };
    
    const chart = new Chart(ctx, config);
    return chart;
  }
  
  // Configuración para otros gráficos
  const config = {
    type,
    data: {
      labels,
      datasets: [
        {
          label: title,
          data: values,
          backgroundColor: colors,
          borderColor: borderColors,
          borderWidth: 2, // Borde más grueso
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
          labels: {
            color: props.isDarkMode ? '#f3f4f6' : '#333333'
          }
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
          backgroundColor: props.isDarkMode ? 'rgba(50,50,50,0.9)' : 'rgba(0,0,0,0.7)',
          titleColor: props.isDarkMode ? '#f3f4f6' : '#ffffff',
          bodyColor: props.isDarkMode ? '#f3f4f6' : '#ffffff',
          padding: 10,
          bodyFont: { size: 14 },
          usePointStyle: true
        },
        // Añadir configuración de datalabels
        datalabels: datalabelsConfig
      }
    },
    plugins: [ChartDataLabels] // Aplicar el plugin solo a este gráfico
  };
  
  const chart = new Chart(ctx, config);
  return chart;
};

// Función para actualizar los gráficos
const updateCharts = () => {
  try {
    // Marcar los gráficos como no listos mientras se actualizan
    chartsReady.value = false;
    
    console.log('Iniciando actualización de gráficos...');
    console.log('Canvas disponibles:', {
      clasificacion: !!clasificacionCanvas.value,
      hrsgSub: !!hrsgSubCanvas.value,
      alertaAviso: !!alertaAvisoCanvas.value
    });
    
    // Limpiar gráficos anteriores si existen
    if (clasificacionChart.value) clasificacionChart.value.destroy();
    if (hrsgSubChart.value) hrsgSubChart.value.destroy();
    if (alertaAvisoChart.value) alertaAvisoChart.value.destroy();

    // Resetear los valores de los gráficos
    clasificacionChart.value = null;
    hrsgSubChart.value = null;
    alertaAvisoChart.value = null;
    
    // Esperar al siguiente ciclo de renderizado para asegurar que los canvas estén disponibles
    nextTick(() => {
      // 1. Gráfico de Clasificaciones con configuración especial
      if (clasificacionCanvas.value) {
        clasificacionChart.value = createChart(
          clasificacionCanvas.value,
          isPie.value ? "pie" : "doughnut",
          clasificacionLabels.value,
          clasificacionValues.value,
          "Clasificaciones",
          clasificacionStats.value.map((stat) => stat.bgColor),
          true // indica que es el gráfico de clasificación
        );
      } else {
        console.error('Canvas de clasificación no disponible');
      }

      // Gráfico 2: Subcategorías de HRSG Pump Failures con mejorada visualización
      if (hrsgSubCanvas.value) {
        hrsgSubChart.value = createChart(
          hrsgSubCanvas.value,
          isPie.value ? "pie" : "doughnut",
          hrsgSubLabels.value,
          hrsgSubValues.value,
          "Subcategorías de HRSG Pump Failures",
          errorStats.value.map((stat) => stat.bgColor),
          true // Usar mismo estilo mejorado para este gráfico
        );
      } else {
        console.error('Canvas de HRSG no disponible');
      }

      // Gráfico 3: Alertas y Avisos con mejorada visualización
      if (alertaAvisoCanvas.value) {
        alertaAvisoChart.value = createChart(
          alertaAvisoCanvas.value,
          isPie.value ? "pie" : "doughnut",
    alertaAvisoLabels,
    alertaAvisoValues.value,
    "Alertas y Avisos",
    alertaAvisoStats.value.map((stat) => stat.bgColor),
    true // Usar mismo estilo mejorado para este gráfico
        );
      } else {
        console.error('Canvas de Alertas y Avisos no disponible');
      }
    });
  } catch (error) {
    console.error('Error al actualizar los gráficos:', error);
  }
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
// Variable reactiva para el elemento sobre el que está el ratón
const hoveredItem = ref(null);

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

// Variable reactiva para controlar si los gráficos están listos para interactuar
const chartsReady = ref(false);

// Inicializar gráficos cuando el componente se monta
onMounted(() => {
  console.log('Componente montado, esperando a que los canvas estén disponibles...');
  chartsReady.value = false; // Asegurarse de que los gráficos no están listos al inicio
  
  // Esperar a que el DOM se actualice y los canvas estén disponibles
  nextTick(() => {
    console.log('nextTick ejecutado, verificando canvas...');
    console.log('Canvas disponibles:', {
      clasificacion: !!clasificacionCanvas.value,
      hrsgSub: !!hrsgSubCanvas.value,
      alertaAviso: !!alertaAvisoCanvas.value
    });
    
    if (bitacoras.value && bitacoras.value.length > 0) {
      // Dar un poco más de tiempo para asegurar que los canvas estén renderizados
      setTimeout(() => {
        updateCharts();
        // Marcar los gráficos como listos después de un tiempo adicional para asegurar que todo está inicializado
        setTimeout(() => {
          chartsReady.value = true;
          console.log('Gráficos listos para interactuar');
        }, 500);
      }, 100);
    }
  });
});

const props = defineProps({
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


watch(() => props.isDarkMode, () => {
  console.log('Tema cambiado, actualizando gráficos...');
  // Marcar los gráficos como no listos mientras se actualiza el tema
  chartsReady.value = false;
  
  nextTick(() => {
    // Destruir los gráficos existentes antes de recrearlos
    if (clasificacionChart.value) clasificacionChart.value.destroy();
    if (hrsgSubChart.value) hrsgSubChart.value.destroy();
    if (alertaAvisoChart.value) alertaAvisoChart.value.destroy();
    
    // Recrear los gráficos con el nuevo tema
    updateCharts();
    
    // Esperar un tiempo adicional antes de habilitar la interactividad
    setTimeout(() => {
      chartsReady.value = true;
      console.log('Gráficos listos para interactuar después del cambio de tema');
    }, 1000); // Esperar 1 segundo para asegurar que todo esté listo
  });
}, { immediate: false });
</script>

