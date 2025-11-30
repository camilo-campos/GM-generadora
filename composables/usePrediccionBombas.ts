import { useQuery } from "@tanstack/vue-query";

const fetchPrediccionesBombaA = async () => {
  const { apiUrl } = useRuntimeConfig().public;
  const response = await fetch(`${apiUrl}/sensores/predicciones-bomba-a`);
  if (!response.ok) throw new Error("Error al obtener predicciones");
  return await response.json();
};

export const usePrediccionesBombaA = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["prediccionesBombaA"],
    queryFn: fetchPrediccionesBombaA,
    refetchInterval: 60000, // Opcional: refresca cada minuto
  });

  return {
    predicciones: data,
    isLoadingPredicciones: isLoading,
    errorPredicciones: error,
  };
};