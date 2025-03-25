<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-lg">
      <!-- Logo/Header -->
      <div class="px-6 py-4 border-b">
        <h1 class="text-xl font-semibold text-gray-800">Dashboard GM</h1>
      </div>

      <!-- Navigation -->
      <nav class="px-4 py-4">
        <p
          class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2"
        >
          Visualizations
        </p>

        <div class="space-y-1">
          <button
            v-for="(item, index) in navItems"
            :key="index"
            @click="activeView = item.id"
            :class="[
              'w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors',
              activeView === item.id
                ? 'bg-indigo-50 text-indigo-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100',
            ]"
          >
            <component :is="item.icon" class="h-5 w-5 mr-2" />
            {{ item.name }}
          </button>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <!-- Header -->
      <header
        class="bg-white shadow-sm px-6 py-4 flex items-center justify-between"
      >
        <h2 class="text-lg font-medium text-gray-800">
          {{ currentView.name }}
        </h2>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <select
              class="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-1 px-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Custom range</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <button
            class="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700 transition-colors"
          >
            Export
          </button>
        </div>
      </header>

      <!-- Dashboard Content -->
      <main class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <!-- Stat Cards -->
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="bg-white rounded-lg shadow p-5"
          >
            <div class="flex items-center">
              <div
                :class="`p-3 rounded-full ${stat.bgColor} ${stat.textColor}`"
              >
                <component :is="stat.icon" class="h-6 w-6" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">{{ stat.name }}</p>
                <p class="text-2xl font-semibold text-gray-800">
                  {{ stat.value }}
                </p>
              </div>
            </div>
            <div class="mt-2 flex items-center text-sm">
              <span
                :class="stat.trend === 'up' ? 'text-green-600' : 'text-red-600'"
              >
                {{ stat.trend === "up" ? "↑" : "↓" }} {{ stat.change }}
              </span>
              <span class="text-gray-500 ml-1">vs previous period</span>
            </div>
          </div>
        </div>

        <!-- Main Chart Area -->
        <div class="bg-white rounded-lg shadow p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-800">
              {{ currentView.chartTitle }}
            </h3>
            <div class="flex space-x-2">
              <button
                v-for="(period, index) in ['Day', 'Week', 'Month', 'Year']"
                :key="index"
                :class="[
                  'px-3 py-1 text-sm rounded-md',
                  chartPeriod === period.toLowerCase()
                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100',
                ]"
                @click="chartPeriod = period.toLowerCase()"
              >
                {{ period }}
              </button>
            </div>
          </div>

          <!-- Chart Placeholder -->
          <div
            class="h-80 bg-gray-50 rounded-md flex items-center justify-center"
          >
            <div class="text-center">
              <div class="text-gray-400 mb-2">
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
              <p class="text-gray-500">{{ currentView.chartDescription }}</p>
              <p class="text-sm text-gray-400 mt-1">
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
            class="bg-white rounded-lg shadow p-6"
          >
            <h3 class="text-lg font-medium text-gray-800 mb-4">
              {{ chart.title }}
            </h3>

            <!-- Secondary Chart Placeholder -->
            <div
              class="h-60 bg-gray-50 rounded-md flex items-center justify-center"
            >
              <div class="text-center">
                <component
                  :is="chart.icon"
                  class="h-8 w-8 mx-auto text-gray-400 mb-2"
                />
                <p class="text-sm text-gray-500">{{ chart.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

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
const chartPeriod = ref("week");

// Stats data
const stats = [
  {
    name: "Total Logs",
    value: "24,521",
    change: "12%",
    trend: "up",
    icon: "DocumentTextIcon",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    name: "Active Sensors",
    value: "42",
    change: "8%",
    trend: "up",
    icon: "SignalIcon",
    bgColor: "bg-green-100",
    textColor: "text-green-600",
  },
  {
    name: "Error Rate",
    value: "0.8%",
    change: "3%",
    trend: "down",
    icon: "ExclamationTriangleIcon",
    bgColor: "bg-amber-100",
    textColor: "text-amber-600",
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
