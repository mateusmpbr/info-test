import {
  BadRequestError,
  NotFoundError,
  ConflictError,
} from "../../shared/errors";

export function show(err: any) {
  // Return a consistent structure for presenters to map errors to HTTP responses
  // Prefer `details` when available, otherwise a message. Keep name/code for clients.
  const payload: any = {};

  payload.name = err?.name || "Error";
  payload.message = err?.message || String(err);
  if (err?.details) payload.details = err.details;

  // Provide a small machine-friendly code for some known error types
  if (err instanceof BadRequestError) payload.code = "validation_error";
  else if (err instanceof NotFoundError) payload.code = "not_found";
  else if (err instanceof ConflictError) payload.code = "conflict";
  else payload.code = "error";

  // Presenters should return an object consumable by the HTTP layer
  return { errors: payload };
}

export default { show };
