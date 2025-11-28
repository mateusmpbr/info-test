import { CreateVehicleOutputDTO } from "@useCases/create-vehicle/create-vehicle.dto";

export function show(output: CreateVehicleOutputDTO) {
  return { id: output.id };
}

export default { show };
