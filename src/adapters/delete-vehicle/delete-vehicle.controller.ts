import { Request, Response } from "express";
import execute from "@useCases/delete-vehicle/delete-vehicle.interactor";
import { SequelizeVehicleRepository } from "@infra/repositories/sequelize-vehicle.repository";
import presenter from "./delete-vehicle.presenter";
import { DeleteVehicleInputDTO } from "@useCases/delete-vehicle/delete-vehicle.dto";

export const run = async (req: Request, res: Response) => {
  try {
    const input: DeleteVehicleInputDTO = {
      id: req.params?.id,
    };
    await execute(input, SequelizeVehicleRepository);
    return res.status(200).json(presenter.show(undefined));
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
