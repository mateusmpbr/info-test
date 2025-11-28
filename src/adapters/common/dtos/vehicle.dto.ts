import { Vehicle } from "@entities/Vehicle.entity";

export interface IVehicleUpdateData {
  placa?: string;
  chassi?: string;
  renavam?: number;
  modelo?: string;
  marca?: string;
  ano?: number;
}

export interface IVehicleMapper {
  find(id: string): Promise<Vehicle>;
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
