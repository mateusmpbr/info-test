export interface CreateVehicleInputDTO {
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}

export interface CreateVehicleOutputDTO {
  id: string;
}
