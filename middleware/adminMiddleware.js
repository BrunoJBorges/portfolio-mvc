const { Aluno } = require('../models');

const verificarAdmin = async (req, res, next) => {
  try {
    const alunoId = req.usuarioId; // ID do usuário autenticado
    const aluno = await Aluno.findByPk(alunoId);
   
    if (!aluno || alunoId !== 1) { //Usuário 1 é o ADMIN por default
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem realizar essa operação.' });
    }

    next(); // Prossegue para a próxima etapa, já que o usuário é admin
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor', error });
  }
};

module.exports = verificarAdmin;