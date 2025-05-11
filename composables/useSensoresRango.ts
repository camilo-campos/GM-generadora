import { useQuery } from "@tanstack/vue-query";

const API_BASE = "https://backend-gm.1tfr3xva5g42.us-south.codeengine.appdomain.cloud/sensores";

type RangoFecha = {
  inicio: string;
  termino: string;
};

const fetchSensorData = async (tipo: string, inicio: string, termino: string) => {
  const url = new URL(`${API_BASE}/${tipo}`);
  url.searchParams.append("inicio", inicio);
  url.searchParams.append("termino", termino);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error al obtener datos para ${tipo}`);
  }
  return await response.json();
};

export const useSensorData = (rangoPorSensor: Record<string, RangoFecha>) => {
  const createQuery = (tipo: string) => {
    const rango = rangoPorSensor[tipo];
    return useQuery({
      queryKey: ["sensor", tipo, rango.inicio, rango.termino],
      queryFn: () => fetchSensorData(tipo, rango.inicio, rango.termino),
    });
  };

  const { data: corriente, isLoading: isLoadingCorriente } = createQuery("corriente");
  const { data: salidaAgua, isLoading: isLoadingSalidaAgua } = createQuery("salida-agua");
  const { data: presionAgua, isLoading: isLoadingPresionAgua } = createQuery("presion-agua");
  const { data: generacionGas, isLoading: isLoadingGeneracionGas } = createQuery("generacion-gas");
  const { data: temperaturaAmbiental, isLoading: isLoadingTemperaturaAmbiental } = createQuery("temperatura-ambiental");
  const { data: temperaturaInternaEmpuje, isLoading: isLoadingTemperaturaInternaEmpuje } = createQuery("temperatura-interna-empuje");
  const { data: temperaturaDescansoMotor, isLoading: isLoadingTemperaturaDescansoMotor } = createQuery("temperatura-descanso-motor");
  const { data: temperaturaDescansoBomba, isLoading: isLoadingTemperaturaDescansoBomba } = createQuery("temperatura-descanso-bomba");
  const { data: vibracionAxial, isLoading: isLoadingVibracionAxial } = createQuery("vibracion-axial");
  const { data: voltajeBarra, isLoading: isLoadingVoltajeBarra } = createQuery("voltaje-barra");

  return {
    corriente, isLoadingCorriente,
    salidaAgua, isLoadingSalidaAgua,
    presionAgua, isLoadingPresionAgua,
    generacionGas, isLoadingGeneracionGas,
    temperaturaAmbiental, isLoadingTemperaturaAmbiental,
    temperaturaInternaEmpuje, isLoadingTemperaturaInternaEmpuje,
    temperaturaDescansoMotor, isLoadingTemperaturaDescansoMotor,
    temperaturaDescansoBomba, isLoadingTemperaturaDescansoBomba,
    vibracionAxial, isLoadingVibracionAxial,
    voltajeBarra, isLoadingVoltajeBarra,
  };
};
