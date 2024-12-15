const express = require('express');
const { login } = require('../controllers/alunoController');
const router = express.Router();

// Rota de login
router.post('/login', login);

module.exports = router;