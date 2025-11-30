import { useQuery } from "@tanstack/vue-query";

/**
 * Composable para obtener todas las alertas con información de anomalías
 */
export const useAlertasConAnomalias = () => {
  const { apiUrl } = useRuntimeConfig().public;

  const fetchAlertasConAnomalias = async () => {
    const response = await fetch(`${apiUrl}/alertas_umbral/todas_alertas`);
    if (!response.ok) {
      throw new Error("Error al obtener alertas");
    }
    const data = await response.json();
    return data.data || data;
  };

  const { data: alertas, isLoading, error, refetch } = useQuery({
    queryKey: ["alertasConAnomalias"],
    queryFn: fetchAlertasConAnomalias,
    refetchInterval: 60000, // Refrescar cada 60 segundos
  });

  // Filtrar solo alertas que tienen datos de anomalías
  const alertasConDatos = computed(() => {
    if (!alertas.value) return [];
    return alertas.value.filter((alerta: any) => alerta.tiene_datos_anomalia === true);
  });

  // Agrupar alertas por bomba
  const alertasPorBomba = computed(() => {
    if (!alertasConDatos.value) return { A: [], B: [] };

    return {
      A: alertasConDatos.value.filter((a: any) => a.origen === "Bomba A"),
      B: alertasConDatos.value.filter((a: any) => a.origen === "Bomba B"),
    };
  });

  // Obtener tipos de sensores únicos por bomba
  const sensoresConAnomaliasPorBomba = computed(() => {
    return {
      A: [...new Set(alertasPorBomba.value.A.map((a: any) => a.tipo_sensor))],
      B: [...new Set(alertasPorBomba.value.B.map((a: any) => a.tipo_sensor))],
    };
  });

  return {
    alertas,
    alertasConDatos,
    alertasPorBomba,
    sensoresConAnomaliasPorBomba,
    isLoading,
    error,
    refetch,
  };
};

/**
 * Composable para obtener datos del periodo anómalo de una alerta específica
 */
export const useDatosAnomalia = (alertaId: Ref<number | null>) => {
  const { apiUrl } = useRuntimeConfig().public;

  const fetchDatosAnomalia = async () => {
    if (!alertaId.value) return null;

    const response = await fetch(`${apiUrl}/alertas_umbral/${alertaId.value}/datos_anomalia`);
    if (!response.ok) {
      throw new Error("Error al obtener datos de anomalía");
    }
    return await response.json();
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["datosAnomalia", alertaId],
    queryFn: fetchDatosAnomalia,
    enabled: computed(() => alertaId.value !== null),
  });

  return {
    datosAnomalia: data,
    isLoading,
    error,
    refetch,
  };
};

/**
 * Composable para obtener datos con contexto (antes y después del periodo anómalo)
 */
export const useDatosAnomaliaConContexto = (
  alertaId: Ref<number | null>,
  minutosAntes: Ref<number> = ref(15),
  minutosDespues: Ref<number> = ref(15)
) => {
  const { apiUrl } = useRuntimeConfig().public;

  const fetchDatosConContexto = async () => {
    if (!alertaId.value) return null;

    const url = `${apiUrl}/alertas_umbral/${alertaId.value}/datos_anomalia_contexto?minutos_antes=${minutosAntes.value}&minutos_despues=${minutosDespues.value}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al obtener datos con contexto");
    }
    return await response.json();
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["datosAnomaliaContexto", alertaId, minutosAntes, minutosDespues],
    queryFn: fetchDatosConContexto,
    enabled: computed(() => alertaId.value !== null),
  });

  return {
    datosContexto: data,
    isLoading,
    error,
    refetch,
  };
};

/**
 * Composable para obtener la alerta más reciente de un tipo de sensor específico
 */
export const useAlertaRecientePorSensor = (
  tipoSensor: Ref<string | null>,
  bomba: Ref<"A" | "B">
) => {
  const { alertasPorBomba, isLoading } = useAlertasConAnomalias();

  const alertaReciente = computed(() => {
    if (!tipoSensor.value) return null;

    const alertasBomba = alertasPorBomba.value[bomba.value];
    const alertasSensor = alertasBomba.filter((a: any) => a.tipo_sensor === tipoSensor.value);

    if (alertasSensor.length === 0) return null;

    // Ordenar por timestamp descendente y tomar la primera
    return alertasSensor.sort((a: any, b: any) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];
  });

  return {
    alertaReciente,
    isLoading,
  };
};
