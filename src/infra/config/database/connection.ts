import { Sequelize } from "sequelize";

const connection = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

export default connection;
