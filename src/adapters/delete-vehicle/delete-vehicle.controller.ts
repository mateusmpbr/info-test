import { Request, Response } from "express";
import execute from "@useCases/delete-vehicle/delete-vehicle.interactor";
import presenter from "./delete-vehicle.presenter";
import { DeleteVehicleDTO } from "@useCases/delete-vehicle/delete-vehicle.dto";

export const run = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id;
    const dto: DeleteVehicleDTO = { id };
    const deleted = await execute(dto.id);
    if (!deleted)
      return res.status(400).json({ error: "Can not find existing vehicle" });
    return res.status(200).json(presenter.show(deleted));
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
