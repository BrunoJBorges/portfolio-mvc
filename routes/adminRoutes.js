const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const verificarAdmin = require('../middleware/adminMiddleware');
const { Aluno, PalavraChave } = require('../models');

const {
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
} = require('../controllers/adminController');

const router = express.Router();

// Alunos
router.post('/alunos', cadastrarAluno);
router.get('/alunos', listarAlunos);
router.put('/alunos/:alunoId', editarAluno);
router.delete('/alunos/:alunoId', excluirAluno);

// Palavras-chave
router.post('/palavras-chave', cadastrarPalavraChave);
router.put('/palavras-chave/:palavraChaveId', editarPalavraChave);
router.delete('/palavras-chave/:palavraChaveId', excluirPalavraChave);

// Conhecimentos
router.post('/conhecimentos', cadastrarConhecimento);
router.get('/conhecimentos', listarConhecimentos);
router.put('/conhecimentos/:conhecimentoId', editarConhecimento);
router.delete('/conhecimentos/:conhecimentoId', excluirConhecimento);

///// ROTAS PARA RENDERIZAÇÃO DAS VIEWS - ALUNOS ///// 

//Renderiza a view para cadastrar o aluno
router.get('/cadastrarAluno', (req, res) => {
  res.render('admin/cadastrarAluno');
});

//Renderiza a view para listar os alunos
router.get('/listarAlunos', (req, res) => {
  res.render('admin/listarAlunos');
});

// Rota para renderizar a view de edição de aluno
router.get('/editarAluno', (req, res) => {
  res.render('admin/editarAluno');
});

// Rota para buscar dados de um aluno específico
router.get('/alunos/:alunoId', async (req, res) => {
  const { alunoId } = req.params;

  console.log(alunoId)

  try {
    const aluno = await Aluno.findByPk(alunoId);
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }
    return res.status(200).json(aluno);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar aluno', error });
  }
});

//Renderiza a tela para excluir o aluno
router.get('/excluirAluno', (req, res) => {
  res.render('admin/excluirAluno');
});

router.get('/alunos', listarAlunos); // Para carregar a lista
router.delete('/admin/alunos/:alunoId', excluirAluno); // Para excluir o aluno

///// ROTAS PARA RENDERIZAÇÃO DAS VIEWS - PALAVRAS-CHAVE ///// 

router.get('/cadastrarPalavraschave', (req, res) => {
  res.render('admin/cadastrarPalavrasChave');
});
router.post('/palavras-chave', cadastrarPalavraChave);

router.get('/listarPalavrasChave', (req, res) => {
  res.render('admin/listarPalavrasChave');
});
router.get('/palavras-chave', listarPalavrasChave);

// Rota para exibir a página de edição de palavra-chave
router.get('/editarPalavraChave', (req, res) => {
  res.render('admin/editarPalavraChave'); // Isso renderiza o arquivo de view 'editarPalavraChave.ejs'
});

router.get('/excluirPalavraChave', (req, res) => {
  res.render('admin/excluirPalavraChave');
});

router.get('/cadastrarConhecimentos', (req, res) => {
  res.render('admin/cadastrarConhecimentos');
});

router.get('/listarConhecimentos', (req, res) => {
  res.render('admin/listarConhecimentos');
});

router.get('/editarConhecimentos', (req, res) => {
  res.render('admin/editarConhecimentos');
});

router.get('/excluirConhecimentos', (req, res) => {
  res.render('admin/excluirConhecimentos');
});


module.exports = router;