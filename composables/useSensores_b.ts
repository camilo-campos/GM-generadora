import { useQuery } from "@tanstack/vue-query";

const fetchSensorB = async (tipo: string) => {
  const { apiUrl } = useRuntimeConfig().public;
  const response = await fetch(`${apiUrl}/sensores_b/${tipo}`);
  const data = await response.json();
  return data.data || data;
};

export const useSensoresB = () => {
  const { data: corriente, isLoading: corrienteLoading } = useQuery({
    queryKey: ["sensoresB-corriente"],
    queryFn: () => fetchSensorB("corriente"),
    refetchInterval: 60000,
  });

  const { data: excentricidadBomba, isLoading: excentricidadBombaLoading } = useQuery({
    queryKey: ["sensoresB-excentricidadBomba"],
    queryFn: () => fetchSensorB("excentricidad_bomba"),
    refetchInterval: 60000,
  });

  const { data: flujoDescarga, isLoading: flujoDescargaLoading } = useQuery({
    queryKey: ["sensoresB-flujoDescarga"],
    queryFn: () => fetchSensorB("flujo_descarga"),
    refetchInterval: 60000,
  });

  const { data: flujoAguaDomoAP, isLoading: flujoAguaDomoAPLoading } = useQuery({
    queryKey: ["sensoresB-flujoAguaDomoAP"],
    queryFn: () => fetchSensorB("flujo_agua_domo_ap"),
    refetchInterval: 60000,
  });

  const { data: flujoAguaDomoMP, isLoading: flujoAguaDomoMPLoading } = useQuery({
    queryKey: ["sensoresB-flujoAguaDomoMP"],
    queryFn: () => fetchSensorB("flujo_agua_domo_mp"),
    refetchInterval: 60000,
  });

  const { data: flujoAguaRecalentador, isLoading: flujoAguaRecalentadorLoading } = useQuery({
    queryKey: ["sensoresB-flujoAguaRecalentador"],
    queryFn: () => fetchSensorB("flujo_agua_recalentador"),
    refetchInterval: 60000,
  });

  const { data: flujoAguaVaporAlta, isLoading: flujoAguaVaporAltaLoading } = useQuery({
    queryKey: ["sensoresB-flujoAguaVaporAlta"],
    queryFn: () => fetchSensorB("flujo_agua_vapor_alta"),
    refetchInterval: 60000,
  });

  const { data: presionAgua, isLoading: presionAguaLoading } = useQuery({
    queryKey: ["sensoresB-presionAgua"],
    queryFn: () => fetchSensorB("presion_agua"),
    refetchInterval: 60000,
  });

  const { data: temperaturaAmbiental, isLoading: temperaturaAmbientalLoading } = useQuery({
    queryKey: ["sensoresB-temperaturaAmbiental"],
    queryFn: () => fetchSensorB("temperatura_ambiental"),
    refetchInterval: 60000,
  });

  const { data: temperaturaAguaAlim, isLoading: temperaturaAguaAlimLoading } = useQuery({
    queryKey: ["sensoresB-temperaturaAguaAlim"],
    queryFn: () => fetchSensorB("temperatura_agua_alim"),
    refetchInterval: 60000,
  });

  const { data: temperaturaEstator, isLoading: temperaturaEstatorLoading } = useQuery({
    queryKey: ["sensoresB-temperaturaEstator"],
    queryFn: () => fetchSensorB("temperatura_estator"),
    refetchInterval: 60000,
  });

  const { data: vibracionAxialEmpuje, isLoading: vibracionAxialEmpujeLoading } = useQuery({
    queryKey: ["sensoresB-vibracionAxialEmpuje"],
    queryFn: () => fetchSensorB("vibracion_axial_empuje"),
    refetchInterval: 60000,
  });

  const { data: vibracionXDescanso, isLoading: vibracionXDescansoLoading } = useQuery({
    queryKey: ["sensoresB-vibracionXDescanso"],
    queryFn: () => fetchSensorB("vibracion_x_descanso"),
    refetchInterval: 60000,
  });

  const { data: vibracionYDescanso, isLoading: vibracionYDescansoLoading } = useQuery({
    queryKey: ["sensoresB-vibracionYDescanso"],
    queryFn: () => fetchSensorB("vibracion_y_descanso"),
    refetchInterval: 60000,
  });

  const { data: voltajeBarra, isLoading: voltajeBarraLoading } = useQuery({
    queryKey: ["sensoresB-voltajeBarra"],
    queryFn: () => fetchSensorB("voltaje_barra"),
    refetchInterval: 60000,
  });

  return {
    corriente,
    excentricidadBomba,
    flujoDescarga,
    flujoAguaDomoAP,
    flujoAguaDomoMP,
    flujoAguaRecalentador,
    flujoAguaVaporAlta,
    presionAgua,
    temperaturaAmbiental,
    temperaturaAguaAlim,
    temperaturaEstator,
    vibracionAxialEmpuje,
    vibracionXDescanso,
    vibracionYDescanso,
    voltajeBarra,
    isLoading:
      corrienteLoading ||
      excentricidadBombaLoading ||
      flujoDescargaLoading ||
      flujoAguaDomoAPLoading ||
      flujoAguaDomoMPLoading ||
      flujoAguaRecalentadorLoading ||
      flujoAguaVaporAltaLoading ||
      presionAguaLoading ||
      temperaturaAmbientalLoading ||
      temperaturaAguaAlimLoading ||
      temperaturaEstatorLoading ||
      vibracionAxialEmpujeLoading ||
      vibracionXDescansoLoading ||
      vibracionYDescansoLoading ||
      voltajeBarraLoading,
  };
};

