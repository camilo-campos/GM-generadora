import { useQuery } from "@tanstack/vue-query";

const fetchPrediccionesBombab = async () => {
  const { apiUrl } = useRuntimeConfig().public;
  const response = await fetch(`${apiUrl}/sensores_b/predicciones-bomba-b`);
  if (!response.ok) throw new Error("Error al obtener predicciones");
  return await response.json();
};

export const usePrediccionesBombab = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["prediccionesBombab"],
    queryFn: fetchPrediccionesBombab,
    refetchInterval: 60000, // Opcional: refresca cada minuto
  });

  return {
    prediccionesBombab: data,
    isLoadingPrediccionesBombab: isLoading,
    errorPrediccionesBombab: error,
  };
};