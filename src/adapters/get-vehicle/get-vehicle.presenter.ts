import { GetVehicleOutputDTO } from "@useCases/get-vehicle/get-vehicle.dto";

export function show(output: GetVehicleOutputDTO) {
  return {
    id: output.id,
    placa: output.placa,
    chassi: output.chassi,
    renavam: output.renavam,
    modelo: output.modelo,
    marca: output.marca,
    ano: output.ano,
  };
}

export default { show };
