<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Análisis de Anomalías - Bomba A</h1>
          <p class="text-gray-600 mt-1">Visualización de periodos anómalos detectados en sensores</p>
        </div>
        <button
          @click="refrescarAlertas"
          :disabled="isLoadingAlertas"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <svg v-if="!isLoadingAlertas" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{{ isLoadingAlertas ? 'Actualizando...' : 'Actualizar Alertas' }}</span>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoadingAlertas" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-gray-600"></div>
        <p class="ml-3 text-gray-600">Cargando alertas...</p>
      </div>

      <!-- No Alerts State -->
      <div v-else-if="sensoresConAnomalias.length === 0" class="bg-teal-50 border border-teal-200 rounded-lg p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-teal-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-lg font-semibold text-teal-800">No hay anomalías detectadas</p>
        <p class="text-teal-600 mt-1">Todos los sensores de la Bomba A están funcionando normalmente</p>
      </div>

      <!-- Selector de Sensores -->
      <div v-else>
        <p class="text-sm text-gray-600 mb-3">
          <span class="font-medium">{{ sensoresConAnomalias.length }}</span>
          {{ sensoresConAnomalias.length === 1 ? 'sensor con anomalías detectadas' : 'sensores con anomalías detectadas' }}
        </p>

        <!-- Grid de botones de sensores -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            v-for="sensor in configuracionSensores"
            :key="sensor.key"
            @click="toggleSensor(sensor.key)"
            :class="[
              'px-4 py-3 rounded-lg border-2 font-medium transition-all text-sm',
              sensoresActivos.includes(sensor.key)
                ? 'bg-gray-800 text-white border-gray-800 shadow-md'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            ]"
          >
            <span class="mr-2">{{ sensor.icon }}</span>
            {{ sensor.label }}
          </button>
        </div>

        <!-- Botones de control -->
        <div class="flex gap-3 mt-4">
          <button
            @click="seleccionarTodos"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Seleccionar Todos
          </button>
          <button
            @click="deseleccionarTodos"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Deseleccionar Todos
          </button>
        </div>
      </div>
    </div>

    <!-- Gráficos activos - Layout horizontal con scroll -->
    <div v-if="sensoresActivos.length > 0" class="overflow-x-auto overflow-y-hidden mb-6 p-4">
      <div class="flex gap-6 min-w-max">
        <div v-for="sensorKey in sensoresActivos" :key="sensorKey" class="flex-shrink-0 w-[1030px]">
          <GraficoAnomalia
            :alerta-id="obtenerAlertaIdPorSensor(sensorKey)"
            :titulo="obtenerTituloSensor(sensorKey)"
            :minutos-contexto="30"
            bomba="A"
          />
        </div>
      </div>
    </div>

    <!-- Mensaje cuando no hay sensores seleccionados -->
    <div v-else-if="sensoresConAnomalias.length > 0" class="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-lg font-semibold text-blue-800">Selecciona un sensor para visualizar</p>
      <p class="text-blue-600 mt-1">Usa los botones superiores para mostrar los gráficos de anomalías</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import GraficoAnomalia from './GraficoAnomalia.vue';
import { useAlertasConAnomalias } from '@/composables/useAlertasAnomalias';

// Props
const props = defineProps({
  sensorSeleccionado: {
    type: String,
    default: null
  }
});

// Composables
const { alertasPorBomba, sensoresConAnomaliasPorBomba, isLoading: isLoadingAlertas, refetch } = useAlertasConAnomalias();

// Estado
const sensoresActivos = ref([]);

// Mapa de configuración de sensores (key -> info de presentación)
const SENSORES_CONFIG = {
  'corriente': { label: 'Corriente', icon: '⚡', unit: 'A' },
  'PREDICCION_CORRIENTE': { label: 'Predicción Corriente', icon: '🔮', unit: 'A' },
  'salida-agua': { label: 'Salida de Agua', icon: '💧', unit: 'L/min' },
  'presion-agua': { label: 'Presión de Agua', icon: '📊', unit: 'bar' },
  'generacion-gas': { label: 'Generación de Gas', icon: '🔥', unit: 'm³/h' },
  'temperatura-ambiental': { label: 'Temp. Ambiente', icon: '🌡️', unit: '°C' },
  'temperatura-interna-empuje': { label: 'Temp. Empuje', icon: '🌡️', unit: '°C' },
  'temperatura-descanso-motor': { label: 'Temp. Motor Bomba', icon: '🌡️', unit: '°C' },
  'temperatura-descanso-bomba': { label: 'Temp. Bomba 1A', icon: '🌡️', unit: '°C' },
  'vibracion-axial': { label: 'Vibración Axial', icon: '📳', unit: 'mm/s' },
  'voltaje-barra': { label: 'Voltaje Barra', icon: '⚡', unit: 'V' },
  'excentricidad-bomba': { label: 'Excentricidad Bomba', icon: '⚙️', unit: 'mm' },
  'flujo-agua-domo-ap': { label: 'Flujo Agua Domo AP', icon: '💧', unit: 'L/min' },
  'flujo-agua-domo-mp': { label: 'Flujo Agua Domo MP', icon: '💧', unit: 'L/min' },
  'flujo-agua-recalentador': { label: 'Flujo Agua Recalentador', icon: '💧', unit: 'L/min' },
  'flujo-agua-vapor-alta': { label: 'Flujo Agua Vapor Alta', icon: '💧', unit: 'L/min' },
  'posicion-valvula-recirc': { label: 'Posición Válvula Recirc', icon: '🔧', unit: '%' },
  'presion-agua-mp': { label: 'Presión Agua MP', icon: '📊', unit: 'bar' },
  'presion-succion-baa': { label: 'Presión Succión BAA', icon: '📊', unit: 'bar' },
  'temperatura-estator': { label: 'Temp. Estator', icon: '🌡️', unit: '°C' },
  'flujo-salida-12fpmfc': { label: 'Flujo Salida 12FPMFC', icon: '💧', unit: 'L/min' },
  // Predicciones
  'prediccion_mw-brutos': { label: 'Predicción MW Brutos', icon: '🔮', unit: 'MW' },
  'prediccion_presion-gas': { label: 'Predicción Presión Gas', icon: '🔮', unit: 'bar' },
};

// Función para limpiar y formatear nombre de sensor
const formatearNombreSensor = (nombre) => {
  // Quitar prefijo 'prediccion_' o 'prediccion-'
  let limpio = nombre.replace(/^prediccion[_-]/i, '');
  // Reemplazar guiones bajos y guiones por espacios
  limpio = limpio.replace(/[_-]/g, ' ');
  // Capitalizar primera letra de cada palabra
  return limpio.split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

// Computed
const sensoresConAnomalias = computed(() => sensoresConAnomaliasPorBomba.value.A || []);

const configuracionSensores = computed(() => {
  return sensoresConAnomalias.value
    .map(tipoSensor => ({
      key: tipoSensor,
      ...(SENSORES_CONFIG[tipoSensor] || {
        label: formatearNombreSensor(tipoSensor),
        icon: '📈',
        unit: ''
      })
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
});

// Métodos
const toggleSensor = (sensorKey) => {
  const index = sensoresActivos.value.indexOf(sensorKey);
  if (index > -1) {
    sensoresActivos.value.splice(index, 1);
  } else {
    sensoresActivos.value.push(sensorKey);
  }
};

const seleccionarTodos = () => {
  sensoresActivos.value = sensoresConAnomalias.value.slice();
};

const deseleccionarTodos = () => {
  sensoresActivos.value = [];
};

const obtenerAlertaIdPorSensor = (sensorKey) => {
  const alertasBombaA = alertasPorBomba.value.A;
  const alerta = alertasBombaA.find(a => a.tipo_sensor === sensorKey);
  return alerta?.id || null;
};

const obtenerTituloSensor = (sensorKey) => {
  const config = SENSORES_CONFIG[sensorKey];
  return config ? `${config.label} ${config.icon}` : formatearNombreSensor(sensorKey);
};

const refrescarAlertas = () => {
  refetch();
};

// Watch para seleccionar automáticamente el sensor cuando se navega desde una alerta
watch(() => props.sensorSeleccionado, (nuevoSensor) => {
  if (nuevoSensor && sensoresConAnomalias.value.includes(nuevoSensor)) {
    // Verificar si el sensor no está ya activo
    if (!sensoresActivos.value.includes(nuevoSensor)) {
      sensoresActivos.value = [nuevoSensor];
    }
  }
}, { immediate: true });
</script>
