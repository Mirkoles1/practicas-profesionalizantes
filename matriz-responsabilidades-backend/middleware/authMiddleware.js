// authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// Middleware para verificar el token
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).json({ error: 'No se proporcionó un token' });
    }
  
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(403).json({ error: 'Token inválido' });
    }
  
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Token no válido' });
      req.user = decoded;  // Aquí se debería adjuntar correctamente el `id_usuario`
      next();
    });
  };

// Middleware para verificar el rol de administrador
const isAdmin = (req, res, next) => {
    if (req.user.rol !== 'Administrador') {
        return res.status(403).json({ error: 'No autorizado' });
    }
    next();
};

module.exports = { authenticate, isAdmin };
