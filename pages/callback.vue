<template>
  <div class="min-h-screen flex items-center justify-center">
    <div v-if="error" class="text-red-500 text-center p-4">
      {{ error }}
    </div>
    <div v-else class="text-center">
      <div class="text-xl mb-4">Procesando autenticación...</div>
      <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { $auth } = useNuxtApp()
const error = ref(null)

onMounted(async () => {
  try {
    if (route.query.code) {
      // El método handleCallback ya implementa la redirección al dashboard
      // por lo que no necesitamos hacer navigateTo aquí
      await $auth.handleCallback(route.query.code)
      // La redirección se maneja en auth.js
      const router = useRouter()
      router.push('/')
    } else {
      error.value = 'No se recibió código de autorización'
    }
  } catch (err) {
    console.error('Authentication error:', err)
    error.value = 'Error de autenticación. Por favor intenta nuevamente.'
  }
})
</script>
