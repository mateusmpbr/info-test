import { app } from "./app";
import db from "./database/Sequelize";

db.sync().then(() => {
	console.log("Connected to db");
});

app.listen(3333)







