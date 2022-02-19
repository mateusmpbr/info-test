import { DataTypes, Model } from 'sequelize';
import db from '../database/Sequelize';

interface VehicleAttributes {
    id:string;
    placa:string;
    chassi:string;
    renavam:number;
    modelo:string;
    marca:string;
    ano:number;
}

export class Vehicle extends Model<VehicleAttributes> {}

Vehicle.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		placa: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        chassi: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        renavam: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
		sequelize: db,
		tableName: 'vehicles',
	}
);
