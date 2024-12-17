const express = require('express');
const { cadastrarProjeto, 
        editarProjeto, 
        excluirProjeto, 
        adicionarDesenvolvedor, 
        listarProjetos,
        listarProjetosPorPalavraChave} = require('../controllers/projetoController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, cadastrarProjeto);
router.put('/:id', authMiddleware, editarProjeto);
router.delete('/:id', authMiddleware, excluirProjeto);
router.post('/adicionar-desenvolvedor', authMiddleware, adicionarDesenvolvedor);

//Rotas públicas
router.get('/', listarProjetos);
router.get('/palavras-chave/:nome', listarProjetosPorPalavraChave);

module.exports = router;