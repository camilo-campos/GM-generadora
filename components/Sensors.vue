<template>
  <div class="flex flex-col gap-6 mb-6">
    <div v-if="isLoading" class="text-xl font-semibold p-4">
      Cargando gráficos, por favor espere...
    </div>

    <template v-else>
      <div class="w-full rounded-lg shadow p-4 sm:p-6 bg-white">
        <h2 class="text-lg font-semibold text-center mb-2">Corriente</h2>
        <div class="w-full h-[300px]">
          <canvas ref="corrienteCanvas"></canvas>
        </div>
      </div>

      <div class="w-full rounded-lg shadow p-4 sm:p-6 bg-white">
        <h2 class="text-lg font-semibold text-center mb-2">Salida de Agua</h2>
        <div class="w-full h-[300px]">
          <canvas ref="salidaAguaCanvas"></canvas>
        </div>
      </div>

      <div class="w-full rounded-lg shadow p-4 sm:p-6 bg-white">
        <h2 class="text-lg font-semibold text-center mb-2">Presión de Agua</h2>
        <div class="w-full h-[300px]">
          <canvas ref="presionAguaCanvas"></canvas>
        </div>
      </div>

      <div class="w-full rounded-lg shadow p-4 sm:p-6 bg-white">
        <h2 class="text-lg font-semibold text-center mb-2">
          Generación de Gas
        </h2>
        <div class="w-full h-[300px]">
          <canvas ref="generacionGasCanvas"></canvas>
        </div>
      </div>

      <div class="w-full rounded-lg shadow p-4 sm:p-6 bg-white">
        <h2 class="text-lg font-semibold text-center mb-2">
          Temperatura Ambiente
        </h2>
        <div class="w-full h-[300px]">
          <canvas ref="temperaturaAbienteCanvas"></canvas>
        </div>
      </div>

      <div class="w-full rounded-lg shadow p-4 sm:p-6 bg-white">
        <h2 class="text-lg font-semibold text-center mb-2">
          Temperatura Descanso Bomba 1A
        </h2>
        <div class="w-full h-[300px]">
          <canvas ref="temperaturaDescansoBomba1ACanvas"></canvas>
        </div>
      </div>

      <div class="w-full rounded-lg shadow p-4 sm:p-6 bg-white">
        <h2 class="text-lg font-semibold text-center mb-2">
          Temperatura Descanso Motor Bomba
        </h2>
        <div class="w-full h-[300px]">
          <canvas ref="temperaturaDescansoMotorBombaCanvas"></canvas>
        </div>
      </div>

      <div class="w-full rounded-lg shadow p-4 sm:p-6 bg-white">
        <h2 class="text-lg font-semibold text-center mb-2">
          Temperatura Interna Empuje
        </h2>
        <div class="w-full h-[300px]">
          <canvas ref="temperaturaInternaEmpujeCanvas"></canvas>
        </div>
      </div>

      <div class="w-full rounded-lg shadow p-4 sm:p-6 bg-white">
        <h2 class="text-lg font-semibold text-center mb-2">Vibración Axial</h2>
        <div class="w-full h-[300px]">
          <canvas ref="vibracionAxialCanvas"></canvas>
        </div>
      </div>

      <div class="w-full rounded-lg shadow p-4 sm:p-6 bg-white">
        <h2 class="text-lg font-semibold text-center mb-2">Voltaje Barra</h2>
        <div class="w-full h-[300px]">
          <canvas ref="voltajeBarraCanvas"></canvas>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed } from "vue";
import { Chart, registerables } from "chart.js";
import { useSensores } from "@/composables/useSensores";

Chart.register(...registerables);

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

const crearGrafico = (canvas, data, label) => {
  if (!canvas || !data?.value) return;

  const tiempos = data.value.map((d) => d.tiempo_sensor);
  const valores = data.value.map((d) => d.valor_sensor);
  const colores = data.value.map((d) =>
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
          borderColor: colores,
          backgroundColor: colores.map((c) => c + "80"),
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Important for controlling height
      plugins: {
        legend: { display: false },
      },
    },
  });
};

// Propiedad computada para asegurarnos de que todos los datos están cargados
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

// Una vez que los datos estén cargados, actualizamos los gráficos
watch(allDataLoaded, (nuevoValor) => {
  if (nuevoValor) {
    actualizarGraficos();
  }
});

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
