// controllers/actividadController.js
const Actividad = require('../models/Actividad');

// Crear una nueva actividad
exports.createActividad = async (req, res) => {
    const { nombre_actividad, descripcion, id_proyecto } = req.body;
    try {
        const nuevaActividad = await Actividad.create({ nombre_actividad, descripcion, id_proyecto });
        res.status(201).json(nuevaActividad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las actividades de un proyecto
exports.getActividadesPorProyecto = async (req, res) => {
    const { id } = req.params;
    try {
        const actividades = await Actividad.findAll({ where: { id_proyecto: id } });
        res.json(actividades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una actividad
exports.updateActividad = async (req, res) => {
    const { id } = req.params;
    const { nombre_actividad, descripcion } = req.body;
    try {
        await Actividad.update({ nombre_actividad, descripcion }, { where: { id_actividad: id } });
        res.json({ message: 'Actividad actualizada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una actividad
exports.deleteActividad = async (req, res) => {
    const { id } = req.params;
    try {
        await Actividad.destroy({ where: { id_actividad: id } });
        res.json({ message: 'Actividad eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
