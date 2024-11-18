// controllers/actividadController.js
const Actividad = require('../models/Actividad');
const Asignacion = require('../models/Asignacion');
const Usuario = require('../models/Usuario');

// Crear una nueva actividad
exports.createActividad = async (req, res) => {
    const { nombre_actividad, descripcion, id_proyecto } = req.body;

    try {
        // Crear la nueva actividad
        const nuevaActividad = await Actividad.create({
            nombre_actividad,
            descripcion,
            id_proyecto
        });

        res.status(201).json(nuevaActividad);
    } catch (error) {
        console.error('Error al crear la actividad:', error);
        res.status(500).json({ error: 'Error al crear la actividad' });
    }
};

// Obtener todas las actividades de un proyecto
exports.getActividadesPorProyecto = async (req, res) => {
    const { id } = req.params; // id del proyecto desde los parámetros

    try {
        const actividades = await Actividad.findAll({
            where: { id_proyecto: id },
        });

        if (actividades.length === 0) {
            return res.status(404).json({ error: 'No se encontraron actividades para este proyecto' });
        }

        res.json(actividades);
    } catch (error) {
        console.error('Error al obtener las actividades:', error);
        res.status(500).json({ error: 'Error al obtener las actividades' });
    }
};

// Actualizar una actividad
exports.updateActividad = async (req, res) => {
    const { id } = req.params;
    const { nombre_actividad, descripcion, estadoActividad } = req.body;

    try {
        const actividad = await Actividad.findByPk(id);

        if (!actividad) {
            return res.status(404).json({ error: 'Actividad no encontrada' });
        }

        // Actualizar la actividad
        await actividad.update({
            nombre_actividad,
            descripcion,
            estadoActividad
        });

        res.json({ message: 'Actividad actualizada exitosamente', actividad });
    } catch (error) {
        console.error('Error al actualizar la actividad:', error);
        res.status(500).json({ error: 'Error al actualizar la actividad' });
    }
};

// Eliminar una actividad
exports.deleteActividad = async (req, res) => {
    const { id } = req.params;

    try {
        const actividad = await Actividad.findByPk(id);

        if (!actividad) {
            return res.status(404).json({ error: 'Actividad no encontrada' });
        }

        // Eliminar la actividad
        await actividad.destroy();

        res.json({ message: 'Actividad eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la actividad:', error);
        res.status(500).json({ error: 'Error al eliminar la actividad' });
    }
};
