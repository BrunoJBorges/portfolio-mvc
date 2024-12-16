const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const verificarAdmin = require('../middleware/adminMiddleware');

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
router.post('/alunos', authMiddleware, verificarAdmin, cadastrarAluno);
router.get('/alunos', authMiddleware, verificarAdmin, listarAlunos);
router.put('/alunos/:alunoId', authMiddleware, verificarAdmin, editarAluno);
router.delete('/alunos/:alunoId', authMiddleware, verificarAdmin, excluirAluno);

// Palavras-chave
router.post('/palavras-chave', authMiddleware, verificarAdmin, cadastrarPalavraChave);
router.get('/palavras-chave', authMiddleware, verificarAdmin, listarPalavrasChave);
router.put('/palavras-chave/:palavraChaveId', authMiddleware, verificarAdmin, editarPalavraChave);
router.delete('/palavras-chave/:palavraChaveId', authMiddleware, verificarAdmin, excluirPalavraChave);

// Conhecimentos
router.post('/conhecimentos', authMiddleware, verificarAdmin, cadastrarConhecimento);
router.get('/conhecimentos', authMiddleware, verificarAdmin, listarConhecimentos);
router.put('/conhecimentos/:conhecimentoId', authMiddleware, verificarAdmin, editarConhecimento);
router.delete('/conhecimentos/:conhecimentoId', authMiddleware, verificarAdmin, excluirConhecimento);

module.exports = router;