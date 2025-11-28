import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err && typeof err.status === "number" ? err.status : 500;
  const payload =
    err && (err.details || err.message) ? err.details || err.message : err;
  if (typeof status === "number") {
    return res.status(status).json({ errors: payload });
  }
  return res.status(500).json({ error: err });
}

export default errorHandler;
