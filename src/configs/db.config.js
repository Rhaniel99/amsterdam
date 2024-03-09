const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: 'db',
  port: 5432,
});

sequelize.sync() // Sincroniza todos os modelos com o banco de dados
  .then(() => {
    console.log('Todos os modelos foram sincronizados com o banco de dados.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar os modelos com o banco de dados:', error);
  });

module.exports = sequelize;
