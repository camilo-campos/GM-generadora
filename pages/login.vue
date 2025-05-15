<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
      <button 
        @click="login"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Iniciar sesión con Azure AD
      </button>
    </div>
  </div>
</template>

<script setup>
const { $auth } = useNuxtApp()

const login = () => {
  $auth.login()
}
</script>
