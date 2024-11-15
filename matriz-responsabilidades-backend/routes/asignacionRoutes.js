// routes/asignacionRoutes.js
const express = require('express');
const router = express.Router();
const asignacionController = require('../controllers/asignacionController');

// Crear una nueva asignación
router.post('/', asignacionController.createAsignacion);

// Obtener todas las asignaciones de un usuario empleado
router.get('/usuario/:id', asignacionController.getAsignacionesPorUsuario);

// Actualizar una asignación
router.put('/:id', asignacionController.updateAsignacion);

// Eliminar una asignación
router.delete('/:id', asignacionController.deleteAsignacion);

module.exports = router;
