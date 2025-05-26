<template>
  <!-- Botón para alternar entre vista de gráficos e iframe (ahora en la parte superior) -->
  <div class="flex justify-end p-4" :class="props.isDarkMode ? 'bg-gray-900' : 'bg-gray-100'">
    <button 
      @click="toggleIframeView"
      class="flex items-center gap-2 py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out"
      :class="isIframeView 
        ? props.isDarkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600' 
        : props.isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'"
    >
      <svg v-if="!isIframeView" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
      {{ isIframeView ? 'Volver a gráficos' : 'Ver dashboard externo' }}
    </button>
  </div>
  
  <!-- Botones de sensores (se ocultan cuando iframe está activo) -->
  <div v-show="!isIframeView" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-6" :class="props.isDarkMode ? 'bg-gray-900' : 'bg-gray-100'">
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
      @click="salidaAgua_visible = !salidaAgua_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        salidaAgua_visible 
          ? 'bg-green-600 text-white ring-2 ring-offset-2 ring-green-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-green-100'
      ]"
    >
      <span>Salida de Agua</span>
      <span v-if="salidaAgua_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
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
      @click="generacionGas_visible = !generacionGas_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        generacionGas_visible 
          ? 'bg-red-600 text-white ring-2 ring-offset-2 ring-red-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-red-100'
      ]"
    >
      <span>Generación de Gas</span>
      <span v-if="generacionGas_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <button 
      @click="temperaturaAbiente_visible = !temperaturaAbiente_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        temperaturaAbiente_visible 
          ? 'bg-yellow-500 text-white ring-2 ring-offset-2 ring-yellow-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-yellow-100'
      ]"
    >
      <span>Temp. Ambiente</span>
      <span v-if="temperaturaAbiente_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <button 
      @click="temperaturaDescansoBomba1A_visible = !temperaturaDescansoBomba1A_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        temperaturaDescansoBomba1A_visible 
          ? 'bg-indigo-600 text-white ring-2 ring-offset-2 ring-indigo-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-indigo-100'
      ]"
    >
      <span>Temp. Bomba 1A</span>
      <span v-if="temperaturaDescansoBomba1A_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <button 
      @click="temperaturaDescansoMotorBomba_visible = !temperaturaDescansoMotorBomba_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        temperaturaDescansoMotorBomba_visible 
          ? 'bg-pink-500 text-white ring-2 ring-offset-2 ring-pink-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-pink-100'
      ]"
    >
      <span>Temp. Motor Bomba</span>
      <span v-if="temperaturaDescansoMotorBomba_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <button 
      @click="temperaturaInternaEmpuje_visible = !temperaturaInternaEmpuje_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        temperaturaInternaEmpuje_visible 
          ? 'bg-teal-600 text-white ring-2 ring-offset-2 ring-teal-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-teal-100'
      ]"
    >
      <span>Temp. Empuje</span>
      <span v-if="temperaturaInternaEmpuje_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <button 
      @click="vibracionAxial_visible = !vibracionAxial_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        vibracionAxial_visible 
          ? 'bg-gray-800 text-white ring-2 ring-offset-2 ring-gray-500' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      ]"
    >
      <span>Vibración Axial</span>
      <span v-if="vibracionAxial_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
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
    
    <button 
      @click="posicionValvulaRecirc_visible = !posicionValvulaRecirc_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        posicionValvulaRecirc_visible 
          ? 'bg-rose-600 text-white ring-2 ring-offset-2 ring-rose-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-rose-100'
      ]"
    >
      <span>Posición Válvula Recirc</span>
      <span v-if="posicionValvulaRecirc_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <button 
      @click="presionAguaMP_visible = !presionAguaMP_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        presionAguaMP_visible 
          ? 'bg-sky-600 text-white ring-2 ring-offset-2 ring-sky-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-sky-100'
      ]"
    >
      <span>Presión Agua MP</span>
      <span v-if="presionAguaMP_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <button 
      @click="presionSuccionBAA_visible = !presionSuccionBAA_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        presionSuccionBAA_visible 
          ? 'bg-violet-600 text-white ring-2 ring-offset-2 ring-violet-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-violet-100'
      ]"
    >
      <span>Presión Succión BAA</span>
      <span v-if="presionSuccionBAA_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <button 
      @click="temperaturaEstator_visible = !temperaturaEstator_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        temperaturaEstator_visible 
          ? 'bg-amber-500 text-white ring-2 ring-offset-2 ring-amber-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-amber-100'
      ]"
    >
      <span>Temp. Estator</span>
      <span v-if="temperaturaEstator_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
    
    <button 
      @click="flujoSalida12FPMFC_visible = !flujoSalida12FPMFC_visible" 
      :class="[
        'font-semibold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out flex items-center justify-center gap-2',
        flujoSalida12FPMFC_visible 
          ? 'bg-lime-500 text-white ring-2 ring-offset-2 ring-lime-400' 
          : 'bg-gray-200 text-gray-700 hover:bg-lime-100'
      ]"
    >
      <span>Flujo Salida 12FPMFC</span>
      <span v-if="flujoSalida12FPMFC_visible" class="h-2 w-2 rounded-full bg-white animate-pulse"></span>
    </button>
  </div>

  <div v-show="!isIframeView" class="p-4" :class="props.isDarkMode ? 'bg-gray-900' : 'bg-gray-100'">
    <div class="flex justify-between items-center mb-4">
      <div class="flex flex-wrap gap-2">
        <div class="text-sm font-medium" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Gráficos activos:</div>
        <div class="flex flex-wrap gap-2">
        <!-- Etiquetas sensores originales -->
        <span v-if="corriente_visible" class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Corriente</span>
        <span v-if="salidaAgua_visible" class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Salida de Agua</span>
        <span v-if="presionAgua_visible" class="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">Presión de Agua</span>
        <span v-if="generacionGas_visible" class="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Generación de Gas</span>
        <span v-if="temperaturaAbiente_visible" class="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Temp. Ambiente</span>
        <span v-if="temperaturaDescansoBomba1A_visible" class="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">Temp. Bomba 1A</span>
        <span v-if="temperaturaDescansoMotorBomba_visible" class="px-2 py-1 text-xs bg-pink-100 text-pink-800 rounded-full">Temp. Motor Bomba</span>
        <span v-if="temperaturaInternaEmpuje_visible" class="px-2 py-1 text-xs bg-teal-100 text-teal-800 rounded-full">Temp. Empuje</span>
        <span v-if="vibracionAxial_visible" class="px-2 py-1 text-xs bg-gray-300 text-gray-800 rounded-full">Vibración Axial</span>
        <span v-if="voltajeBarra_visible" class="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">Voltaje Barra</span>
        
        <!-- Etiquetas nuevos sensores -->
        <span v-if="excentricidadBomba_visible" class="px-2 py-1 text-xs bg-cyan-100 text-cyan-800 rounded-full">Excentricidad Bomba</span>
        <span v-if="flujoAguaDomoAP_visible" class="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-full">Flujo Agua Domo AP</span>
        <span v-if="flujoAguaDomoMP_visible" class="px-2 py-1 text-xs bg-lime-100 text-lime-800 rounded-full">Flujo Agua Domo MP</span>
        <span v-if="flujoAguaRecalentador_visible" class="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">Flujo Agua Recalentador</span>
        <span v-if="flujoAguaVaporAlta_visible" class="px-2 py-1 text-xs bg-fuchsia-100 text-fuchsia-800 rounded-full">Flujo Agua Vapor Alta</span>
        <span v-if="posicionValvulaRecirc_visible" class="px-2 py-1 text-xs bg-rose-100 text-rose-800 rounded-full">Posición Válvula Recirc</span>
        <span v-if="presionAguaMP_visible" class="px-2 py-1 text-xs bg-sky-100 text-sky-800 rounded-full">Presión Agua MP</span>
        <span v-if="presionSuccionBAA_visible" class="px-2 py-1 text-xs bg-violet-100 text-violet-800 rounded-full">Presión Succión BAA</span>
        <span v-if="temperaturaEstator_visible" class="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">Temp. Estator</span>
        <span v-if="flujoSalida12FPMFC_visible" class="px-2 py-1 text-xs bg-lime-100 text-lime-800 rounded-full">Flujo Salida 12FPMFC</span>
        </div>
      </div>
      <!-- Ya no necesitamos el botón aquí, se movió arriba -->
    </div>
  </div>

  <div v-show="isLoading" class="text-xl font-semibold p-4">
    Cargando gráficos, por favor espere...
  </div>
  
  <!-- Vista de iframe en pantalla completa cuando isIframeView es true -->
  <div v-if="isIframeView" class="w-full" style="height: calc(100vh - 130px);">
    <iframe 
      :src="iframeUrl" 
      class="w-full h-full border-0" 
      title="Dashboard externo"
      allowfullscreen
      loading="lazy">
    </iframe>
  </div>

  <!-- Vista normal de gráficos cuando isIframeView es false -->
  <div v-show="!isLoading && !isIframeView" class="flex flex-col gap-6 mb-6">
    <!-- Gráficos (sin cambios) -->
    <div v-show="corriente_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <div class="mb-4">
        <div class="flex justify-center mb-2">
          <h2 class="text-lg font-semibold" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Corriente</h2>
        </div>
      </div>
      
      <!-- Gráfico básico -->
      <div class="w-full h-[300px]">
        <canvas ref="corrienteCanvas"></canvas>
      </div>
    </div>
    
    <div v-show="salidaAgua_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Salida de Agua</h2>
      <div class="w-full h-[300px]">
        <canvas ref="salidaAguaCanvas"></canvas>
      </div>
    </div>

    <div v-show="presionAgua_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Presión de Agua</h2>
      <div class="w-full h-[300px]">
        <canvas ref="presionAguaCanvas"></canvas>
      </div>
    </div>

    <div v-show="generacionGas_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Generación de Gas</h2>
      <div class="w-full h-[300px]">
        <canvas ref="generacionGasCanvas"></canvas>
      </div>
    </div>

    <div v-show="temperaturaAbiente_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Temperatura Ambiente</h2>
      <div class="w-full h-[300px]">
        <canvas ref="temperaturaAbienteCanvas"></canvas>
      </div>
    </div>

    <div v-show="temperaturaDescansoBomba1A_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Temp. Descanso Bomba 1A</h2>
      <div class="w-full h-[300px]">
        <canvas ref="temperaturaDescansoBomba1ACanvas"></canvas>
      </div>
    </div>

    <div v-show="temperaturaDescansoMotorBomba_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Temp. Descanso Motor Bomba</h2>
      <div class="w-full h-[300px]">
        <canvas ref="temperaturaDescansoMotorBombaCanvas"></canvas>
      </div>
    </div>

    <div v-show="temperaturaInternaEmpuje_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Temp. Interna Empuje</h2>
      <div class="w-full h-[300px]">
        <canvas ref="temperaturaInternaEmpujeCanvas"></canvas>
      </div>
    </div>

    <div v-show="vibracionAxial_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Vibración Axial</h2>
      <div class="w-full h-[300px]">
        <canvas ref="vibracionAxialCanvas"></canvas>
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

    <div v-show="posicionValvulaRecirc_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Posición Válvula Recirc</h2>
      <div class="w-full h-[300px]">
        <canvas ref="posicionValvulaRecircCanvas"></canvas>
      </div>
    </div>

    <div v-show="presionAguaMP_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Presión Agua MP</h2>
      <div class="w-full h-[300px]">
        <canvas ref="presionAguaMPCanvas"></canvas>
      </div>
    </div>

    <div v-show="presionSuccionBAA_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Presión Succión BAA</h2>
      <div class="w-full h-[300px]">
        <canvas ref="presionSuccionBAACanvas"></canvas>
      </div>
    </div>

    <div v-show="temperaturaEstator_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Temperatura Estator</h2>
      <div class="w-full h-[300px]">
        <canvas ref="temperaturaEstatorCanvas"></canvas>
      </div>
    </div>

    <div v-show="flujoSalida12FPMFC_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6" :class="props.isDarkMode ? 'bg-gray-800' : 'bg-white'">
      <h2 class="text-lg font-semibold text-center mb-2" :class="props.isDarkMode ? 'text-gray-200' : 'text-gray-800'">Flujo Salida 12FPMFC</h2>
      <div class="w-full h-[300px]">
        <canvas ref="flujoSalida12FPMFCCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed, onUnmounted, reactive } from "vue";
import { Chart, registerables } from "chart.js";
import { useSensores } from "@/composables/useSensores";
import AnalisisSalidaAgua from "./AnalisisSalidaAgua.vue";


Chart.register(...registerables);



// Control de vista de iframe
const isIframeView = ref(false);
const iframeUrl = ref('https://app.powerbi.com/view?r=eyJrIjoiZDRjMjdhOGYtOTZiNS00NDU5LWFhN2UtMzFkMmRkMzE0NWEwIiwidCI6ImNmODVkMDQ4LTdkNmQtNDk3Yi1hOWRlLWY1MTllZDYzODViNCJ9');

// Estado para guardar qué gráficos estaban activos antes de mostrar el iframe
const activeChartsBeforeIframe = reactive({
  corriente: false,
  salidaAgua: false,
  presionAgua: false,
  generacionGas: false,
  temperaturaAbiente: false,
  temperaturaDescansoBomba1A: false,
  temperaturaDescansoMotorBomba: false,
  temperaturaInternaEmpuje: false,
  vibracionAxial: false,
  voltajeBarra: false,
  excentricidadBomba: false,
  flujoAguaDomoAP: false,
  flujoAguaDomoMP: false,
  flujoAguaRecalentador: false,
  flujoAguaVaporAlta: false,
  posicionValvulaRecirc: false,
  presionAguaMP: false,
  presionSuccionBAA: false,
  temperaturaEstator: false,
  flujoSalida12FPMFC: false
});

// Función para alternar entre vista de gráficos e iframe
const toggleIframeView = () => {
  // Si estamos volviendo a la vista de gráficos
  if (isIframeView.value) {
    isIframeView.value = false;
    
    // Restauramos los gráficos que estaban activos
    restoreActiveCharts();
    
    // Si ningún gráfico estaba activo antes, activamos al menos el gráfico de corriente
    const anyChartActive = Object.values(activeChartsBeforeIframe).some(value => value);
    if (!anyChartActive) {
      corriente_visible.value = true;
    }
    
    // Aseguramos que los gráficos se actualicen correctamente
    nextTick(() => {
      actualizarGraficos();
    });
    
    return;
  }
  
  // Si vamos a mostrar el iframe, primero guardamos el estado de los gráficos activos
  saveActiveCharts();
  
  // Desactivamos todos los gráficos
  hideAllCharts();
  
  // Activamos la vista de iframe
  isIframeView.value = true;
};

// Función para guardar el estado de los gráficos activos
const saveActiveCharts = () => {
  // Sensores originales
  activeChartsBeforeIframe.corriente = corriente_visible.value;
  activeChartsBeforeIframe.salidaAgua = salidaAgua_visible.value;
  activeChartsBeforeIframe.presionAgua = presionAgua_visible.value;
  activeChartsBeforeIframe.generacionGas = generacionGas_visible.value;
  activeChartsBeforeIframe.temperaturaAbiente = temperaturaAbiente_visible.value;
  activeChartsBeforeIframe.temperaturaDescansoBomba1A = temperaturaDescansoBomba1A_visible.value;
  activeChartsBeforeIframe.temperaturaDescansoMotorBomba = temperaturaDescansoMotorBomba_visible.value;
  activeChartsBeforeIframe.temperaturaInternaEmpuje = temperaturaInternaEmpuje_visible.value;
  activeChartsBeforeIframe.vibracionAxial = vibracionAxial_visible.value;
  activeChartsBeforeIframe.voltajeBarra = voltajeBarra_visible.value;
  
  // Nuevos sensores
  activeChartsBeforeIframe.excentricidadBomba = excentricidadBomba_visible.value;
  activeChartsBeforeIframe.flujoAguaDomoAP = flujoAguaDomoAP_visible.value;
  activeChartsBeforeIframe.flujoAguaDomoMP = flujoAguaDomoMP_visible.value;
  activeChartsBeforeIframe.flujoAguaRecalentador = flujoAguaRecalentador_visible.value;
  activeChartsBeforeIframe.flujoAguaVaporAlta = flujoAguaVaporAlta_visible.value;
  activeChartsBeforeIframe.posicionValvulaRecirc = posicionValvulaRecirc_visible.value;
  activeChartsBeforeIframe.presionAguaMP = presionAguaMP_visible.value;
  activeChartsBeforeIframe.presionSuccionBAA = presionSuccionBAA_visible.value;
  activeChartsBeforeIframe.temperaturaEstator = temperaturaEstator_visible.value;
  activeChartsBeforeIframe.flujoSalida12FPMFC = flujoSalida12FPMFC_visible.value;
};

// Función para restaurar los gráficos activos
const restoreActiveCharts = () => {
  // Sensores originales
  corriente_visible.value = activeChartsBeforeIframe.corriente;
  salidaAgua_visible.value = activeChartsBeforeIframe.salidaAgua;
  presionAgua_visible.value = activeChartsBeforeIframe.presionAgua;
  generacionGas_visible.value = activeChartsBeforeIframe.generacionGas;
  temperaturaAbiente_visible.value = activeChartsBeforeIframe.temperaturaAbiente;
  temperaturaDescansoBomba1A_visible.value = activeChartsBeforeIframe.temperaturaDescansoBomba1A;
  temperaturaDescansoMotorBomba_visible.value = activeChartsBeforeIframe.temperaturaDescansoMotorBomba;
  temperaturaInternaEmpuje_visible.value = activeChartsBeforeIframe.temperaturaInternaEmpuje;
  vibracionAxial_visible.value = activeChartsBeforeIframe.vibracionAxial;
  voltajeBarra_visible.value = activeChartsBeforeIframe.voltajeBarra;
  
  // Nuevos sensores
  excentricidadBomba_visible.value = activeChartsBeforeIframe.excentricidadBomba;
  flujoAguaDomoAP_visible.value = activeChartsBeforeIframe.flujoAguaDomoAP;
  flujoAguaDomoMP_visible.value = activeChartsBeforeIframe.flujoAguaDomoMP;
  flujoAguaRecalentador_visible.value = activeChartsBeforeIframe.flujoAguaRecalentador;
  flujoAguaVaporAlta_visible.value = activeChartsBeforeIframe.flujoAguaVaporAlta;
  posicionValvulaRecirc_visible.value = activeChartsBeforeIframe.posicionValvulaRecirc;
  presionAguaMP_visible.value = activeChartsBeforeIframe.presionAguaMP;
  presionSuccionBAA_visible.value = activeChartsBeforeIframe.presionSuccionBAA;
  temperaturaEstator_visible.value = activeChartsBeforeIframe.temperaturaEstator;
  flujoSalida12FPMFC_visible.value = activeChartsBeforeIframe.flujoSalida12FPMFC;
};

// Función para desactivar todos los gráficos
const hideAllCharts = () => {
  // Sensores originales
  corriente_visible.value = false;
  salidaAgua_visible.value = false;
  presionAgua_visible.value = false;
  generacionGas_visible.value = false;
  temperaturaAbiente_visible.value = false;
  temperaturaDescansoBomba1A_visible.value = false;
  temperaturaDescansoMotorBomba_visible.value = false;
  temperaturaInternaEmpuje_visible.value = false;
  vibracionAxial_visible.value = false;
  voltajeBarra_visible.value = false;
  
  // Nuevos sensores
  excentricidadBomba_visible.value = false;
  flujoAguaDomoAP_visible.value = false;
  flujoAguaDomoMP_visible.value = false;
  flujoAguaRecalentador_visible.value = false;
  flujoAguaVaporAlta_visible.value = false;
  posicionValvulaRecirc_visible.value = false;
  presionAguaMP_visible.value = false;
  presionSuccionBAA_visible.value = false;
  temperaturaEstator_visible.value = false;
  flujoSalida12FPMFC_visible.value = false;
};

// Visibilidad por gráfico - Sensores originales
const corriente_visible = ref(true);
const salidaAgua_visible = ref(false);
const presionAgua_visible = ref(false);
const generacionGas_visible = ref(false);
const temperaturaAbiente_visible = ref(false);
const temperaturaDescansoBomba1A_visible = ref(false);
const temperaturaDescansoMotorBomba_visible = ref(false);
const temperaturaInternaEmpuje_visible = ref(false);
const vibracionAxial_visible = ref(false);
const voltajeBarra_visible = ref(false);

// Visibilidad por gráfico - Nuevos sensores
const excentricidadBomba_visible = ref(false);
const flujoAguaDomoAP_visible = ref(false);
const flujoAguaDomoMP_visible = ref(false);
const flujoAguaRecalentador_visible = ref(false);
const flujoAguaVaporAlta_visible = ref(false);
const posicionValvulaRecirc_visible = ref(false);
const presionAguaMP_visible = ref(false);
const presionSuccionBAA_visible = ref(false);
const temperaturaEstator_visible = ref(false);
const flujoSalida12FPMFC_visible = ref(false);





const {
  corriente,
  salidaAgua,
  presionAgua,
  generacionGas,
  temperaturaAbiente,
  temperaturaInternaEmpuje,
  temperaturaDescansoMotorBomba,
  temperaturaDescansoBomba1A,
  vibracionAxial,
  voltajeBarra,
  
  excentricidadBomba,
  flujoAguaDomoAP,
  flujoAguaDomoMP,
  flujoAguaRecalentador,
  flujoAguaVaporAlta,
  posicionValvulaRecirc,
  presionAguaMP,
  presionSuccionBAA,
  temperaturaEstator,
  flujoSalida12FPMFC,
  
  isLoading,
} = useSensores();



// Referencias a los canvas - Sensores originales
const corrienteCanvas = ref(null);
const salidaAguaCanvas = ref(null);
const generacionGasCanvas = ref(null);
const temperaturaAbienteCanvas = ref(null);
const temperaturaDescansoBomba1ACanvas = ref(null);
const temperaturaDescansoMotorBombaCanvas = ref(null);
const temperaturaInternaEmpujeCanvas = ref(null);
const vibracionAxialCanvas = ref(null);
const voltajeBarraCanvas = ref(null);
const presionAguaCanvas = ref(null);

// Referencias a los canvas - Nuevos sensores
const excentricidadBombaCanvas = ref(null);
const flujoAguaDomoAPCanvas = ref(null);
const flujoAguaDomoMPCanvas = ref(null);
const flujoAguaRecalentadorCanvas = ref(null);
const flujoAguaVaporAltaCanvas = ref(null);
const posicionValvulaRecircCanvas = ref(null);
const presionAguaMPCanvas = ref(null);
const presionSuccionBAACanvas = ref(null);
const temperaturaEstatorCanvas = ref(null);
const flujoSalida12FPMFCCanvas = ref(null);

let charts = {
  // Sensores originales
  corriente: null,
  salidaAgua: null,
  presionAgua: null,
  generacionGas: null,
  temperaturaAbiente: null,
  temperaturaDescansoBomba1A: null,
  temperaturaDescansoMotorBomba: null,
  temperaturaInternaEmpuje: null,
  vibracionAxial: null,
  voltajeBarra: null,
  
  // Nuevos sensores
  excentricidadBomba: null,
  flujoAguaDomoAP: null,
  flujoAguaDomoMP: null,
  flujoAguaRecalentador: null,
  flujoAguaVaporAlta: null,
  posicionValvulaRecirc: null,
  presionAguaMP: null,
  presionSuccionBAA: null,
  temperaturaEstator: null,
  flujoSalida12FPMFC: null,
};


// RANGOS personalizados por gráfico
const rangos = reactive({
  // Sensores originales
  corriente: { min: -0.40, max: -0.38 },
  salidaAgua: { min: -10, max: 50 },
  presionAgua: { min: 1.97, max: 2.02 },
  generacionGas: { min: 0, max: 0 },
  temperaturaAbiente: { min: 16.20, max: 23.10 },
  temperaturaDescansoBomba1A: { min: 31.22, max: 33.56 },
  temperaturaDescansoMotorBomba: { min: 22.10 , max: 25.13 },
  temperaturaInternaEmpuje: { min: 32.07  , max: 39.20 },
  vibracionAxial: { min: -0.41 , max: -0.39 },
  voltajeBarra: { min: 6431.91, max: 6779.75 },
  
  // Nuevos sensores (rangos iniciales, ajustar según datos reales)
  excentricidadBomba: { min: undefined, max: undefined },
  flujoAguaDomoAP: { min: undefined, max: undefined },
  flujoAguaDomoMP: { min: undefined, max: undefined },
  flujoAguaRecalentador: { min: undefined, max: undefined },
  flujoAguaVaporAlta: { min: undefined, max: undefined },
  posicionValvulaRecirc: { min: undefined, max: undefined },
  presionAguaMP: { min: undefined, max: undefined },
  presionSuccionBAA: { min: undefined, max: undefined },
  temperaturaEstator: { min: undefined, max: undefined },
  flujoSalida12FPMFC: { min: undefined, max: undefined }
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
    salidaAgua.value &&
    presionAgua.value &&
    generacionGas.value &&
    temperaturaAbiente.value &&
    temperaturaDescansoBomba1A.value &&
    temperaturaDescansoMotorBomba.value &&
    temperaturaInternaEmpuje.value &&
    vibracionAxial.value &&
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
  crearGrafico(salidaAguaCanvas.value, salidaAgua, "salidaAgua");
  crearGrafico(presionAguaCanvas.value, presionAgua, "presionAgua");
  crearGrafico(generacionGasCanvas.value, generacionGas, "generacionGas");
  crearGrafico(
    temperaturaAbienteCanvas.value,
    temperaturaAbiente,
    "temperaturaAbiente"
  );
  crearGrafico(
    temperaturaDescansoBomba1ACanvas.value,
    temperaturaDescansoBomba1A,
    "temperaturaDescansoBomba1A"
  );
  crearGrafico(
    temperaturaDescansoMotorBombaCanvas.value,
    temperaturaDescansoMotorBomba,
    "temperaturaDescansoMotorBomba"
  );
  crearGrafico(
    temperaturaInternaEmpujeCanvas.value,
    temperaturaInternaEmpuje,
    "temperaturaInternaEmpuje"
  );
  crearGrafico(vibracionAxialCanvas.value, vibracionAxial, "vibracionAxial");
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
  
  if (posicionValvulaRecirc.value) {
    crearGrafico(posicionValvulaRecircCanvas.value, posicionValvulaRecirc, "posicionValvulaRecirc");
  }
  
  if (presionAguaMP.value) {
    crearGrafico(presionAguaMPCanvas.value, presionAguaMP, "presionAguaMP");
  }
  
  if (presionSuccionBAA.value) {
    crearGrafico(presionSuccionBAACanvas.value, presionSuccionBAA, "presionSuccionBAA");
  }
  
  if (temperaturaEstator.value) {
    crearGrafico(temperaturaEstatorCanvas.value, temperaturaEstator, "temperaturaEstator");
  }
  
  if (flujoSalida12FPMFC.value) {
    crearGrafico(flujoSalida12FPMFCCanvas.value, flujoSalida12FPMFC, "flujoSalida12FPMFC");
  }
};

const sensoresLengths = computed(() => ({
  // Sensores originales
  corriente: corriente.value?.length || 0,
  salidaAgua: salidaAgua.value?.length || 0,
  presionAgua: presionAgua.value?.length || 0,
  generacionGas: generacionGas.value?.length || 0,
  temperaturaAbiente: temperaturaAbiente.value?.length || 0,
  temperaturaDescansoBomba1A: temperaturaDescansoBomba1A.value?.length || 0,
  temperaturaDescansoMotorBomba: temperaturaDescansoMotorBomba.value?.length || 0,
  temperaturaInternaEmpuje: temperaturaInternaEmpuje.value?.length || 0,
  vibracionAxial: vibracionAxial.value?.length || 0,
  voltajeBarra: voltajeBarra.value?.length || 0,
  
  // Nuevos sensores
  excentricidadBomba: excentricidadBomba.value?.length || 0,
  flujoAguaDomoAP: flujoAguaDomoAP.value?.length || 0,
  flujoAguaDomoMP: flujoAguaDomoMP.value?.length || 0,
  flujoAguaRecalentador: flujoAguaRecalentador.value?.length || 0,
  flujoAguaVaporAlta: flujoAguaVaporAlta.value?.length || 0,
  posicionValvulaRecirc: posicionValvulaRecirc.value?.length || 0,
  presionAguaMP: presionAguaMP.value?.length || 0,
  presionSuccionBAA: presionSuccionBAA.value?.length || 0,
  temperaturaEstator: temperaturaEstator.value?.length || 0,
  flujoSalida12FPMFC: flujoSalida12FPMFC.value?.length || 0,
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