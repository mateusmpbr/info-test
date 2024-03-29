import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { VehicleModel } from "../infra/models/Vehicle";

// TODO: esse arquivo está depreciado. Extrair responsabilidades para mapper, controllers, presenters e interactors

export const read = async (req: Request, res: Response) => {
  try {
    const records = await VehicleModel.findAll();
    return res.status(200).json(records);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const readById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const record = await VehicleModel.findOne({ where: { id: id } });

    if (!record) {
      return res.status(400).json({ error: "Can not find existing vehicle" });
    }

    return res.status(200).json(record);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const create = async (req: Request, res: Response) => {
  const id = randomUUID();
  try {
    const { placa, chassi, renavam } = req.body;

    const record = await VehicleModel.create(
      req.body.id ? { ...req.body } : { ...req.body, id }
    );
    return res.status(200).json(record);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { placa, chassi, renavam, modelo, marca, ano } = req.body;

    const record = await VehicleModel.findOne({ where: { id: id } });

    if (!record) {
      return res.status(400).json({ error: "Can not find existing vehicle" });
    }

    const updatedRecord = await record.update({
      placa: placa || record.placa,
      chassi: chassi || record.chassi,
      renavam: renavam || record.renavam,
      modelo: modelo || record.modelo,
      marca: marca || record.marca,
      ano: ano || record.ano,
    });

    return res.status(200).json({ record: updatedRecord });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const record = await VehicleModel.findOne({ where: { id: id } });

    if (!record) {
      return res.status(400).json({ error: "Can not find existing vehicle" });
    }

    const deletedRecord = await record.destroy();
    return res.status(200).json({ record: deletedRecord });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
