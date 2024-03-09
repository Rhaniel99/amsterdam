const Sequelize = require("sequelize");

// Configuração para o SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/amsterdam.sqlite', // Caminho onde o arquivo do banco de dados SQLite será armazenado
});

// Exporta o objeto sequelize configurado
module.exports = sequelize;
