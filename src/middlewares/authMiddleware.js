// src/middlewares/authMiddleware.js
// Verifica el JWT en el header Authorization

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Acceso denegado. Token no proporcionado.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, rol }
    next();
  } catch (error) {
    return res.status(403).json({
      status: 'error',
      message: 'Token inválido o expirado.',
    });
  }
};

// Middleware para verificar rol de administrador
const verifyAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Acceso denegado. Se requiere rol de administrador.',
    });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };