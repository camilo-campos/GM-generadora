<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
    <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <div>
        <h3 class="text-lg font-semibold text-gray-800">{{ titulo }}</h3>
        <p v-if="alertaInfo" class="text-sm text-gray-500 mt-1">
          Alerta detectada: {{ formatearFecha(alertaInfo.timestamp) }}
        </p>
      </div>
      <button
        @click="actualizarDatos"
        :disabled="cargandoDatos"
        class="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50"
      >
        <svg v-if="!cargandoDatos" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>{{ cargandoDatos ? 'Actualizando...' : 'Actualizar' }}</span>
      </button>
    </div>

    <div class="p-6">
      <!-- Loading State -->
      <div v-if="cargandoDatos" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMensaje" class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-red-700 font-medium">Error al cargar datos</p>
        <p class="text-red-600 text-sm mt-1">{{ errorMensaje }}</p>
      </div>

      <!-- No Data State -->
      <div v-else-if="!datosGrafico || datosGrafico.length === 0" class="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-gray-600 font-medium">No hay datos disponibles</p>
        <p class="text-gray-500 text-sm mt-1">No se encontraron datos de anomalías para este sensor</p>
      </div>

      <!-- Chart -->
      <div v-else>
        <!-- Estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p class="text-sm text-gray-600 font-medium">Total de Registros</p>
            <p class="text-2xl font-bold text-gray-800 mt-1">{{ estadisticas?.total_registros || 0 }}</p>
          </div>
          <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p class="text-sm text-purple-600 font-medium">Anomalías</p>
            <p class="text-2xl font-bold text-purple-800 mt-1">{{ estadisticas?.registros_anomalos || 0 }}</p>
          </div>
          <div class="bg-teal-50 rounded-lg p-4 border border-teal-200">
            <p class="text-sm text-teal-600 font-medium">Normales</p>
            <p class="text-2xl font-bold text-teal-800 mt-1">{{ estadisticas?.registros_normales || 0 }}</p>
          </div>
          <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p class="text-sm text-blue-600 font-medium">% Anomalías</p>
            <p class="text-2xl font-bold text-blue-800 mt-1">{{ estadisticas?.porcentaje_anomalias?.toFixed(1) || 0 }}%</p>
          </div>
        </div>

        <!-- Periodo Anómalo Info -->
        <div v-if="periodoAnomalo" class="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600 mr-3 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <div class="flex-1">
              <p class="font-medium text-purple-900">Periodo Anómalo Detectado</p>
              <p class="text-sm text-purple-700 mt-1">
                <span class="font-medium">Inicio:</span> {{ formatearFechaCompleta(periodoAnomalo.timestamp_inicio) }}
                <span class="mx-2">•</span>
                <span class="font-medium">Fin:</span> {{ formatearFechaCompleta(periodoAnomalo.timestamp_fin) }}
                <span class="mx-2">•</span>
                <span class="font-medium">Duración:</span> {{ periodoAnomalo.duracion_minutos }} minutos
              </p>
            </div>
          </div>
        </div>

        <!-- Canvas para Chart.js -->
        <div class="relative" style="height: 400px;">
          <canvas :id="canvasId" ref="chartCanvas"></canvas>
        </div>

        <!-- Leyenda personalizada -->
        <div class="flex justify-center gap-6 mt-4 flex-wrap">
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full mr-2" style="background-color: green;"></div>
            <span class="text-sm text-gray-700">Datos Normales</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full mr-2" style="background-color: red;"></div>
            <span class="text-sm text-gray-700">Datos Anómalos</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { crearGrafico } from '@/utils/chartUtils';

const props = defineProps({
  alertaId: {
    type: Number,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  minutosContexto: {
    type: Number,
    default: 30
  },
  bomba: {
    type: String,
    required: true,
    validator: (value) => ['A', 'B'].includes(value)
  }
});

// Obtener URL de la API
const { apiUrl } = useRuntimeConfig().public;

// Referencias
const chartCanvas = ref(null);
const canvasId = `chart-anomalia-${props.alertaId}`;

// Estado
const datosContexto = ref(null);
const datosGrafico = ref([]);
const cargandoDatos = ref(false);
const errorMensaje = ref(null);

// Computeds
const estadisticas = computed(() => datosContexto.value?.estadisticas || null);
const periodoAnomalo = computed(() => datosContexto.value?.periodo_anomalo || null);
const alertaInfo = computed(() => ({
  timestamp: datosContexto.value?.timestamp || null
}));

// Funciones de formateo
const formatearFecha = (fecha) => {
  if (!fecha) return '';
  return new Date(fecha).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatearFechaCompleta = (fecha) => {
  if (!fecha) return '';
  return new Date(fecha).toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// Función para transformar datos al formato esperado por crearGrafico
const transformarDatos = (datos) => {
  if (!datos || !Array.isArray(datos)) return [];

  return datos.map(d => ({
    tiempo_sensor: d.tiempo_ejecucion,
    valor_sensor: d.valor_sensor,
    clasificacion: d.es_anomalia ? -1 : 1  // -1 para anomalías (rojo), 1 para normales (verde)
  }));
};

// Función para cargar datos
const cargarDatos = async () => {
  console.log('Cargando datos para alerta:', props.alertaId);
  cargandoDatos.value = true;
  errorMensaje.value = null;

  try {
    const url = `${apiUrl}/alertas_umbral/${props.alertaId}/datos_anomalia_contexto?minutos_antes=${props.minutosContexto}&minutos_despues=${props.minutosContexto}&bomba=${props.bomba}`;
    console.log('Consultando URL:', url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Datos recibidos:', data);

    datosContexto.value = data;

    // Transformar datos al formato esperado
    const datosTransformados = transformarDatos(data.datos);
    datosGrafico.value = datosTransformados;

    console.log(`Datos transformados: ${datosTransformados.length} registros`);

    // Esperar a que el DOM se actualice
    await nextTick();

    // Crear el gráfico usando el mismo patrón que otros componentes
    setTimeout(() => {
      cargandoDatos.value = false;

      nextTick(() => {
        console.log('Intentando acceder al canvas para el gráfico de anomalías...');

        if (chartCanvas.value) {
          console.log('Canvas encontrado, creando gráfico de anomalías...');

          setTimeout(() => {
            try {
              const canvas = chartCanvas.value;
              console.log(`Dimensiones del canvas: ${canvas.width}x${canvas.height}`);

              // Usar crearGrafico del utility
              crearGrafico(canvas, datosGrafico.value);
              console.log('Gráfico de anomalías creado exitosamente');
            } catch (error) {
              console.error('Error al crear el gráfico:', error);
              errorMensaje.value = `Error al generar el gráfico: ${error.message}`;
            }
          }, 50);
        } else {
          console.error('Canvas no encontrado después de actualizar el DOM');
          errorMensaje.value = 'Error: No se pudo crear el gráfico porque el canvas no está disponible';
        }
      });
    }, 100);

  } catch (err) {
    errorMensaje.value = err.message;
    console.error('Error al cargar datos de anomalía:', err);
    cargandoDatos.value = false;
  }
};

// Función para actualizar datos
const actualizarDatos = () => {
  console.log('Actualizando datos...');
  cargarDatos();
};

// Lifecycle hooks
onMounted(() => {
  console.log('Componente GraficoAnomalia montado');
  cargarDatos();
});

onUnmounted(() => {
  console.log('Componente GraficoAnomalia desmontado');
});

// Watch para cambios en alertaId
watch(() => props.alertaId, (newId, oldId) => {
  console.log(`AlertaId cambió de ${oldId} a ${newId}`);
  if (newId) {
    cargarDatos();
  }
});
</script>
