import { Request, Response } from "express";
import execute from "@useCases/update-vehicle/update-vehicle.interactor";
import { SequelizeVehicleRepository } from "@infra/repositories/sequelize-vehicle.repository";
import presenter from "./update-vehicle.presenter";
import { UpdateVehicleInputDTO } from "@useCases/update-vehicle/update-vehicle.dto";

export const run = async (req: Request, res: Response) => {
  const input: UpdateVehicleInputDTO = {
    id: req.params?.id,
    placa: req.body?.placa,
    chassi: req.body?.chassi,
    renavam: req.body?.renavam,
    modelo: req.body?.modelo,
    marca: req.body?.marca,
    ano: req.body?.ano,
  };

  await execute(input, SequelizeVehicleRepository);
  return res.status(200).json(presenter.show(undefined));
};

export default { run };
