const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Conhecimento = sequelize.define('Conhecimento', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Conhecimento;