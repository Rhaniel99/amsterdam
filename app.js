require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", require("./src/routes/user.routes"));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
// (async () => {
//   const database = require("./src/configs/db.config");
//   const Student = require("./src/models/quote_model.js");
//   await database.sync();
// })();