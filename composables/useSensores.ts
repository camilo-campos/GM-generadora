import { useQuery } from "@tanstack/vue-query";

const fetchSensores = async (tipo: string) => {
  const { apiUrl } = useRuntimeConfig().public;
  const response = await fetch(`${apiUrl}/sensores/${tipo}`);
  const data = await response.json();
  return data.data || data;
};

export const useSensores = () => {
  // Sensores originales
  const { data: corriente, isLoading: corrienteLoading } = useQuery({
    queryKey: ["sensoresCorriente"],
    queryFn: () => fetchSensores("corriente"),
    refetchInterval: 60000,
  });

  const { data: salidaAgua, isLoading: salidaAguaLoading } = useQuery({
    queryKey: ["sensoresSalidaAgua"],
    queryFn: () => fetchSensores("salida-agua"),
    refetchInterval: 60000,
  });

  const { data: presionAgua, isLoading: presionAguaLoading } = useQuery({
    queryKey: ["sensoresPresionAgua"],
    queryFn: () => fetchSensores("presion-agua"),
    refetchInterval:  60000,
  });

  const { data: generacionGas, isLoading: generacionGasLoading } = useQuery({
    queryKey: ["sensoresGeneracionGas"],
    queryFn: () => fetchSensores("generacion-gas"),
    refetchInterval:  60000,
  });

  const { data: temperaturaAbiente, isLoading: temperaturaAbienteLoading } =
    useQuery({
      queryKey: ["sensoresTemperaturaAbiente"],
      queryFn: () => fetchSensores("temperatura-ambiental"),
      refetchInterval:  60000,
    });

  const {
    data: temperaturaInternaEmpuje,
    isLoading: temperaturaInternaEmpujeLoading,
  } = useQuery({
    queryKey: ["sensoresTemperaturaInternaEmpuje"],
    queryFn: () => fetchSensores("temperatura-interna-empuje"),
    refetchInterval:  60000,
  });

  const {
    data: temperaturaDescansoMotorBomba,
    isLoading: temperaturaDescansoMotorBombaLoading,
  } = useQuery({
    queryKey: ["sensoresTemperaturaDescansoMotorBomba"],
    queryFn: () => fetchSensores("temperatura-descanso-motor"),
    refetchInterval: 60000,
  });

  const {
    data: temperaturaDescansoBomba1A,
    isLoading: temperaturaDescansoBomba1ALoading,
  } = useQuery({
    queryKey: ["sensoresTemperaturaDescansoBomba1A"],
    queryFn: () => fetchSensores("temperatura-descanso-bomba"),
    refetchInterval: 60000,
  });

  const { data: vibracionAxial, isLoading: vibracionAxialLoading } = useQuery({
    queryKey: ["sensoresVibracionAxial"],
    queryFn: () => fetchSensores("vibracion-axial"),
    refetchInterval: 60000,
  });

  const { data: voltajeBarra, isLoading: voltajeBarraLoading } = useQuery({
    queryKey: ["sensoresVoltajeBarra"],
    queryFn: () => fetchSensores("voltaje-barra"),
    refetchInterval: 60000,
  });

  // Nuevos sensores
  const { data: excentricidadBomba, isLoading: excentricidadBombaLoading } = useQuery({
    queryKey: ["sensoresExcentricidadBomba"],
    queryFn: () => fetchSensores("excentricidad-bomba"),
    refetchInterval: 60000,
  });

  const { data: flujoAguaDomoAP, isLoading: flujoAguaDomoAPLoading } = useQuery({
    queryKey: ["sensoresFlujoAguaDomoAP"],
    queryFn: () => fetchSensores("flujo-agua-domo-ap"),
    refetchInterval: 60000,
  });

  const { data: flujoAguaDomoMP, isLoading: flujoAguaDomoMPLoading } = useQuery({
    queryKey: ["sensoresFlujoAguaDomoMP"],
    queryFn: () => fetchSensores("flujo-agua-domo-mp"),
    refetchInterval: 60000,
  });

  const { data: flujoAguaRecalentador, isLoading: flujoAguaRecalentadorLoading } = useQuery({
    queryKey: ["sensoresFlujoAguaRecalentador"],
    queryFn: () => fetchSensores("flujo-agua-recalentador"),
    refetchInterval: 60000,
  });

  const { data: flujoAguaVaporAlta, isLoading: flujoAguaVaporAltaLoading } = useQuery({
    queryKey: ["sensoresFlujoAguaVaporAlta"],
    queryFn: () => fetchSensores("flujo-agua-vapor-alta"),
    refetchInterval: 60000,
  });

  const { data: posicionValvulaRecirc, isLoading: posicionValvulaRecircLoading } = useQuery({
    queryKey: ["sensoresPosicionValvulaRecirc"],
    queryFn: () => fetchSensores("posicion-valvula-recirc"),
    refetchInterval: 60000,
  });

  const { data: presionAguaMP, isLoading: presionAguaMPLoading } = useQuery({
    queryKey: ["sensoresPresionAguaMP"],
    queryFn: () => fetchSensores("presion-agua-mp"),
    refetchInterval: 60000,
  });

  const { data: presionSuccionBAA, isLoading: presionSuccionBAALoading } = useQuery({
    queryKey: ["sensoresPresionSuccionBAA"],
    queryFn: () => fetchSensores("presion-succion-baa"),
    refetchInterval: 60000,
  });

  const { data: temperaturaEstator, isLoading: temperaturaEstatorLoading } = useQuery({
    queryKey: ["sensoresTemperaturaEstator"],
    queryFn: () => fetchSensores("temperatura-estator"),
    refetchInterval: 60000,
  });

  const { data: flujoSalida12FPMFC, isLoading: flujoSalida12FPMFCLoading } = useQuery({
    queryKey: ["sensoresFlujoSalida12FPMFC"],
    queryFn: () => fetchSensores("flujo-salida-12fpmfc"),
    refetchInterval: 60000,
  });

  return {
    // Sensores originales
    corriente,
    salidaAgua,
    presionAgua,
    generacionGas,
    temperaturaAbiente,
    temperaturaInternaEmpuje,
    temperaturaDescansoMotorBomba,
    temperaturaDescansoBomba1A,
    vibracionAxial,
    voltajeBarra,
    
    // Nuevos sensores
    excentricidadBomba,
    flujoAguaDomoAP,
    flujoAguaDomoMP,
    flujoAguaRecalentador,
    flujoAguaVaporAlta,
    posicionValvulaRecirc,
    presionAguaMP,
    presionSuccionBAA,
    temperaturaEstator,
    flujoSalida12FPMFC,
    
    isLoading:
      corrienteLoading ||
      salidaAguaLoading ||
      presionAguaLoading ||
      generacionGasLoading ||
      temperaturaAbienteLoading ||
      temperaturaInternaEmpujeLoading ||
      temperaturaDescansoMotorBombaLoading ||
      temperaturaDescansoBomba1ALoading ||
      vibracionAxialLoading ||
      voltajeBarraLoading ||
      // Nuevos sensores loading states
      excentricidadBombaLoading ||
      flujoAguaDomoAPLoading ||
      flujoAguaDomoMPLoading ||
      flujoAguaRecalentadorLoading ||
      flujoAguaVaporAltaLoading ||
      posicionValvulaRecircLoading ||
      presionAguaMPLoading ||
      presionSuccionBAALoading ||
      temperaturaEstatorLoading ||
      flujoSalida12FPMFCLoading,
  };
};

