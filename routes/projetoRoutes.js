const express = require('express');
const { cadastrarProjeto, editarProjeto, excluirProjeto, adicionarDesenvolvedor} = require('../controllers/projetoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para cadastrar um projeto (protegida)
router.post('/', authMiddleware, cadastrarProjeto);

// Rota para editar um projeto (protegida)
router.put('/:id', authMiddleware, editarProjeto);

// Rota para excluir um projeto (protegida)
router.delete('/:id', authMiddleware, excluirProjeto);

router.post('/adicionar-desenvolvedor', authMiddleware, adicionarDesenvolvedor);

module.exports = router;