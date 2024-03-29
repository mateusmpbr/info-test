import { Router } from "express";
import * as VehicleController from "./controllers/VehicleController";
import VehicleValidator from "./infra/validators/VehicleValidator";
import VehicleMiddleware from "./infra/middlewares/VehicleMiddleware";

const router = Router();

router.get("/vehicles", VehicleController.read);

router.get(
  "/vehicles/:id",
  VehicleValidator.checkIdParam(),
  VehicleMiddleware.handleValidationError,
  VehicleController.readById
);

router.post(
  "/vehicles",
  VehicleValidator.checkCreateVehicle(),
  VehicleMiddleware.handleValidationError,
  VehicleController.create
);

router.put(
  "/vehicles/:id",
  VehicleValidator.checkUpdateVehicle(),
  VehicleMiddleware.handleValidationError,
  VehicleController.update
);

router.delete(
  "/vehicles/:id",
  VehicleValidator.checkIdParam(),
  VehicleMiddleware.handleValidationError,
  VehicleController.destroy
);

export { router };
