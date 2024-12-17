const Aluno = require('./Aluno');
const Projeto = require('./Projeto');
const PalavraChave = require('./PalavraChave');
const Conhecimento = require('./Conhecimento');

// Relacionamento N:N entre Projeto e PalavraChave
Projeto.belongsToMany(PalavraChave, { through: 'ProjetoPalavraChave', as: 'PalavraChaves', foreignKey: 'ProjetoId'});
PalavraChave.belongsToMany(Projeto, { through: 'ProjetoPalavraChave', as: 'Projetos', foreignKey: 'PalavraChaveId'});

// Relacionamento N:N entre Aluno e Projeto (alunos desenvolvedores)
Aluno.belongsToMany(Projeto, { through: 'AlunoProjeto', as: 'Projetos', foreignKey: 'AlunoId' });
Projeto.belongsToMany(Aluno, { through: 'AlunoProjeto', as: 'Alunos', foreignKey: 'ProjetoId' });

// Relacionamento N:N entre Aluno e Conhecimento
Aluno.belongsToMany(Conhecimento, { through: 'AlunoConhecimento', as: 'Conhecimentos', foreignKey: 'AlunoId'});
Conhecimento.belongsToMany(Aluno, { through: 'AlunoConhecimento' , as: 'Alunos', foreignKey: 'ConhecimentoId'});

module.exports = { Aluno, Projeto, PalavraChave, Conhecimento };