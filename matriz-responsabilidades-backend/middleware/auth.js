// middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET = 'tu_secreto_jwt';

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'Token no proporcionado' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token no válido' });
    req.userId = decoded.id;
    req.userRol = decoded.rol;
    next();
  });
};

module.exports = verificarToken;
