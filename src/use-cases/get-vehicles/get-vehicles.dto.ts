export interface GetVehiclesInputDTO {}

export interface GetVehiclesOutputDTO {
  vehicles: {
    id: string;
    placa: string;
    chassi: string;
    renavam: string;
    modelo: string;
    marca: string;
    ano: number;
  }[];
}
