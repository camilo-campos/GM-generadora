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
      <h2 class="text-lg font-semibold text-center mb-2">Corriente</h2>
      <div class="w-full h-[300px]">
        <canvas ref="corrienteCanvas"></canvas>
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
import { ref, onMounted, watch, nextTick, computed, onUnmounted } from "vue";
import { Chart, registerables } from "chart.js";
import { useSensores } from "@/composables/useSensores";

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

// Computed para contar gráficos activos
const activeGraphsCount = computed(() => {
  let count = 0;
  if (corriente_visible.value) count++;
  if (salidaAgua_visible.value) count++;
  if (presionAgua_visible.value) count++;
  if (generacionGas_visible.value) count++;
  if (temperaturaAbiente_visible.value) count++;
  if (temperaturaDescansoBomba1A_visible.value) count++;
  if (temperaturaDescansoMotorBomba_visible.value) count++;
  if (temperaturaInternaEmpuje_visible.value) count++;
  if (vibracionAxial_visible.value) count++;
  if (voltajeBarra_visible.value) count++;
  return count;
});

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

//console.log(corriente.value)

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

const crearGrafico = (canvas, data, label) => {
  if (!canvas || !data?.value) return;

  const tiempos = data.value.map((d) => d.tiempo_sensor);
  const valores = data.value.map((d) => d.valor_sensor);
  const puntosColores = data.value.map((d) =>
    d.clasificacion === 1 ? "green" : "red"
  );

  if (charts[label]) charts[label].destroy();

  charts[label] = new Chart(canvas, {
    type: "line",
    data: {
      labels: tiempos,
      datasets: [
        {
          label,
          data: valores,
          borderColor: "rgba(75, 192, 192, 1)",           // Color fijo para la línea
          backgroundColor: "rgba(75, 192, 192, 0.2)",      // Color de fondo fijo
          borderWidth: 2,
          pointRadius: 6,
          pointBackgroundColor: puntosColores,             // Colores de puntos según clasificación
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Permite controlar la altura
      plugins: {
        legend: {
              position: "top",
              labels: {
                generateLabels: (chart) => [
                  { text: "Normal (0.3 - 0.7)", fillStyle: "green" },
                  { text: "Anomalía (<0.3 o >0.7)", fillStyle: "red" },
                ],
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
</script>