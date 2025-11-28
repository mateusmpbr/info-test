import { Request, Response } from "express";
import execute from "@useCases/get-vehicles/get-vehicles.interactor";
import { SequelizeVehicleRepository } from "@infra/repositories/sequelize-vehicle.repository";
import presenter from "./get-vehicles.presenter";
import { GetVehiclesInputDTO } from "@useCases/get-vehicles/get-vehicles.dto";

export const run = async (_: Request, res: Response) => {
  try {
    const input: GetVehiclesInputDTO = {};
    const output = await execute(input, SequelizeVehicleRepository);
    return res.status(200).json(presenter.show(output));
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
