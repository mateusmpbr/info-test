import {
  IVehicleMapper,
  IVehicleUpdateData,
} from "@adapters/common/dtos/vehicle.dto";
import { Vehicle } from "@entities/Vehicle.entity";
import { VehicleModel } from "@models/vehicle.model";

export class VehicleMapper implements IVehicleMapper {
  public async create(vehicle: Vehicle): Promise<Vehicle> {
    const row = await VehicleModel.create({
      id: vehicle.id,
      placa: vehicle.placa,
      chassi: vehicle.chassi,
      renavam: vehicle.renavam,
      modelo: vehicle.modelo,
      marca: vehicle.marca,
      ano: vehicle.ano,
    });

    return this.toEntity(row);
  }

  public async delete(id: string): Promise<void> {
    await VehicleModel.destroy({ where: { id } });
  }

  public async find(id: string): Promise<Vehicle> {
    const row = await VehicleModel.findOne({ where: { id } });

    return this.toEntity(row);
  }

  public async findAll(): Promise<Vehicle[]> {
    const rows = await VehicleModel.findAll();

    return rows.map((row) => this.toEntity(row));
  }

  public async update(data: IVehicleUpdateData, id: string): Promise<void> {
    await VehicleModel.update(data, { where: { id } });
  }

  public toEntity(row: VehicleModel): Vehicle {
    return Vehicle.build({
      id: row.id,
      placa: row.placa,
      chassi: row.chassi,
      renavam: row.renavam,
      modelo: row.modelo,
      marca: row.marca,
      ano: row.ano,
    });
  }
}
