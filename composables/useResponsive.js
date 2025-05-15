import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useResponsive() {
  const isMobile = ref(false);
  const isSidebarOpen = ref(false);
  
  // Check if mobile on mount and when window resizes with throttling
  const checkIfMobile = () => {
    isMobile.value = window.innerWidth < 768;
    // Close sidebar automatically on mobile when switching to mobile view
    if (isMobile.value && isSidebarOpen.value) {
      isSidebarOpen.value = false;
    }
  };
  
  // Throttle function implementation
  const throttle = (func, delay) => {
    let lastCall = 0;
    return function(...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return func(...args);
    };
  };
  
  // Toggle sidebar
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };
  
  // Create throttled version of checkIfMobile
  const throttledCheckIfMobile = throttle(checkIfMobile, 250);
  
  onMounted(() => {
    // Check initial screen size
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener("resize", throttledCheckIfMobile);
  });
  
  onBeforeUnmount(() => {
    // Clean up resize listener
    window.removeEventListener("resize", throttledCheckIfMobile);
  });
  
  return {
    isMobile,
    isSidebarOpen,
    toggleSidebar,
    checkIfMobile
  };
}
