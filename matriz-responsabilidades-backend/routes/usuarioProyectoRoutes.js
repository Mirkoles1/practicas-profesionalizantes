// routes/usuarioProyectoRoutes.js

const express = require('express');
const router = express.Router();
const {
    createUsuarioProyecto,
    getAllUsuarioProyectos,
    deleteUsuarioProyecto,
} = require('../controllers/UsuarioProyectoController');

// Ruta para crear una nueva relación usuario-proyecto
router.post('/', createUsuarioProyecto);

// Ruta para obtener todas las relaciones usuario-proyecto
router.get('/', getAllUsuarioProyectos);

// Ruta para eliminar una relación usuario-proyecto por ID
router.delete('/:id_usuario_proyecto', deleteUsuarioProyecto);

module.exports = router;
