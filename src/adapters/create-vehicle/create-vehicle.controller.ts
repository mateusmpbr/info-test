import { Request, Response } from "express";
import execute from "@useCases/create-vehicle/create-vehicle.interactor";
import presenter from "./create-vehicle.presenter";
import { CreateVehicleDTO } from "@useCases/create-vehicle/create-vehicle.dto";

export const run = async (req: Request, res: Response) => {
  try {
    const payload: CreateVehicleDTO = {
      id: req.body?.id,
      placa: req.body?.placa,
      chassi: req.body?.chassi,
      renavam: req.body?.renavam,
      modelo: req.body?.modelo,
      marca: req.body?.marca,
      ano: req.body?.ano,
    };

    const record = await execute(payload);
    return res.status(200).json(presenter.show(record));
  } catch (e) {
    if (e && (e as any).status === 400) {
      return res
        .status(400)
        .json({ errors: (e as any).details || (e as any).message });
    }
    return res.status(500).json({ error: e });
  }
};

export default { run };
