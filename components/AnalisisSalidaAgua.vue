<template>
  <div class="bg-white rounded-lg overflow-hidden">
    <!-- Contenido principal -->
    <div class="p-4">
      <!-- Sección de selección de fechas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-700 border-b pb-2">Selección de Período</h3>
          
          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="date"
                v-model="fechaInicioCorriente"
                :min="minInicio"
                :max="maxInicio"
                class="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <p class="text-xs text-gray-500 mt-1">Rango disponible: {{ formatDate(minInicio) }} - {{ formatDate(maxInicio) }}</p>
          </div>
          
          <div class="space-y-1">
            <label class="block text-sm font-medium text-gray-700">Fecha de Término</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="date"
                v-model="fechaTerminoCorriente"
                :min="minTermino"
                :max="maxTermino"
                class="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <p class="text-xs text-gray-500 mt-1">Mínimo 1 día después de la fecha de inicio</p>
          </div>
          
          <button
            @click="obtenerDatos"
            class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
            :disabled="cargandoDatos"
          >
            <svg v-if="!cargandoDatos" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <svg v-else class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ cargandoDatos ? 'Obteniendo datos...' : 'Consultar datos de corriente' }}
          </button>
        </div>
        
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-700 border-b pb-2">Información del Sensor</h3>
          
          <div class="bg-gray-50 p-4 rounded-md">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Tipo de Sensor</p>
                <p class="font-medium">Salida de Agua</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Unidad de Medida</p>
                <p class="font-medium">Litros (L)</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Primer Registro</p>
                <p class="font-medium">{{ formatDate(primerRegistro) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Último Registro</p>
                <p class="font-medium">{{ formatDate(ultimoRegistro) }}</p>
              </div>
            </div>
            
            <div class="mt-4">
              <p class="text-sm text-gray-500">Estado del Sensor</p>
              <div class="flex items-center mt-1">
                <span class="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                <span class="font-medium">Activo</span>
              </div>
            </div>
            
            <div class="mt-4" v-if="datosFiltrados.length > 0">
              <p class="text-sm text-gray-500">Datos Obtenidos</p>
              <p class="font-medium">{{ datosFiltrados.length }} registros</p>
              <div class="flex items-center mt-1 space-x-4">
                <div class="flex items-center">
                  <span class="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                  <span class="text-sm">{{ datosFiltrados.filter(d => d.clasificacion === 1).length }} normales</span>
                </div>
                <div class="flex items-center">
                  <span class="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                  <span class="text-sm">{{ datosFiltrados.filter(d => d.clasificacion !== 1).length }} anomalías</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Gráfico de datos -->
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 class="font-medium text-gray-700">Gráfico de Salida de Agua</h3>
          
        </div>
        
        <!-- Contenedor con posicionamiento relativo para poder colocar mensajes sobre el canvas -->
        <div class="p-4 h-[300px] relative">
          <!-- Canvas siempre presente, pero solo visible cuando hay datos -->
          <canvas ref="corrienteCanvas" :style="{display: datosFiltrados.length > 0 && !cargandoDatos ? 'block' : 'none'}"></canvas>
          
          <!-- Mensaje cuando no hay datos para mostrar -->
          <div v-if="datosFiltrados.length === 0 && !cargandoDatos" class="absolute inset-0 flex flex-col items-center justify-center py-12 px-4 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p class="text-gray-600 mb-2">No hay datos para mostrar</p>
            <p class="text-sm text-gray-500">Selecciona un rango de fechas y haz clic en "Consultar datos de corriente"</p>
          </div>
          
          <!-- Animación de carga -->
          <div v-if="cargandoDatos" class="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80">
            <div class="flex flex-col items-center">
              <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700 mb-2"></div>
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
import AnalisisSensorDetallado from './AnalisisSensorDetallado.vue';

Chart.register(...registerables);

// Obtener URL de la API desde configuración
const { apiUrl } = useRuntimeConfig().public;

// Props
const props = defineProps({
  datos: {
    type: Object,
    required: true
  },
  rangoFechas: {
    type: Object,
    default: null
  }
});

// Referencias
const corrienteCanvas = ref(null);
let corrienteChart = null;

// Estado
const cargandoDatos = ref(false);
const datosFiltrados = ref([]);
const fechaInicioCorriente = ref('');
const fechaTerminoCorriente = ref('');

// Calcular el primer y último registro disponibles
const primerRegistro = computed(() => {
  // Si tenemos rangos de fechas del backend, usarlos primero
  if (props.rangoFechas && props.rangoFechas.inicio) {
    return props.rangoFechas.inicio;
  }
  
  // Si no hay rangos del backend, calcular desde los datos
  if (!props.datos || !props.datos.value || props.datos.value.length === 0) return '';
  return props.datos.value.reduce((min, p) => 
    p.tiempo_sensor < min ? p.tiempo_sensor : min, 
    props.datos.value[0].tiempo_sensor
  );
});

const ultimoRegistro = computed(() => {
  // Si tenemos rangos de fechas del backend, usarlos primero
  if (props.rangoFechas && props.rangoFechas.termino) {
    return props.rangoFechas.termino;
  }
  
  // Si no hay rangos del backend, calcular desde los datos
  if (!props.datos || !props.datos.value || props.datos.value.length === 0) return '';
  return props.datos.value.reduce((max, p) => 
    p.tiempo_sensor > max ? p.tiempo_sensor : max, 
    props.datos.value[0].tiempo_sensor
  );
});

// Convertir a formato ISO (YYYY-MM-DD)
function toISODate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toISOString().split('T')[0];
}

// Rangos de fechas válidos
const minInicio = computed(() => toISODate(primerRegistro.value));
const maxInicio = computed(() => {
  const termino = ultimoRegistro.value;
  if (!termino) return '';
  const d = new Date(termino);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
});

const minTermino = computed(() => {
  if (!fechaInicioCorriente.value) return minInicio.value;
  const d = new Date(fechaInicioCorriente.value);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
});

const maxTermino = computed(() => toISODate(ultimoRegistro.value));

// Función para formatear fechas en formato legible
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

// Función para dar formato "YYYY-MM-DD HH:mm:ss.SSS" para backend
function formatearFechaBackend(dateStr) {
  const d = new Date(dateStr);
  const pad = (n, size = 2) => n.toString().padStart(size, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.000`;
}

// Función para crear el gráfico
function crearGrafico(canvas, data) {
  console.log("Creando gráfico con canvas:", canvas, "y datos:", data?.length || 0, "puntos");
  
  if (!canvas) {
    console.error('Canvas no encontrado');
    return;
  }
  
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error('Datos inválidos para el gráfico');
    return;
  }
  
  try {
    // Muestrear datos si son demasiados
    const datosOptimizados = muestrearDatos(data);
    console.log(`Usando ${datosOptimizados.length} puntos para el gráfico`);
    
    const tiempos = datosOptimizados.map((d) => d.tiempo_sensor);
    const valores = datosOptimizados.map((d) => d.valor_sensor);
    const colores = datosOptimizados.map((d) =>
      d.clasificacion === 1 ? 'green' : 'red'
    );

    if (corrienteChart) {
      console.log('Destruyendo gráfico anterior');
      corrienteChart.destroy();
    }

    // Configurar opciones optimizadas para grandes conjuntos de datos
    const pointRadius = datosOptimizados.length > 50 ? 3 : 6;
    const borderWidth = datosOptimizados.length > 50 ? 1 : 2;
    
    console.log('Inicializando nuevo gráfico');
    corrienteChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: tiempos,
        datasets: [
          {
            label: 'Corriente',
            data: valores,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: borderWidth,
            pointRadius: pointRadius,
            pointBackgroundColor: colores,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: datosOptimizados.length > 100 ? 0 : 1000 // Desactivar animación para conjuntos grandes
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              generateLabels: () => [
                { text: 'Normal', fillStyle: 'green' },
                { text: 'Anomalía', fillStyle: 'red' },
              ],
            },
          },
          tooltip: {
            enabled: datosOptimizados.length <= 200 // Desactivar tooltips para conjuntos muy grandes
          }
        },
        scales: {
          y: {
            ticks: {
              stepSize: undefined,
            },
          },
          x: {
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              autoSkip: true,
              maxTicksLimit: 20 // Limitar número de etiquetas en el eje X
            }
          }
        },
      },
    });
    console.log('Gráfico creado exitosamente');
  } catch (error) {
    console.error('Error al crear el gráfico:', error);
  }
}

// Función para muestrear datos si son demasiados
function muestrearDatos(datos, maxPuntos = 100) {
  if (!datos || !Array.isArray(datos) || datos.length <= maxPuntos) return datos;
  
  console.log(`Muestreando datos: ${datos.length} puntos -> máximo ${maxPuntos} puntos`);
  const factor = Math.ceil(datos.length / maxPuntos);
  return datos.filter((_, index) => index % factor === 0);
}

// Función para obtener datos filtrados por fecha
async function obtenerDatos() {
  console.log('Fechas seleccionadas:', fechaInicioCorriente.value, fechaTerminoCorriente.value);
  
  if (!fechaInicioCorriente.value || !fechaTerminoCorriente.value) {
    console.error('Fechas no seleccionadas');
    alert('Por favor selecciona fechas de inicio y término');
    return;
  }
  
  // Activar indicador de carga
  cargandoDatos.value = true;
  
  try {
    // En lugar de filtrar datos existentes, consultamos directamente al servidor para esas fechas
    // exactamente como en test.vue
    const url = `${apiUrl}/sensores/salida-agua?inicio=${fechaInicioCorriente.value}&termino=${fechaTerminoCorriente.value}`;
    console.log('Consultando URL:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Datos recibidos del servidor: ${data.length} registros`);
    
    // Validar formato de datos
    if (!Array.isArray(data)) {
      console.error('Los datos recibidos no son un array');
      alert('Formato de datos incorrecto');
      cargandoDatos.value = false;
      return;
    }
    
    if (data.length === 0) {
      console.warn('No se encontraron datos para el período seleccionado');
      alert('No hay datos disponibles para el período seleccionado');
      datosFiltrados.value = [];
      cargandoDatos.value = false;
      return;
    }
    
    if (!data[0].tiempo_sensor || !data[0].valor_sensor) {
      console.error('Los datos no tienen el formato esperado', data[0]);
      alert('Los datos recibidos no tienen el formato esperado');
      cargandoDatos.value = false;
      return;
    }
    
    // Usar los datos recibidos directamente, sin filtrado adicional
    datosFiltrados.value = data;
    
    // Dar tiempo para que el DOM se actualice completamente
    await nextTick();
    
    // Esperar un momento para asegurar que el canvas es accesible
    setTimeout(() => {
      // Desactivar la carga después de un breve retraso para dar tiempo al canvas
      cargandoDatos.value = false;
      
      // Esperar otro tick para asegurarnos que el canvas se ha vuelto visible
      nextTick(() => {
        console.log('Intentando acceder al canvas para el gráfico detallado...');
        
        if (corrienteCanvas.value) {
          console.log('Canvas encontrado, creando gráfico detallado...');
          
          // Usar setTimeout para dar tiempo a que el canvas esté completamente renderizado
          setTimeout(() => {
            try {
              // Verificar dimensiones del canvas
              const canvas = corrienteCanvas.value;
              console.log(`Dimensiones del canvas detallado: ${canvas.width}x${canvas.height}`);
              
              // Crear el gráfico
              crearGrafico(canvas, datosFiltrados.value);
              console.log('Gráfico detallado creado exitosamente');
            } catch (error) {
              console.error('Error al crear el gráfico detallado:', error);
              alert(`Error al generar el gráfico: ${error.message}`);
            }
          }, 50); // Un pequeño retraso para asegurar que el canvas esté listo
        } else {
          console.error('Canvas detallado no encontrado después de actualizar el DOM');
          alert('Error: No se pudo crear el gráfico porque el canvas no está disponible');
        }
      });
    }, 100);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    alert(`Error al obtener datos: ${error.message}`);
    cargandoDatos.value = false;
  }
}

// Inicializar fechas cuando el componente se monta
onMounted(() => {
  // Establecer fechas iniciales
  if (primerRegistro.value && ultimoRegistro.value) {
    fechaInicioCorriente.value = toISODate(primerRegistro.value);
    fechaTerminoCorriente.value = toISODate(ultimoRegistro.value);
  }
});
</script>
