require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", require("./src/routes/user.routes"));
app.set('view engine', 'ejs');
const database = require("./src/configs/db.config"); // Importar o arquivo db.config
const Student = require("./src/models/quote_model.js");


app.listen(PORT, async () => {
  console.log(`Rodando na porta ${PORT}`);
  await database.sync(); // Sincronizar o banco de dados com os modelos
});
