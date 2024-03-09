'use strict'
require("dotenv").config();
require("./src/configs/discord.config");
const express = require("express");
const app = express();
const { PORT = '3000' } = process.env

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", require("./src/routes/user.routes"));
app.set('view engine', 'ejs');
const database = require("./src/configs/db.config"); // Importar o arquivo db.config
const discord = require("./src/configs/discord.config"); // Importar o arquivo db.config


app.listen(PORT, async () => {
  console.log(`Rodando na porta ${PORT}`);
  await database.sync(); // Sincronizar o banco de dados com os modelos
  // await discord.sync(); // Sincronizar o banco de dados com os modelos
});
