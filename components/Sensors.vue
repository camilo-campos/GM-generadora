<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-6 bg-gray-100">
    <!-- Botones de visibilidad con indicador de estado activo -->
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
  </div>

  <div class="p-4 bg-gray-100">
    <div class="flex flex-wrap gap-2 mb-4">
      <div class="text-sm font-medium">Gráficos activos:</div>
      <div class="flex flex-wrap gap-2">
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
      </div>
    </div>
  </div>

  <div v-show="isLoading" class="text-xl font-semibold p-4">
    Cargando gráficos, por favor espere...
  </div>
  
  <div v-show="!isLoading" class="flex flex-col gap-6 mb-6">
    <!-- Gráficos (sin cambios) -->
    <div v-show="corriente_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6 bg-white">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Corriente</h2>
        <button 
          @click="toggleCorrienteView"
          class="flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
          :class="corrienteViewMode === 'basic' 
            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
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
      
      <!-- Contenedor principal que siempre está presente -->
      <div class="w-full h-[300px] relative">
        <!-- Gráfico básico - canvas siempre presente, solo cambia su visibilidad -->
        <div class="w-full h-full" :style="{display: corrienteViewMode === 'basic' ? 'block' : 'none'}">
          <canvas ref="corrienteCanvas"></canvas>
        </div>
        
        <!-- Animación de carga mientras se obtienen los rangos de fechas -->
        <div v-if="corrienteViewMode === 'loading'" class="absolute inset-0 flex items-center justify-center bg-white">
          <div class="flex flex-col items-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-3"></div>
            <p class="text-gray-700 font-medium">Obteniendo datos del sensor...</p>
            <p class="text-sm text-gray-500 mt-1">Consultando rangos de fechas disponibles</p>
          </div>
        </div>
      </div>
      
      <!-- Tarjeta de análisis detallado - se muestra fuera del contenedor del gráfico básico -->
      <div v-if="corrienteViewMode === 'detailed'">
        <AnalisisCorrienteDetallado :datos="corriente" :rangoFechas="rangoFechasCorriente" />
      </div>
    </div>
    
    <div v-show="salidaAgua_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6 bg-white">
      <h2 class="text-lg font-semibold text-center mb-2">Salida de Agua</h2>
      <div class="w-full h-[300px]">
        <canvas ref="salidaAguaCanvas"></canvas>
      </div>
    </div>

    <div v-show="presionAgua_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6 bg-white">
      <h2 class="text-lg font-semibold text-center mb-2">Presión de Agua</h2>
      <div class="w-full h-[300px]">
        <canvas ref="presionAguaCanvas"></canvas>
      </div>
    </div>

    <div v-show="generacionGas_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6 bg-white">
      <h2 class="text-lg font-semibold text-center mb-2">Generación de Gas</h2>
      <div class="w-full h-[300px]">
        <canvas ref="generacionGasCanvas"></canvas>
      </div>
    </div>

    <div v-show="temperaturaAbiente_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6 bg-white">
      <h2 class="text-lg font-semibold text-center mb-2">Temperatura Ambiente</h2>
      <div class="w-full h-[300px]">
        <canvas ref="temperaturaAbienteCanvas"></canvas>
      </div>
    </div>

    <div v-show="temperaturaDescansoBomba1A_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6 bg-white">
      <h2 class="text-lg font-semibold text-center mb-2">Temp. Descanso Bomba 1A</h2>
      <div class="w-full h-[300px]">
        <canvas ref="temperaturaDescansoBomba1ACanvas"></canvas>
      </div>
    </div>

    <div v-show="temperaturaDescansoMotorBomba_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6 bg-white">
      <h2 class="text-lg font-semibold text-center mb-2">Temp. Descanso Motor Bomba</h2>
      <div class="w-full h-[300px]">
        <canvas ref="temperaturaDescansoMotorBombaCanvas"></canvas>
      </div>
    </div>

    <div v-show="temperaturaInternaEmpuje_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6 bg-white">
      <h2 class="text-lg font-semibold text-center mb-2">Temp. Interna Empuje</h2>
      <div class="w-full h-[300px]">
        <canvas ref="temperaturaInternaEmpujeCanvas"></canvas>
      </div>
    </div>

    <div v-show="vibracionAxial_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6 bg-white">
      <h2 class="text-lg font-semibold text-center mb-2">Vibración Axial</h2>
      <div class="w-full h-[300px]">
        <canvas ref="vibracionAxialCanvas"></canvas>
      </div>
    </div>

    <div v-show="voltajeBarra_visible" class="grafico w-full rounded-lg shadow p-4 sm:p-6 bg-white">
      <h2 class="text-lg font-semibold text-center mb-2">Voltaje Barra</h2>
      <div class="w-full h-[300px]">
        <canvas ref="voltajeBarraCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed, onUnmounted, reactive } from "vue";
import { Chart, registerables } from "chart.js";
import { useSensores } from "@/composables/useSensores";
import AnalisisCorrienteDetallado from "./AnalisisCorrienteDetallado.vue";


Chart.register(...registerables);



// Visibilidad por gráfico
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
        const response = await fetch('http://127.0.0.1:8000/sensores/corriente/rango');
        
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
  salidaAgua,
  presionAgua,
  generacionGas,
  temperaturaAbiente,
  temperaturaDescansoBomba1A,
  temperaturaDescansoMotorBomba,
  temperaturaInternaEmpuje,
  vibracionAxial,
  voltajeBarra,
  isLoading,
} = useSensores();



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

let charts = {
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
};


// RANGOS personalizados por gráfico
const rangos = reactive({
  corriente: { min: -0.40, max: -0.38 },
  salidaAgua: { min: -10, max: 50 },
  presionAgua: { min: 1.97, max: 2.02 },
  generacionGas: { min: 0, max: 0 },
  temperaturaAbiente: { min: 16.20, max: 23.10 },
  temperaturaDescansoBomba1A: { min: 31.22, max: 33.56 },
  temperaturaDescansoMotorBomba: { min: 22.10 , max: 25.13 },
  temperaturaInternaEmpuje: { min: 32.07  , max: 39.20 },
  vibracionAxial: { min: -0.41 , max: -0.39 },
  voltajeBarra: { min: 6431.91, max: 6779.75 }
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
            generateLabels: (chart) => [
              { text: "Normal", fillStyle: "green" },
              { text: "Anomalía", fillStyle: "red" },
            ],
          },
        },
      },
      scales: {
        y: {
          min: rango.min,
          max: rango.max,
          ticks: {
            stepSize: (rango.max - rango.min) / 5 || undefined, // Paso automático si no hay min/max
          },
        },
      },
    },
  });
};



// Propiedad computada para verificar si todos los datos están cargados
const allDataLoaded = computed(() => {
  return (
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
});

const actualizarGraficos = async () => {
  await nextTick();
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
};

const sensoresLengths = computed(() => ({
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

onMounted(() => {
  if (allDataLoaded.value) {
    actualizarGraficos();
  }

  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});


defineProps({
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
</script>