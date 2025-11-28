import { VehicleModel } from "@models/vehicle.model";
import { Op } from "sequelize";
import {
  VehicleRepository,
  VehicleRecord,
} from "@useCases/ports/vehicle.repository";

// TODO: melhorar repositório
const map = (m: any): VehicleRecord => m.get({ plain: true }) as VehicleRecord;

export const SequelizeVehicleRepository: VehicleRepository = {
  async findById(id: string) {
    const rec = await VehicleModel.findOne({ where: { id } });
    return rec ? map(rec) : null;
  },
  async findByUnique(criteria) {
    const { placa, chassi, renavam } = criteria;

    const conditions = [
      placa && { placa },
      chassi && { chassi },
      renavam && { renavam },
    ].filter(Boolean);

    if (conditions.length === 0) return null;

    const rec = await VehicleModel.findOne({ where: { [Op.or]: conditions } });
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
