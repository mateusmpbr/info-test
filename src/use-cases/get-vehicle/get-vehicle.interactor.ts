import { InvalidIdError } from "../../shared/errors";
import { VehicleRepository } from "@useCases/ports/vehicle.repository.dto";
import { isUUIDv4 } from "../../shared/utils";
import { GetVehicleInputDTO, GetVehicleOutputDTO } from "./get-vehicle.dto";

export async function execute(
  input: GetVehicleInputDTO,
  repo: VehicleRepository
): Promise<GetVehicleOutputDTO> {
  if (!input.id || !isUUIDv4(input.id)) {
    throw new InvalidIdError();
  }

  const vehicle = await repo.findById(input.id);
  return {
    id: vehicle.id,
    placa: vehicle.placa,
    chassi: vehicle.chassi,
    renavam: vehicle.renavam,
    modelo: vehicle.modelo,
    marca: vehicle.marca,
    ano: vehicle.ano,
  };
}

export default execute;
