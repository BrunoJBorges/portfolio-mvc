const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Projeto = sequelize.define('Projeto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resumo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  linkExterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Projeto;