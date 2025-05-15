<!-- pages/callback.vue -->
<template>
  
    <div v-if="error" class="text-red-500">{{ error }}
    Processing login...
  </div>
</template>

<script setup>
const { $auth } = useNuxtApp();
const route = useRoute();
const error = ref(null);

onMounted(async () => {
  try {
    const claims = await $auth.handleCallback(route.query.code);
    await navigateTo('/test');
  } catch (err) {
    error.value = 'Login failed. Please try again.';
    console.error('Authentication error:', err);
  }
});
</script>