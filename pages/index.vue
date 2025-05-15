<template>
  <div :class="[isDarkMode ? 'dark' : 'light', 'h-screen']">
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

        <!-- Dashboard Content with KeepAlive -->
        <main class="p-4 sm:p-6">
          <KeepAlive>
            <component :is="currentComponent" :currentView="currentView" :isDarkMode="isDarkMode" />
          </KeepAlive>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, defineAsyncComponent, watch } from "vue";
import { useTheme } from "../composables/useTheme";
import { useResponsive } from "../composables/useResponsive";

// Optimized Chart.js imports
import { Chart } from "chart.js";
import {
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

// Registrar solo los componentes necesarios de Chart.js
Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Referencia para el gráfico
const myChart = ref(null);

// Usar composables para el tema y la responsividad
const { isDarkMode, toggleTheme } = useTheme();
const { isMobile, isSidebarOpen, toggleSidebar } = useResponsive();

// Lazy loading de componentes
const Overview = defineAsyncComponent(() => import('../components/Overview.vue'));
const Sensors = defineAsyncComponent(() => import('../components/Sensors.vue'));
const Logs = defineAsyncComponent(() => import('../components/Logs.vue'));

// Determinar qué componente mostrar basado en la vista activa
const currentComponent = computed(() => {
  switch (activeView.value) {
    case 'overview': return Overview;
    case 'sensors': return Sensors;
    case 'logs': return Logs;
    default: return Overview;
  }
});

// Handle navigation item selection (close sidebar on mobile)
const selectNavItem = (id) => {
  activeView.value = id;
  if (isMobile.value) {
    isSidebarOpen.value = false;
  }
};

// Navigation items - definidos fuera de cualquier función
const navItems = [
  { id: "overview", name: "Visión general", icon: "ChartBarIcon" },
  { id: "logs", name: "Clasificación de registros", icon: "ListBulletIcon" },
  { id: "sensors", name: "Analisis de fallas", icon: "SignalIcon" },
  //{ id: "performance", name: "Analisis de fallas", icon: "BoltIcon" },
  //{ id: "alerts", name: "Alertas", icon: "BellIcon" },
];

// Active view state
const activeView = ref("overview");

// Chart period state
const chartPeriod = ref("semana");

// Definir la configuración de vistas fuera del componente para mejorar rendimiento
const viewConfigMap = {
  'overview': {
    chartTitle: "Visión general del sistema",
    chartDescription: "Rendimiento global del sistema y métricas",
  },
  'logs': {
    chartTitle: "Registrar actividad",
    chartDescription: "Volumen de registros y distribución en el tiempo",
  },
  'sensors': {
    chartTitle: "Lecturas de los sensores",
    chartDescription: "Visualización de datos agregados de sensores",
  },
  'performance': {
    chartTitle: "Métricas de rendimiento",
    chartDescription: "Indicadores de rendimiento del sistema",
  },
  'alerts': {
    chartTitle: "Historial de alertas",
    chartDescription: "Alertas y notificaciones recientes",
  }
};

// Secondary charts - limpieza de gráficos al cambiar de vista
watch(activeView, (nuevoValor, valorPrevio) => {
  const nuevoView = navItems.find((item) => item.id === nuevoValor);
  const viewPrevio = navItems.find((item) => item.id === valorPrevio);
  
  if (nuevoView.id === "overview" && viewPrevio?.id !== "overview") {
    if (myChart.value) {
      myChart.value.destroy();
      myChart.value = null;
    }
  }
});

// Computed properties - optimizado con memoización implícita
const currentView = computed(() => {
  // Buscar la configuración en el mapa pre-definido
  const view = navItems.find((item) => item.id === activeView.value);
  const viewConfig = viewConfigMap[view.id] || {};
  
  // Combinar la vista con su configuración
  return {
    ...view,
    ...viewConfig
  };
});
</script>
