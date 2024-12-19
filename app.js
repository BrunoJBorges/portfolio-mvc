const express = require('express');
const sequelize = require('./config/database');
const { Aluno } = require('./models'); 
const alunoRoutes = require('./routes/alunoRoutes');
const projetoRoutes = require('./routes/projetoRoutes');
const conhecimentoRoutes = require('./routes/conhecimentoRoutes');
const adminRoutes = require('./routes/adminRoutes')

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', alunoRoutes); // Rotas de aluno
app.use('/projetos', projetoRoutes); // Rotas de projeto
app.use('/conhecimentos', conhecimentoRoutes); // Rotas de conhecimento
app.use('/admin', adminRoutes); // Rotas de administrador

// Função para criar o usuário administrador se não existir
const criarAdmin = async () => {
  try {
    // Verifica se o usuário administrador já existe
    const adminExistente = await Aluno.findByPk(1); // ID fixo do admin

    // Se o usuário administrador não existir, cria um com tipo 'admin'
    if (!adminExistente) {

      await Aluno.create({
        id: 1, // ID fixo
        nome: 'Admin',
        senha: '123',
      });

      console.log('Usuário administrador criado com sucesso!');
    } else {
      console.log('Usuário administrador já existe.');
    }
  } catch (error) {
    console.error('Erro ao criar o administrador:', error);
  }
};

// Sincroniza os modelos com o banco de dados e cria o usuário administrador se necessário
sequelize.sync()
  .then(async () => {
    console.log('Tabelas sincronizadas com sucesso.');

    // Chama a função para criar o administrador
    await criarAdmin();
  })
  .catch((err) => {
    console.error('Erro ao sincronizar tabelas:', err);
  });

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});