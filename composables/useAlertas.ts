import { useQuery } from "@tanstack/vue-query";

// Función para obtener todas las bitácoras
const fetchAlertas = async () => {
  const response = await fetch(
    "https://backend-gm.1tfr3xva5g42.us-south.codeengine.appdomain.cloud/alertas_umbral/todas_alertas"
  );
  const data = await response.json();
  return data.data || data;
};



export const useAlertas = () => {
  // Consulta de todas las bitácoras
  const { data: alertas, isLoading: alertasLoading } = useQuery({
    queryKey: ["alertas"],
    queryFn: fetchAlertas,
    refetchInterval: 60000, // 60 segundos
  });

  

  return {
    alertas,
    
    isLoading_alerta: alertasLoading 
  };
};