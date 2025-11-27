import { VehicleModel } from "@models/vehicle.model";
import { ValidationError } from "../../shared/errors";
import { UpdateVehicleDTO } from "./update-vehicle.dto";

function isUUIDv4(value: any) {
  return (
    typeof value === "string" &&
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
      value
    )
  );
}

export async function execute(id: string, payload: UpdateVehicleDTO) {
  if (!id || !isUUIDv4(id)) {
    throw new ValidationError("The id field must be UUID v4");
  }

  if (!payload || Object.keys(payload).length === 0) {
    throw new ValidationError("Missing payload");
  }

  // field-level validations (optional fields)
  if (payload.id && !isUUIDv4(payload.id)) {
    throw new ValidationError("The id field must be UUID v4");
  }

  if (
    payload.placa &&
    (typeof payload.placa !== "string" || payload.placa.length !== 7)
  ) {
    throw new ValidationError(
      "The placa field must be a string with 7 characters"
    );
  }

  if (
    payload.chassi &&
    (typeof payload.chassi !== "string" || payload.chassi.length !== 17)
  ) {
    throw new ValidationError(
      "The chassi field must be a string with 17 characters"
    );
  }

  if (
    payload.renavam &&
    (!/^\d+$/.test(String(payload.renavam)) ||
      String(payload.renavam).length < 9 ||
      String(payload.renavam).length > 11)
  ) {
    throw new ValidationError(
      "The renavam field must be a number between 9 and 11 characters"
    );
  }

  // uniqueness checks - ensure other records don't use same unique fields
  const record = await VehicleModel.findOne({ where: { id } });
  if (!record) return null;

  if (payload.id) {
    const exists = await VehicleModel.findOne({ where: { id: payload.id } });
    if (exists && exists.id !== id)
      throw new ValidationError(
        "The informed id already exists in another vehicle"
      );
  }

  if (payload.placa) {
    const exists = await VehicleModel.findOne({
      where: { placa: payload.placa },
    });
    if (exists && exists.id !== id)
      throw new ValidationError(
        "The informed placa already exists in another vehicle"
      );
  }

  if (payload.chassi) {
    const exists = await VehicleModel.findOne({
      where: { chassi: payload.chassi },
    });
    if (exists && exists.id !== id)
      throw new ValidationError(
        "The informed chassi already exists in another vehicle"
      );
  }

  if (payload.renavam) {
    const exists = await VehicleModel.findOne({
      where: { renavam: payload.renavam },
    });
    if (exists && exists.id !== id)
      throw new ValidationError(
        "The informed renavam already exists in another vehicle"
      );
  }

  const updated = await record.update({ ...payload });
  return updated;
}

export default execute;
