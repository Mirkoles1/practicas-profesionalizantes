// routes/notasRoutes.js

const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notasController');

// Crear nota
router.post('/', notasController.createNota);

// Obtener todas las notas
router.get('/', notasController.getNotas);

// Obtener nota por ID
router.get('/:id', notasController.getNotaById);

// Actualizar nota
router.put('/:id', notasController.updateNota);

// Eliminar nota
router.delete('/:id', notasController.deleteNota);

module.exports = router;
