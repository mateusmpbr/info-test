export interface VehicleProps {
  id: string;
  placa: string;
  chassi: string;
  renavam: number;
  modelo: string;
  marca: string;
  ano: number;
}

export class Vehicle {
  private props: VehicleProps;

  private constructor(props: VehicleProps) {
    this.props = props;
  }

  public static build(props: VehicleProps): Vehicle {
    return new Vehicle(props);
  }

  public getProps(): VehicleProps {
    return this.props;
  }

  public get id(): string {
    return this.props.id;
  }

  public get placa(): string {
    return this.props.placa;
  }

  public get chassi(): string {
    return this.props.chassi;
  }

  public get renavam(): number {
    return this.props.renavam;
  }

  public get modelo(): string {
    return this.props.modelo;
  }

  public get marca(): string {
    return this.props.marca;
  }

  public get ano(): number {
    return this.props.ano;
  }
}
