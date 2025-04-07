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

  <!-- Main Chart Area -->
  <div class="flex flex-col sm:flex-row gap-6 mb-6">
    <!-- Primer gráfico -->
    <div
      class="w-full sm:w-1/2 rounded-lg shadow p-4 sm:p-6"
      :class="isDarkMode ? 'bg-white' : 'bg-white'"
    >
      <h3
        class="text-base sm:text-lg font-medium"
        :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
      >
        {{ currentView.chartTitle }}
      </h3>
      <div class="w-full h-full">
        <canvas id="anomalyChart"></canvas>
      </div>
    </div>

    <!-- Sección de Alertas -->
    <div
      class="w-full sm:w-1/2 rounded-lg shadow p-4 sm:p-6"
      :class="isDarkMode ? 'bg-white' : 'bg-white'"
    >
      <div class="flex items-center justify-between mb-4">
        <h3
          class="text-base sm:text-lg font-medium"
          :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
        >
          Alertas del Sistema
        </h3>
        <div class="flex space-x-2">
          <span
            class="px-2 py-1 text-xs rounded-full cursor-pointer"
            :class="[
              filterType === 'all'
                ? 'bg-gray-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
            @click="filterType = 'all'"
          >
            Todas
          </span>
          <span
            class="px-2 py-1 text-xs rounded-full cursor-pointer"
            :class="[
              filterType === 'critical'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
            @click="filterType = 'critical'"
          >
            Críticas
          </span>
          <span
            class="px-2 py-1 text-xs rounded-full cursor-pointer"
            :class="[
              filterType === 'warning'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
            @click="filterType = 'warning'"
          >
            Advertencias
          </span>
        </div>
      </div>

      <div
        class="h-60 sm:h-80 rounded-md flex flex-col border border-gray-200 overflow-hidden"
        :class="
          isDarkMode
            ? 'bg-[#F8F9FA] text-[#333333]'
            : 'bg-[#F8F9FA] text-[#2E4053]'
        "
      >
        <div
          v-if="filteredAlerts.length === 0"
          class="flex items-center justify-center h-full text-gray-500"
        >
          No hay alertas para mostrar
        </div>

        <div v-else class="flex flex-col flex-grow overflow-auto">
          <div
            v-for="(alert, index) in filteredAlerts"
            :key="index"
            class="p-3 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
          >
            <div class="flex items-start">
              <div
                class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3"
                :class="getAlertTypeClass(alert.type).bgColor"
              >
                <component
                  :is="getAlertTypeClass(alert.type).icon"
                  class="h-4 w-4 text-white"
                />
              </div>

              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <h4
                    class="font-medium text-sm"
                    :class="getAlertTypeClass(alert.type).textColor"
                  >
                    {{ alert.title }}
                  </h4>
                  <span class="text-xs text-gray-500">{{ alert.time }}</span>
                </div>

                <p class="text-sm text-gray-600 mt-1">{{ alert.message }}</p>

                <div class="flex items-center mt-2 text-xs">
                  <span
                    class="px-2 py-0.5 rounded-full"
                    :class="getAlertTypeClass(alert.type).badgeColor"
                  >
                    {{ getAlertTypeClass(alert.type).label }}
                  </span>

                  <span class="ml-2 text-gray-500">
                    Sensor: {{ alert.sensor }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="p-3 border-t border-gray-200 bg-white flex justify-between items-center"
        >
          <span class="text-xs text-gray-500">
            Mostrando {{ filteredAlerts.length }} de {{ alerts.length }} alertas
          </span>
          <button
            class="text-xs text-gray-700 hover:text-gray-900 font-medium flex items-center"
            @click="markAllAsRead"
          >
            <span>Marcar todas como leídas</span>
          </button>
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

const filterType = ref("all");
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
const alerts = ref([
  {
    id: 1,
    type: "critical",
    title: "Presión crítica detectada",
    message:
      "La presión del sistema ha superado el umbral crítico de 85 PSI. Se requiere atención inmediata.",
    time: "Hace 5 min",
    sensor: "Sensor de Presión P-101",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Temperatura elevada",
    message:
      "La temperatura del motor está aumentando gradualmente. Monitorear para prevenir sobrecalentamiento.",
    time: "Hace 15 min",
    sensor: "Sensor de Temperatura T-203",
    read: false,
  },
  {
    id: 3,
    type: "critical",
    title: "Fallo en bomba de agua",
    message:
      "La bomba principal ha dejado de funcionar. El sistema ha cambiado automáticamente a la bomba de respaldo.",
    time: "Hace 32 min",
    sensor: "Controlador de Bomba B-001",
    read: false,
  },
  {
    id: 4,
    type: "warning",
    title: "Nivel de agua bajo",
    message:
      "El nivel de agua en el tanque principal está por debajo del 25%. Considere recargar el sistema.",
    time: "Hace 1 hora",
    sensor: "Sensor de Nivel L-305",
    read: true,
  },
  {
    id: 5,
    type: "info",
    title: "Mantenimiento programado",
    message:
      "Recordatorio: El mantenimiento preventivo está programado para mañana a las 10:00 AM.",
    time: "Hace 3 horas",
    sensor: "Sistema",
    read: true,
  },
]);

// Filtrar alertas según el tipo seleccionado
const filteredAlerts = computed(() => {
  if (filterType.value === "all") {
    return alerts.value;
  }
  return alerts.value.filter((alert) => alert.type === filterType.value);
});

// Función para obtener clases según el tipo de alerta
const getAlertTypeClass = (type) => {
  switch (type) {
    case "critical":
      return {
        bgColor: "bg-red-600",
        textColor: "text-red-600",
        badgeColor: "bg-red-100 text-red-800",
        icon: "ExclamationCircleIcon",
        label: "Crítica",
      };
    case "warning":
      return {
        bgColor: "bg-yellow-500",
        textColor: "text-yellow-700",
        badgeColor: "bg-yellow-100 text-yellow-800",
        icon: "ExclamationTriangleIcon",
        label: "Advertencia",
      };
    case "info":
      return {
        bgColor: "bg-blue-500",
        textColor: "text-blue-600",
        badgeColor: "bg-blue-100 text-blue-800",
        icon: "InformationCircleIcon",
        label: "Información",
      };
    default:
      return {
        bgColor: "bg-gray-500",
        textColor: "text-gray-700",
        badgeColor: "bg-gray-100 text-gray-800",
        icon: "BellIcon",
        label: "Notificación",
      };
  }
};

// Marcar todas las alertas como leídas
const markAllAsRead = () => {
  alerts.value = alerts.value.map((alert) => ({
    ...alert,
    read: true,
  }));
};

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
