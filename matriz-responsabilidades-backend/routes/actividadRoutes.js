// routes/actividadRoutes.js
const express = require('express');
const router = express.Router();
const actividadController = require('../controllers/actividadController');

// Crear una nueva actividad
router.post('/', actividadController.createActividad);

// Obtener todas las actividades de un proyecto
router.get('/proyecto/:id', actividadController.getActividadesPorProyecto);

// Actualizar una actividad
router.put('/:id', actividadController.updateActividad);

// Eliminar una actividad
router.delete('/:id', actividadController.deleteActividad);

module.exports = router;
