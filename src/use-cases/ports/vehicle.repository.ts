import { Model } from "sequelize";

export interface VehicleRecord {
  id: string;
  placa: string;
  chassi: string;
  renavam: string | number;
  modelo: string;
  marca: string;
  ano: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VehicleRepository {
  findById(id: string): Promise<VehicleRecord | null>;
  findByPlaca(placa: string): Promise<VehicleRecord | null>;
  findByChassi(chassi: string): Promise<VehicleRecord | null>;
  findByRenavam(renavam: string | number): Promise<VehicleRecord | null>;
  findAll(): Promise<VehicleRecord[]>;
  create(payload: Partial<VehicleRecord>): Promise<VehicleRecord>;
  update(id: string, payload: Partial<VehicleRecord>): Promise<VehicleRecord>;
  delete(id: string): Promise<void>;
}

export default VehicleRepository;
