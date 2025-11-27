import { randomUUID } from "crypto";
import { VehicleModel } from "@models/vehicle.model";
import { ValidationError } from "../../shared/errors";
import { CreateVehicleDTO } from "./create-vehicle.dto";

function isUUIDv4(value: any) {
  return (
    typeof value === "string" &&
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
      value
    )
  );
}

export async function execute(payload: CreateVehicleDTO) {
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

  // uniqueness checks
  if (payload.id) {
    const exists = await VehicleModel.findOne({ where: { id: payload.id } });
    if (exists)
      throw new ValidationError(
        "The informed id already exists in another vehicle"
      );
  }

  const byPlaca = await VehicleModel.findOne({
    where: { placa: payload.placa },
  });
  if (byPlaca)
    throw new ValidationError(
      "The informed placa already exists in another vehicle"
    );

  const byChassi = await VehicleModel.findOne({
    where: { chassi: payload.chassi },
  });
  if (byChassi)
    throw new ValidationError(
      "The informed chassi already exists in another vehicle"
    );

  const byRenavam = await VehicleModel.findOne({
    where: { renavam: payload.renavam },
  });
  if (byRenavam)
    throw new ValidationError(
      "The informed renavam already exists in another vehicle"
    );

  const id = payload.id || randomUUID();
  const record = await VehicleModel.create({ ...payload, id });
  return record;
}

export default execute;
