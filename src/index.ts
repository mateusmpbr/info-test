import express from "express";
import { router } from "./infra/server/routes";
import db from "./infra/database/Sequelize";

db.sync().then(() => {
  console.log("Connected to db");
});

const app = express();

app.use(express.json());
app.use(router);

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
