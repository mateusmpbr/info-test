import { Sequelize } from "sequelize";

// TODO: talvez refatorar esse arquivo

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

export default sequelize;
