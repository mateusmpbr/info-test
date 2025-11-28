import { ValidationError } from "../../shared/errors";
import { VehicleRepository } from "@useCases/ports/vehicle.repository.dto";
import { isUUIDv4 } from "../../shared/utils";
import { DeleteVehicleInputDTO } from "./delete-vehicle.dto";

export async function execute(
  input: DeleteVehicleInputDTO,
  repo: VehicleRepository
): Promise<void> {
  if (!input.id || !isUUIDv4(input.id)) {
    throw new ValidationError("The id field must be UUID v4");
  }

  const vehicle = await repo.findById(input.id);

  if (!vehicle) {
    throw new ValidationError("Vehicle not found");
  }

  await repo.delete(input.id);
  return;
}

export default execute;
