import { Chart } from 'chart.js';

// Objeto para almacenar instancias de gráficos por canvas
const chartInstances = {};

// Función para muestrear datos si son demasiados
function muestrearDatos(datos, maxPuntos = 100) {
  if (!datos || !Array.isArray(datos) || datos.length <= maxPuntos) return datos;
  
  console.log(`Muestreando datos: ${datos.length} puntos -> máximo ${maxPuntos} puntos`);
  const factor = Math.ceil(datos.length / maxPuntos);
  return datos.filter((_, index) => index % factor === 0);
}

// Función para destruir un gráfico existente
function destruirGrafico(canvas) {
  const chartInstance = chartInstances[canvas.id];
  if (chartInstance) {
    console.log('Destruyendo gráfico anterior');
    chartInstance.destroy();
    delete chartInstances[canvas.id];
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el contexto del canvas
  }
}

// Función para crear el gráfico
export function crearGrafico(canvas, data) {
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

    // Destruir gráfico existente antes de crear uno nuevo
    destruirGrafico(canvas);

    const tiempos = datosOptimizados.map((d) => d.tiempo_sensor);
    const valores = datosOptimizados.map((d) => d.valor_sensor);
    const colores = datosOptimizados.map((d) =>
      d.clasificacion === 1 ? 'green' : 'red'
    );

    // Configurar opciones optimizadas para grandes conjuntos de datos
    const pointRadius = datosOptimizados.length > 50 ? 3 : 6;
    const borderWidth = datosOptimizados.length > 50 ? 1 : 2;
    
    console.log('Inicializando nuevo gráfico');
    const chartInstance = new Chart(canvas, {
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
    // Almacenar la instancia del gráfico
    chartInstances[canvas.id] = chartInstance;
    console.log('Gráfico creado exitosamente');
  } catch (error) {
    console.error('Error al crear el gráfico:', error);
  }
}