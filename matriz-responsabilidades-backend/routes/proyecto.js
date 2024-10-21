// routes/proyecto.js
const express = require('express');
const verificarToken = require('../middleware/auth');
const Proyecto = require('../models/Proyecto');  // Importar directamente el modelo Proyecto
const Invitacion = require('../models/Invitacion');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Crear un proyecto y enviar invitaciones a usuarios

router.post('/', verificarToken, async (req, res) => {
  try {
    const { nombre, descripcion, estado, usuarios = [] } = req.body;

    // Crear el proyecto
    const proyecto = await Proyecto.create({ nombre, descripcion, estado });

    // Enviar invitaciones a los usuarios seleccionados
    const invitaciones = usuarios.map(usuario_id => ({
      proyecto_id: proyecto.id,
      usuario_id,
      estado: 'pendiente',
    }));

    await Invitacion.bulkCreate(invitaciones);
    res.status(201).json(proyecto);
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({ error: error.message });
  }
});


// Obtener todos los proyectos con los usuarios invitados
router.get('/', verificarToken, async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll({
      include: {
        model: Usuario,
        as: 'usuarios',
        through: { attributes: ['estado'] }, // Incluye el estado de la invitación
      },
    });
    res.json(proyectos);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    console.error(error); // Esto imprimirá el error detallado en la consola
    res.status(500).json({ error: error.message });
  }
});

// Aceptar o rechazar una invitación
router.post('/invitacion/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body; // 'aceptada' o 'rechazada'
  
  try {
    const invitacion = await Invitacion.findByPk(id);

    if (!invitacion) {
      return res.status(404).json({ error: 'Invitación no encontrada' });
    }

    invitacion.estado = estado;
    await invitacion.save();

    res.json({ message: `Invitación ${estado}` });
  } catch (error) {
    console.error('Error al actualizar invitación:', error);
    console.error(error); // Esto imprimirá el error detallado en la consola
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
