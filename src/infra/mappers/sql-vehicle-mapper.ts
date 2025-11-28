import {
  IVehicleMapper,
  IVehicleUpdateData,
} from "@adapters/common/dtos/vehicle.dto";
import { Vehicle } from "@entities/Vehicle.entity";
import { VehicleModel } from "@models/vehicle.model";
import { Op } from "sequelize";

export class VehicleMapper implements IVehicleMapper {
  public async find(id: string): Promise<Vehicle> {
    const row = await VehicleModel.findOne({ where: { id } });

    if (!row) return null;

    return this.toEntity(row);
  }

  async findByUnique(
    criteria: Partial<{
      placa: string;
      chassi: string;
      renavam: string;
    }>
  ): Promise<Vehicle> {
    const { placa, chassi, renavam } = criteria;

    const conditions = [
      placa && { placa },
      chassi && { chassi },
      renavam && { renavam },
    ].filter(Boolean);

    if (conditions.length === 0) return null;

    const row = await VehicleModel.findOne({ where: { [Op.or]: conditions } });

    if (!row) return null;

    return this.toEntity(row);
  }

  public async findAll(): Promise<Vehicle[]> {
    const rows = await VehicleModel.findAll();

    if (!rows?.length) return [];

    return rows.map((row) => this.toEntity(row));
  }

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

  public async update(data: IVehicleUpdateData, id: string): Promise<void> {
    await VehicleModel.update(data, { where: { id } });
  }

  public async delete(id: string): Promise<void> {
    await VehicleModel.destroy({ where: { id } });
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
