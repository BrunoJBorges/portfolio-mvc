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

router.get('/cadastrarConhecimentos', (req, res) => {
    res.render('aluno/cadastrarConhecimentos'); 
});

router.get('/editarConhecimentos', (req, res) => {
    res.render('aluno/editarConhecimentos'); 
});

router.get('/excluirConhecimentos', (req, res) => {
    res.render('aluno/excluirConhecimentos'); 
});

module.exports = router;