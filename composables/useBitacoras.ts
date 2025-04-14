import { useQuery } from "@tanstack/vue-query";

// Función para obtener todas las bitácoras
const fetchBitacoras = async () => {
  const response = await fetch(
    "https://backend-gm.1tfr3xva5g42.us-south.codeengine.appdomain.cloud/bitacoras/todas"
  );
  const data = await response.json();
  return data.data || data;
};

// Función para obtener las bitácoras que contienen fallas
const fetchBitacorasFallas = async () => {
  const response = await fetch(
    "https://backend-gm.1tfr3xva5g42.us-south.codeengine.appdomain.cloud/bitacoras/todas_fallas"
  );
  const data = await response.json();
  return data.data || data;
};

export const useBitacoras = () => {
  // Consulta de todas las bitácoras
  const { data: bitacoras, isLoading: bitacorasLoading } = useQuery({
    queryKey: ["bitacoras"],
    queryFn: fetchBitacoras,
    refetchInterval: 60000, // 60 segundos
  });

  // Consulta de bitácoras de fallas
  const { data: bitacorasFallas, isLoading: bitacorasFallasLoading } = useQuery({
    queryKey: ["bitacorasFallas"],
    queryFn: fetchBitacorasFallas,
    refetchInterval: 60000, // 60 segundos
  });

  return {
    bitacoras,
    bitacorasFallas,
    isLoading: bitacorasLoading || bitacorasFallasLoading,
  };
};

