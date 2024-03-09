const database = require("../configs/db.config");
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
    type: Sequelize.STRING,
    allowNull:false,
  },
  date_release: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  artist_rep: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Quote;