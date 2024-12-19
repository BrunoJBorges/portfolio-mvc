const express = require('express');
const router = express.Router();

// Rota para o dashboard do administrador
router.get('/admin/dashboard', (req, res) => {
  res.render('dashboard', { nome: 'Admin', tipoMenu: 'admin' });
});

// Rota para o dashboard do aluno
router.get('/aluno/dashboard', (req, res) => {
  res.render('dashboard', { nome: 'Aluno', tipoMenu: 'aluno' });
});

module.exports = router;