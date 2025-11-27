import express from "express";
import { router } from "@infra/server/router";
import db from "@infra/config/database/connection";

db.sync().then(() => {
  console.log("Connected to db");
});

const app = express();

app.use(express.json());
app.use(router);

// Mantemos o servidor iniciável apenas quando executado diretamente.
// Isso evita que `require`/`import` durante testes dispare um listen duplo.
if (require.main === module) {
  app.listen(3333, () => {
    console.log("Server is running on port 3333");
  });
}

export { app };
