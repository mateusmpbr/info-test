import { VehicleModel } from "@models/vehicle.model";
import {
  VehicleRepository,
  VehicleRecord,
} from "@useCases/ports/vehicle.repository";

const map = (m: any): VehicleRecord => m.get({ plain: true }) as VehicleRecord;

export const SequelizeVehicleRepository: VehicleRepository = {
  async findById(id: string) {
    const rec = await VehicleModel.findOne({ where: { id } });
    return rec ? map(rec) : null;
  },
  async findByPlaca(placa: string) {
    const rec = await VehicleModel.findOne({ where: { placa } });
    return rec ? map(rec) : null;
  },
  async findByChassi(chassi: string) {
    const rec = await VehicleModel.findOne({ where: { chassi } });
    return rec ? map(rec) : null;
  },
  async findByRenavam(renavam: string | number) {
    const rec = await VehicleModel.findOne({ where: { renavam } });
    return rec ? map(rec) : null;
  },
  async findAll() {
    const records = await VehicleModel.findAll();
    return records.map(map);
  },
  async create(payload: Partial<VehicleRecord>) {
    const rec = await VehicleModel.create(payload as any);
    return map(rec);
  },
  async update(id: string, payload: Partial<VehicleRecord>) {
    const rec = await VehicleModel.findOne({ where: { id } });
    if (!rec) throw new Error("Not found");
    const updated = await rec.update(payload as any);
    return map(updated);
  },
  async delete(id: string) {
    const rec = await VehicleModel.findOne({ where: { id } });
    if (!rec) return;
    await rec.destroy();
  },
};

export default SequelizeVehicleRepository;
