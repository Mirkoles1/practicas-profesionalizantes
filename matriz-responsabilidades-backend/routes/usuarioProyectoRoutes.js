// routes/usuarioProyectoRoutes.js

const express = require('express');
const router = express.Router();
const {
    createUsuarioProyecto,
    getAllUsuarioProyectos,
    deleteUsuarioProyecto,
    asignarProyectoEmpleado,
    getEmpleadosByProyecto,
    getEmpleadosPorProyecto,
} = require('../controllers/UsuarioProyectoController');

// Ruta para crear una nueva relación usuario-proyecto
router.post('/', createUsuarioProyecto);

// Ruta para obtener todas las relaciones usuario-proyecto
router.get('/', getAllUsuarioProyectos);

// Ruta para eliminar una relación usuario-proyecto por ID
router.delete('/:id_usuario_proyecto', deleteUsuarioProyecto);

// Ruta para asignar un empleado a proyecto
router.post('/asignar', asignarProyectoEmpleado);

// Ruta para obtener los empleados de un proyecto
router.get('/proyectos/:id_proyecto/empleados', getEmpleadosByProyecto);

// Ruta para obtener empleados por proyecto
router.get('/proyecto/:id_proyecto/empleados', getEmpleadosPorProyecto);

module.exports = router;
