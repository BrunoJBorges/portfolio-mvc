const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Aluno } = require('../models');
require('dotenv').config();

// Função para login do aluno
const login = async (req, res) => {
  const { nome, senha } = req.body;

  try {
    // Verifica se o aluno existe no banco de dados
    const aluno = await Aluno.findOne({ where: { nome } });

    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    // Compara a senha informada com a armazenada no banco 
    const senhaValida = senha === aluno.senha;

    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    // Gera um token JWT para o aluno
    const token = jwt.sign({ id: aluno.id, nome: aluno.nome }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = {
  login,
};