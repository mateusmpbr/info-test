import { Request, Response } from "express";
import execute from "@useCases/get-vehicles/get-vehicles.interactor";
import presenter from "./get-vehicles.presenter";

export const run = async (_: Request, res: Response) => {
  try {
    const records = await execute();
    return res.status(200).json(presenter.show(records));
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
