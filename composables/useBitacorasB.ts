import { useQuery } from "@tanstack/vue-query";

// Función para obtener todas las bitácoras de la bomba B
const fetchBitacorasB = async () => {
  const response = await fetch(
    "https://backend-gm.1tfr3xva5g42.us-south.codeengine.appdomain.cloud/bitacoras_b/todas"
  );
  const data = await response.json();
  return data.data || data;
};

// Función para obtener las bitácoras de la bomba B que contienen fallas
const fetchBitacorasFallasB = async () => {
  const response = await fetch(
    "https://backend-gm.1tfr3xva5g42.us-south.codeengine.appdomain.cloud/bitacoras_b/todas_fallas"
  );
  const data = await response.json();
  return data.data || data;
};

// Composable específico para las bitácoras de la bomba B
export const useBitacorasB = () => {
  // Consulta de todas las bitácoras de la bomba B
  const { data: bitacoras, isLoading: bitacorasLoading } = useQuery({
    queryKey: ["bitacorasB"], // Clave única para evitar conflictos con otras consultas
    queryFn: fetchBitacorasB,
    refetchInterval: 60000, // 60 segundos
  });

  // Consulta de bitácoras de fallas de la bomba B
  const { data: bitacorasFallas, isLoading: bitacorasFallasLoading } = useQuery({
    queryKey: ["bitacorasFallasB"], // Clave única para evitar conflictos con otras consultas
    queryFn: fetchBitacorasFallasB,
    refetchInterval: 60000, // 60 segundos
  });

  return {
    bitacoras,
    bitacorasFallas,
    isLoading: bitacorasLoading || bitacorasFallasLoading,
  };
};

