<template>
  <div class="sensor-analysis">
    <h1>Análisis Detallado de Sensores</h1>
    <div class="sensor-container">
      <AnalisisSensorDetallado sensorType="corriente" :sensorConfig="{ key: 'corriente', label: 'Corriente', unit: 'A' }" />
      <AnalisisSensorDetallado sensorType="temperatura" :sensorConfig="{ key: 'temperatura', label: 'Temperatura', unit: '°C' }" />
      <AnalisisSensorDetallado sensorType="humedad" :sensorConfig="{ key: 'humedad', label: 'Humedad', unit: '%' }" />
      <!-- Añadir más componentes de sensores según sea necesario -->
    </div>
  </div>
</template>

<script setup>
import AnalisisSensorDetallado from '@/components/AnalisisSensorDetallado.vue';
</script>

<style scoped>
.sensor-analysis {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.sensor-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}
</style>
