<template>
  <div :class="[isDarkMode ? 'dark' : 'light', 'h-screen']">
    <!-- <div>
      <Bar :data="chartData" :options="chartOptions" />
    </div> -->
    <div></div>
    <button
      @click="toggleTheme"
      class="fixed top-4 right-4 z-20 p-2 rounded-full transition-colors"
      :class="
        isDarkMode ? 'bg-white text-[#333333]' : 'bg-[#333333] text-white'
      "
    >
      <svg
        v-if="isDarkMode"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        />
      </svg>
    </button>

    <div
      class="flex h-screen"
      :class="isDarkMode ? 'bg-[#F5F5F5]' : 'bg-[#F8F9FA]'"
    >
      <!-- Mobile Sidebar Overlay -->
      <div
        v-if="isSidebarOpen && isMobile"
        class="fixed inset-0 bg-black bg-opacity-50 z-30"
        @click="toggleSidebar"
      ></div>

      <!-- Sidebar -->
      <div
        :class="[
          'shadow-lg transition-all duration-300 z-40',
          isDarkMode ? 'bg-[#2E4053]' : 'bg-white border-r border-[#E9ECEF]',
          isMobile ? 'fixed h-full' : 'relative w-64',
          isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0',
        ]"
        :style="isMobile ? 'width: 240px' : ''"
      >
        <!-- Logo/Header -->
        <div
          class="px-6 py-4 border-b flex justify-between items-center"
          :class="isDarkMode ? 'border-[#333333]' : 'border-[#E9ECEF]'"
        >
          <h1
            class="text-xl font-semibold"
            :class="isDarkMode ? 'text-white' : 'text-[#2E4053]'"
          >
            Dashboard GM
          </h1>
          <button
            v-if="isMobile"
            @click="toggleSidebar"
            :class="isDarkMode ? 'text-white' : 'text-[#2E4053]'"
            class="p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Navigation -->
        <nav class="px-4 py-4">
          <p
            class="text-xs font-medium uppercase tracking-wider mb-2"
            :class="isDarkMode ? 'text-[#B1B1B1]' : 'text-[#6C757D]'"
          >
            Visualizaciones
          </p>

          <div class="space-y-1">
            <button
              v-for="(item, index) in navItems"
              :key="index"
              @click="selectNavItem(item.id)"
              :class="[
                'w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors',
                activeView === item.id
                  ? isDarkMode
                    ? 'bg-[#333333] text-white font-medium'
                    : 'bg-[#E9ECEF] text-[#2E4053] font-medium'
                  : isDarkMode
                  ? 'text-[#B1B1B1] hover:bg-[#3A5065] hover:text-white'
                  : 'text-[#495057] hover:bg-[#F1F3F5] hover:text-[#2E4053]',
              ]"
            >
              <component :is="item.icon" class="h-5 w-5 mr-2" />
              {{ item.name }}
            </button>
          </div>
        </nav>
      </div>

      <!-- Main Content -->
      <div
        class="flex-1 overflow-auto relative"
        :class="isDarkMode ? 'bg-[#F5F5F5]' : 'bg-[#F8F9FA]'"
      >
        <!-- Header -->
        <header
          class="shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10"
          :class="
            isDarkMode ? 'bg-white' : 'bg-white border-b border-[#E9ECEF]'
          "
        >
          <!-- Mobile Menu Toggle -->
          <button
            v-if="isMobile"
            @click="toggleSidebar"
            :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
            class="p-1 mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <h2
            class="text-lg font-medium truncate"
            :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
          >
            {{ currentView.name }}
          </h2>

          <!-- Spacer for mobile to balance the menu button -->
          <div v-if="isMobile" class="w-6"></div>
        </header>

        <!-- Dashboard Content -->
        <main class="p-4 sm:p-6">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6"
          >
            <!-- Stat Cards -->
            <div
              v-if="currentView.id === 'overview'"
              v-for="(stat, index) in stats"
              :key="index"
              class="rounded-lg shadow p-4 sm:p-5"
              :class="isDarkMode ? 'bg-white' : 'bg-white'"
            >
              <div class="flex items-center">
                <div
                  v-if="currentView.id === 'overview'"
                  :class="isDarkMode ? stat.darkBgColor : stat.lightBgColor"
                >
                  <component :is="stat.icon" class="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div v-if="currentView.id === 'overview'" class="ml-3 sm:ml-4">
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
              <div v-if="currentView.id === 'logs'" class="flex items-center">
                <div
                  v-if="currentView.id === 'logs'"
                  :class="isDarkMode ? stat.darkBgColor : stat.lightBgColor"
                ></div>
                <div v-if="currentView.id === 'logs'" class="ml-3 sm:ml-4">
                  <p
                    class="text-xl sm:text-2xl font-medium"
                    :class="isDarkMode ? 'text-[#B1B1B1]' : 'text-[#6C757D]'"
                  >
                    hola
                  </p>
                  <p
                    class="text-xl sm:text-2xl font-semibold"
                    :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
                  ></p>
                </div>
              </div>
              <div
                v-if="currentView.id === 'overview'"
                class="mt-2 flex items-center text-xs sm:text-sm"
              >
                <span
                  :class="
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  "
                >
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
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6"
          >
            <!-- Stat Cards -->
            <div
              v-if="currentView.id === 'logs'"
              class="rounded-lg shadow p-4 sm:p-5"
              :class="isDarkMode ? 'bg-white' : 'bg-white'"
            >
              <div class="flex items-center">
                <div v-if="currentView.id === 'logs'" class="ml-3 sm:ml-4">
                  <p
                    class="text-xl sm:text-2xl font-medium"
                    :class="isDarkMode ? 'text-[#111111]' : 'text-[#6C757D]'"
                  >
                    Cantidad de Bitarocas Total : 1000
                  </p>
                </div>
              </div>
            </div>
            <div
              v-if="currentView.id === 'logs'"
              class="rounded-lg shadow p-4 sm:p-5"
              :class="isDarkMode ? 'bg-white' : 'bg-white'"
            >
              <div class="flex items-center">
                <div v-if="currentView.id === 'logs'" class="ml-3 sm:ml-4">
                  <p
                    class="text-xl sm:text-2xl font-medium"
                    :class="isDarkMode ? 'text-[#B1B1B1]' : 'text-[#6C757D]'"
                  >
                    hola
                  </p>
                </div>
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
              <div class="w-full h-full" v-if="currentView.id === 'overview'">
                <canvas id="anomalyChart"></canvas>
              </div>
            </div>

            <!-- Segundo gráfico -->
            <div
              class="w-full sm:w-1/2 rounded-lg shadow p-4 sm:p-6"
              :class="isDarkMode ? 'bg-white' : 'bg-white'"
            >
              <h3
                class="text-base sm:text-lg font-medium"
                :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
                v-if="currentView.id === 'overview'"
              >
                Alertas
              </h3>
              <div
                v-if="currentView.id === 'overview'"
                class="h-60 sm:h-80 rounded-md flex flex-col border border-gray-300 p-4"
                :class="
                  isDarkMode
                    ? 'bg-[#F5F5F5] text-[#333333]'
                    : 'bg-[#F1F3F5] text-[#2E4053]'
                "
              >
                <ul class="flex flex-col flex-grow overflow-auto space-y-2">
                  <li
                    v-for="(item, index) in [
                      'Elemento 1',
                      'Elemento 2',
                      'Elemento 3',
                      'Elemento 4',
                    ]"
                    :key="index"
                    class="p-4 border rounded-md hover:bg-gray-200"
                    :class="
                      index === 1
                        ? 'bg-white border-red-500 text-red-500'
                        : 'border-gray-300'
                    "
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Secondary Charts Grid -->
          <div
            v-if="currentView.id === 'overview'"
            class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
          >
            <div
              v-for="(chart, index) in secondaryCharts"
              :key="index"
              class="rounded-lg shadow p-4 sm:p-6"
              :class="isDarkMode ? 'bg-white' : 'bg-white'"
            >
              <h3
                class="text-base sm:text-lg font-medium mb-3 sm:mb-4"
                :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
              >
                {{ chart.title }}
              </h3>

              <!-- Secondary Chart Placeholder -->
              <div
                class="h-48 sm:h-60 rounded-md flex items-center justify-center"
                :class="isDarkMode ? 'bg-[#F5F5F5]' : 'bg-[#F1F3F5]'"
              >
                <div class="text-center px-4">
                  <component
                    :is="chart.icon"
                    class="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2"
                    :class="isDarkMode ? 'text-[#B1B1B1]' : 'text-[#ADB5BD]'"
                  />
                  <img src="" alt="" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

//codigo del grafico

const myChart = ref(null);
import { Chart, registerables } from "chart.js";

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

// fin del codigo de grafico

// Theme state
const isDarkMode = ref(true);

// Mobile state
const isMobile = ref(false);
const isSidebarOpen = ref(false);

// Check if mobile on mount and when window resizes
const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768;
  // Close sidebar automatically on mobile when switching to mobile view
  if (isMobile.value && isSidebarOpen.value) {
    isSidebarOpen.value = false;
  }
};

// Toggle sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Handle navigation item selection (close sidebar on mobile)
const selectNavItem = (id) => {
  activeView.value = id;
  if (isMobile.value) {
    isSidebarOpen.value = false;
  }
};

// Toggle theme function
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  // Save theme preference to localStorage
  localStorage.setItem("darkMode", isDarkMode.value ? "true" : "false");
};

// Función que se invoca al hacer click en el botón para actualizar el gráfico

// Setup resize listener
onMounted(() => {
  createChart({
    labels: labels.value,
    datasets: datasets.value,
  });

  setTimeout(() => {
    updateChart("21:20", [0.3]);
  }, 5000);
  setTimeout(() => {
    updateChart("21:21", [0.6]);
  }, 8000);
  setTimeout(() => {
    updateChart("21:22", [0.1]);
  }, 11000);
  setTimeout(() => {
    updateChart("21:23", [0.7]);
  }, 13000);
  setTimeout(() => {
    updateChart("21:24", [0.7]);
  }, 16000);
  setTimeout(() => {
    updateChart("21:25", [0.9]);
  }, 19000);

  setTimeout(() => {
    updateChart("21:26", [0.4]);
  }, 21000);

  // Load theme preference
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme !== null) {
    isDarkMode.value = savedTheme === "true";
  }

  // Check initial screen size
  checkIfMobile();

  // Add resize listener
  window.addEventListener("resize", checkIfMobile);
});

// Clean up resize listener
onBeforeUnmount(() => {
  window.removeEventListener("resize", checkIfMobile);
});

// Navigation items
const navItems = [
  { id: "overview", name: "Visión general", icon: "ChartBarIcon" },
  { id: "logs", name: "Clasificación de registros", icon: "ListBulletIcon" },
  { id: "sensors", name: "Gráficos de sensores", icon: "SignalIcon" },
  { id: "performance", name: "Rendimiento", icon: "BoltIcon" },
  { id: "alerts", name: "Alertas", icon: "BellIcon" },
];

// Active view state
const activeView = ref("overview");

// Chart period state
const chartPeriod = ref("semana");

// Stats data with both dark and light mode colors
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

// Secondary charts
const secondaryCharts = [
  {
    title: "Bomba 1",
    description: "Distribution of logs by source",
    icon: "ChartPieIcon",
  },
  {
    title: "Bomba 2",
    description: "Current status of all sensors",
    icon: "SignalIcon",
  },
];

watch(activeView, (nuevoValor, valorPrevio) => {
  const nuevoView = navItems.find((item) => item.id === nuevoValor);
  const viewPrevio = navItems.find((item) => item.id === valorPrevio);
  console.log("valores ");
  if (nuevoView.id === "overview" && viewPrevio?.id !== "overview") {
    if (myChart.value) {
      myChart.value.destroy();
      myChart.value = null;
    }
    setTimeout(() => {
      createChart({
        labels: labels.value,
        datasets: datasets.value,
      });
    }, 50);
  }
});

// Computed properties
const currentView = computed(() => {
  const view = navItems.find((item) => item.id === activeView.value);

  // Add additional view-specific data
  switch (view.id) {
    case "overview":
      return {
        ...view,
        chartTitle: "Visión general del sistema",
        chartDescription: "Rendimiento global del sistema y métricas",
      };
    case "logs":
      return {
        ...view,
        chartTitle: "Registrar actividad",
        chartDescription: "Volumen de registros y distribución en el tiempo",
      };
    case "sensors":
      return {
        ...view,
        chartTitle: "Lecturas de los sensores",
        chartDescription: "Visualización de datos agregados de sensores",
      };
    case "performance":
      return {
        ...view,
        chartTitle: "Métricas de rendimiento",
        chartDescription: "Indicadores de rendimiento del sistema",
      };
    case "alerts":
      return {
        ...view,
        chartTitle: "Historial de alertas",
        chartDescription: "Alertas y notificaciones recientes",
      };
    default:
      return view;
  }
});
</script>
