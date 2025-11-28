import { Router } from "express";

const vehicle = Router();

import { toKebabCase } from "../../../shared/utils";

export function executeRule(ruleName: string): any {
  const folder = toKebabCase(ruleName);
  const modulePath = `../../../adapters/${folder}/${folder}.controller`;

  return (req: any, res: any, next: any) => {
    try {
      const { run } = require(modulePath) || {};
      if (typeof run !== "function") {
        throw new Error(
          `Controller for '${ruleName}' must export a 'run' function`
        );
      }
      // Support sync and async controllers uniformly
      Promise.resolve(run(req, res, next)).catch(next);
    } catch (err) {
      next(err);
    }
  };
}

vehicle.get("/", executeRule("getVehicles"));

vehicle.get("/:id", executeRule("getVehicle"));

vehicle.post("/", executeRule("createVehicle"));

vehicle.patch("/:id", executeRule("updateVehicle"));

vehicle.delete("/:id", executeRule("deleteVehicle"));

export { vehicle };
