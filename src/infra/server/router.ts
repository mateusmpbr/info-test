import { Router } from "express";
import { vehicle } from "@routes/vehicle.route";

const router = Router();

router.use("/vehicles", vehicle);

export { router };
