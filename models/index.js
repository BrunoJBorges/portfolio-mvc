const Aluno = require('./Aluno');
const Projeto = require('./Projeto');
const PalavraChave = require('./PalavraChave');
const Conhecimento = require('./Conhecimento');

// Relacionamento N:N entre Projeto e PalavraChave
Projeto.belongsToMany(PalavraChave, { through: 'ProjetoPalavraChave' });
PalavraChave.belongsToMany(Projeto, { through: 'ProjetoPalavraChave' });

// Relacionamento N:N entre Aluno e Projeto (alunos desenvolvedores)
Aluno.belongsToMany(Projeto, { through: 'AlunoProjeto' });
Projeto.belongsToMany(Aluno, { through: 'AlunoProjeto' });

// Relacionamento N:N entre Aluno e Conhecimento
Aluno.belongsToMany(Conhecimento, { through: 'AlunoConhecimento' });
Conhecimento.belongsToMany(Aluno, { through: 'AlunoConhecimento' });

module.exports = { Aluno, Projeto, PalavraChave, Conhecimento };