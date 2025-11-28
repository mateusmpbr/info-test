import { Request, Response } from "express";
import execute from "@useCases/create-vehicle/create-vehicle.interactor";
import { SequelizeVehicleRepository } from "@infra/repositories/sequelize-vehicle.repository";
import presenter from "./create-vehicle.presenter";
import { CreateVehicleInputDTO } from "@useCases/create-vehicle/create-vehicle.dto";

export const run = async (req: Request, res: Response) => {
  try {
    const input: CreateVehicleInputDTO = {
      placa: req.body?.placa,
      chassi: req.body?.chassi,
      renavam: req.body?.renavam,
      modelo: req.body?.modelo,
      marca: req.body?.marca,
      ano: req.body?.ano,
    };

    const output = await execute(input, SequelizeVehicleRepository);
    return res.status(200).json(presenter.show(output));
  } catch (e) {
    const status = e && (e as any).status;
    if (typeof status === "number") {
      return res
        .status(status)
        .json({ errors: (e as any).details || (e as any).message });
    }
    return res.status(500).json({ error: e });
  }
};

export default { run };
