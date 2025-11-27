import { VehicleRepository } from "@useCases/ports/vehicle.repository";

export async function execute(repo: VehicleRepository) {
  const records = await repo.findAll();
  return records;
}

export default execute;
