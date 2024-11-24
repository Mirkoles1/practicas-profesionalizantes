// routes/actividadRoutes.js

const express = require('express');
const router = express.Router();
const actividadController = require('../controllers/actividadController');
const { authenticate } = require('../middleware/authMiddleware');

// Crear una nueva actividad
router.post('/', actividadController.createActividad);
// Obtener todas las actividades de un proyecto
router.get('/proyecto/:id', actividadController.getActividadesPorProyecto);
// Actualizar una actividad
router.put('/:id', actividadController.updateActividad);
// Eliminar una actividad
router.delete('/:id', actividadController.deleteActividad);
// Ruta para obtener una actividad por su ID
router.get('/:id', actividadController.getActividadById);
// Ruta para obtener los usuarios asignados a las actividades de un proyecto
router.get('/:id/usuarios-asignados', actividadController.getUsuariosAsignadosPorProyecto);

router.get('/empleado/actividades', authenticate, actividadController.getActividadesEmpleado);

module.exports = router;
