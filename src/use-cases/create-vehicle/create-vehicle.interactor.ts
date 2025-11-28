import { randomUUID } from "crypto";
import { ValidationError } from "../../shared/errors";
import {
  CreateVehicleInputDTO,
  CreateVehicleOutputDTO,
} from "./create-vehicle.dto";
import { VehicleRepository } from "@useCases/ports/vehicle.repository.dto";
import {
  isPlaca,
  isChassi,
  isRenavam,
  isString,
  isYear,
  isPayloadEmpty,
} from "../../shared/utils";
import { Vehicle } from "@entities/Vehicle.entity";

export async function execute(
  input: CreateVehicleInputDTO,
  repo: VehicleRepository
): Promise<CreateVehicleOutputDTO> {
  if (isPayloadEmpty(input)) throw new ValidationError("Missing payload");

  if (!isPlaca(input.placa)) {
    throw new ValidationError(
      "The placa field must be a string with 7 characters"
    );
  }

  if (!isChassi(input.chassi)) {
    throw new ValidationError(
      "The chassi field must be a string with 17 characters"
    );
  }

  // TODO: melhorar mensagem de erro (tipo é string, não number)
  if (!isRenavam(input.renavam)) {
    throw new ValidationError(
      "The renavam field must be a number between 9 and 11 characters"
    );
  }

  if (!isString(input.modelo)) {
    throw new ValidationError("The modelo field must be a string");
  }

  if (!isString(input.marca)) {
    throw new ValidationError("The marca field must be a string");
  }

  if (!isYear(input.ano)) {
    throw new ValidationError(
      "The ano field must be a number with 4 characters"
    );
  }

  const conflict = await repo.findByUnique({
    placa: input.placa,
    chassi: input.chassi,
    renavam: input.renavam,
  });
  if (conflict) {
    throw new ValidationError(
      "One of the informed placa, chassi or renavam already exists in another vehicle"
    );
  }

  const id = randomUUID();
  await repo.create(
    Vehicle.build({
      id,
      placa: input.placa,
      chassi: input.chassi,
      renavam: input.renavam,
      modelo: input.modelo,
      marca: input.marca,
      ano: input.ano,
    })
  );
  return { id };
}

export default execute;
