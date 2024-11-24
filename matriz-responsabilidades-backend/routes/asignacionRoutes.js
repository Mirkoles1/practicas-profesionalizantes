// routes/asignacionRoutes.js
const express = require('express');
const router = express.Router();
const asignacionController = require('../controllers/asignacionController');

// Crear una nueva asignación
router.post('/', asignacionController.createAsignacion);

// Obtener todas las asignaciones de un usuario
router.get('/usuario/:id', asignacionController.getAsignacionesPorUsuario);

// Actualizar una asignación
router.put('/:id', asignacionController.updateAsignacion);

// Eliminar una asignación
router.delete('/:id', asignacionController.deleteAsignacion);

// Ruta para obtener las actividades con usuarios asignados
router.get('/actividades/:idProyecto/usuarios-asignados', asignacionController.getActividadesConUsuariosAsignados);


module.exports = router;
