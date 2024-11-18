// controllers/notasController.js

const Notas = require('../models/Notas');

// Crear una nota
exports.createNota = async (req, res) => {
  try {
    const { titulo, descripcion, estadoProyecto, id_proyecto } = req.body;
    const nota = await Notas.create({ titulo, descripcion, estadoProyecto, id_proyecto });
    res.status(201).json(nota);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la nota', error });
  }
};

// Obtener todas las notas
exports.getNotas = async (req, res) => {
  try {
    const notas = await Notas.findAll();
    res.status(200).json(notas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las notas', error });
  }
};

// Obtener una nota por ID
exports.getNotaById = async (req, res) => {
  try {
    const nota = await Notas.findByPk(req.params.id);
    if (!nota) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }
    res.status(200).json(nota);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la nota', error });
  }
};

// Actualizar una nota
exports.updateNota = async (req, res) => {
  try {
    const { titulo, descripcion, estadoProyecto } = req.body;
    const nota = await Notas.findByPk(req.params.id);
    if (!nota) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    nota.titulo = titulo || nota.titulo;
    nota.descripcion = descripcion || nota.descripcion;
    nota.estadoProyecto = estadoProyecto || nota.estadoProyecto;
    await nota.save();

    res.status(200).json(nota);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la nota', error });
  }
};

// Eliminar una nota
exports.deleteNota = async (req, res) => {
  try {
    const nota = await Notas.findByPk(req.params.id);
    if (!nota) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    await nota.destroy();
    res.status(200).json({ message: 'Nota eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la nota', error });
  }
};
