export interface GetVehicleInputDTO {
  id: string;
}

export interface GetVehicleOutputDTO {
  id: string;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}
