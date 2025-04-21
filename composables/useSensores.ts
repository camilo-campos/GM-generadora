import { useQuery } from "@tanstack/vue-query";

const fetchSensores = async (tipo: string) => {
  const response = await fetch(
    `https://backend-gm.1tfr3xva5g42.us-south.codeengine.appdomain.cloud/sensores/${tipo}`
  );
  const data = await response.json();
  return data.data || data;
};

export const useSensores = () => {
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

  return {
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
      voltajeBarraLoading,
  };
};

