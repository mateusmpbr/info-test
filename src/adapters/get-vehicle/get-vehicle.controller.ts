import { Request, Response } from "express";
import execute from "@useCases/get-vehicle/get-vehicle.interactor";
import { SequelizeVehicleRepository } from "@infra/repositories/sequelize-vehicle.repository";
import presenter from "./get-vehicle.presenter";
import {
  GetVehicleInputDTO,
  GetVehicleOutputDTO,
} from "@useCases/get-vehicle/get-vehicle.dto";

export const run = async (req: Request, res: Response) => {
  const input: GetVehicleInputDTO = { id: req.params?.id };
  const output: GetVehicleOutputDTO = await execute(
    input,
    SequelizeVehicleRepository
  );
  return res.status(200).json(presenter.show(output));
};

export default { run };
