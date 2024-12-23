const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para verificar o token JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');;

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.usuarioId = decoded.id;
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;