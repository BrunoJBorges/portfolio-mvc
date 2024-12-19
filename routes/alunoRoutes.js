const express = require('express');
const { login } = require('../controllers/alunoController');
const router = express.Router();

// Rota GET para exibir o formulário de login
router.get('/', (req, res) => {
    res.render('auth/login'); 
});
  
// Rota de login
router.post('/', login);

module.exports = router;