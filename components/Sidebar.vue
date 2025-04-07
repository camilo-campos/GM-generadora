<template>
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
</template>

<script setup>
defineProps({
  isDarkMode: Boolean,
  isMobile: Boolean,
  isSidebarOpen: Boolean,
  activeView: String,
  navItems: Array,
});

const emit = defineEmits(["toggleSidebar", "selectNavItem"]);

const toggleSidebar = () => emit("toggleSidebar");
const selectNavItem = (id) => emit("selectNavItem", id);
</script>
