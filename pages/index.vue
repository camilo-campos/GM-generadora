<template>
  <div :class="[isDarkMode ? 'dark' : 'light', 'h-screen']">
    <!-- Theme Toggle Button -->
    <button
      @click="toggleTheme"
      class="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors"
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
      <!-- Sidebar -->
      <div
        class="w-64 shadow-lg"
        :class="
          isDarkMode ? 'bg-[#2E4053]' : 'bg-white border-r border-[#E9ECEF]'
        "
      >
        <!-- Logo/Header -->
        <div
          class="px-6 py-4 border-b"
          :class="isDarkMode ? 'border-[#333333]' : 'border-[#E9ECEF]'"
        >
          <h1
            class="text-xl font-semibold"
            :class="isDarkMode ? 'text-white' : 'text-[#2E4053]'"
          >
            Dashboard GM
          </h1>
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
              @click="activeView = item.id"
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
        class="flex-1 overflow-auto"
        :class="isDarkMode ? 'bg-[#F5F5F5]' : 'bg-[#F8F9FA]'"
      >
        <!-- Header -->
        <header
          class="shadow-sm px-6 py-4 flex items-center justify-between"
          :class="
            isDarkMode ? 'bg-white' : 'bg-white border-b border-[#E9ECEF]'
          "
        >
          <h2
            class="text-lg font-medium"
            :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
          >
            {{ currentView.name }}
          </h2>
        </header>

        <!-- Dashboard Content -->
        <main class="p-6">
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
          >
            <!-- Stat Cards -->
            <div
              v-for="(stat, index) in stats"
              :key="index"
              class="rounded-lg shadow p-5"
              :class="isDarkMode ? 'bg-white' : 'bg-white'"
            >
              <div class="flex items-center">
                <div :class="isDarkMode ? stat.darkBgColor : stat.lightBgColor">
                  <component :is="stat.icon" class="h-6 w-6" />
                </div>
                <div class="ml-4">
                  <p
                    class="text-sm font-medium"
                    :class="isDarkMode ? 'text-[#B1B1B1]' : 'text-[#6C757D]'"
                  >
                    {{ stat.name }}
                  </p>
                  <p
                    class="text-2xl font-semibold"
                    :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
                  >
                    {{ stat.value }}
                  </p>
                </div>
              </div>
              <div class="mt-2 flex items-center text-sm">
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
                  >vs previous period</span
                >
              </div>
            </div>
          </div>

          <!-- Main Chart Area -->
          <div
            class="rounded-lg shadow p-6 mb-6"
            :class="isDarkMode ? 'bg-white' : 'bg-white'"
          >
            <div class="flex items-center justify-between mb-4">
              <h3
                class="text-lg font-medium"
                :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
              >
                {{ currentView.chartTitle }}
              </h3>
              <div class="flex space-x-2">
                <button
                  v-for="(period, index) in ['DIA', 'SEMANA', 'MES', 'AÑO']"
                  :key="index"
                  :class="[
                    'px-3 py-1 text-sm rounded-md',
                    chartPeriod === period.toLowerCase()
                      ? isDarkMode
                        ? 'bg-[#2E4053] text-white font-medium'
                        : 'bg-[#2E4053] text-white font-medium'
                      : isDarkMode
                      ? 'text-[#333333] hover:bg-[#F0F0F0]'
                      : 'text-[#495057] hover:bg-[#F1F3F5]',
                  ]"
                  @click="chartPeriod = period.toLowerCase()"
                >
                  {{ period }}
                </button>
              </div>
            </div>

            <!-- Chart Placeholder -->
            <div
              class="h-80 rounded-md flex items-center justify-center"
              :class="isDarkMode ? 'bg-[#F5F5F5]' : 'bg-[#F1F3F5]'"
            >
              <div class="text-center">
                <div
                  :class="isDarkMode ? 'text-[#B1B1B1]' : 'text-[#ADB5BD]'"
                  class="mb-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-12 w-12 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'">
                  {{ currentView.chartDescription }}
                </p>
                <p
                  class="text-sm mt-1"
                  :class="isDarkMode ? 'text-[#B1B1B1]' : 'text-[#6C757D]'"
                >
                  Data visualization would be rendered here
                </p>
              </div>
            </div>
          </div>

          <!-- Secondary Charts Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              v-for="(chart, index) in secondaryCharts"
              :key="index"
              class="rounded-lg shadow p-6"
              :class="isDarkMode ? 'bg-white' : 'bg-white'"
            >
              <h3
                class="text-lg font-medium mb-4"
                :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
              >
                {{ chart.title }}
              </h3>

              <!-- Secondary Chart Placeholder -->
              <div
                class="h-60 rounded-md flex items-center justify-center"
                :class="isDarkMode ? 'bg-[#F5F5F5]' : 'bg-[#F1F3F5]'"
              >
                <div class="text-center">
                  <component
                    :is="chart.icon"
                    class="h-8 w-8 mx-auto mb-2"
                    :class="isDarkMode ? 'text-[#B1B1B1]' : 'text-[#ADB5BD]'"
                  />
                  <p
                    class="text-sm"
                    :class="isDarkMode ? 'text-[#333333]' : 'text-[#2E4053]'"
                  >
                    {{ chart.description }}
                  </p>
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
import { ref, computed, onMounted } from "vue";

// Theme state
const isDarkMode = ref(true);

// Toggle theme function
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  // Save theme preference to localStorage
  localStorage.setItem("darkMode", isDarkMode.value ? "true" : "false");
};

// Load theme preference on mount
onMounted(() => {
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme !== null) {
    isDarkMode.value = savedTheme === "true";
  }
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
    name: "Total Logs",
    value: "24,521",
    change: "12%",
    trend: "up",
    icon: "DocumentTextIcon",
    darkBgColor: "p-3 rounded-full bg-[#2E4053] text-white",
    lightBgColor: "p-3 rounded-full bg-[#E7F5FF] text-[#2E4053]",
  },
  {
    name: "Active Sensors",
    value: "42",
    change: "8%",
    trend: "up",
    icon: "SignalIcon",
    darkBgColor: "p-3 rounded-full bg-[#333333] text-white",
    lightBgColor: "p-3 rounded-full bg-[#E9ECEF] text-[#495057]",
  },
  {
    name: "Error Rate",
    value: "0.8%",
    change: "3%",
    trend: "down",
    icon: "ExclamationTriangleIcon",
    darkBgColor: "p-3 rounded-full bg-[#B1B1B1] text-white",
    lightBgColor: "p-3 rounded-full bg-[#FFF9DB] text-[#E67700]",
  },
];

// Secondary charts
const secondaryCharts = [
  {
    title: "Top Log Sources",
    description: "Distribution of logs by source",
    icon: "ChartPieIcon",
  },
  {
    title: "Sensor Status",
    description: "Current status of all sensors",
    icon: "SignalIcon",
  },
];

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

// These would be imported from a UI library in a real app
// For this example, we're defining them as empty components
const ChartBarIcon = {};
const ListBulletIcon = {};
const SignalIcon = {};
const BoltIcon = {};
const BellIcon = {};
const DocumentTextIcon = {};
const ExclamationTriangleIcon = {};
const ChartPieIcon = {};
</script>
