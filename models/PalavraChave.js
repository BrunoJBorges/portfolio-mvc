const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PalavraChave = sequelize.define('PalavraChave', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = PalavraChave;