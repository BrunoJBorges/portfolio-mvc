const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Aluno = require('./Aluno');
const Conhecimento = require('./Conhecimento');

const AlunoConhecimento = sequelize.define('AlunoConhecimento', {
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 10,
    },
  },
});

module.exports = AlunoConhecimento;