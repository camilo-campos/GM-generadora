<!-- pages/login.vue -->
<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <button 
        @click="$auth.login()"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Login with IBM Cloud App ID
      </button>
    
  </template>