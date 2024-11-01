// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// Registro de usuario administrador
router.post('/register', usuarioController.register);

// Login de usuario
router.post('/login', usuarioController.login);

// Registro de usuario con rol predeterminado "Empleado"
router.post('/registerEmpleado', authenticate, usuarioController.registerEmpleado);

module.exports = router;
