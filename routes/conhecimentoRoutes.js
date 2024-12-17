const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { cadastrarConhecimento, 
        editarConhecimento, 
        excluirConhecimento, 
        gerarRelatorioConhecimentos } = require('../controllers/conhecimentoController');

router.post('/cadastrar', authMiddleware, cadastrarConhecimento);
router.put('/editar', authMiddleware, editarConhecimento); 
router.delete('/excluir', authMiddleware, excluirConhecimento);

//Rotas públicas
router.get('/relatorio', gerarRelatorioConhecimentos);

module.exports = router;