import { ValidationError } from "../../shared/errors";
import { VehicleRepository } from "@useCases/ports/vehicle.repository";

function isUUIDv4(value: any) {
  return (
    typeof value === "string" &&
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
      value
    )
  );
}

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
