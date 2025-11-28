import { Request, Response } from "express";
// require use-case at runtime so tests can mock it via require.cache
import { SequelizeVehicleRepository } from "@infra/repositories/sequelize-vehicle.repository";
import presenter from "./get-vehicles.presenter";
import { GetVehiclesInputDTO } from "@useCases/get-vehicles/get-vehicles.dto";

export const run = async (_: Request, res: Response) => {
  // load use-case here to allow unit tests to stub it via require.cache
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const _mod = require("@useCases/get-vehicles/get-vehicles.interactor");
  const execute: any = typeof _mod === "function" ? _mod : _mod.default || _mod;

  const input: GetVehiclesInputDTO = {};
  const output = await execute(input, SequelizeVehicleRepository);
  return res.status(200).json(presenter.show(output));
};

export default { run };
