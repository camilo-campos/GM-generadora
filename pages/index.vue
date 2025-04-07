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

        <!-- Dashboard Content -->
        <main class="p-4 sm:p-6" v-if="currentView.id === 'overview'">
          <Overview :currentView="currentView" :isDarkMode="isDarkMode" />
        </main>
        <main class="p-4 sm:p-6" v-if="currentView.id === 'sensors'">
          <Sensors :currentView="currentView" />
        </main>
        <main class="p-4 sm:p-6" v-if="currentView.id === 'logs'">
          <Logs :currentView="currentView" :isDarkMode="isDarkMode" />
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
  { id: "performance", name: "Analisis de fallas", icon: "BoltIcon" },
  { id: "alerts", name: "Alertas", icon: "BellIcon" },
];

// Active view state
const activeView = ref("overview");

// Chart period state
const chartPeriod = ref("semana");

// Stats data with both dark and light mode colors

// Secondary charts

watch(activeView, (nuevoValor, valorPrevio) => {
  const nuevoView = navItems.find((item) => item.id === nuevoValor);
  const viewPrevio = navItems.find((item) => item.id === valorPrevio);
  console.log("valores :", nuevoView.value);
  if (nuevoView.id === "overview" && viewPrevio?.id !== "overview") {
    if (myChart.value) {
      myChart.value.destroy();
      myChart.value = null;
    }
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
