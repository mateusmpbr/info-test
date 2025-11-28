import { VehicleRepository } from "@useCases/ports/vehicle.repository.dto";
import { GetVehiclesInputDTO, GetVehiclesOutputDTO } from "./get-vehicles.dto";

export async function execute(
  _: GetVehiclesInputDTO,
  repo: VehicleRepository
): Promise<GetVehiclesOutputDTO> {
  const vehicles = await repo.findAll();

  if (!vehicles?.length) {
    return { vehicles: [] };
  }

  return {
    vehicles: vehicles.map((vehicle) => ({
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

export default execute;
