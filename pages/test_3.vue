<template>
    <div class="p-4 bg-white rounded-lg shadow">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 class="text-xl font-bold text-gray-800 mb-3 sm:mb-0">Alertas y Avisos</h1>
        
        <!-- Filtros -->
        <div class="flex flex-wrap gap-2">
          <button 
            @click="filtroActual = 'TODOS'" 
            :class="[
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              filtroActual === 'TODOS' 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            Todos ({{ bitacorasConAlerta.length }})
          </button>
          
          <button 
            @click="filtroActual = 'ALERTA'" 
            :class="[
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              filtroActual === 'ALERTA' 
                ? 'bg-red-600 text-white' 
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            ]"
          >
            Alertas ({{ conteoAlertas }})
          </button>
          
          <button 
            @click="filtroActual = 'AVISO'" 
            :class="[
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              filtroActual === 'AVISO' 
                ? 'bg-amber-500 text-white' 
                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
            ]"
          >
            Avisos ({{ conteoAvisos }})
          </button>
        </div>
      </div>
      
      <div v-if="isLoading" class="py-8 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-gray-600 mb-2"></div>
        <p class="text-lg font-semibold text-gray-700">Cargando alertas...</p>
      </div>
      
      <div v-else>
        <!-- Mostrar un mensaje si no hay alertas disponibles -->
        <div v-if="bitacorasConAlerta.length === 0" class="py-8 text-center text-gray-500">
          No se encontraron alertas ni avisos.
        </div>
        
        <!-- Mostrar un mensaje si hay alertas pero ninguna coincide con el filtro -->
        <div v-else-if="bitacorasFiltradas.length === 0" class="py-8 text-center text-gray-500">
          No se encontraron resultados para el filtro seleccionado.
        </div>
        
        <!-- Recorrer y mostrar las bitácoras filtradas -->
        <div v-else class="space-y-3">
          <div
            v-for="alerta in bitacorasFiltradas"
            :key="alerta.id"
            :class="[
              'p-4 rounded-lg border-l-4 transition-all',
              alerta.alerta_aviso === 'ALERTA' 
                ? 'bg-red-50 border-red-500' 
                : 'bg-amber-50 border-amber-500'
            ]"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-center">
                <span 
                  :class="[
                    'inline-flex items-center justify-center w-8 h-8 rounded-full mr-3',
                    alerta.alerta_aviso === 'ALERTA' 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-amber-100 text-amber-600'
                  ]"
                >
                  <svg v-if="alerta.alerta_aviso === 'ALERTA'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </span>
                <span 
                  :class="[
                    'font-medium text-sm px-2.5 py-0.5 rounded-full',
                    alerta.alerta_aviso === 'ALERTA' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-amber-100 text-amber-800'
                  ]"
                >
                  {{ alerta.alerta_aviso }}
                </span>
              </div>
              <span class="text-xs text-gray-500">
                {{ formatearFecha(alerta.tiempo_ejecucion) }}
              </span>
            </div>
            
            <p class="mt-2 text-gray-700">
              {{ alerta.bitacora }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script setup>
  import { ref, onMounted, computed, watch } from "vue";
  import { Chart, registerables } from "chart.js";
  import { useBitacoras } from "@/composables/useBitacoras";
  
  Chart.register(...registerables);
  
  // Obtener las bitácoras mediante Tanstack Query
  const { bitacoras, isLoading } = useBitacoras();
  
  // Estado para el filtro actual
  const filtroActual = ref('TODOS'); // Valores posibles: 'TODOS', 'ALERTA', 'AVISO'
  
  // Propiedad computada para filtrar las bitácoras que tengan un valor en alerta_aviso
  const bitacorasConAlerta = computed(() => {
    const lista = bitacoras.value;
    // Si la lista no existe o no es un arreglo, retorna arreglo vacío
    if (!lista || !Array.isArray(lista)) return [];
    return lista.filter(b => b.alerta_aviso != null);
  });
  
  // Propiedad computada para aplicar el filtro seleccionado
  const bitacorasFiltradas = computed(() => {
    if (filtroActual.value === 'TODOS') {
      return bitacorasConAlerta.value;
    }
    return bitacorasConAlerta.value.filter(b => b.alerta_aviso === filtroActual.value);
  });
  
  // Conteo de alertas y avisos para mostrar en los botones de filtro
  const conteoAlertas = computed(() => {
    return bitacorasConAlerta.value.filter(b => b.alerta_aviso === 'ALERTA').length;
  });
  
  const conteoAvisos = computed(() => {
    return bitacorasConAlerta.value.filter(b => b.alerta_aviso === 'AVISO').length;
  });
  
  // Función para formatear la fecha de manera más amigable
  const formatearFecha = (fechaString) => {
    if (!fechaString) return '';
    
    try {
      const fecha = new Date(fechaString);
      return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(fecha);
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return fechaString;
    }
  };
  
  // Esperar a que "bitacoras" se cargue y luego mostrar su valor en la consola
  watch(bitacoras, (newVal) => {
    if (newVal && Array.isArray(newVal)) {
      console.log("Todas las bitácoras:", newVal);
      console.log("Bitácoras con alerta:", bitacorasConAlerta.value);
    }
  });
  
  // Props
  defineProps({
    currentView: {
      type: Object,
      default: () => ({
        chartTitle: "Visión general del sistema",
      }),
    },
    isDarkMode: {
      type: Boolean,
      default: false,
    },
  });
  </script>