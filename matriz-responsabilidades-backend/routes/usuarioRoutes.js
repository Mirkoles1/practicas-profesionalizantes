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

// Actualizar datos del usuario
router.put('/update', authenticate, usuarioController.updateUsuario);

// Eliminar cuenta de usuario
router.delete('/delete', authenticate, usuarioController.deleteUsuario);

// Obtener datos del usuario actual
router.get('/user', authenticate, usuarioController.getUsuario);

module.exports = router;
