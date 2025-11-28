import { Request, Response, NextFunction } from "express";
import presenter from "@adapters/presenters/error.presenter";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err && typeof err.status === "number" ? err.status : 500;
  try {
    const payload = presenter.show(err);
    return res.status(status).json(payload);
  } catch (presenterErr) {
    // Fallback if presenter fails for some reason
    const fallback =
      err && (err.details || err.message) ? err.details || err.message : err;
    return res.status(status).json({ errors: fallback });
  }
}

export default errorHandler;
