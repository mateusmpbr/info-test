import express from "express";
import { router } from "@infra/server/router";
import errorHandler from "@infra/server/error.handler";
import db from "@infra/config/database/connection";
// Ensure models are imported and registered with Sequelize before syncing
import "@models/vehicle.model";

db.sync().then(() => {
  console.log("Connected to db");
});

const app = express();

app.use(express.json());
app.use(router);

// Centralized error handler (must be registered after routes)
app.use(errorHandler);

// Mantemos o servidor iniciável apenas quando executado diretamente.
// Isso evita que `require`/`import` durante testes dispare um listen duplo.
if (require.main === module) {
  app.listen(3333, () => {
    console.log("Server is running on port 3333");
  });
}

export { app };
