import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import { Vehicle } from "../models/Vehicle";

export const read = async (req: Request, res: Response) => {
    try {
        const records = await Vehicle.findAll();
        return res.status(200).json(records);
    } catch (e) {
        return res.status(500).json({ error: e});
    }
}


export const readById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const record = await Vehicle.findOne({ where: { id } });

        if (!record) {
            return res.status(400).json({ error: "Can not find existing vehicle" });
        }

        return res.status(200).json(record);
    } catch (e) {
        return res.status(500).json({ error: e});
    }
}


export const create = async (req: Request, res: Response) => {
    const id = uuidv4();
    try {
        const record = await Vehicle.create(req.body.id ? { ...req.body} : { ...req.body, id });
        return res.status(200).json(record);
    } catch (e) {
        return res.status(500).json({ error: e});
    }
}


export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { placa, chassi, renavam, modelo, marca, ano } = req.body;

        const record = await Vehicle.findOne({ where: { id } });

        const placaAlreadyExists =  await Vehicle.findOne({ where: { placa } })
        const chassiAlreadyExists = await Vehicle.findOne({ where: { chassi } })
        const renavamAlreadyExists = await Vehicle.findOne({ where: { renavam } })

        if (!record) {
            return res.status(400).json({ error: "Can not find existing vehicle" });
        }

        if(placaAlreadyExists){
            return res.status(400).json({ error: "The informed --- placa --- already exists in another vehicle" });
        }

        if(chassiAlreadyExists){
            return res.status(400).json({ error: "The informed --- chassi --- already exists in another vehicle" });
        }

        if(renavamAlreadyExists){
            return res.status(400).json({ error: "The informed --- renavam --- already exists in another vehicle" });
        }

        const updatedRecord = await record.update({                
            placa: placa || record.getDataValue("placa"),
            chassi: chassi || record.getDataValue("chassi"),
            renavam: renavam || record.getDataValue("renavam"),
            modelo: modelo || record.getDataValue("modelo"),
            marca: marca || record.getDataValue("marca"),
            ano: ano || record.getDataValue("ano"),
        });

        return res.status(200).json({ record: updatedRecord });
    } catch (e) {
        return res.status(500).json({error: e});
    }
}


export const destroy = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const record = await Vehicle.findOne({ where: { id } });

        if (!record) {
            return res.status(400).json({ error: "Can not find existing vehicle" });
        }

        const deletedRecord = await record.destroy();
        return res.status(200).json({ record: deletedRecord });
    } catch (e) {
        return res.status(500).json({error: e});
    }
}
