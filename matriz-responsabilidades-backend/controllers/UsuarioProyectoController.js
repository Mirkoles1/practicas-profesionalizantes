// controllers/UsuarioProyectoController.js

const UsuarioProyecto = require('../models/UsuarioProyecto');

// Crear una nueva relación usuario-proyecto
const createUsuarioProyecto = async (req, res) => {
    try {
        const { id_usuario, id_proyecto } = req.body;
        const newUsuarioProyecto = await UsuarioProyecto.create({ id_usuario, id_proyecto });
        res.status(201).json(newUsuarioProyecto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las relaciones usuario-proyecto
const getAllUsuarioProyectos = async (req, res) => {
    try {
        const usuarioProyectos = await UsuarioProyecto.findAll();
        res.status(200).json(usuarioProyectos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una relación usuario-proyecto
const deleteUsuarioProyecto = async (req, res) => {
    try {
        const { id_usuario_proyecto } = req.params;
        const deleted = await UsuarioProyecto.destroy({
            where: { id_usuario_proyecto }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Usuario-Proyecto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUsuarioProyecto,
    getAllUsuarioProyectos,
    deleteUsuarioProyecto,
};
