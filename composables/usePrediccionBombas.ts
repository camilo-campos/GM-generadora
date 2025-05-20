import { useQuery } from "@tanstack/vue-query";

const fetchPrediccionesBombaA = async () => {
  const response = await fetch(
    "https://backend-gm.1tfr3xva5g42.us-south.codeengine.appdomain.cloud/sensores/predicciones-bomba-a"
  );
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