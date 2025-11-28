import { randomUUID } from "crypto";
import { ValidationError } from "../../shared/errors";
import { CreateVehicleDTO } from "./create-vehicle.dto";
import { VehicleRepository } from "@useCases/ports/vehicle.repository";

function isUUIDv4(value: any) {
  return (
    typeof value === "string" &&
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
      value
    )
  );
}

export async function execute(
  payload: CreateVehicleDTO,
  repo: VehicleRepository
) {
  if (!payload) throw new ValidationError("Missing payload");

  if (payload.id && !isUUIDv4(payload.id)) {
    throw new ValidationError("The id field must be UUID v4");
  }

  if (
    !payload.placa ||
    typeof payload.placa !== "string" ||
    payload.placa.length !== 7
  ) {
    throw new ValidationError(
      "The placa field must be a string with 7 characters"
    );
  }

  if (
    !payload.chassi ||
    typeof payload.chassi !== "string" ||
    payload.chassi.length !== 17
  ) {
    throw new ValidationError(
      "The chassi field must be a string with 17 characters"
    );
  }

  if (
    !payload.renavam ||
    !/^\d+$/.test(String(payload.renavam)) ||
    String(payload.renavam).length < 9 ||
    String(payload.renavam).length > 11
  ) {
    throw new ValidationError(
      "The renavam field must be a number between 9 and 11 characters"
    );
  }

  if (!payload.modelo || typeof payload.modelo !== "string") {
    throw new ValidationError("The modelo field must be a string");
  }

  if (!payload.marca || typeof payload.marca !== "string") {
    throw new ValidationError("The marca field must be a string");
  }

  if (
    payload.ano === undefined ||
    payload.ano === null ||
    !/^\d{4}$/.test(String(payload.ano))
  ) {
    throw new ValidationError(
      "The ano field must be a number with 4 characters"
    );
  }

  // uniqueness checks using repository

  const byPlaca = await repo.findByPlaca(payload.placa);
  if (byPlaca)
    throw new ValidationError(
      "The informed placa already exists in another vehicle"
    );

  const byChassi = await repo.findByChassi(payload.chassi);
  if (byChassi)
    throw new ValidationError(
      "The informed chassi already exists in another vehicle"
    );

  const byRenavam = await repo.findByRenavam(payload.renavam);
  if (byRenavam)
    throw new ValidationError(
      "The informed renavam already exists in another vehicle"
    );

  const id = randomUUID();
  const record = await repo.create({ ...payload, id });
  return record;
}

export default execute;
