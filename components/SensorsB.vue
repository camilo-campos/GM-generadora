<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-6" :class="props.isDarkMode ? 'bg-gray-900' : 'bg-gray-100'">
    <!-- Botones de visibilidad con indicador de estado activo - Sensores originales -->
    <button 
      @click="corriente_visible = !corriente_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        corriente_visible 
          ? 'bg-blue-600 text-white ring-2 ring-offset-2 ring-blue-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
      ]"
    >
      <span>Corriente</span>
      <span v-if="corriente_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>

    <button 
      @click="flujoDescarga_visible = !flujoDescarga_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        flujoDescarga_visible 
          ? 'bg-green-600 text-white ring-2 ring-offset-2 ring-green-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-green-100'
      ]"
    >
      <span>Flujo Descarga</span>
      <span v-if="flujoDescarga_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    
    
    
    <button 
      @click="presionAgua_visible = !presionAgua_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        presionAgua_visible 
          ? 'bg-purple-600 text-white ring-2 ring-offset-2 ring-purple-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-purple-100'
      ]"
    >
      <span>Presión de Agua</span>
      <span v-if="presionAgua_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    
    
    <button 
      @click="temperaturaAmbiental_visible = !temperaturaAmbiental_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        temperaturaAmbiental_visible 
          ? 'bg-yellow-500 text-white ring-2 ring-offset-2 ring-yellow-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-yellow-100'
      ]"
    >
      <span>Temperatura Ambiente</span>
      <span v-if="temperaturaAmbiental_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    
    
    
    
    
    
    
    
    <button 
      @click="voltajeBarra_visible = !voltajeBarra_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        voltajeBarra_visible 
          ? 'bg-orange-500 text-white ring-2 ring-offset-2 ring-orange-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-orange-100'
      ]"
    >
      <span>Voltaje Barra</span>
      <span v-if="voltajeBarra_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <!-- Botón para Temperatura Agua Alimentación -->
    <button 
      @click="temperaturaAguaAlim_visible = !temperaturaAguaAlim_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        temperaturaAguaAlim_visible 
          ? 'bg-rose-600 text-white ring-2 ring-offset-2 ring-rose-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-rose-100'
      ]"
    >
      <span>Temperatura Agua Alim.</span>
      <span v-if="temperaturaAguaAlim_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>

    <!-- Botón para Vibración Axial Empuje -->
    <button 
      @click="vibracionAxialEmpuje_visible = !vibracionAxialEmpuje_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        vibracionAxialEmpuje_visible 
          ? 'bg-teal-600 text-white ring-2 ring-offset-2 ring-teal-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-teal-100'
      ]"
    >
      <span>Vibración Axial Empuje</span>
      <span v-if="vibracionAxialEmpuje_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <!-- Botones para los nuevos sensores -->
    <button 
      @click="excentricidadBomba_visible = !excentricidadBomba_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        excentricidadBomba_visible 
          ? 'bg-cyan-600 text-white ring-2 ring-offset-2 ring-cyan-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-cyan-100'
      ]"
    >
      <span>Excentricidad Bomba</span>
      <span v-if="excentricidadBomba_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <button 
      @click="flujoAguaDomoAP_visible = !flujoAguaDomoAP_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        flujoAguaDomoAP_visible 
          ? 'bg-emerald-600 text-white ring-2 ring-offset-2 ring-emerald-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-emerald-100'
      ]"
    >
      <span>Flujo Agua Domo AP</span>
      <span v-if="flujoAguaDomoAP_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <button 
      @click="flujoAguaDomoMP_visible = !flujoAguaDomoMP_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        flujoAguaDomoMP_visible 
          ? 'bg-lime-600 text-white ring-2 ring-offset-2 ring-lime-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-lime-100'
      ]"
    >
      <span>Flujo Agua Domo MP</span>
      <span v-if="flujoAguaDomoMP_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <button 
      @click="flujoAguaRecalentador_visible = !flujoAguaRecalentador_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        flujoAguaRecalentador_visible 
          ? 'bg-amber-600 text-white ring-2 ring-offset-2 ring-amber-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-amber-100'
      ]"
    >
      <span>Flujo Agua Recalentador</span>
      <span v-if="flujoAguaRecalentador_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <button 
      @click="flujoAguaVaporAlta_visible = !flujoAguaVaporAlta_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        flujoAguaVaporAlta_visible 
          ? 'bg-fuchsia-600 text-white ring-2 ring-offset-2 ring-fuchsia-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-fuchsia-100'
      ]"
    >
      <span>Flujo Agua Vapor Alta</span>
      <span v-if="flujoAguaVaporAlta_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    
    
    
    
    
    
    
    
    
    
    <!-- Botones para nuevos sensores -->
    

    

    <button 
      @click="temperaturaEstator_visible = !temperaturaEstator_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        temperaturaEstator_visible 
          ? 'bg-orange-500 text-white ring-2 ring-offset-2 ring-orange-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-orange-100'
      ]"
    >
      <span>Temperatura Estator</span>
      <span v-if="temperaturaEstator_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>

    <button 
      @click="vibracionXDescanso_visible = !vibracionXDescanso_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        vibracionXDescanso_visible 
          ? 'bg-pink-500 text-white ring-2 ring-offset-2 ring-pink-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-pink-100'
      ]"
    >
      <span>Vibración X Descanso</span>
      <span v-if="vibracionXDescanso_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>

    <button 
      @click="vibracionYDescanso_visible = !vibracionYDescanso_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        vibracionYDescanso_visible 
          ? 'bg-indigo-500 text-white ring-2 ring-offset-2 ring-indigo-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-indigo-100'
      ]"
    >
      <span>Vibración Y Descanso</span>
      <span v-if="vibracionYDescanso_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
  </div>

  <div class="p-4" :class="props.isDarkMode ? 'bg-gray-900' : 'bg-gray-100'">
    <div class="flex flex-wrap gap-2 mb-4">
      <div class="text-sm font-medium" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Gráficos activos:</div>
      <div class="flex flex-wrap gap-2">
        <!-- Etiquetas sensores originales -->
        <span v-if="corriente_visible" class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Corriente</span>
        
        <span v-if="presionAgua_visible" class="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">Presión de Agua</span>
        
        <span v-if="temperaturaAmbiental_visible" class="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Temp. Ambiente</span>
        
        <span v-if="temperaturaAguaAlim_visible" class="px-2 py-1 text-xs bg-rose-100 text-rose-800 rounded-full">Temp. Agua Alim.</span>
        <span v-if="vibracionAxialEmpuje_visible" class="px-2 py-1 text-xs bg-teal-100 text-teal-800 rounded-full">Vib. Axial Empuje</span>
        <span v-if="flujoDescarga_visible" class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Flujo Descarga</span>
        
        
        <span v-if="voltajeBarra_visible" class="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">Voltaje Barra</span>
        
        <!-- Etiquetas nuevos sensores -->
        <span v-if="excentricidadBomba_visible" class="px-2 py-1 text-xs bg-cyan-100 text-cyan-800 rounded-full">Excentricidad Bomba</span>
        <span v-if="flujoAguaDomoAP_visible" class="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-full">Flujo Agua Domo AP</span>
        <span v-if="flujoAguaDomoMP_visible" class="px-2 py-1 text-xs bg-lime-100 text-lime-800 rounded-full">Flujo Agua Domo MP</span>
        <span v-if="flujoAguaRecalentador_visible" class="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">Flujo Agua Recalentador</span>
        <span v-if="flujoAguaVaporAlta_visible" class="px-2 py-1 text-xs bg-fuchsia-100 text-fuchsia-800 rounded-full">Flujo Agua Vapor Alta</span>
        
        
        <span v-if="temperaturaEstator_visible" class="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">Temp. Estator</span>
        
        <span v-if="temperaturaAguaAlim_visible" class="px-2 py-1 text-xs bg-cyan-100 text-cyan-800 rounded-full">Temp. Agua Alimentación</span>
        <span v-if="vibracionAxialEmpuje_visible" class="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">Vib. Axial Empuje</span>
        <span v-if="temperaturaEstator_visible" class="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">Temp. Estator</span>
        <span v-if="vibracionXDescanso_visible" class="px-2 py-1 text-xs bg-pink-100 text-pink-800 rounded-full">Vib. X Descanso</span>
        <span v-if="vibracionYDescanso_visible" class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">Vib. Y Descanso</span>
        
      </div>
    </div>
  </div>

  <div v-show="isLoading" class="text-xl font-semibold p-4">
    Cargando gráficos, por favor espere...
  </div>
  
  <div v-show="!isLoading" class="flex flex-col gap-6 mb-6">
    <!-- Gráficos (sin cambios) -->
    <div v-show="corriente_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <div class="mb-4">
        <div class="flex justify-center mb-2">
          <h2 class="text-lg font-semibold" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Corriente</h2>
        </div>
        <div class="flex justify-end">
          <button 
            @click="toggleCorrienteView"
            class="flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
            :class="corrienteViewMode === 'basic' 
              ? props.isDarkMode ? 'bg-blue-900 text-blue-200 hover:bg-blue-800' : 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
              : props.isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
          >
            <svg v-if="corrienteViewMode === 'basic'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            {{ corrienteViewMode === 'basic' ? 'Ver análisis detallado' : 'Volver al gráfico básico' }}
          </button>
        </div>
      </div>
      
      <!-- Contenedor principal solo visible en modo básico o loading -->
      <div v-if="corrienteViewMode !== 'detailed'" class="w-full h-[300px] relative transition-all duration-300">
        <!-- Gráfico básico -->
        <div v-if="corrienteViewMode === 'basic'" class="w-full h-full">
          <canvas ref="corrienteCanvas"></canvas>
        </div>
        
        <!-- Animación de carga mientras se obtienen los rangos de fechas -->
        <div v-if="corrienteViewMode === 'loading'" class="absolute inset-0 flex items-center justify-center" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
          <div class="flex flex-col items-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-3"></div>
            <p class="font-medium" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-700'">Obteniendo datos del sensor...</p>
            <p class="text-sm mt-1" :class="props.isDarkMode ? 'text-gray-400' : 'text-gray-500'">Consultando rangos de fechas disponibles</p>
          </div>
        </div>
      </div>
      
      <!-- Tarjeta de análisis detallado -->
      <div v-if="corrienteViewMode === 'detailed'" class="transition-all duration-300">
        <AnalisisCorrienteDetallado :datos="corriente" :rangoFechas="rangoFechasCorriente" />
      </div>
    </div>
    
    <div v-show="temperaturaAmbiental_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Temperatura Ambiente</h2>
      <div class="w-full h-[300px]">
        <canvas ref="temperaturaAmbientalCanvas"></canvas>
      </div>
    </div>

    <div v-show="flujoDescarga_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Flujo Descarga</h2>
      <div class="w-full h-[300px]">
        <canvas ref="flujoDescargaCanvas"></canvas>
      </div>
    </div>
      

    <div v-show="presionAgua_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Presión de Agua</h2>
      <div class="w-full h-[300px]">
        <canvas ref="presionAguaCanvas"></canvas>
      </div>
    </div>

    

    <div v-show="voltajeBarra_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Voltaje Barra</h2>
      <div class="w-full h-[300px]">
        <canvas ref="voltajeBarraCanvas"></canvas>
      </div>
    </div>

    <!-- Nuevos gráficos -->
    <div v-show="excentricidadBomba_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Excentricidad Bomba</h2>
      <div class="w-full h-[300px]">
        <canvas ref="excentricidadBombaCanvas"></canvas>
      </div>
    </div>

    <div v-show="flujoAguaDomoAP_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Flujo Agua Domo AP</h2>
      <div class="w-full h-[300px]">
        <canvas ref="flujoAguaDomoAPCanvas"></canvas>
      </div>
    </div>

    <div v-show="flujoAguaDomoMP_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Flujo Agua Domo MP</h2>
      <div class="w-full h-[300px]">
        <canvas ref="flujoAguaDomoMPCanvas"></canvas>
      </div>
    </div>

    <div v-show="flujoAguaRecalentador_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Flujo Agua Recalentador</h2>
      <div class="w-full h-[300px]">
        <canvas ref="flujoAguaRecalentadorCanvas"></canvas>
      </div>
    </div>

    <div v-show="flujoAguaVaporAlta_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Flujo Agua Vapor Alta</h2>
      <div class="w-full h-[300px]">
        <canvas ref="flujoAguaVaporAltaCanvas"></canvas>
      </div>
    </div>

    

    

    

    <div v-show="temperaturaEstator_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Temperatura Estator</h2>
      <div class="w-full h-[300px]">
        <canvas ref="temperaturaEstatorCanvas"></canvas>
      </div>
    </div>

    <!-- Gráfico Temperatura Agua Alimentación -->
    <div v-show="temperaturaAguaAlim_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Temperatura Agua Alimentación</h2>
      <div class="w-full h-[300px]">
        <canvas ref="temperaturaAguaAlimCanvas"></canvas>
      </div>
    </div>

    <!-- Gráfico Vibración Axial Empuje -->
    <div v-show="vibracionAxialEmpuje_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Vibración Axial Empuje</h2>
      <div class="w-full h-[300px]">
        <canvas ref="vibracionAxialEmpujeCanvas"></canvas>
      </div>
    </div>
    
    <!-- Gráfico Vibración X Descanso -->
    <div v-show="vibracionXDescanso_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Vibración X Descanso</h2>
      <div class="w-full h-[300px]">
        <canvas ref="vibracionXDescansoCanvas"></canvas>
      </div>
    </div>
    
    <!-- Gráfico Vibración Y Descanso -->
    <div v-show="vibracionYDescanso_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Vibración Y Descanso</h2>
      <div class="w-full h-[300px]">
        <canvas ref="vibracionYDescansoCanvas"></canvas>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed, onUnmounted, reactive } from "vue";
import { Chart, registerables } from "chart.js";
import { useSensoresB } from "~/composables/useSensores_b";
import AnalisisCorrienteDetallado from "./AnalisisCorrienteDetallado.vue";
import AnalisisSalidaAgua from "./AnalisisSalidaAgua.vue";


Chart.register(...registerables);

// Visibilidad por gráfico - Sensores originales
const corriente_visible = ref(true);
const flujoDescarga_visible = ref(false);
const presionAgua_visible = ref(false);
const temperaturaAmbiental_visible = ref(false);
const vibracionXDescanso_visible = ref(false);
const vibracionYDescanso_visible = ref(false);
const voltajeBarra_visible = ref(false);

// Visibilidad por gráfico - Nuevos sensores
const excentricidadBomba_visible = ref(false);
const flujoAguaDomoAP_visible = ref(false);
const flujoAguaDomoMP_visible = ref(false);
const flujoAguaRecalentador_visible = ref(false);
const flujoAguaVaporAlta_visible = ref(false);
// Visibilidad por gráfico - Nuevos sensores
const temperaturaEstator_visible = ref(false);
const temperaturaAguaAlim_visible = ref(false);
const vibracionAxialEmpuje_visible = ref(false);



// Control de modo de visualización para corriente (básico o detallado)
const corrienteViewMode = ref('basic'); // Valores posibles: 'basic', 'loading' o 'detailed'
const rangoFechasCorriente = ref(null); // Almacena el rango de fechas obtenido del backend

// Función para alternar entre vista básica y detallada de corriente
const toggleCorrienteView = async () => {
  // Si estamos en modo básico, mostrar animación de carga y obtener datos
  if (corrienteViewMode.value === 'basic') {
    corrienteViewMode.value = 'loading';
    
    try {
      // Obtener rango de fechas del sensor de corriente desde el backend
      // Nota: Temporalmente usamos los datos locales mientras se arregla el endpoint
      try {
        const response = await fetch('https://backend-gm.1tfr3xva5g42.us-south.codeengine.appdomain.cloud/sensores/corriente/rango');
        
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Rango de fechas obtenido:', data);
        
        // Verificar si la respuesta tiene las propiedades esperadas
        if (!data || (!data.inicio && !data.termino)) {
          console.warn('El backend devolvió un objeto sin las propiedades esperadas');
          // Usar datos de ejemplo mientras se arregla el endpoint
          rangoFechasCorriente.value = {
            inicio: '2023-01-01',
            termino: '2023-12-31'
          };
        } else {
          // Almacenar el rango de fechas del backend
          rangoFechasCorriente.value = data;
        }
      } catch (error) {
        console.error('Error al obtener rango de fechas del backend:', error);
        // Usar datos de ejemplo en caso de error
        rangoFechasCorriente.value = {
          inicio: '2023-01-01',
          termino: '2023-12-31'
        };
      }
      
      // Cambiar a modo detallado
      corrienteViewMode.value = 'detailed';
    } catch (error) {
      console.error('Error al obtener rango de fechas:', error);
      alert(`Error al obtener rango de fechas: ${error.message}`);
      // Volver al modo básico en caso de error
      corrienteViewMode.value = 'basic';
    }
  } else {
    // Si estamos en modo detallado, volver al básico
    corrienteViewMode.value = 'basic';
    
    // Asegurarnos de que el gráfico se actualice
    nextTick(() => {
      crearGrafico(corrienteCanvas.value, corriente, "corriente");
    });
  }
};



const {
  corriente,
  excentricidadBomba,
  flujoDescarga,
  flujoAguaDomoAP,
  flujoAguaDomoMP,
  flujoAguaRecalentador,
  flujoAguaVaporAlta,
  presionAgua,
  temperaturaAmbiental,
  temperaturaAguaAlim,
  temperaturaEstator,
  vibracionAxialEmpuje,
  vibracionXDescanso,
  vibracionYDescanso,
  voltajeBarra,
  isLoading,
  corriente_visible: corriente_visible_prop,
  excentricidadBomba_visible: excentricidadBomba_visible_prop,
  flujoDescarga_visible: flujoDescarga_visible_prop,
  flujoAguaDomoAP_visible: flujoAguaDomoAP_visible_prop,
  flujoAguaDomoMP_visible: flujoAguaDomoMP_visible_prop,
  flujoAguaRecalentador_visible: flujoAguaRecalentador_visible_prop,
  flujoAguaVaporAlta_visible: flujoAguaVaporAlta_visible_prop,
  presionAgua_visible: presionAgua_visible_prop,
  temperaturaAmbiental_visible: temperaturaAmbiental_visible_prop,
  temperaturaAguaAlim_visible: temperaturaAguaAlim_visible_prop,
  temperaturaEstator_visible: temperaturaEstator_visible_prop,
  vibracionAxialEmpuje_visible: vibracionAxialEmpuje_visible_prop,
  vibracionXDescanso_visible: vibracionXDescanso_visible_prop,
  vibracionYDescanso_visible: vibracionYDescanso_visible_prop,
  voltajeBarra_visible: voltajeBarra_visible_prop,
} = useSensoresB();

// Referencias a los canvas - Sensores originales
const corrienteCanvas = ref(null);
const flujoDescargaCanvas = ref(null);
const flujoAguaDomoAPCanvas = ref(null);
const presionAguaCanvas = ref(null);
const temperaturaAmbientalCanvas = ref(null);
const temperaturaAguaAlimCanvas = ref(null);
const vibracionAxialEmpujeCanvas = ref(null);
const vibracionXDescansoCanvas = ref(null);
const vibracionYDescansoCanvas = ref(null);
const voltajeBarraCanvas = ref(null);
const excentricidadBombaCanvas = ref(null);

const flujoAguaDomoMPCanvas = ref(null);
const flujoAguaRecalentadorCanvas = ref(null);
const flujoAguaVaporAltaCanvas = ref(null);





const temperaturaEstatorCanvas = ref(null);


let charts = {
  // Sensores originales
  corriente: null,
  flujoDescarga: null,
  presionAgua: null,
  
  temperaturaAmbiental: null,
  
  flujoAguaDomoAP: null,
  
  vibracionXDescanso: null,
  vibracionYDescanso: null,
  voltajeBarra: null,
  
  // Nuevos sensores
  excentricidadBomba: null,
  flujoAguaDomoAP: null,
  flujoAguaDomoMP: null,
  flujoAguaRecalentador: null,
  flujoAguaVaporAlta: null,
  
  
  
  temperaturaEstator: null,
  temperaturaAguaAlim: null,
  vibracionAxialEmpuje: null,
  
  vibracionXDescanso: null,
  vibracionYDescanso: null,
};

// RANGOS personalizados por gráfico
const rangos = reactive({
  // Sensores originales
  corriente: { min: -0.40, max: -0.38 },
  flujoDescarga: { min: -10, max: 50 },
  presionAgua: { min: -1.97, max: 22.02 },
  temperaturaAmbiental: { min: -10, max: 23.10 },
  vibracionXDescanso: { min: -0.41 , max: -0.39 },
  vibracionYDescanso: { min: -0.41 , max: -0.39 },
  voltajeBarra: { min: -6431.91, max: 6779.75 },
  // Nuevos sensores (rangos iniciales, ajustar según datos reales)
  excentricidadBomba: { min: undefined, max: undefined },
  flujoAguaDomoAP: { min: undefined, max: undefined },
  flujoAguaDomoMP: { min: undefined, max: undefined },
  flujoAguaRecalentador: { min: undefined, max: undefined },
  flujoAguaVaporAlta: { min: undefined, max: undefined },
  
  
  flujoDescarga: { min: undefined, max: undefined },
  
  temperaturaEstator: { min: undefined, max: undefined },
  temperaturaAguaAlim: { min: undefined, max: undefined },
  vibracionAxialEmpuje: { min: undefined, max: undefined },
  
  vibracionXDescanso: { min: undefined, max: undefined },
  vibracionYDescanso: { min: undefined, max: undefined },
  
})

const crearGrafico = (canvas, data, label) => {
  if (!canvas || !data?.value) return;

  const tiempos = data.value.map((d) => d.tiempo_sensor);
  const valores = data.value.map((d) => d.valor_sensor);
  const puntosColores = data.value.map((d) =>
    d.clasificacion === 1 ? "green" : "red"
  );

  if (charts[label]) charts[label].destroy();

  // Tomamos los límites personalizados si existen
  const rango = rangos[label] || { min: undefined, max: undefined };

  // Colores adaptados al tema
  const gridColor = props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const textColor = props.isDarkMode ? '#f3f4f6' : '#333333';

  charts[label] = new Chart(canvas, {
    type: "line",
    data: {
      labels: tiempos,
      datasets: [
        {
          label,
          data: valores,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          pointRadius: 6,
          pointBackgroundColor: puntosColores,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: textColor,
            generateLabels: (chart) => [
              { text: "Normal", fillStyle: "green" },
              { text: "Anomalía", fillStyle: "red" },
            ],
          },
        },
        tooltip: {
          backgroundColor: props.isDarkMode ? 'rgba(50,50,50,0.9)' : 'rgba(0,0,0,0.7)',
          titleColor: props.isDarkMode ? '#f3f4f6' : '#ffffff',
          bodyColor: props.isDarkMode ? '#f3f4f6' : '#ffffff',
          padding: 10,
          bodyFont: { size: 14 },
          usePointStyle: true
        }
      },
      scales: {
        y: {
          min: rango.min,
          max: rango.max,
          grid: {
            color: gridColor
          },
          ticks: {
            color: textColor,
            stepSize: (rango.max - rango.min) / 5 || undefined, // Paso automático si no hay min/max
          },
        },
        x: {
          grid: {
            color: gridColor
          },
          ticks: {
            color: textColor
          }
        }
      },
    },
  });
};



// Propiedad computada para verificar si todos los datos están cargados
const allDataLoaded = computed(() => {
  // Verificar sensores originales
  const originalesLoaded = (
    corriente.value &&
    flujoDescarga.value &&
    presionAgua.value &&
    
    temperaturaAmbiental.value &&
    
    
    
    vibracionXDescanso.value &&
    vibracionYDescanso.value &&
    voltajeBarra.value
  );
  
  // Verificar nuevos sensores (no bloqueamos la carga si alguno no está disponible)
  // Los nuevos sensores se cargarán cuando estén disponibles
  return originalesLoaded;
});

const actualizarGraficos = async () => {
  await nextTick();
  
  // Actualizar gráficos de sensores originales
  crearGrafico(corrienteCanvas.value, corriente, "corriente");
  crearGrafico(flujoDescargaCanvas.value, flujoDescarga, "flujoDescarga");
  crearGrafico(presionAguaCanvas.value, presionAgua, "presionAgua");
  crearGrafico(temperaturaAmbientalCanvas.value, temperaturaAmbiental, "temperaturaAmbiental");
  crearGrafico(temperaturaAguaAlimCanvas.value, temperaturaAguaAlim, "temperaturaAguaAlim");
  crearGrafico(temperaturaEstatorCanvas.value, temperaturaEstator, "temperaturaEstator");
  crearGrafico(vibracionAxialEmpujeCanvas.value, vibracionAxialEmpuje, "vibracionAxialEmpuje");
  crearGrafico(vibracionXDescansoCanvas.value, vibracionXDescanso, "vibracionXDescanso");
  crearGrafico(vibracionYDescansoCanvas.value, vibracionYDescanso, "vibracionYDescanso");
  crearGrafico(voltajeBarraCanvas.value, voltajeBarra, "voltajeBarra");
  
  // Actualizar gráficos de nuevos sensores (solo si hay datos disponibles)
  if (excentricidadBomba.value) {
    crearGrafico(excentricidadBombaCanvas.value, excentricidadBomba, "excentricidadBomba");
  }
  
  if (flujoAguaDomoAP.value) {
    crearGrafico(flujoAguaDomoAPCanvas.value, flujoAguaDomoAP, "flujoAguaDomoAP");
  }
  
  if (flujoAguaDomoMP.value) {
    crearGrafico(flujoAguaDomoMPCanvas.value, flujoAguaDomoMP, "flujoAguaDomoMP");
  }
  
  if (flujoAguaRecalentador.value) {
    crearGrafico(flujoAguaRecalentadorCanvas.value, flujoAguaRecalentador, "flujoAguaRecalentador");
  }
  
  if (flujoAguaVaporAlta.value) {
    crearGrafico(flujoAguaVaporAltaCanvas.value, flujoAguaVaporAlta, "flujoAguaVaporAlta");
  }
  
  // Actualizar gráficos de nuevos sensores (solo si hay datos disponibles)
  if (excentricidadBomba.value) {
    crearGrafico(excentricidadBombaCanvas.value, excentricidadBomba, "excentricidadBomba");
  }
  
  if (flujoAguaDomoAP.value) {
    crearGrafico(flujoAguaDomoAPCanvas.value, flujoAguaDomoAP, "flujoAguaDomoAP");
  }
  
  if (flujoAguaDomoMP.value) {
    crearGrafico(flujoAguaDomoMPCanvas.value, flujoAguaDomoMP, "flujoAguaDomoMP");
  }
  
  if (flujoAguaRecalentador.value) {
    crearGrafico(flujoAguaRecalentadorCanvas.value, flujoAguaRecalentador, "flujoAguaRecalentador");
  }
  
  if (flujoAguaVaporAlta.value) {
    crearGrafico(flujoAguaVaporAltaCanvas.value, flujoAguaVaporAlta, "flujoAguaVaporAlta");
  }
  
  
  
  
  
  
  
  if (temperaturaEstator.value) {
    crearGrafico(temperaturaEstatorCanvas.value, temperaturaEstator, "temperaturaEstator");
  }
  
  if (temperaturaAguaAlim.value) {
    crearGrafico(temperaturaAguaAlimCanvas.value, temperaturaAguaAlim, "temperaturaAguaAlim");
  }
  
  if (vibracionAxialEmpuje.value) {
    crearGrafico(vibracionAxialEmpujeCanvas.value, vibracionAxialEmpuje, "vibracionAxialEmpuje");
  }
  
  
  if (vibracionXDescanso.value) {
    crearGrafico(vibracionXDescansoCanvas.value, vibracionXDescanso, "vibracionXDescanso");
  }
  
  if (vibracionYDescanso.value) {
    crearGrafico(vibracionYDescansoCanvas.value, vibracionYDescanso, "vibracionYDescanso");
  }
  
};

const sensoresLengths = computed(() => ({
  // Sensores originales
  corriente: corriente.value?.length || 0,
  flujoDescarga: flujoDescarga.value?.length || 0,
  presionAgua: presionAgua.value?.length || 0,
  
  temperaturaAmbiental: temperaturaAmbiental.value?.length || 0,
  
  
  
  vibracionXDescanso: vibracionXDescanso.value?.length || 0,
  vibracionYDescanso: vibracionYDescanso.value?.length || 0,
  voltajeBarra: voltajeBarra.value?.length || 0,
  
  // Nuevos sensores
  excentricidadBomba: excentricidadBomba.value?.length || 0,
  flujoAguaDomoAP: flujoAguaDomoAP.value?.length || 0,
  flujoAguaDomoMP: flujoAguaDomoMP.value?.length || 0,
  flujoAguaRecalentador: flujoAguaRecalentador.value?.length || 0,
  flujoAguaVaporAlta: flujoAguaVaporAlta.value?.length || 0,
  
  
  
  temperaturaEstator: temperaturaEstator.value?.length || 0,
  temperaturaAguaAlim: temperaturaAguaAlim.value?.length || 0,
  vibracionAxialEmpuje: vibracionAxialEmpuje.value?.length || 0,
  
  vibracionXDescanso: vibracionXDescanso.value?.length || 0,
  vibracionYDescanso: vibracionYDescanso.value?.length || 0,
  
}));

watch(
  sensoresLengths,
  (nuevosLargos, antiguosLargos) => {
    // Si alguno de los largos ha cambiado, actualizamos todos los gráficos
    actualizarGraficos();
  },
  { deep: true }
);


// Redimensionar gráficos cuando cambia el tamaño de la ventana
const handleResize = () => {
  if (allDataLoaded.value) {
    actualizarGraficos();
  }
};


const props = defineProps({
  currentView: {
    type: Object,
    default: () => ({
      chartTitle: "Analisis de fallas",
    }),
  },
  isDarkMode: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  if (allDataLoaded.value) {
    actualizarGraficos();
  }

  window.addEventListener("resize", handleResize);
});

// Actualizar gráficos cuando cambie el tema
watch(() => props.isDarkMode, () => {
  nextTick(() => {
    // Recrear los gráficos con el nuevo tema
    actualizarGraficos();
  });
}, { immediate: false });

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});



</script>