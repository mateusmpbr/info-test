import { Request, Response } from "express";
// require use-case at runtime so tests can mock it via require.cache
import { SequelizeVehicleRepository } from "@infra/repositories/sequelize-vehicle.repository";
import presenter from "./delete-vehicle.presenter";
import { DeleteVehicleInputDTO } from "@useCases/delete-vehicle/delete-vehicle.dto";

export const run = async (req: Request, res: Response) => {
  // load use-case here to allow unit tests to stub it via require.cache
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const _mod = require("@useCases/delete-vehicle/delete-vehicle.interactor");
  const execute: any = typeof _mod === "function" ? _mod : _mod.default || _mod;

  const input: DeleteVehicleInputDTO = {
    id: req.params?.id,
  };
  await execute(input, SequelizeVehicleRepository);
  return res.status(200).json(presenter.show(undefined));
};

export default { run };
