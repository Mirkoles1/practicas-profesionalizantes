// controllers/comentarioAvanceController.js

const ComentarioAvance = require('../models/ComentarioAvance');

// Crear un comentario de avance
exports.createComentario = async (req, res) => {
  try {
    const { titulo, descripcion, id_actividad } = req.body;
    const comentario = await ComentarioAvance.create({ titulo, descripcion, id_actividad });
    res.status(201).json(comentario);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el comentario de avance', error });
  }
};

// Obtener todos los comentarios de avance
exports.getComentarios = async (req, res) => {
  try {
    const comentarios = await ComentarioAvance.findAll();
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los comentarios de avance', error });
  }
};

// Obtener un comentario de avance por ID
exports.getComentarioById = async (req, res) => {
  try {
    const comentario = await ComentarioAvance.findByPk(req.params.id);
    if (!comentario) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el comentario de avance', error });
  }
};

// Actualizar un comentario de avance
exports.updateComentario = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const comentario = await ComentarioAvance.findByPk(req.params.id);
    if (!comentario) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    comentario.titulo = titulo || comentario.titulo;
    comentario.descripcion = descripcion || comentario.descripcion;
    await comentario.save();

    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el comentario', error });
  }
};

// Eliminar un comentario de avance
exports.deleteComentario = async (req, res) => {
  try {
    const comentario = await ComentarioAvance.findByPk(req.params.id);
    if (!comentario) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    await comentario.destroy();
    res.status(200).json({ message: 'Comentario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el comentario', error });
  }
};
