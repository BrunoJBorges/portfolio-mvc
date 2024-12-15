// controllers/conhecimentoController.js
const { Aluno, Conhecimento } = require('../models');

const cadastrarConhecimento = async (req, res) => {
  try {
    const { alunoId, conhecimentos } = req.body; // Conhecimentos será um array de objetos { nome, nivel }

    // Verificar se o aluno existe
    const aluno = await Aluno.findByPk(alunoId);
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    // Associar os conhecimentos ao aluno com o nível
    const conhecimentosEncontrados = await Conhecimento.findAll({
      where: {
        nome: conhecimentos.map(c => c.nome), // Busca os conhecimentos pelo nome
      },
    });

    // Verifica se todos os conhecimentos estão cadastrados
    const conhecimentosNaoEncontrados = conhecimentos.filter(c =>
      !conhecimentosEncontrados.some(k => k.nome === c.nome)
    );

    if (conhecimentosNaoEncontrados.length > 0) {
      return res.status(404).json({ message: 'Alguns conhecimentos não estão cadastrados', conhecimentosNaoEncontrados });
    }

    // Associa o aluno aos conhecimentos
    for (const conhecimento of conhecimentos) {
      const conhecimentoAssociado = conhecimentosEncontrados.find(c => c.nome === conhecimento.nome);
      await aluno.addConhecimento(conhecimentoAssociado, { through: { nivel: conhecimento.nivel } });
    }

    return res.status(200).json({ message: 'Conhecimentos cadastrados com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor', error });
  }
};

const editarConhecimento = async (req, res) => {
  try {
    const { alunoId, conhecimentos } = req.body; // conhecimentos será um array de objetos { nome, nivel }

    // Verifica se o aluno existe
    const aluno = await Aluno.findByPk(alunoId);
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    // Atualiza os conhecimentos do aluno
    for (const conhecimento of conhecimentos) {
      const conhecimentoExistente = await Conhecimento.findOne({
        where: {
          nome: conhecimento.nome,
        },
      });

      if (conhecimentoExistente) {
        await aluno.addConhecimento(conhecimentoExistente, { through: { nivel: conhecimento.nivel } });
      }
    }

    return res.status(200).json({ message: 'Conhecimentos atualizados com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor', error });
  }
};

const excluirConhecimento = async (req, res) => {
  try {
    const { alunoId, conhecimentoId } = req.body;

    // Verifica se o aluno existe
    const aluno = await Aluno.findByPk(alunoId);
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    // Exclui o conhecimento do aluno
    const conhecimento = await Conhecimento.findByPk(conhecimentoId);
    if (!conhecimento) {
      return res.status(404).json({ message: 'Conhecimento não encontrado' });
    }

    await aluno.removeConhecimento(conhecimento);

    return res.status(200).json({ message: 'Conhecimento excluído com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor', error });
  }
};

module.exports = { 
  cadastrarConhecimento, 
  editarConhecimento,
  excluirConhecimento
};