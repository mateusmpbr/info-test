export class ValidationError extends Error {
  public status: number;
  public details?: any;

  constructor(message: string, details?: any) {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
    this.details = details;
  }
}

export default ValidationError;

export class InvalidIdError extends ValidationError {
  constructor() {
    super("The id field must be UUID v4");
    this.name = "InvalidIdError";
  }
}

export class InvalidPlacaError extends ValidationError {
  constructor() {
    super("The placa field must be a string with 7 characters");
    this.name = "InvalidPlacaError";
  }
}

export class InvalidChassiError extends ValidationError {
  constructor() {
    super("The chassi field must be a string with 17 characters");
    this.name = "InvalidChassiError";
  }
}

export class InvalidRenavamError extends ValidationError {
  constructor() {
    super(
      "The renavam field must be a numeric string between 9 and 11 characters"
    );
    this.name = "InvalidRenavamError";
  }
}

export class VehicleNotFoundError extends ValidationError {
  constructor() {
    super("Vehicle not found");
    this.name = "VehicleNotFoundError";
  }
}

export class UniqueFieldConflictError extends ValidationError {
  constructor() {
    super(
      "One of the informed placa, chassi or renavam already exists in another vehicle"
    );
    this.name = "UniqueFieldConflictError";
  }
}

export class MissingPayloadError extends ValidationError {
  constructor() {
    super("Missing payload");
    this.name = "MissingPayloadError";
  }
}

export class InvalidModeloError extends ValidationError {
  constructor() {
    super("The modelo field must be a string");
    this.name = "InvalidModeloError";
  }
}

export class InvalidMarcaError extends ValidationError {
  constructor() {
    super("The marca field must be a string");
    this.name = "InvalidMarcaError";
  }
}

export class InvalidAnoError extends ValidationError {
  constructor() {
    super("The ano field must be a number with 4 characters");
    this.name = "InvalidAnoError";
  }
}
