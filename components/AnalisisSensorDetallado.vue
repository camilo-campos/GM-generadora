<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-xl font-semibold text-gray-800">{{ sensorConfig.label }} <span class="text-gray-500 text-sm">({{ sensorConfig.key }})</span></h2>
    </div>

    <div class="p-6">
      <!-- Sección de selección de fechas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 items-end">
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
          <input
            type="date"
            v-model="fechaInicioSeleccionada"
            :min="minInicioRango"
            :max="maxInicioRango"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
          />
          <p v-if="rangoFechasDisponible && rangoFechasDisponible.inicio" class="text-xs text-gray-500 mt-1">
            Disponible desde: {{ formatDate(rangoFechasDisponible.inicio) }}
          </p>
        </div>
        
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700">Fecha de Término</label>
          <input
            type="date"
            v-model="fechaTerminoSeleccionada"
            :min="minTerminoRango"
            :max="maxTerminoRango"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
          />
          <p v-if="rangoFechasDisponible && rangoFechasDisponible.termino" class="text-xs text-gray-500 mt-1">
            Disponible hasta: {{ formatDate(rangoFechasDisponible.termino) }}
          </p>
        </div>
        
        <button
          @click="handleConsultarDatos"
          class="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 h-10"
          :disabled="cargandoDatosLocal || !fechaInicioSeleccionada || !fechaTerminoSeleccionada"
        >
          <svg v-if="!cargandoDatosLocal" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <svg v-else class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ cargandoDatosLocal ? 'Cargando...' : 'Consultar' }}
        </button>
      </div>
      
      <!-- Gráfico de datos -->
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 class="font-medium text-gray-700">Gráfico Detallado: {{ sensorConfig.label }}</h3>
        </div>
        
        <div class="p-4 h-[350px] relative">
          <canvas :ref="el => chartCanvasRef = el" :style="{display: (datosParaGraficoLocal && datosParaGraficoLocal.length > 0 && !cargandoDatosLocal) ? 'block' : 'none'}"></canvas>
          
          <div v-if="(!datosParaGraficoLocal || datosParaGraficoLocal.length === 0) && !cargandoDatosLocal && initialLoadDone" class="absolute inset-0 flex flex-col items-center justify-center py-12 px-4 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p class="text-gray-600 mb-2">No hay datos para mostrar en el período seleccionado.</p>
            <p class="text-sm text-gray-500">Selecciona un rango de fechas y haz clic en "Consultar".</p>
          </div>

          <div v-if="!initialLoadDone && !cargandoDatosLocal && (!datosParaGraficoLocal || datosParaGraficoLocal.length === 0)" class="absolute inset-0 flex flex-col items-center justify-center py-12 px-4 text-center">
             <p class="text-gray-600 mb-2">Seleccione un rango de fechas para cargar los datos.</p>
          </div>
          
          <div v-if="cargandoDatosLocal" class="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80 z-10">
            <div class="flex flex-col items-center">
              <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
              <p class="text-gray-600">Cargando datos...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { crearGrafico } from '@/utils/chartUtils';

Chart.register(...registerables);

// Obtener URL de la API desde configuración
const { apiUrl } = useRuntimeConfig().public;

// Props
const props = defineProps({
  sensorConfig: {
    type: Object,
    required: true, // Ejemplo: { key: 'corriente', label: 'Corriente', unit: 'A', icon: '⚡️' }
  },
  rangoFechasDisponible: { // Rango total disponible para este sensor
    type: Object, // Ejemplo: { inicio: '2023-01-01', termino: '2023-12-31' }
    default: () => ({ inicio: null, termino: null })
  },
});

// Emits
const emit = defineEmits(['consultar-datos']);

// Referencias
const chartCanvasRef = ref(null);
let chartInstance = null;
const initialLoadDone = ref(false); // Para controlar el mensaje inicial

// Estado local para la selección de fechas
const fechaInicioSeleccionada = ref('');
const fechaTerminoSeleccionada = ref('');

const cargandoDatosLocal = ref(false);
const datosParaGraficoLocal = ref([]);

// Configurar fechas iniciales basadas en el rango disponible (si existe y es válido)
onMounted(() => {
  if (props.rangoFechasDisponible && props.rangoFechasDisponible.termino) {
    const hoy = new Date(props.rangoFechasDisponible.termino);
    const haceUnaSemana = new Date(hoy);
    haceUnaSemana.setDate(hoy.getDate() - 7);

    // Asegurarse que 'haceUnaSemana' no sea anterior al inicio disponible
    let inicioCalculado = haceUnaSemana;
    if (props.rangoFechasDisponible.inicio) {
      const inicioDisponibleDate = new Date(props.rangoFechasDisponible.inicio);
      if (haceUnaSemana < inicioDisponibleDate) {
        inicioCalculado = inicioDisponibleDate;
      }
    }
    
    fechaTerminoSeleccionada.value = toISODateOnly(hoy);
    fechaInicioSeleccionada.value = toISODateOnly(inicioCalculado);

  } else {
    // Fallback si no hay rango disponible
    const hoy = new Date();
    const haceUnaSemana = new Date();
    haceUnaSemana.setDate(hoy.getDate() - 7);
    fechaTerminoSeleccionada.value = toISODateOnly(hoy);
    fechaInicioSeleccionada.value = toISODateOnly(haceUnaSemana);
  }
});

// Formatear YYYY-MM-DDTHH:mm:ss.sssZ a YYYY-MM-DD
function toISODateOnly(dateStringOrDate) {
  if (!dateStringOrDate) return '';
  try {
    const date = new Date(dateStringOrDate);
    return date.toISOString().split('T')[0];
  } catch (e) {
    return ''; // En caso de fecha inválida
  }
}

// Límites para los selectores de fecha
const minInicioRango = computed(() => {
  return props.rangoFechasDisponible?.inicio ? toISODateOnly(props.rangoFechasDisponible.inicio) : '';
});

const maxInicioRango = computed(() => {
  if (fechaTerminoSeleccionada.value) return fechaTerminoSeleccionada.value;
  return props.rangoFechasDisponible?.termino ? toISODateOnly(props.rangoFechasDisponible.termino) : '';
});

const minTerminoRango = computed(() => {
  if (fechaInicioSeleccionada.value) return fechaInicioSeleccionada.value;
  return props.rangoFechasDisponible?.inicio ? toISODateOnly(props.rangoFechasDisponible.inicio) : '';
});

const maxTerminoRango = computed(() => {
  return props.rangoFechasDisponible?.termino ? toISODateOnly(props.rangoFechasDisponible.termino) : '';
});

// Función para emitir el evento de consulta
const handleConsultarDatos = async () => {
  if (fechaInicioSeleccionada.value && fechaTerminoSeleccionada.value) {
    initialLoadDone.value = true; // Marcar que se ha intentado cargar datos
    await obtenerDatosGenerico(props.sensorConfig.key, fechaInicioSeleccionada.value, fechaTerminoSeleccionada.value);
  }
};

// Función para obtener datos genéricos
async function obtenerDatosGenerico(sensorKey, fechaInicio, fechaTermino) {
  console.log('Fechas seleccionadas:', fechaInicio, fechaTermino);

  if (!fechaInicio || !fechaTermino) {
    console.error('Fechas no seleccionadas');
    alert('Por favor selecciona fechas de inicio y término');
    return;
  }

  cargandoDatosLocal.value = true;

  try {
    const url = `${apiUrl}/sensores/${sensorKey}?inicio=${fechaInicio}&termino=${fechaTermino}`;
    console.log('Consultando URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Datos recibidos del servidor: ${data.length} registros`);

    if (!Array.isArray(data)) {
      console.error('Los datos recibidos no son un array');
      alert('Formato de datos incorrecto');
      cargandoDatosLocal.value = false;
      return;
    }

    if (data.length === 0) {
      console.warn('No se encontraron datos para el período seleccionado');
      alert('No hay datos disponibles para el período seleccionado');
      datosParaGraficoLocal.value = [];
      cargandoDatosLocal.value = false;
      return;
    }

    if (!data[0].tiempo_sensor || !data[0].valor_sensor) {
      console.error('Los datos no tienen el formato esperado', data[0]);
      alert('Los datos recibidos no tienen el formato esperado');
      cargandoDatosLocal.value = false;
      return;
    }

    datosParaGraficoLocal.value = data;

    await nextTick();

    setTimeout(() => {
      cargandoDatosLocal.value = false;

      nextTick(() => {
        console.log('Intentando acceder al canvas para el gráfico detallado...');

        if (chartCanvasRef.value) {
          console.log('Canvas encontrado, creando gráfico detallado...');

          setTimeout(() => {
            try {
              const canvas = chartCanvasRef.value;
              console.log(`Dimensiones del canvas detallado: ${canvas.width}x${canvas.height}`);

              crearGrafico(canvas, datosParaGraficoLocal.value);
              console.log('Gráfico detallado creado exitosamente');
            } catch (error) {
              console.error('Error al crear el gráfico detallado:', error);
              alert(`Error al generar el gráfico: ${error.message}`);
            }
          }, 50);
        } else {
          console.error('Canvas detallado no encontrado después de actualizar el DOM');
          alert('Error: No se pudo crear el gráfico porque el canvas no está disponible');
        }
      });
    }, 100);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    alert(`Error al obtener datos: ${error.message}`);
    cargandoDatosLocal.value = false;
  }
}

// Crear o actualizar el gráfico
const crearGraficoDetallado = async () => {
  await nextTick();
  if (chartInstance) {
    chartInstance.destroy();
  }
  if (!chartCanvasRef.value || !datosParaGraficoLocal.value || datosParaGraficoLocal.value.length === 0) {
    return;
  }

  const datosMuestreados = muestrearDatos(datosParaGraficoLocal.value);

  const chartData = {
    labels: datosMuestreados.map(d => new Date(d.tiempo_sensor)),
    datasets: [
      {
        label: props.sensorConfig.label || 'Valor',
        data: datosMuestreados.map(d => d.valor),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 1,
        pointRadius: datosMuestreados.length < 100 ? 3 : 1, // Puntos más grandes si hay pocos datos
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1, // Suavizar la línea
        fill: true,
      },
    ],
  };
  
  // Dataset para anomalías (si existen)
  const anomalias = datosMuestreados.filter(d => d.clasificacion !== 1 && d.clasificacion !== undefined);
  if (anomalias.length > 0) {
    chartData.datasets.push({
      label: 'Anomalía',
      data: anomalias.map(d => ({ x: new Date(d.tiempo_sensor), y: d.valor })),
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      pointRadius: 5,
      pointStyle: 'triangle', // Estilo diferente para anomalías
      showLine: false, // No unir anomalías con una línea
      type: 'scatter',
    });
  }

  chartInstance = new Chart(chartCanvasRef.value, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'PPpp HH:mm:ss',
            displayFormats: {
              millisecond: 'HH:mm:ss.SSS',
              second: 'HH:mm:ss',
              minute: 'HH:mm',
              hour: 'HH:mm',
              day: 'MMM dd',
              week: 'MMM dd',
              month: 'MMM yyyy',
              quarter: 'qqq yyyy',
              year: 'yyyy',
            }
          },
          title: {
            display: true,
            text: 'Tiempo'
          }
        },
        y: {
          title: {
            display: true,
            text: props.sensorConfig.unit || 'Valor'
          },
          beginAtZero: false
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += parseFloat(context.parsed.y).toFixed(2) + (props.sensorConfig.unit ? ' ' + props.sensorConfig.unit : '');
                }
                return label;
            }
          }
        }
      }
    }
  });
};

// Observar cambios en los datos para actualizar el gráfico
watch(() => datosParaGraficoLocal.value, (newVal) => {
  if (newVal) {
    crearGraficoDetallado();
  }
}, { deep: true });

// Observar si el canvas está disponible
watch(chartCanvasRef, (newCanvas) => {
  if (newCanvas && datosParaGraficoLocal.value && datosParaGraficoLocal.value.length > 0) {
    crearGraficoDetallado();
  }
});

// Limpiar el gráfico al desmontar
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});

// Función de utilidad para formatear fechas (YYYY-MM-DD)
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
    // Sumar un día para corregir el posible desajuste de zona horaria al convertir a ISO y tomar solo la fecha
    // Esto es común cuando la fecha original no tiene información de hora y se interpreta como UTC midnight.
    // date.setDate(date.getDate() + 1); 
    // Comentado: toISODateOnly ya maneja la conversión a YYYY-MM-DD de forma más robusta
    return toISODateOnly(date);
  } catch (e) {
    return 'Error de formato';
  }
};

// Función para muestrear datos (opcional, si son demasiados)
function muestrearDatos(datos, maxPuntos = 200) {
  if (!datos || datos.length <= maxPuntos) {
    return datos;
  }
  const result = [];
  const step = Math.ceil(datos.length / maxPuntos);
  for (let i = 0; i < datos.length; i += step) {
    result.push(datos[i]);
  }
  return result;
}
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
input[type="date"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
}
input[type="date"]:hover::-webkit-calendar-picker-indicator {
    opacity: 1;
}
</style>
