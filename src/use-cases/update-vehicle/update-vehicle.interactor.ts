import { ValidationError } from "../../shared/errors";
import { UpdateVehicleInputDTO } from "./update-vehicle.dto";
import { VehicleRepository } from "@useCases/ports/vehicle.repository.dto";
import { isUUIDv4, isPlaca, isChassi, isRenavam } from "../../shared/utils";

export async function execute(
  input: UpdateVehicleInputDTO,
  repo: VehicleRepository
): Promise<void> {
  if (!input.id || !isUUIDv4(input.id)) {
    throw new ValidationError("The id field must be UUID v4");
  }

  if (input.placa && !isPlaca(input.placa)) {
    throw new ValidationError(
      "The placa field must be a string with 7 characters"
    );
  }

  if (input.chassi && !isChassi(input.chassi)) {
    throw new ValidationError(
      "The chassi field must be a string with 17 characters"
    );
  }

  if (input.renavam && !isRenavam(input.renavam)) {
    throw new ValidationError(
      "The renavam field must be a number between 9 and 11 characters"
    );
  }

  const vehicle = await repo.findById(input.id);

  if (!vehicle) {
    throw new ValidationError("Vehicle not found");
  }

  const exists = await repo.findByUnique({
    placa: input.placa,
    chassi: input.chassi,
    renavam: input.renavam,
  });
  if (exists && exists.id !== input.id) {
    throw new ValidationError(
      "One of the informed placa, chassi or renavam already exists in another vehicle"
    );
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
