import { ValidationError } from "../../shared/errors";
import { UpdateVehicleDTO } from "./update-vehicle.dto";
import { VehicleRepository } from "@useCases/ports/vehicle.repository.dto";
import {
  isUUIDv4,
  isPayloadEmpty,
  isPlaca,
  isChassi,
  isRenavam,
} from "../../shared/utils";

export async function execute(
  id: string,
  payload: UpdateVehicleDTO,
  repo: VehicleRepository
) {
  if (!id || !isUUIDv4(id)) {
    throw new ValidationError("The id field must be UUID v4");
  }

  if (isPayloadEmpty(payload)) {
    throw new ValidationError("Missing payload");
  }

  // field-level validations (optional fields)
  if (payload.id && !isUUIDv4(payload.id)) {
    throw new ValidationError("The id field must be UUID v4");
  }

  if (payload.placa && !isPlaca(payload.placa)) {
    throw new ValidationError(
      "The placa field must be a string with 7 characters"
    );
  }

  if (payload.chassi && !isChassi(payload.chassi)) {
    throw new ValidationError(
      "The chassi field must be a string with 17 characters"
    );
  }

  if (payload.renavam && !isRenavam(payload.renavam)) {
    throw new ValidationError(
      "The renavam field must be a number between 9 and 11 characters"
    );
  }

  // uniqueness checks - ensure other records don't use same unique fields
  const record = await repo.findById(id);
  if (!record) return null;

  if (payload.id) {
    const exists = await repo.findById(payload.id);
    if (exists && exists.id !== id)
      throw new ValidationError(
        "The informed id already exists in another vehicle"
      );
  }

  const uniqueCriteria: any = {};
  if (payload.placa) uniqueCriteria.placa = payload.placa;
  if (payload.chassi) uniqueCriteria.chassi = payload.chassi;
  if (payload.renavam) uniqueCriteria.renavam = payload.renavam;

  if (Object.keys(uniqueCriteria).length > 0) {
    const exists = await repo.findByUnique(uniqueCriteria);
    if (exists && exists.id !== id)
      throw new ValidationError(
        "One of the informed placa, chassi or renavam already exists in another vehicle"
      );
  }

  const updated = await repo.update(id, { ...payload } as any);
  return updated;
}

export default execute;
