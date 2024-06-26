import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// TODO: talvez refatorar esse arquivo
class Middleware {
  handleValidationError(req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }
    next();
  }
}
export default new Middleware();
