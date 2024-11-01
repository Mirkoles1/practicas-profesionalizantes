// routes/proyectoRoutes.js
const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// Crear un nuevo proyecto
router.post('/', authenticate, isAdmin, proyectoController.createProyecto);
// Obtener todos los proyectos (solo para administradores)
router.get('/', authenticate, isAdmin, proyectoController.getProyectosAdmin);
// Obtener proyectos específicos para un empleado
router.get('/usuario/:id', authenticate, proyectoController.getProyectosUsuario);
// Actualizar un proyecto
router.put('/:id', authenticate, proyectoController.updateProyecto);
// Eliminar un proyecto
router.delete('/:id', authenticate, isAdmin, proyectoController.deleteProyecto);
// Obtener la matriz de responsabilidades
router.get('/matriz', authenticate, proyectoController.getMatrizResponsabilidades);

module.exports = router;
