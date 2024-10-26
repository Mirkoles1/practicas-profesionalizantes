// routes/empleadoRoutes.js
const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// Rutas para empleados
router.post('/', authenticate, isAdmin, empleadoController.createEmpleado); // Crear empleado
router.get('/', authenticate, empleadoController.getAllEmpleados);         // Obtener todos los empleados
router.get('/:id', authenticate, empleadoController.getEmpleadoById);      // Obtener un empleado por ID
router.put('/:id', authenticate, isAdmin, empleadoController.updateEmpleado); // Actualizar empleado
router.delete('/:id', authenticate, isAdmin, empleadoController.deleteEmpleado); // Eliminar empleado

module.exports = router;
