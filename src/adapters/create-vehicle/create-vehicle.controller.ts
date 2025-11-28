import { Request, Response } from "express";
// require use-case at runtime so tests can mock it via require.cache
import { SequelizeVehicleRepository } from "@infra/repositories/sequelize-vehicle.repository";
import presenter from "./create-vehicle.presenter";
import { CreateVehicleInputDTO } from "@useCases/create-vehicle/create-vehicle.dto";

export const run = async (req: Request, res: Response) => {
  // load use-case here to allow unit tests to stub it via require.cache
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const _mod = require("@useCases/create-vehicle/create-vehicle.interactor");
  const execute: any = typeof _mod === "function" ? _mod : _mod.default || _mod;

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
