import { randomUUID } from "crypto";
import { ValidationError } from "../../shared/errors";
import { CreateVehicleDTO } from "./create-vehicle.dto";
import { VehicleRepository } from "@useCases/ports/vehicle.repository.dto";
import {
  isPlaca,
  isChassi,
  isRenavam,
  isString,
  isYear,
  isPayloadEmpty,
} from "../../shared/utils";

export async function execute(
  payload: CreateVehicleDTO,
  repo: VehicleRepository
) {
  if (isPayloadEmpty(payload)) throw new ValidationError("Missing payload");

  if (!isPlaca(payload.placa)) {
    throw new ValidationError(
      "The placa field must be a string with 7 characters"
    );
  }

  if (!isChassi(payload.chassi)) {
    throw new ValidationError(
      "The chassi field must be a string with 17 characters"
    );
  }

  if (!isRenavam(payload.renavam)) {
    throw new ValidationError(
      "The renavam field must be a number between 9 and 11 characters"
    );
  }

  if (!isString(payload.modelo)) {
    throw new ValidationError("The modelo field must be a string");
  }

  if (!isString(payload.marca)) {
    throw new ValidationError("The marca field must be a string");
  }

  if (!isYear(payload.ano)) {
    throw new ValidationError(
      "The ano field must be a number with 4 characters"
    );
  }

  const conflict = await repo.findByUnique({
    placa: payload.placa,
    chassi: payload.chassi,
    renavam: payload.renavam,
  });
  if (conflict)
    throw new ValidationError(
      "One of the informed placa, chassi or renavam already exists in another vehicle"
    );

  const id = randomUUID();
  await repo.create({ ...payload, id });
  return id;
}

export default execute;
