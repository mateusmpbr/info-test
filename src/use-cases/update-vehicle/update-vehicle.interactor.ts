import {
  InvalidIdError,
  InvalidPlacaError,
  InvalidChassiError,
  InvalidRenavamError,
  VehicleNotFoundError,
  UniqueFieldConflictError,
} from "../../shared/errors";
import { UpdateVehicleInputDTO } from "./update-vehicle.dto";
import { VehicleRepository } from "@useCases/ports/vehicle.repository.dto";
import { isUUIDv4, isPlaca, isChassi, isRenavam } from "../../shared/utils";

export async function execute(
  input: UpdateVehicleInputDTO,
  repo: VehicleRepository
): Promise<void> {
  if (!input.id || !isUUIDv4(input.id)) {
    throw new InvalidIdError();
  }

  if (input.placa && !isPlaca(input.placa)) {
    throw new InvalidPlacaError();
  }

  if (input.chassi && !isChassi(input.chassi)) {
    throw new InvalidChassiError();
  }

  if (input.renavam && !isRenavam(input.renavam)) {
    throw new InvalidRenavamError();
  }

  const vehicle = await repo.findById(input.id);

  if (!vehicle) {
    throw new VehicleNotFoundError();
  }

  const exists = await repo.findByUnique({
    placa: input.placa,
    chassi: input.chassi,
    renavam: input.renavam,
  });
  if (exists && exists.id !== input.id) {
    throw new UniqueFieldConflictError();
  }

  await repo.update(
    {
      placa: input.placa,
      chassi: input.chassi,
      renavam: input.renavam,
      modelo: input.modelo,
      marca: input.marca,
      ano: input.ano,
    },
    input.id
  );
  return;
}

export default execute;
