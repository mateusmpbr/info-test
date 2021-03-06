import { DataTypes, Model } from 'sequelize';
import db from '../database/Sequelize';

export class Vehicle extends Model { }

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
