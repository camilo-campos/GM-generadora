import { useQuery } from "@tanstack/vue-query";
//http://127.0.0.1:8000
//https://backend-gm.1tfr3xva5g42.us-south.codeengine.appdomain.cloud
const API_BASE = "http://127.0.0.1:8000/sensores";

type RangoFecha = {
  inicio: string;
  termino: string;
};

const fetchRango = async (tipo: string): Promise<RangoFecha> => {
  const response = await fetch(`${API_BASE}/${tipo}/rango`);
  if (!response.ok) {
    throw new Error(`Error al obtener rango para ${tipo}`);
  }
  return await response.json();
};

export const useRangos = () => {
  const {
    data: rangoCorriente,
    isLoading: isLoadingCorriente,
  } = useQuery<RangoFecha>({
    queryKey: ["rango", "corriente"],
    queryFn: () => fetchRango("corriente"),
  });

  const {
    data: rangoSalidaAgua,
    isLoading: isLoadingSalidaAgua,
  } = useQuery<RangoFecha>({
    queryKey: ["rango", "salida-agua"],
    queryFn: () => fetchRango("salida-agua"),
  });

  const {
    data: rangoPresionAgua,
    isLoading: isLoadingPresionAgua,
  } = useQuery<RangoFecha>({
    queryKey: ["rango", "presion-agua"],
    queryFn: () => fetchRango("presion-agua"),
  });

  const {
    data: rangoGeneracionGas,
    isLoading: isLoadingGeneracionGas,
  } = useQuery<RangoFecha>({
    queryKey: ["rango", "generacion-gas"],
    queryFn: () => fetchRango("generacion-gas"),
  });

  const {
    data: rangoTemperaturaAmbiente,
    isLoading: isLoadingTemperaturaAmbiente,
  } = useQuery<RangoFecha>({
    queryKey: ["rango", "temperatura-ambiental"],
    queryFn: () => fetchRango("temperatura-ambiental"),
  });

  const {
    data: rangoTemperaturaInternaEmpuje,
    isLoading: isLoadingTemperaturaInternaEmpuje,
  } = useQuery<RangoFecha>({
    queryKey: ["rango", "temperatura-interna-empuje"],
    queryFn: () => fetchRango("temperatura-interna-empuje"),
  });

  const {
    data: rangoTemperaturaDescansoMotorBomba,
    isLoading: isLoadingTemperaturaDescansoMotorBomba,
  } = useQuery<RangoFecha>({
    queryKey: ["rango", "temperatura-descanso-motor"],
    queryFn: () => fetchRango("temperatura-descanso-motor"),
  });

  const {
    data: rangoTemperaturaDescansoBomba1A,
    isLoading: isLoadingTemperaturaDescansoBomba1A,
  } = useQuery<RangoFecha>({
    queryKey: ["rango", "temperatura-descanso-bomba"],
    queryFn: () => fetchRango("temperatura-descanso-bomba"),
  });

  const {
    data: rangoVibracionAxial,
    isLoading: isLoadingVibracionAxial,
  } = useQuery<RangoFecha>({
    queryKey: ["rango", "vibracion-axial"],
    queryFn: () => fetchRango("vibracion-axial"),
  });

  const {
    data: rangoVoltajeBarra,
    isLoading: isLoadingVoltajeBarra,
  } = useQuery<RangoFecha>({
    queryKey: ["rango", "voltaje-barra"],
    queryFn: () => fetchRango("voltaje-barra"),
  });

  return {
    rangoCorriente,
    isLoadingCorriente,
    rangoSalidaAgua,
    isLoadingSalidaAgua,
    rangoPresionAgua,
    isLoadingPresionAgua,
    rangoGeneracionGas,
    isLoadingGeneracionGas,
    rangoTemperaturaAmbiente,
    isLoadingTemperaturaAmbiente,
    rangoTemperaturaInternaEmpuje,
    isLoadingTemperaturaInternaEmpuje,
    rangoTemperaturaDescansoMotorBomba,
    isLoadingTemperaturaDescansoMotorBomba,
    rangoTemperaturaDescansoBomba1A,
    isLoadingTemperaturaDescansoBomba1A,
    rangoVibracionAxial,
    isLoadingVibracionAxial,
    rangoVoltajeBarra,
    isLoadingVoltajeBarra,
  };
};
