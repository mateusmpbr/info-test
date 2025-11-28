import { IVehicleUpdateData } from "@adapters/common/dtos/vehicle.dto";
import { Vehicle } from "@entities/Vehicle.entity";

export interface VehicleRepository {
  findById(id: string): Promise<Vehicle>;
  // finds a record by any of the unique fields (placa, chassi, renavam)
  // performs a single OR query across the provided fields
  findByUnique(
    criteria: Partial<{
      placa: string;
      chassi: string;
      renavam: string;
    }>
  ): Promise<Vehicle>;
  findAll(): Promise<Vehicle[]>;
  create(vehicle: Vehicle): Promise<Vehicle>;
  update(data: IVehicleUpdateData, id: string): Promise<void>;
  delete(id: string): Promise<void>;
}

export default VehicleRepository;
