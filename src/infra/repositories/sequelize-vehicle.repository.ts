import { VehicleModel } from "@models/vehicle.model";
import { VehicleRepository } from "@useCases/ports/vehicle.repository.dto";
import { VehicleMapper } from "@infra/mappers/sql-vehicle-mapper";
import {
  IVehicleMapper,
  IVehicleUpdateData,
} from "@adapters/common/dtos/vehicle.dto";
import { Vehicle } from "@entities/Vehicle.entity";

const mapper: IVehicleMapper = new VehicleMapper();

export const SequelizeVehicleRepository: VehicleRepository = {
  async findById(id: string) {
    return await mapper.find(id);
  },
  async findByUnique(criteria) {
    return await mapper.findByUnique(criteria);
  },
  async findAll() {
    return await mapper.findAll();
  },
  async create(vehicle: Vehicle) {
    return await mapper.create(vehicle);
  },
  async update(data: IVehicleUpdateData, id: string) {
    await mapper.update(data, id);
  },
  async delete(id: string) {
    await mapper.delete(id);
  },
};

export default SequelizeVehicleRepository;
