<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6"
  >
    <!-- Stat Cards -->
    <div
      v-for="(stat, index) in stats"
      :key="index"
      class="rounded-lg shadow p-4 sm:p-5"
      :class="isDarkMode ? 'bg-white' : 'bg-white'"
    >
      <div class="flex items-center">
        <div :class="isDarkMode ? stat.darkBgColor : stat.lightBgColor">
          <component :is="stat.icon" class="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div class="ml-3 sm:ml-4">
          <p
            class="text-xl sm:text-2xl font-medium"
            :class="isDarkMode ? 'text-[#B1B1B1]' : 'text-[#6C757D]'"
          >
            {{ stat.name }}
          </p>
          <p
            class="text-xl sm:text-2xl font-semibold"
            :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
          >
            {{ stat.value }}
          </p>
        </div>
      </div>

      <div class="mt-2 flex items-center text-xs sm:text-sm">
        <span :class="stat.trend === 'up' ? 'text-green-600' : 'text-red-600'">
          {{ stat.trend === "up" ? "↑" : "↓" }} {{ stat.change }}
        </span>
        <span
          :class="isDarkMode ? 'text-[#B1B1B1]' : 'text-[#6C757D]'"
          class="ml-1"
          >vs período anterior</span
        >
      </div>
    </div>
  </div>

  <!-- Main Chart Area - Now using grid for equal sizing -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <!-- Primer gráfico -->
    <div
      class="rounded-lg shadow p-4 sm:p-6 h-full flex flex-col"
      :class="isDarkMode ? 'bg-white' : 'bg-white'"
    >
      <h3
        class="text-base sm:text-lg font-medium mb-4"
        :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
      >
        {{ currentView.chartTitle }}
      </h3>
      <div class="w-full flex-grow">
        <canvas id="anomalyChart"></canvas>
      </div>
    </div>

    <!-- Sección de Alertas con paginación -->
    <div class="rounded-lg shadow p-4 sm:p-6 h-full flex flex-col bg-white">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h3 
          class="text-base sm:text-lg font-medium"
          :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
        >
          Alertas y Avisos
        </h3>
        
        <!-- Filtros -->
        <div class="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <button 
            @click="filtroActual = 'TODOS'; paginaActual = 1" 
            :class="[
              'px-2 py-1 rounded-full text-xs font-medium transition-colors',
              filtroActual === 'TODOS' 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            Todos ({{ bitacorasConAlerta.length }})
          </button>
          
          <button 
            @click="filtroActual = 'ALERTA'; paginaActual = 1" 
            :class="[
              'px-2 py-1 rounded-full text-xs font-medium transition-colors',
              filtroActual === 'ALERTA' 
                ? 'bg-red-600 text-white' 
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            ]"
          >
            Alertas ({{ conteoAlertas }})
          </button>
          
          <button 
            @click="filtroActual = 'AVISO'; paginaActual = 1" 
            :class="[
              'px-2 py-1 rounded-full text-xs font-medium transition-colors',
              filtroActual === 'AVISO' 
                ? 'bg-amber-500 text-white' 
                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
            ]"
          >
            Avisos ({{ conteoAvisos }})
          </button>
        </div>
      </div>
      
      <div v-if="isLoading" class="flex-grow flex items-center justify-center">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-gray-600 mb-2"></div>
          <p class="text-sm font-semibold text-gray-700">Cargando alertas...</p>
        </div>
      </div>
      
      <div v-else class="flex-grow flex flex-col">
        <!-- Mostrar un mensaje si no hay alertas disponibles -->
        <div v-if="bitacorasConAlerta.length === 0" class="h-full flex items-center justify-center text-gray-500">
          No se encontraron alertas ni avisos.
        </div>
        
        <!-- Mostrar un mensaje si hay alertas pero ninguna coincide con el filtro -->
        <div v-else-if="bitacorasFiltradas.length === 0" class="h-full flex items-center justify-center text-gray-500">
          No se encontraron resultados para el filtro seleccionado.
        </div>
        
        <!-- Recorrer y mostrar las bitácoras filtradas y paginadas -->
        <div v-else class="space-y-3 flex-grow overflow-auto">
          <div
            v-for="alerta in bitacorasPaginadas"
            :key="alerta.id"
            :class="[
              'p-3 rounded-lg border-l-4 transition-all',
              alerta.alerta_aviso === 'ALERTA' 
                ? 'bg-red-50 border-red-500' 
                : 'bg-amber-50 border-amber-500'
            ]"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-center">
                <span 
                  :class="[
                    'inline-flex items-center justify-center w-6 h-6 rounded-full mr-2',
                    alerta.alerta_aviso === 'ALERTA' 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-amber-100 text-amber-600'
                  ]"
                >
                  <svg v-if="alerta.alerta_aviso === 'ALERTA'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </span>
                <span 
                  :class="[
                    'font-medium text-xs px-2 py-0.5 rounded-full',
                    alerta.alerta_aviso === 'ALERTA' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-amber-100 text-amber-800'
                  ]"
                >
                  {{ alerta.alerta_aviso }}
                </span>
              </div>
              <span class="text-xs text-gray-500">
                {{ formatearFecha(alerta.tiempo_ejecucion) }}
              </span>
            </div>
            
            <p class="mt-2 text-sm text-gray-700 line-clamp-2">
              {{ alerta.bitacora }}
            </p>
          </div>
        </div>
        
        <!-- Controles de paginación -->
        <div v-if="bitacorasFiltradas.length > elementosPorPagina" class="mt-4 flex items-center justify-between border-t pt-3">
          <div class="flex items-center text-xs text-gray-500">
            Mostrando {{ (paginaActual - 1) * elementosPorPagina + 1 }} - 
            {{ Math.min(paginaActual * elementosPorPagina, bitacorasFiltradas.length) }} 
            de {{ bitacorasFiltradas.length }}
          </div>
          
          <div class="flex gap-1">
            <button 
              @click="paginaActual = Math.max(1, paginaActual - 1)"
              :disabled="paginaActual === 1"
              :class="[
                'p-1 rounded transition-colors',
                paginaActual === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <div class="flex items-center px-2 text-sm">
              {{ paginaActual }} / {{ totalPaginas }}
            </div>
            
            <button 
              @click="paginaActual = Math.min(totalPaginas, paginaActual + 1)"
              :disabled="paginaActual === totalPaginas"
              :class="[
                'p-1 rounded transition-colors',
                paginaActual === totalPaginas 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Secondary Charts Grid - Bombas -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
    <!-- Bomba 1 Chart -->
    <div
      class="rounded-lg shadow p-4 sm:p-6"
      :class="isDarkMode ? 'bg-white' : 'bg-white'"
    >
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <h3
          class="text-base sm:text-lg font-medium"
          :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
        >
          Bomba 1 - Estado Operativo
        </h3>
        <div class="flex items-center space-x-2">
          <div class="flex items-center">
            <div class="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span class="text-xs text-gray-600">Operativa</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center">
        <div class="w-full md:w-3/5 h-48 sm:h-60">
          <canvas ref="bomba1Canvas"></canvas>
        </div>
        <div class="w-full md:w-2/5 mt-4 md:mt-0 md:pl-4">
          <div class="space-y-3">
            <div
              v-for="(item, index) in bomba1Stats"
              :key="index"
              class="flex items-center justify-between p-2 rounded-md"
              :class="item.bgColor"
            >
              <span class="text-sm font-medium">{{ item.label }}</span>
              <span class="text-sm font-bold">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bomba 2 Chart -->
    <div
      class="rounded-lg shadow p-4 sm:p-6"
      :class="isDarkMode ? 'bg-white' : 'bg-white'"
    >
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <h3
          class="text-base sm:text-lg font-medium"
          :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
        >
          Bomba 2 - Rendimiento
        </h3>
        <div class="flex items-center space-x-2">
          <div class="flex items-center">
            <div class="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
            <span class="text-xs text-gray-600">Mantenimiento</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center">
        <div class="w-full md:w-3/5 h-48 sm:h-60">
          <canvas ref="bomba2Canvas"></canvas>
        </div>
        <div class="w-full md:w-2/5 mt-4 md:mt-0 md:pl-4">
          <div class="space-y-3">
            <div
              v-for="(item, index) in bomba2Stats"
              :key="index"
              class="flex items-center justify-between p-2 rounded-md"
              :class="item.bgColor"
            >
              <span class="text-sm font-medium">{{ item.label }}</span>
              <span class="text-sm font-bold">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Chart, registerables } from "chart.js";
import { useBitacoras } from "@/composables/useBitacoras";

// Obtener las bitácoras mediante Tanstack Query
const { bitacoras, isLoading } = useBitacoras();

// Estado para el filtro actual
const filtroActual = ref('TODOS'); // Valores posibles: 'TODOS', 'ALERTA', 'AVISO'

// Variables para la paginación
const paginaActual = ref(1);
const elementosPorPagina = 4; // Límite de 4 logs por página

// Propiedad computada para filtrar las bitácoras que tengan un valor en alerta_aviso
const bitacorasConAlerta = computed(() => {
  const lista = bitacoras.value;
  // Si la lista no existe o no es un arreglo, retorna arreglo vacío
  if (!lista || !Array.isArray(lista)) return [];
  return lista.filter(b => b.alerta_aviso != null);
});

// Propiedad computada para aplicar el filtro seleccionado
const bitacorasFiltradas = computed(() => {
  if (filtroActual.value === 'TODOS') {
    return bitacorasConAlerta.value;
  }
  return bitacorasConAlerta.value.filter(b => b.alerta_aviso === filtroActual.value);
});

// Propiedad computada para obtener el total de páginas
const totalPaginas = computed(() => {
  return Math.ceil(bitacorasFiltradas.value.length / elementosPorPagina);
});

// Propiedad computada para obtener los elementos de la página actual
const bitacorasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  return bitacorasFiltradas.value.slice(inicio, fin);
});

// Conteo de alertas y avisos para mostrar en los botones de filtro
const conteoAlertas = computed(() => {
  return bitacorasConAlerta.value.filter(b => b.alerta_aviso === 'ALERTA').length;
});

const conteoAvisos = computed(() => {
  return bitacorasConAlerta.value.filter(b => b.alerta_aviso === 'AVISO').length;
});

// Función para formatear la fecha de manera más amigable
const formatearFecha = (fechaString) => {
  if (!fechaString) return '';
  
  try {
    const fecha = new Date(fechaString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(fecha);
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return fechaString;
  }
};

// Resetear la página cuando cambia el filtro
watch(filtroActual, () => {
  paginaActual.value = 1;
});

// Asegurarse de que la página actual es válida cuando cambia el total de páginas
watch(totalPaginas, (newValue) => {
  if (paginaActual.value > newValue && newValue > 0) {
    paginaActual.value = newValue;
  }
});

// Esperar a que "bitacoras" se cargue y luego mostrar su valor en la consola
watch(bitacoras, (newVal) => {
  if (newVal && Array.isArray(newVal)) {
    
  }
});





Chart.register(...registerables);

defineProps({
  currentView: {
    type: Object,
    default: () => ({
      chartTitle: "Visión general del sistema",
    }),
  },
  isDarkMode: {
    type: Boolean,
    default: false,
  },
});

// Propiedades locales para esta vista


const bomba1Canvas = ref(null);
const bomba2Canvas = ref(null);

// Datos para Bomba 1
const bomba1Data = ref({
  labels: ["Operativo", "Inactivo", "Mantenimiento", "Fallo"],
  datasets: [
    {
      data: [65, 15, 12, 8],
      backgroundColor: [
        "rgba(52, 211, 153, 0.8)", // Verde para operativo
        "rgba(209, 213, 219, 0.8)", // Gris para inactivo
        "rgba(251, 191, 36, 0.8)", // Amarillo para mantenimiento
        "rgba(239, 68, 68, 0.8)", // Rojo para fallo
      ],
      borderColor: [
        "rgba(52, 211, 153, 1)",
        "rgba(209, 213, 219, 1)",
        "rgba(251, 191, 36, 1)",
        "rgba(239, 68, 68, 1)",
      ],
      borderWidth: 1,
      hoverOffset: 4,
    },
  ],
});

// Datos para Bomba 2
const bomba2Data = ref({
  labels: ["Óptimo", "Normal", "Bajo Rendimiento", "Crítico"],
  datasets: [
    {
      data: [30, 45, 20, 5],
      backgroundColor: [
        "rgba(52, 211, 153, 0.8)", // Verde para óptimo
        "rgba(96, 165, 250, 0.8)", // Azul para normal
        "rgba(251, 191, 36, 0.8)", // Amarillo para bajo rendimiento
        "rgba(239, 68, 68, 0.8)", // Rojo para crítico
      ],
      borderColor: [
        "rgba(52, 211, 153, 1)",
        "rgba(96, 165, 250, 1)",
        "rgba(251, 191, 36, 1)",
        "rgba(239, 68, 68, 1)",
      ],
      borderWidth: 1,
      hoverOffset: 4,
    },
  ],
});

// Estadísticas adicionales para Bomba 1
const bomba1Stats = ref([
  {
    label: "Tiempo de Operación",
    value: "1,245 horas",
    bgColor: "bg-green-50",
  },
  { label: "Eficiencia", value: "87%", bgColor: "bg-blue-50" },
  { label: "Ciclos Completados", value: "3,421", bgColor: "bg-purple-50" },
  { label: "Último Mantenimiento", value: "12 días", bgColor: "bg-gray-50" },
]);

// Estadísticas adicionales para Bomba 2
const bomba2Stats = ref([
  { label: "Flujo Promedio", value: "42 L/min", bgColor: "bg-blue-50" },
  { label: "Presión Máxima", value: "85 PSI", bgColor: "bg-green-50" },
  { label: "Temperatura", value: "38°C", bgColor: "bg-yellow-50" },
  { label: "Vibración", value: "0.8 mm/s", bgColor: "bg-red-50" },
]);

// Ejemplo de datos para las tarjetas
const stats = [
  {
    name: "Presión Actual",
    value: "42",
    change: "8%",
    trend: "up",
    icon: "SignalIcon",
    darkBgColor: "p-2 sm:p-3 rounded-full bg-[#333333] text-white",
    lightBgColor: "p-2 sm:p-3 rounded-full bg-[#E9ECEF] text-[#495057]",
  },
  {
    name: "Temperatura",
    value: "0.8%",
    change: "3%",
    trend: "down",
    icon: "ExclamationTriangleIcon",
    darkBgColor: "p-2 sm:p-3 rounded-full bg-[#B1B1B1] text-white",
    lightBgColor: "p-2 sm:p-3 rounded-full bg-[#FFF9DB] text-[#E67700]",
  },
  {
    name: "Nivel de Vibración",
    value: "0.8%",
    change: "3%",
    trend: "down",
    icon: "ExclamationTriangleIcon",
    darkBgColor: "p-2 sm:p-3 rounded-full bg-[#B1B1B1] text-white",
    lightBgColor: "p-2 sm:p-3 rounded-full bg-[#FFF9DB] text-[#E67700]",
  },
];

// Datos de alertas relacionadas con sensores


onMounted(() => {
  // Inicializar el gráfico principal
  const canvas = document.getElementById("anomalyChart");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels.value,
        datasets: datasets.value,
      },
      options: { responsive: true },
    });
  }

  // Inicializar el gráfico de Bomba 1
  if (bomba1Canvas.value) {
    const ctx1 = bomba1Canvas.value.getContext("2d");
    new Chart(ctx1, {
      type: "doughnut",
      data: bomba1Data.value,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 12,
              padding: 15,
              font: {
                size: 11,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.formattedValue || "";
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((context.raw / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    });
  }

  // Inicializar el gráfico de Bomba 2
  if (bomba2Canvas.value) {
    const ctx2 = bomba2Canvas.value.getContext("2d");
    new Chart(ctx2, {
      type: "pie",
      data: bomba2Data.value,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 12,
              padding: 15,
              font: {
                size: 11,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.formattedValue || "";
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((context.raw / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    });
  }
});

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
</script>
