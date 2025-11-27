export interface CreateVehicleDTO {
  id?: string;
  placa: string;
  chassi: string;
  renavam: string | number;
  modelo: string;
  marca: string;
  ano: number;
}

export default CreateVehicleDTO;
