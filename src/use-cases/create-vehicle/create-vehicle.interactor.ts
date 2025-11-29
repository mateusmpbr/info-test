import { randomUUID } from "crypto";
import {
  MissingPayloadError,
  InvalidPlacaError,
  InvalidChassiError,
  InvalidRenavamError,
  InvalidModeloError,
  InvalidMarcaError,
  InvalidAnoError,
  UniqueFieldConflictError,
} from "../../shared/errors";
import {
  CreateVehicleInputDTO,
  CreateVehicleOutputDTO,
} from "./create-vehicle.dto";
import { VehicleRepository } from "@useCases/ports/vehicle.repository.dto";
import {
  isPlaca,
  isChassi,
  isRenavam,
  isString,
  isYear,
  isPayloadEmpty,
} from "../../shared/utils";
import { Vehicle } from "@entities/Vehicle.entity";

export async function execute(
  input: CreateVehicleInputDTO,
  repo: VehicleRepository
): Promise<CreateVehicleOutputDTO> {
  validateInput(input);

  const conflict = await repo.findByUnique({
    placa: input.placa,
    chassi: input.chassi,
    renavam: input.renavam,
  });

  if (conflict) {
    throw new UniqueFieldConflictError();
  }

  const id = randomUUID();
  await repo.create(
    Vehicle.build({
      id,
      placa: input.placa,
      chassi: input.chassi,
      renavam: input.renavam,
      modelo: input.modelo,
      marca: input.marca,
      ano: input.ano,
    })
  );
  return { id };
}

function validateInput(input: CreateVehicleInputDTO): void {
  if (isPayloadEmpty(input)) {
    throw new MissingPayloadError();
  }

  if (!isPlaca(input.placa)) {
    throw new InvalidPlacaError();
  }

  if (!isChassi(input.chassi)) {
    throw new InvalidChassiError();
  }

  if (!isRenavam(input.renavam)) {
    throw new InvalidRenavamError();
  }

  if (!isString(input.modelo)) {
    throw new InvalidModeloError();
  }

  if (!isString(input.marca)) {
    throw new InvalidMarcaError();
  }

  if (!isYear(input.ano)) {
    throw new InvalidAnoError();
  }
}

export default execute;
