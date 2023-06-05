const Sequelize = require("sequelize");
const sequelize = new Sequelize('amsterdam', 'postgres', '123', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
});

module.exports = sequelize;