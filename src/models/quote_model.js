const database = require("../config/db.config");
const Sequelize = require("sequelize");

const Quote = database.define("quotes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  artist_work: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quote:{
    type: Sequelize.DATEONLY,
    allowNull:false,
  },
  date_release: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  artist_rep: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// Sincronizar o modelo com o banco de dados
// Client.sync()
//   .then(() => {
//     console.log('Tabela "Client" criada com sucesso.');
//   })
//   .catch((error) => {
//     console.error('Erro ao criar tabela "Client":', error);
//   });

module.exports = Quote;