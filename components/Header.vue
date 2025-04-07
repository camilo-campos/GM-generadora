<template>
  <header
    class="shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10"
    :class="isDarkMode ? 'bg-white' : 'bg-white border-b border-[#E9ECEF]'"
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
</template>

<script setup>
defineProps({
  isDarkMode: Boolean,
  isMobile: Boolean,
  currentView: Object,
});

const emit = defineEmits(["toggleSidebar"]);

const toggleSidebar = () => emit("toggleSidebar");
</script>
