import { ValidationError } from "../../shared/errors";
import { VehicleRepository } from "@useCases/ports/vehicle.repository";
import { isUUIDv4 } from "../../shared/utils";

export async function execute(id: string, repo: VehicleRepository) {
  if (!id || !isUUIDv4(id)) {
    throw new ValidationError("The id field must be UUID v4");
  }

  const record = await repo.findById(id);
  if (!record) return null;

  const payload = record;
  await repo.delete(id);
  return payload;
}

export default execute;
