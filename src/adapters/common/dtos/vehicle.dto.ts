import { Vehicle } from "@entities/vehicle";

export interface IVehicleUpdateData {
  placa?: string;
  chassi?: string;
  renavam?: number;
  modelo?: string;
  marca?: string;
  ano?: number;
}

export interface IVehicleMapper {
  create(vehicle: Vehicle): Promise<Vehicle>;
  delete(id: string): Promise<void>;
  find(id: string): Promise<Vehicle>;
  findAll(): Promise<Vehicle[]>;
  update(data: IVehicleUpdateData, id: string): Promise<void>;
}
