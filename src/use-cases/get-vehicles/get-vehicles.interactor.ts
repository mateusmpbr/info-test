import { VehicleModel } from "@models/vehicle.model";

export async function execute() {
  const records = await VehicleModel.findAll();
  return records;
}

export default execute;
