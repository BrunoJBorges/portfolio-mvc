const express = require('express');
const { cadastrarProjeto, 
        editarProjeto, 
        excluirProjeto, 
        adicionarDesenvolvedor, 
        listarProjetos,
        listarProjetosPorPalavraChave} = require('../controllers/projetoController');
const authMiddleware = require('../middleware/authMiddleware');
const { PalavraChave } = require('../models');

const router = express.Router();

router.post('/', authMiddleware, cadastrarProjeto);
router.put('/:id', authMiddleware, editarProjeto);
router.delete('/:id', authMiddleware, excluirProjeto);
router.post('/adicionar-desenvolvedor', authMiddleware, adicionarDesenvolvedor);

//Rotas públicas
router.get('/', listarProjetos);
router.get('/palavras-chave/:nome', listarProjetosPorPalavraChave);

// Rota principal para exibir a view de menu com palavras-chave dinâmicas
router.get('/menu', async (req, res) => {
     try {
        const palavrasChave = await PalavraChave.findAll({ attributes: ['nome'] });
        res.render('menu', { palavrasChave });
   } catch (error) {
        console.error('Erro ao buscar palavras-chave:', error);
        res.status(500).send('Erro ao carregar o menu');
   }
});

module.exports = router;