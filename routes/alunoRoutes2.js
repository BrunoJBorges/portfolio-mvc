const express = require('express');
const { login } = require('../controllers/alunoController');
const router = express.Router();

router.get('/cadastrarProjetos', (req, res) => {
    res.render('aluno/cadastrarProjetos'); 
});

router.get('/editarProjetos', (req, res) => {
    res.render('aluno/editarProjeto');
});

router.get('/excluirProjetos', (req, res) => {
    res.render('aluno/excluirProjetos'); 
});

router.get('/addDevProjetos', (req, res) => {
    res.render('aluno/addDevProjetos'); 
});

module.exports = router;