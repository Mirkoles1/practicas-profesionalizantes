// routes/comentarioAvanceRoutes.js

const express = require('express');
const router = express.Router();
const comentarioAvanceController = require('../controllers/comentarioAvanceController');

// Crear comentario
router.post('/', comentarioAvanceController.createComentario);
// Obtener todos los comentarios
router.get('/', comentarioAvanceController.getComentarios);
// Obtener comentario por ID
router.get('/:id', comentarioAvanceController.getComentarioById);
// Actualizar comentario
router.put('/:id', comentarioAvanceController.updateComentario);
// Eliminar comentario
router.delete('/:id', comentarioAvanceController.deleteComentario);
// Ruta para obtener comentarios por actividad
router.get('/actividad/:id_actividad', comentarioAvanceController.getComentariosPorActividad);

module.exports = router;
