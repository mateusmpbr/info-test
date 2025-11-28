import { Request, Response } from "express";
import execute from "@useCases/create-vehicle/create-vehicle.interactor";
import { SequelizeVehicleRepository } from "@infra/repositories/sequelize-vehicle.repository";
import presenter from "./create-vehicle.presenter";
import { CreateVehicleInputDTO } from "@useCases/create-vehicle/create-vehicle.dto";

export const run = async (req: Request, res: Response) => {
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
};

export default { run };
