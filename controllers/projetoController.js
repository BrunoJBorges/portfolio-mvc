const { Projeto, PalavraChave, Aluno } = require('../models');

// Cadastrar um novo projeto
const cadastrarProjeto = async (req, res) => {
  const { nome, resumo, linkExterno, palavrasChave } = req.body;
  const alunoId = req.user.id; // Pega o ID do aluno autenticado

  try {
    // Cria o projeto
    const projeto = await Projeto.create({ nome, resumo, linkExterno });

    // Adiciona o aluno como desenvolvedor do projeto
    await projeto.addAluno(alunoId);

    // Adiciona palavras-chave ao projeto (se houver)
    if (palavrasChave && palavrasChave.length > 0) {
      const palavras = await PalavraChave.findAll({ where: { id: palavrasChave } });
      await projeto.addPalavraChaves(palavras);
    }

    return res.status(201).json({ message: 'Projeto cadastrado com sucesso', projeto });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao cadastrar projeto' });
  }
};

// Editar um projeto existente
const editarProjeto = async (req, res) => {
  const { id } = req.params;
  const { nome, resumo, linkExterno, palavrasChave } = req.body;

  try {
    const projeto = await Projeto.findByPk(id);

    if (!projeto) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    // Atualiza os dados do projeto
    await projeto.update({ nome, resumo, linkExterno });

    // Atualiza as palavras-chave associadas ao projeto
    if (palavrasChave) {
      const palavras = await PalavraChave.findAll({ where: { id: palavrasChave } });
      await projeto.setPalavraChaves(palavras);
    }

    return res.json({ message: 'Projeto atualizado com sucesso', projeto });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao editar projeto' });
  }
};

// Excluir um projeto
const excluirProjeto = async (req, res) => {
  const { id } = req.params;

  try {
    const projeto = await Projeto.findByPk(id);

    if (!projeto) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    await projeto.destroy();

    return res.json({ message: 'Projeto excluído com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao excluir projeto' });
  }
};

// Adiciona um desenvolvedor no projeto
const adicionarDesenvolvedor = async (req, res) => {
  try {
    const { projetoId, alunoId } = req.body;

    // Verifica se o projeto existe
    const projeto = await Projeto.findByPk(projetoId);
    if (!projeto) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }

    // Verifica se o aluno existe
    const aluno = await Aluno.findByPk(alunoId);
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    // Adiciona o aluno ao projeto
    await projeto.addAluno(aluno);

    return res.status(200).json({ message: 'Aluno adicionado ao projeto com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor', error });
  }
};

// Função para listar todos os projetos
const listarProjetos = async (req, res) => {
  try {
    const projetos = await Projeto.findAll({
      include: [
        { model: Aluno, as: 'Alunos', attributes: ['nome'] },              
        { model: PalavraChave, as: 'PalavraChaves', attributes: ['nome'] } 
      ],
    });

    res.render('projetos/listarProjetos', { projetos, isFilteredByKeyword: false });
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    res.status(500).json({ message: 'Erro ao buscar projetos' });
  }
};

const listarProjetosPorPalavraChave = async (req, res) => {
  const { nome } = req.params;

  try {
    const projetos = await Projeto.findAll({
      include: [
        {
          model: PalavraChave,
          as: 'PalavraChaves',
          where: { nome },
          attributes: ['nome']
        },
        { model: Aluno, as: 'Alunos', attributes: ['nome'] },
      ],
    });

    if (projetos.length === 0) {
      return res.status(404).json({ message: 'Nenhum projeto encontrado para esta palavra-chave' });
    }

    res.render('projetos/listarProjetos', { projetos, isFilteredByKeyword: true, keyword: nome });
  } catch (error) {
    console.error('Erro ao buscar projetos por palavra-chave:', error);
    res.status(500).json({ message: 'Erro ao buscar projetos por palavra-chave' });
  }
};

module.exports = {
  cadastrarProjeto,
  editarProjeto,
  excluirProjeto,
  adicionarDesenvolvedor,
  listarProjetos,
  listarProjetosPorPalavraChave
};
