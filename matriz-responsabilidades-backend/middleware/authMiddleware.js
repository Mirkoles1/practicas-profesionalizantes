// authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// Middleware para verificar el token
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'No se proporcionó un token' });
    }

    const tokenParts = token.split(" ");
    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
        return res.status(403).json({ error: 'Formato de token inválido' });
    }

    jwt.verify(tokenParts[1], SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token no válido' });
        req.user = decoded; // Asigna datos del token a `req.user`
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
