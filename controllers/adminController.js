const { Aluno, Conhecimento, PalavraChave } = require('../models');

// Cadastro de Aluno
const cadastrarAluno = async (req, res) => {
    const { nome, senha } = req.body; 

    try {
        const novoAluno = await Aluno.create({ nome, senha });
        return res.status(201).json({ message: 'Aluno cadastrado com sucesso', aluno: novoAluno });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao cadastrar aluno', error });
    }
};
  
// Listar Alunos
const listarAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.findAll();
        return res.status(200).json(alunos);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar alunos', error });
    }
};
  
// Editar Aluno
const editarAluno = async (req, res) => {
    const { alunoId } = req.params;
    const { nome, senha } = req.body;
  
    try {
      const aluno = await Aluno.findByPk(alunoId);
      if (!aluno) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
      }
  
      aluno.nome = nome || aluno.nome;
      aluno.senha = senha || aluno.senha;
      await aluno.save();
  
      return res.status(200).json({ message: 'Aluno atualizado com sucesso', aluno });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao editar aluno', error });
    }
};
  
// Excluir Aluno
const excluirAluno = async (req, res) => {
    const { alunoId } = req.params;
  
    try {
      const aluno = await Aluno.findByPk(alunoId);
      if (!aluno) {
        return res.status(404).json({ message: 'Aluno não encontrado' });
      }
  
      await aluno.destroy();
      return res.status(200).json({ message: 'Aluno excluído com sucesso' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao excluir aluno', error });
    }
};
  
// Cadastro de Palavra-chave
const cadastrarPalavraChave = async (req, res) => {
    const { nome } = req.body;
  
    try {
      const palavraChaveExistente = await PalavraChave.findOne({ where: { nome } });
      if (palavraChaveExistente) {
        return res.status(400).json({ message: 'Palavra-chave já cadastrada' });
      }
  
      const novaPalavraChave = await PalavraChave.create({ nome });
      return res.status(201).json({ message: 'Palavra-chave cadastrada com sucesso', palavraChave: novaPalavraChave });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao cadastrar palavra-chave', error });
    }
};

// Listar Palavra-chave
const listarPalavrasChave = async (req, res) => {
  try {
    const palavraChave = await PalavraChave.findAll();
    return res.status(200).json(palavraChave);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar palavras-chave', error });
  }
};
  
// Editar Palavra-chave
const editarPalavraChave = async (req, res) => {
    const { palavraChaveId } = req.params;
    const { nome } = req.body;
  
    try {
      const palavraChave = await PalavraChave.findByPk(palavraChaveId);
      if (!palavraChave) {
        return res.status(404).json({ message: 'Palavra-chave não encontrada' });
      }
  
      palavraChave.nome = nome || palavraChave.nome;
      await palavraChave.save();
  
      return res.status(200).json({ message: 'Palavra-chave atualizada com sucesso', palavraChave });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao editar palavra-chave', error });
    }
};
  
// Excluir Palavra-chave
const excluirPalavraChave = async (req, res) => {
    const { palavraChaveId } = req.params;
  
    try {
      const palavraChave = await PalavraChave.findByPk(palavraChaveId);
      if (!palavraChave) {
        return res.status(404).json({ message: 'Palavra-chave não encontrada' });
      }
  
      await palavraChave.destroy();
      return res.status(200).json({ message: 'Palavra-chave excluída com sucesso' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao excluir palavra-chave', error });
    }
};
  
// Cadastro de Conhecimento
const cadastrarConhecimento = async (req, res) => {
    const { nome } = req.body;
  
    try {
      const conhecimentoExistente = await Conhecimento.findOne({ where: { nome } });
      if (conhecimentoExistente) {
        return res.status(400).json({ message: 'Conhecimento já cadastrado' });
      }
  
      const novoConhecimento = await Conhecimento.create({ nome });
      return res.status(201).json({ message: 'Conhecimento cadastrado com sucesso', conhecimento: novoConhecimento });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao cadastrar conhecimento', error });
    }
};
  
// Listar Conhecimentos
const listarConhecimentos = async (req, res) => {
    try {
      const conhecimentos = await Conhecimento.findAll();
      return res.status(200).json(conhecimentos);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar conhecimentos', error });
    }
};
  
// Editar Conhecimento
const editarConhecimento = async (req, res) => {
    const { conhecimentoId } = req.params;
    const { nome } = req.body;
  
    try {
      const conhecimento = await Conhecimento.findByPk(conhecimentoId);
      if (!conhecimento) {
        return res.status(404).json({ message: 'Conhecimento não encontrado' });
      }
  
      conhecimento.nome = nome || conhecimento.nome;
      await conhecimento.save();
  
      return res.status(200).json({ message: 'Conhecimento atualizado com sucesso', conhecimento });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao editar conhecimento', error });
    }
};
  
// Excluir Conhecimento
  const excluirConhecimento = async (req, res) => {
    const { conhecimentoId } = req.params;
  
    try {
      const conhecimento = await Conhecimento.findByPk(conhecimentoId);
      if (!conhecimento) {
        return res.status(404).json({ message: 'Conhecimento não encontrado' });
      }
  
      await conhecimento.destroy();
      return res.status(200).json({ message: 'Conhecimento excluído com sucesso' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao excluir conhecimento', error });
    }
};
  
  module.exports = {
    cadastrarAluno,
    listarAlunos,
    editarAluno,
    excluirAluno,
    cadastrarPalavraChave,
    listarPalavrasChave,
    editarPalavraChave,
    excluirPalavraChave,
    cadastrarConhecimento,
    listarConhecimentos,
    editarConhecimento,
    excluirConhecimento,
};