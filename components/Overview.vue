<template>
  <!-- Layout principal: Alertas/Bitácoras a la izquierda, Gráficos a la derecha -->
  <div class="flex gap-6 mb-6 min-h-[600px] overflow-x-auto">
    <!-- Columna izquierda: Alertas y Bitácoras -->
    <div class="flex-shrink-0 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="rounded-lg shadow p-4 sm:p-6 h-full flex flex-col" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 
            class="text-base sm:text-lg font-medium"
            :class="props.isDarkMode ? 'text-white' : 'text-[#2E4053]'"
          >
            Alertas de Sensores
          </h3>
        
        <div class="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <button 
            @click="filtroActualAlertas = 'TODOS'; paginaActualAlertas = 1" 
            :class="[
              'px-2 py-1 rounded-full text-xs font-medium transition-colors',
              filtroActualAlertas === 'TODOS' 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            Todos ({{ alertas?.length || 0 }})
          </button>
          
          <button 
            @click="filtroActualAlertas = 'CRITICAL'; paginaActualAlertas = 1" 
            :class="[
              'px-2 py-1 rounded-full text-xs font-medium transition-colors',
              filtroActualAlertas === 'CRITICAL' 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            ]"
          >
            Críticas ({{ conteoCritical }})
          </button>
          
          <button 
            @click="filtroActualAlertas = 'ALERT'; paginaActualAlertas = 1" 
            :class="[
              'px-2 py-1 rounded-full text-xs font-medium transition-colors',
              filtroActualAlertas === 'ALERT' 
                ? 'bg-blue-500 text-white' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            ]"
          >
            Alertas ({{ conteoAlert }})
          </button>
          
          <button 
            @click="filtroActualAlertas = 'AVISO'; paginaActualAlertas = 1" 
            :class="[
              'px-2 py-1 rounded-full text-xs font-medium transition-colors',
              filtroActualAlertas === 'AVISO' 
                ? 'bg-teal-500 text-white' 
                : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
            ]"
          >
            Avisos ({{ conteoAviso }})
          </button>
        </div>
      </div>

      <div v-if="isLoading_alerta" class="flex-grow flex items-center justify-center">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4" 
               :class="props.isDarkMode ? 'border-gray-700 border-t-gray-300' : 'border-gray-300 border-t-gray-600'"></div>
          <p class="text-sm font-semibold" :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'">Cargando alertas...</p>
        </div>
      </div>

      <div v-else class="flex-grow flex flex-col">
        <div v-if="!alertas || alertas.length === 0" class="h-full flex items-center justify-center" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">
          No hay alertas registradas.
        </div>
        
        <div v-else-if="alertasFiltradas.length === 0" class="h-full flex items-center justify-center" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">
          No se encontraron resultados para el filtro seleccionado.
        </div>
        
        <div v-else class="space-y-3 flex-grow overflow-y-auto">
          <div
            v-for="alerta in alertasPaginadas"
            :key="alerta.id"
            :class="[
              'p-3 rounded-lg border-l-4 transition-all',
              getAlertaClaseBackground(obtenerTipoAlerta(alerta))
            ]"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-center">
                <span 
                  :class="[
                    'inline-flex items-center justify-center w-6 h-6 rounded-full mr-2',
                    getAlertaClaseIcono(obtenerTipoAlerta(alerta))
                  ]"
                >
                  <svg v-if="obtenerTipoAlerta(alerta) === 'CRITICAL'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else-if="obtenerTipoAlerta(alerta) === 'ALERT'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                  </svg>
                </span>
                <span 
                  :class="[
                    'font-medium text-xs px-2 py-0.5 rounded-full',
                    getAlertaClaseBadge(obtenerTipoAlerta(alerta))
                  ]"
                >
                  {{ obtenerTipoAlerta(alerta) }}
                </span>
              </div>
              <span class="text-xs" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">
                {{ formatearFecha(alerta.timestamp) }}
              </span>
            </div>
            
            <div class="mt-2 flex items-center">
              <span class="text-xs font-medium px-2 py-0.5 rounded-full mr-2" 
                    :class="props.isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'">
                {{ alerta.tipo_sensor.toUpperCase() }}
              </span>
              <span class="text-xs" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">
                Sensor ID: {{ alerta.sensor_id }}
              </span>
            </div>
            
            <p class="mt-2 text-sm" :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              {{ alerta.descripcion }}
            </p>
          </div>
        </div>
        
        <div v-if="alertasFiltradas.length > elementosPorPaginaAlertas" 
              class="mt-4 flex items-center justify-between pt-3"
              :class="props.isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'">
          <div class="flex items-center text-xs" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">
            Mostrando {{ (paginaActualAlertas - 1) * elementosPorPaginaAlertas + 1 }} - 
            {{ Math.min(paginaActualAlertas * elementosPorPaginaAlertas, alertasFiltradas.length) }} 
            de {{ alertasFiltradas.length }}
          </div>
          
          <div class="flex gap-1">
            <button 
              @click="paginaActualAlertas = Math.max(1, paginaActualAlertas - 1)"
              :disabled="paginaActualAlertas === 1"
              :class="[
                'p-1 rounded transition-colors',
                paginaActualAlertas === 1 
                  ? (isDarkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed')
                  : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <div class="flex items-center px-2 text-sm" :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              {{ paginaActualAlertas }} / {{ totalPaginasAlertas }}
            </div>
            
            <button 
              @click="paginaActualAlertas = Math.min(totalPaginasAlertas, paginaActualAlertas + 1)"
              :disabled="paginaActualAlertas === totalPaginasAlertas"
              :class="[
                'p-1 rounded transition-colors',
                paginaActualAlertas === totalPaginasAlertas 
                  ? (isDarkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed')
                  : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

      <div class="rounded-lg shadow p-4 sm:p-6 h-full flex flex-col" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 
            class="text-base sm:text-lg font-medium"
            :class="props.isDarkMode ? 'text-white' : 'text-[#2E4053]'"
          >
            Bitacoras de Alertas y Avisos
          </h3>
        
        <div class="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <button 
            @click="filtroActual = 'TODOS'; paginaActual = 1" 
            :class="[
              'px-2 py-1 rounded-full text-xs font-medium transition-colors',
              filtroActual === 'TODOS' 
                ? (isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-800 text-white')
                : (isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
            ]"
          >
            Todos ({{ bitacorasConAlerta.length }})
          </button>
          
          <button 
            @click="filtroActual = 'ALERTA'; paginaActual = 1" 
            :class="[
              'px-2 py-1 rounded-full text-xs font-medium transition-colors',
              filtroActual === 'ALERTA' 
                ? 'bg-red-600 text-white' 
                : (isDarkMode ? 'bg-red-900 bg-opacity-30 text-red-400 hover:bg-red-800' : 'bg-red-100 text-red-700 hover:bg-red-200')
            ]"
          >
            Alertas ({{ conteoAlertas }})
          </button>
          
          <button 
            @click="filtroActual = 'AVISO'; paginaActual = 1" 
            :class="[
              'px-2 py-1 rounded-full text-xs font-medium transition-colors',
              filtroActual === 'AVISO' 
                ? 'bg-amber-500 text-white' 
                : (isDarkMode ? 'bg-amber-900 bg-opacity-30 text-amber-400 hover:bg-amber-800' : 'bg-amber-100 text-amber-700 hover:bg-amber-200')
            ]"
          >
            Avisos ({{ conteoAvisos }})
          </button>
        </div>
      </div>
      
      <div v-if="isLoading" class="flex-grow flex items-center justify-center">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 mb-2"
               :class="props.isDarkMode ? 'border-gray-700 border-t-gray-300' : 'border-gray-300 border-t-gray-600'"></div>
          <p class="text-sm font-semibold" :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'">Cargando alertas...</p>
        </div>
      </div>
      
      <div v-else class="flex-grow flex flex-col overflow-hidden">
        <div v-if="bitacorasConAlerta.length === 0" class="h-full flex items-center justify-center" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">
          No se encontraron alertas ni avisos.
        </div>
        
        <div v-else-if="bitacorasFiltradas.length === 0" class="h-full flex items-center justify-center" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">
          No se encontraron resultados para el filtro seleccionado.
        </div>
        
        <div v-else class="space-y-3 flex-grow overflow-y-auto">
          <div
            v-for="alerta in bitacorasPaginadas"
            :key="alerta.id"
            :class="[
              'p-3 rounded-lg border-l-4 transition-all',
              alerta.alerta_aviso === 'ALERTA' 
                ? (isDarkMode ? 'bg-red-900 bg-opacity-20 border-red-600' : 'bg-red-50 border-red-500')
                : (isDarkMode ? 'bg-amber-900 bg-opacity-20 border-amber-600' : 'bg-amber-50 border-amber-500')
            ]"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-center">
                <span 
                  :class="[
                    'inline-flex items-center justify-center w-6 h-6 rounded-full mr-2',
                    alerta.alerta_aviso === 'ALERTA' 
                      ? (isDarkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-600')
                      : (isDarkMode ? 'bg-amber-800 text-amber-200' : 'bg-amber-100 text-amber-600')
                  ]"
                >
                  <svg v-if="alerta.alerta_aviso === 'ALERTA'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </span>
                <span 
                  :class="[
                    'font-medium text-xs px-2 py-0.5 rounded-full',
                    alerta.alerta_aviso === 'ALERTA' 
                      ? (isDarkMode ? 'bg-red-800 text-red-100' : 'bg-red-100 text-red-800')
                      : (isDarkMode ? 'bg-amber-800 text-amber-100' : 'bg-amber-100 text-amber-800')
                  ]"
                >
                  {{ alerta.alerta_aviso }}
                </span>
              </div>
              <span class="text-xs" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">
                {{ formatearFecha(alerta.tiempo_ejecucion) }}
              </span>
            </div>
            
            <p class="mt-2 text-sm line-clamp-2" :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              {{ alerta.bitacora }}
            </p>
          </div>
        </div>
        
        <div v-if="bitacorasFiltradas.length > elementosPorPagina" 
              class="mt-4 flex items-center justify-between pt-3"
              :class="props.isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'">
          <div class="flex items-center text-xs" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">
            Mostrando {{ (paginaActual - 1) * elementosPorPagina + 1 }} - 
            {{ Math.min(paginaActual * elementosPorPagina, bitacorasFiltradas.length) }} 
            de {{ bitacorasFiltradas.length }}
          </div>
          
          <div class="flex gap-1">
            <button 
              @click="paginaActual = Math.max(1, paginaActual - 1)"
              :disabled="paginaActual === 1"
              :class="[
                'p-1 rounded transition-colors',
                paginaActual === 1 
                  ? (isDarkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed')
                  : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <div class="flex items-center px-2 text-sm" :class="props.isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              {{ paginaActual }} / {{ totalPaginas }}
            </div>
            
            <button 
              @click="paginaActual = Math.min(totalPaginas, paginaActual + 1)"
              :disabled="paginaActual === totalPaginas"
              :class="[
                'p-1 rounded transition-colors',
                paginaActual === totalPaginas 
                  ? (isDarkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed')
                  : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>

    <!-- Columna derecha: Gráficos -->
    <div class="flex-shrink-0 w-full max-w-2xl space-y-6">

  <div class="flex flex-wrap items-center justify-between mb-4">
    <div class="flex flex-wrap gap-2">
      <span class="px-2 py-1 text-xs rounded-full flex items-center" 
        :class="dataStatus.bomba1Ready ? 
          (isDarkMode ? 'bg-green-900 bg-opacity-40 text-green-300' : 'bg-green-100 text-green-800') : 
          (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600')">
        <span class="w-2 h-2 rounded-full mr-1" :class="dataStatus.bomba1Ready ? 'bg-green-500' : 'bg-gray-400'"></span>
        Datos Bomba 1 {{ dataStatus.bomba1Ready ? 'Listos' : 'Cargando...' }}
      </span>
      <span class="px-2 py-1 text-xs rounded-full flex items-center" 
        :class="dataStatus.bomba2Ready ? 
          (isDarkMode ? 'bg-green-900 bg-opacity-40 text-green-300' : 'bg-green-100 text-green-800') : 
          (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600')">
        <span class="w-2 h-2 rounded-full mr-1" :class="dataStatus.bomba2Ready ? 'bg-green-500' : 'bg-gray-400'"></span>
        Datos Bomba 2 {{ dataStatus.bomba2Ready ? 'Listos' : 'Cargando...' }}
      </span>
    </div>
    
    <button @click="refrescarDatos" 
      class="px-3 py-1 text-sm font-medium rounded-lg shadow transition-colors flex items-center gap-1
        focus:outline-none focus:ring-2"
      :class="props.isDarkMode ? 
        'bg-blue-900 bg-opacity-40 text-blue-300 hover:bg-blue-800 focus:ring-blue-600' : 
        'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-400'">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
      </svg>
      Refrescar datos
    </button>
  </div>

      <div 
        v-if="!dataStatus.bomba1Ready" 
        class="rounded-lg shadow p-4 sm:p-6 min-h-[320px] flex items-center justify-center relative overflow-hidden"
        :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-red-50 to-transparent opacity-10 animate-pulse"></div>
        
        <div class="flex flex-col items-center z-10">
          <div class="h-14 w-14 rounded-full border-4 border-gray-200 border-t-red-600 animate-spin mb-4"></div>
          
          <p class="font-medium" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-700'">Obteniendo predicciones de la bomba A</p>
          <p class="text-sm mt-1" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">Consultando datos de probabilidad de fallas</p>
          
          <div class="w-48 h-1.5 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div class="h-full bg-red-600 animate-pulse" style="width: 70%"></div>
          </div>
          
          <p class="text-xs mt-2" :class="props.isDarkMode ? 'text-gray-500' : 'text-gray-400'">Este proceso puede tardar unos segundos...</p>
        </div>
      </div>
      
      <div
        v-else
        class="rounded-lg shadow p-4 sm:p-6"
        :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'"
      >
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3
            class="text-base sm:text-lg font-medium"
            :class="props.isDarkMode ? 'text-white' : 'text-[#2E4053]'"
          >
            Bomba A
          </h3>
          <button 
            @click="toggleIframeViewA"
            class="flex items-center gap-2 py-1 px-3 text-xs rounded-lg shadow transition duration-300 ease-in-out"
            :class="isIframeViewA 
              ? (props.isDarkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600') 
              : (props.isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600')"
          >
            <svg v-if="!isIframeViewA" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" /></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            {{ isIframeViewA ? 'Volver' : 'Historial' }}
          </button>
        </div>

        <div v-if="isIframeViewA" class="w-full" style="height: 400px;">
          <iframe :src="iframeUrlA" class="w-full h-full border-0" title="Dashboard Bomba A" allowfullscreen loading="lazy"></iframe>
        </div>
        <div v-else class="flex flex-col items-center">
          <div class="w-full h-64 sm:h-80 lg:h-96">
            <canvas ref="bomba1Canvas"></canvas>
          </div>
        </div>
      </div>

      <div
        v-if="!dataStatus.bomba2Ready" 
        class="rounded-lg shadow p-4 sm:p-6 min-h-[320px] flex items-center justify-center relative overflow-hidden"
        :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent opacity-10 animate-pulse"></div>
        
        <div class="flex flex-col items-center z-10">
          <div class="h-14 w-14 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin mb-4"></div>
          
          <p class="font-medium" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-700'">Obteniendo predicciones de la bomba B</p>
          <p class="text-sm mt-1" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">Consultando datos de probabilidad de fallas</p>
          
          <div class="w-48 h-1.5 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div class="h-full bg-blue-600 animate-pulse" style="width: 70%"></div>
          </div>
          
          <p class="text-xs mt-2" :class="props.isDarkMode ? 'text-gray-500' : 'text-gray-400'">Este proceso puede tardar unos segundos...</p>
        </div>
      </div>
      
      <div
        v-else
        class="rounded-lg shadow p-4 sm:p-6"
        :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'"
      >
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <h3
            class="text-base sm:text-lg font-medium"
            :class="props.isDarkMode ? 'text-white' : 'text-[#2E4053]'"
          >
            Bomba B
          </h3>
          <button 
            @click="toggleIframeViewB"
            class="flex items-center gap-2 py-1 px-3 text-xs rounded-lg shadow transition duration-300 ease-in-out"
            :class="isIframeViewB 
              ? (props.isDarkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600') 
              : (props.isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600')"
          >
            <svg v-if="!isIframeViewB" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" /></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            {{ isIframeViewB ? 'Volver' : 'Historial' }}
          </button>
        </div>

        <div v-if="isIframeViewB" class="w-full" style="height: 400px;">
          <iframe :src="iframeUrlB" class="w-full h-full border-0" title="Dashboard Bomba B" allowfullscreen loading="lazy"></iframe>
        </div>
        <div v-else class="flex flex-col items-center">
          <div class="w-full h-64 sm:h-80 lg:h-96">
            <canvas ref="bomba2Canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick, onUnmounted } from "vue";
import { Chart, registerables } from "chart.js";
import { useBitacoras } from "@/composables/useBitacoras";
import { useAlertas } from "@/composables/useAlertas";
import { usePrediccionesBombaA } from "@/composables/usePrediccionBombas";
import { usePrediccionesBombab } from "@/composables/usePrediccionBombasb";

// ── BITÁCORAS ───────────────────────────────────────────────
const { bitacoras, isLoading } = useBitacoras()
const filtroActual = ref('TODOS')
const paginaActual = ref(1)
const elementosPorPagina = 4

const bitacorasConAlerta = computed(() =>
  (bitacoras.value || []).filter(b => b.alerta_aviso != null)
)
const bitacorasFiltradas = computed(() =>
  filtroActual.value === 'TODOS'
    ? bitacorasConAlerta.value
    : bitacorasConAlerta.value.filter(b => b.alerta_aviso === filtroActual.value)
)
const totalPaginas = computed(() =>
  Math.ceil(bitacorasFiltradas.value.length / elementosPorPagina)
)
const bitacorasPaginadas = computed(() => {
  const start = (paginaActual.value - 1) * elementosPorPagina
  return bitacorasFiltradas.value.slice(start, start + elementosPorPagina)
})

const conteoAlertas = computed(() =>
  bitacorasConAlerta.value.filter(b => b.alerta_aviso === 'ALERTA').length
)
const conteoAvisos = computed(() =>
  bitacorasConAlerta.value.filter(b => b.alerta_aviso === 'AVISO').length
)

watch(filtroActual, () => { paginaActual.value = 1 })
watch(totalPaginas, n => {
  if (paginaActual.value > n && n > 0) paginaActual.value = n
})

// ── ALERTAS ────────────────────────────────────────────────
const { alertas, isLoading_alerta } = useAlertas()
const filtroActualAlertas = ref('TODOS') // Valores posibles: 'TODOS', 'CRITICAL', 'ALERT', 'AVISO'
const paginaActualAlertas = ref(1)
const elementosPorPaginaAlertas = 4

// Función para determinar el tipo de alerta basado en la descripción
const obtenerTipoAlerta = (alerta) => {
  const desc = alerta.descripcion || ''
  if (desc.includes('CRÍTICA')) return 'CRITICAL'
  if (desc.includes('ALERTA')) return 'ALERT'
  return 'AVISO'
}

// Funciones para obtener clases de estilo según el tipo de alerta y el tema
const getAlertaClaseBackground = (tipo) => {
  if (props.isDarkMode) {
    switch (tipo) {
      case 'CRITICAL': return 'bg-purple-900 bg-opacity-30 border-purple-600'
      case 'ALERT': return 'bg-blue-900 bg-opacity-30 border-blue-600'
      case 'AVISO': return 'bg-teal-900 bg-opacity-30 border-teal-600'
      default: return 'bg-gray-700 border-gray-600'
    }
  } else {
    switch (tipo) {
      case 'CRITICAL': return 'bg-purple-50 border-purple-500'
      case 'ALERT': return 'bg-blue-50 border-blue-500'
      case 'AVISO': return 'bg-teal-50 border-teal-500'
      default: return 'bg-gray-50 border-gray-500'
    }
  }
}

const getAlertaClaseIcono = (tipo) => {
  if (props.isDarkMode) {
    switch (tipo) {
      case 'CRITICAL': return 'bg-purple-800 text-purple-200'
      case 'ALERT': return 'bg-blue-800 text-blue-200'
      case 'AVISO': return 'bg-teal-800 text-teal-200'
      default: return 'bg-gray-700 text-gray-300'
    }
  } else {
    switch (tipo) {
      case 'CRITICAL': return 'bg-purple-100 text-purple-600'
      case 'ALERT': return 'bg-blue-100 text-blue-600'
      case 'AVISO': return 'bg-teal-100 text-teal-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }
}

const getAlertaClaseBadge = (tipo) => {
  if (props.isDarkMode) {
    switch (tipo) {
      case 'CRITICAL': return 'bg-purple-800 text-purple-100'
      case 'ALERT': return 'bg-blue-800 text-blue-100'
      case 'AVISO': return 'bg-teal-800 text-teal-100'
      default: return 'bg-gray-700 text-gray-300'
    }
  } else {
    switch (tipo) {
      case 'CRITICAL': return 'bg-purple-100 text-purple-800'
      case 'ALERT': return 'bg-blue-100 text-blue-800'
      case 'AVISO': return 'bg-teal-100 text-teal-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
}

// Propiedad computada para aplicar el filtro seleccionado
const alertasFiltradas = computed(() => {
  if (!alertas.value || !Array.isArray(alertas.value)) return []
  
  if (filtroActualAlertas.value === 'TODOS') {
    return alertas.value
  }
  
  return alertas.value.filter(a => obtenerTipoAlerta(a) === filtroActualAlertas.value)
})

const totalPaginasAlertas = computed(() =>
  Math.ceil(alertasFiltradas.value.length / elementosPorPaginaAlertas)
)

const alertasPaginadas = computed(() => {
  const start = (paginaActualAlertas.value - 1) * elementosPorPaginaAlertas
  return alertasFiltradas.value.slice(start, start + elementosPorPaginaAlertas)
})

// Conteo de alertas por tipo para mostrar en los botones de filtro
const conteoCritical = computed(() => {
  if (!alertas.value || !Array.isArray(alertas.value)) return 0
  return alertas.value.filter(a => obtenerTipoAlerta(a) === 'CRITICAL').length
})

const conteoAlert = computed(() => {
  if (!alertas.value || !Array.isArray(alertas.value)) return 0
  return alertas.value.filter(a => obtenerTipoAlerta(a) === 'ALERT').length
})

const conteoAviso = computed(() => {
  if (!alertas.value || !Array.isArray(alertas.value)) return 0
  return alertas.value.filter(a => obtenerTipoAlerta(a) === 'AVISO').length
})

// Resetear la página cuando cambia el filtro
watch(filtroActualAlertas, () => { 
  paginaActualAlertas.value = 1 
})

// Asegurarse de que la página actual es válida cuando cambia el total de páginas
watch(totalPaginasAlertas, n => {
  if (paginaActualAlertas.value > n && n > 0) paginaActualAlertas.value = n
})

// ── UTILIDADES ────────────────────────────────────────────
const formatearFecha = fechaStr => {
  try { {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(new Date(fechaStr))
  } } catch {
    return fechaStr
  }
}

Chart.register(...registerables);

const props = defineProps({
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

// Observar cambios en el tema para actualizar los gráficos
watch(() => props.isDarkMode, (newValue) => {

  // Actualizar los gráficos cuando cambia el tema
  // Un pequeño retraso para asegurar que Vue haya actualizado el DOM si es necesario
  setTimeout(() => {
    actualizarGraficos();
  }, 100);
});

// Propiedades locales para esta vista
const { predicciones, isLoadingPredicciones, errorPredicciones } = usePrediccionesBombaA();
const { prediccionesBombab, isLoadingPrediccionesBombab, errorPrediccionesBombab } = usePrediccionesBombab();



const bomba1Canvas = ref(null);
const bomba2Canvas = ref(null);

// Estado para Power BI
const isIframeViewA = ref(false);
const isIframeViewB = ref(false);
const iframeUrlA = 'https://app.powerbi.com/view?r=eyJrIjoiNDJhNzNlZTctZDgyYy00YTIxLTg3NGYtY2QwZjc3ODVkNDNmIiwidCI6ImRkNzcxMmUzLWRkZjQtNDNkMy04YjhlLTYzNjc3NjIyYzc3OSIsImMiOjR9';
const iframeUrlB = 'https://app.powerbi.com/view?r=eyJrIjoiZGFiMjk1ZWQtYjhlZi00MjgzLTg0OTMtYmZlOWQyNTUyMjhmIiwidCI6ImRkNzcxMmUzLWRkZjQtNDNkMy04YjhlLTYzNjc3NjIyYzc3OSIsImMiOjR9';

const toggleIframeViewA = () => {
  isIframeViewA.value = !isIframeViewA.value;
  actualizarGraficos();
  
};

const toggleIframeViewB = () => {
  isIframeViewB.value = !isIframeViewB.value;
  actualizarGraficos();
  
};

// Colores dinámicos para los datasets de Bomba A
const bombaA_borderColor = computed(() => props.isDarkMode ? 'rgba(255, 99, 132, 1)' : 'rgba(239, 68, 68, 1)');
const bombaA_backgroundColor = computed(() => props.isDarkMode ? 'rgba(255, 99, 132, 0.2)' : 'rgba(239, 68, 68, 0.2)');

// Datos para Bomba 1 - Serie temporal de fallas
const bomba1Data = computed(() => ({
  labels: predicciones.value?.map(p => p.hora_ejecucion) || [],
  datasets: [
    {
      label: 'Probabilidad de Falla (%)',
      data: predicciones.value?.map(p => p.valor_prediccion) || [],
      borderColor: bombaA_borderColor.value,
      backgroundColor: bombaA_backgroundColor.value,
      tension: 0.3,
      fill: true,
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5,
    },
  ],
}));

const graficoListo = ref(false); // Indica si los datos de Bomba 1 están listos para el gráfico
const bomba2Listo = ref(false); // Indica si los datos de Bomba 2 están listos para el gráfico

// Colores dinámicos para los datasets de Bomba B
const bombaB_borderColor = computed(() => props.isDarkMode ? 'rgba(54, 162, 235, 1)' : 'rgba(59, 130, 246, 1)');
const bombaB_backgroundColor = computed(() => props.isDarkMode ? 'rgba(54, 162, 235, 0.2)' : 'rgba(59, 130, 246, 0.2)');

// Datos para Bomba 2
const bomba2Data = computed(() => ({
  labels: prediccionesBombab.value?.map(p => p.hora_ejecucion) || [],
  datasets: [
    {
      label: 'Probabilidad de Falla (%)',
      data: prediccionesBombab.value?.map(p => p.valor_prediccion) || [],
      borderColor: bombaB_borderColor.value,
      backgroundColor: bombaB_backgroundColor.value,
      tension: 0.3,
      fill: true,
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5,
    },
  ],
}));

// Propiedad computada para verificar estados de carga
const dataStatus = computed(() => {
  return {
    bomba1Ready: !isLoadingPredicciones.value && graficoListo.value,
    bomba2Ready: !isLoadingPrediccionesBombab.value && bomba2Listo.value,
    alertasReady: alertas?.value && Array.isArray(alertas.value) && alertas.value.length > 0,
    bitacorasReady: bitacorasConAlerta?.value && Array.isArray(bitacorasConAlerta.value) && bitacorasConAlerta.value.length > 0,
    allReady: !isLoadingPredicciones.value && graficoListo.value && !isLoadingPrediccionesBombab.value && bomba2Listo.value
  };
});

// Usar watch para predicciones de Bomba A
watch(
  predicciones,
  (nuevoValor) => {
    if (process.client) {

      
      if (nuevoValor && Array.isArray(nuevoValor) && nuevoValor.length > 0) {
        graficoListo.value = true;

        nextTick(() => actualizarGraficos());
      } else {
        graficoListo.value = false;
      }
    }
  },
  { deep: true, immediate: true }
);

// NUEVO: Usar watch para predicciones de Bomba B
watch(
  prediccionesBombab,
  (nuevoValor) => {
    if (process.client) {

      
      if (nuevoValor && Array.isArray(nuevoValor) && nuevoValor.length > 0) {
        bomba2Listo.value = true;

        nextTick(() => actualizarGraficos());
      } else {
        bomba2Listo.value = false;
      }
    }
  },
  { deep: true, immediate: true }
);

// Estadísticas para Bomba 1


// Objetos para almacenar las instancias de los gráficos
let charts = {
  mainChart: null,
  bomba1Chart: null,
  bomba2Chart: null
};

// Función para obtener las opciones comunes del gráfico, adaptadas al tema
const getChartOptions = (isDarkMode) => {
  const gridColor = isDarkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.6)';
  const textColor = isDarkMode ? 'rgba(209, 213, 219, 0.8)' : 'rgba(55, 65, 81, 0.8)';
  const titleColor = isDarkMode ? 'rgba(229, 231, 235, 0.9)' : 'rgba(17, 24, 39, 0.9)';

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 11,
            color: textColor, // Color de la leyenda
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        },
        backgroundColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
        titleColor: titleColor,
        bodyColor: textColor,
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hora del día',
          font: {
            weight: 'bold',
            color: titleColor, // Color del título del eje X
          }
        },
        grid: {
          display: false,
          color: gridColor, // Color de la cuadrícula
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          color: textColor, // Color de las etiquetas del eje X
        }
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Rendimiento (%)',
          font: {
            weight: 'bold',
            color: titleColor, // Color del título del eje Y
          }
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          },
          color: textColor, // Color de las etiquetas del eje Y
        },
        grid: {
          color: gridColor, // Color de la cuadrícula
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    },
  };
};

// Función asíncrona para crear/actualizar todos los gráficos
const actualizarGraficos = async () => {
  if (!process.client) return;
  
  await nextTick();
  

  
  // Actualizar gráfico principal (si existe y es relevante)
  const canvas = document.getElementById("anomalyChart");
  if (canvas) {
    try {
      if (charts.mainChart) charts.mainChart.destroy();
      const ctx = canvas.getContext("2d");
      // Asumo que 'labels' y 'datasets' para el mainChart están definidos en otro lugar
      // o que este gráfico no es el foco principal de la solicitud.
      charts.mainChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [], // Reemplazar con tus labels
          datasets: [], // Reemplazar con tus datasets
        },
        options: getChartOptions(props.isDarkMode), // Usar las opciones comunes
      });
    } catch (error) {
      console.error('Error al crear el gráfico principal:', error);
    }
  }
  
  // Actualizar gráfico de Bomba 1
  if (bomba1Canvas.value && graficoListo.value) {
    try {
      if (charts.bomba1Chart) charts.bomba1Chart.destroy();
      const ctx1 = bomba1Canvas.value.getContext("2d");
      
      charts.bomba1Chart = new Chart(ctx1, {
        type: "line",
        data: bomba1Data.value, // Ahora bomba1Data es una computed, se actualizará automáticamente
        options: getChartOptions(props.isDarkMode), // Usar las opciones comunes y el tema
      });

    } catch (error) {
      console.error('Error al crear el gráfico de Bomba 1:', error);
    }
  } else {

  }
  
  // Actualizar gráfico de Bomba 2
  if (bomba2Canvas.value && bomba2Listo.value) { // Asegurarse de que los datos estén listos
    try {
      if (charts.bomba2Chart) charts.bomba2Chart.destroy();
      const ctx2 = bomba2Canvas.value.getContext("2d");
      
      charts.bomba2Chart = new Chart(ctx2, {
        type: "line",
        data: bomba2Data.value, // Ahora bomba2Data es una computed, se actualizará automáticamente
        options: getChartOptions(props.isDarkMode), // Usar las opciones comunes y el tema
      });

    } catch (error) {
      console.error('Error al crear el gráfico de Bomba 2:', error);
    }
  } else {

  }
};

// Botón para refrescar manualmente los datos y gráficos
const refrescarDatos = async () => {

  
  // Forzar refetch si usas TanStack Query (si tus composables lo exponen)
  // if (typeof refetchPredicciones === 'function') {
  //   await refetchPredicciones();
  // }
  // if (typeof refetchPrediccionesBombab === 'function') {
  //   await refetchPrediccionesBombab();
  // }
  
  // Reiniciar estados para forzar actualización
  graficoListo.value = predicciones.value && predicciones.value.length > 0;
  bomba2Listo.value = prediccionesBombab.value && prediccionesBombab.value.length > 0;
  
  // Regenerar gráficos
  await actualizarGraficos();
  

};

// Manejar el redimensionamiento de la ventana
const handleResize = () => {
  // Solo actualizar si ambos gráficos están listos para evitar errores al redimensionar antes de la carga inicial
  if (dataStatus.value.bomba1Ready || dataStatus.value.bomba2Ready) {
    actualizarGraficos();
  }
};

// Agregar un indicador para rastrear si el componente está montado
const componenteMontado = ref(false);

onMounted(() => {
  if (process.client) {

    componenteMontado.value = true;
    
    // Primera inicialización de gráficos después de un pequeño retraso
    // para asegurar que los canvas estén renderizados.
    setTimeout(() => {
      actualizarGraficos();
    }, 100); 
    
    // Configurar un intervalo de verificación para asegurar que los gráficos se rendericen
    // Esto es una medida de seguridad, en un entorno ideal, los watchers y nextTick
    // deberían ser suficientes.
    const intervaloVerificacion = setInterval(() => {
      if ((graficoListo.value && !charts.bomba1Chart) || (bomba2Listo.value && !charts.bomba2Chart)) {

        actualizarGraficos();
      } else if (charts.bomba1Chart && charts.bomba2Chart) {
        clearInterval(intervaloVerificacion);
      }
    }, 1000);
    
    // Limpiar el intervalo después de 10 segundos para evitar que se ejecute indefinidamente
    setTimeout(() => clearInterval(intervaloVerificacion), 10000);
    
    // Agregar listener para el redimensionamiento
    window.addEventListener("resize", handleResize);
  }
});

onUnmounted(() => {
  if (process.client) {
    // Eliminar listener cuando el componente se destruya
    window.removeEventListener("resize", handleResize);
    
    // Destruir todas las instancias de los gráficos para evitar memory leaks
    Object.values(charts).forEach(chart => {
      if (chart) chart.destroy();
    });
  }
});
</script>

