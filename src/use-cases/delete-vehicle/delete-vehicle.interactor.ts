import { InvalidIdError, VehicleNotFoundError } from "../../shared/errors";
import { VehicleRepository } from "@useCases/ports/vehicle.repository.dto";
import { isUUIDv4 } from "../../shared/utils";
import { DeleteVehicleInputDTO } from "./delete-vehicle.dto";

export async function execute(
  input: DeleteVehicleInputDTO,
  repo: VehicleRepository
): Promise<void> {
  if (!input.id || !isUUIDv4(input.id)) {
    throw new InvalidIdError();
  }

  const vehicle = await repo.findById(input.id);

  if (!vehicle) {
    throw new VehicleNotFoundError();
  }

  await repo.delete(input.id);
  return;
}

export default execute;
