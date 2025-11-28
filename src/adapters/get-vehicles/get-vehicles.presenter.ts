import { GetVehiclesOutputDTO } from "@useCases/get-vehicles/get-vehicles.dto";

export function show(output: GetVehiclesOutputDTO) {
  return {
    vehicles: output.vehicles.map((vehicle: any) => ({
      id: vehicle.id,
      placa: vehicle.placa,
      chassi: vehicle.chassi,
      renavam: vehicle.renavam,
      modelo: vehicle.modelo,
      marca: vehicle.marca,
      ano: vehicle.ano,
    })),
  };
}

export default { show };
