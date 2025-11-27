import { Request, Response } from "express";
import execute from "@useCases/get-vehicle/get-vehicle.interactor";
import presenter from "./get-vehicle.presenter";
import { GetVehicleDTO } from "@useCases/get-vehicle/get-vehicle.dto";

export const run = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id;
    const dto: GetVehicleDTO = { id };
    const record = await execute(dto.id);
    if (!record)
      return res.status(400).json({ error: "Can not find existing vehicle" });
    return res.status(200).json(presenter.show(record));
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
