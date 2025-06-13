import express from "express";
import { router } from "@infra/server/router";
import db from "@infra/config/database/connection";

db.sync().then(() => {
  console.log("Connected to db");
});

const app = express();

app.use(express.json());
app.use(router);

// TODO: talvez esse ".listen" pode causar conflitos com os testes de integração
// Se for o caso, separar novamente esse arquivo entre app.ts e index.ts
app.listen(3333, () => {
  console.log("Server is running on port 3333");
});

export { app };
