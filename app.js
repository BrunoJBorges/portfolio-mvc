const express = require('express');
const sequelize = require('./config/database');
const alunoRoutes = require('./routes/alunoRoutes');
const projetoRoutes = require('./routes/projetoRoutes');
const conhecimentoRoutes = require('./routes/conhecimentoRoutes');

const app = express();

app.use(express.json());

app.use('/alunos', alunoRoutes); // Rotas de aluno
app.use('/projetos', projetoRoutes); // Rotas de projeto
app.use('/conhecimentos', conhecimentoRoutes);// Rotas de conhecimento

// Sincroniza os modelos com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar tabelas:', err);
  });

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});