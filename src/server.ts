import { app } from "./app";
import db from "./infra/database/Sequelize";

db.sync().then(() => {
  console.log("Connected to db");
});

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
