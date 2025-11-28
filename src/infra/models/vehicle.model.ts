import { DataTypes, Model } from "sequelize";
import dbConnection from "@infra/config/database/connection";

export class VehicleModel extends Model {
  id: string;
  placa: string;
  chassi: string;
  renavam: number;
  modelo: string;
  marca: string;
  ano: number;
}

VehicleModel.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    chassi: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    renavam: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: dbConnection,
    tableName: "vehicles",
  }
);
