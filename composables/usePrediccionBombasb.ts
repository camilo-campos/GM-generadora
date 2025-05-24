import { useQuery } from "@tanstack/vue-query";

const fetchPrediccionesBombab = async () => {
  const response = await fetch(
    "https://backend-gm.1tfr3xva5g42.us-south.codeengine.appdomain.cloud/sensores_b/predicciones-bomba-b"
  );
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