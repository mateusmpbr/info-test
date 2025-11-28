export class HttpError extends Error {
  public status: number;
  public details?: any;

  constructor(message: string, status: number, details?: any) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.details = details;
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Bad Request", details?: any) {
    super(message, 400, details);
    this.name = "BadRequestError";
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not Found", details?: any) {
    super(message, 404, details);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends HttpError {
  constructor(message = "Conflict", details?: any) {
    super(message, 409, details);
    this.name = "ConflictError";
  }
}

export class InvalidIdError extends BadRequestError {
  constructor() {
    super("The id field must be UUID v4");
    this.name = "InvalidIdError";
  }
}

export class InvalidPlacaError extends BadRequestError {
  constructor() {
    super("The placa field must be a string with 7 characters");
    this.name = "InvalidPlacaError";
  }
}

export class InvalidChassiError extends BadRequestError {
  constructor() {
    super("The chassi field must be a string with 17 characters");
    this.name = "InvalidChassiError";
  }
}

export class InvalidRenavamError extends BadRequestError {
  constructor() {
    super(
      "The renavam field must be a numeric string between 9 and 11 characters"
    );
    this.name = "InvalidRenavamError";
  }
}

export class VehicleNotFoundError extends NotFoundError {
  constructor() {
    super("Vehicle not found");
    this.name = "VehicleNotFoundError";
  }
}

export class UniqueFieldConflictError extends ConflictError {
  constructor() {
    super(
      "One of the informed placa, chassi or renavam already exists in another vehicle"
    );
    this.name = "UniqueFieldConflictError";
  }
}

export class MissingPayloadError extends BadRequestError {
  constructor() {
    super("Missing payload");
    this.name = "MissingPayloadError";
  }
}

export class InvalidModeloError extends BadRequestError {
  constructor() {
    super("The modelo field must be a string");
    this.name = "InvalidModeloError";
  }
}

export class InvalidMarcaError extends BadRequestError {
  constructor() {
    super("The marca field must be a string");
    this.name = "InvalidMarcaError";
  }
}

export class InvalidAnoError extends BadRequestError {
  constructor() {
    super("The ano field must be a number with 4 characters");
    this.name = "InvalidAnoError";
  }
}
