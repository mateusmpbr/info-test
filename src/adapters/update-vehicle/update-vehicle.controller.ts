import { Request, Response } from "express";
import execute from "@useCases/update-vehicle/update-vehicle.interactor";
import presenter from "./update-vehicle.presenter";
import { UpdateVehicleDTO } from "@useCases/update-vehicle/update-vehicle.dto";

export const run = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id;
    const payload: UpdateVehicleDTO = {
      id: req.body?.id,
      placa: req.body?.placa,
      chassi: req.body?.chassi,
      renavam: req.body?.renavam,
      modelo: req.body?.modelo,
      marca: req.body?.marca,
      ano: req.body?.ano,
    };

    const updated = await execute(id, payload);
    if (!updated)
      return res.status(400).json({ error: "Can not find existing vehicle" });
    return res.status(200).json(presenter.show(updated));
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
