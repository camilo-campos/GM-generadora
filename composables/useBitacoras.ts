import { useQuery } from "@tanstack/vue-query";

// Función para obtener todas las bitácoras
const fetchBitacoras = async () => {
  const response = await fetch("http://127.0.0.1:8000/bitacoras/todas");
  const data = await response.json();
  return data.data || data;
};

// Función para obtener las bitácoras que contienen fallas
const fetchBitacorasFallas = async () => {
  const response = await fetch("http://127.0.0.1:8000/bitacoras/todas_fallas");
  const data = await response.json();
  return data.data || data;
};

export const useBitacoras = () => {
  // Consulta de todas las bitácoras
  const { data: bitacoras, isLoading: bitacorasLoading } = useQuery({
    queryKey: ["bitacoras"],
    queryFn: fetchBitacoras,
  });

  // Consulta de bitácoras de fallas
  const { data: bitacorasFallas, isLoading: bitacorasFallasLoading } = useQuery(
    {
      queryKey: ["bitacorasFallas"],
      queryFn: fetchBitacorasFallas,
    }
  );

  return {
    bitacoras,
    bitacorasFallas,
    isLoading: bitacorasLoading || bitacorasFallasLoading,
    // Función para llamar al POST de análisis
  };
};
