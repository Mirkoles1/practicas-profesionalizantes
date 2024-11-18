// controllers/asignacionController.js
const Asignacion = require('../models/Asignacion');
const Actividad = require('../models/Actividad');
const Usuario = require('../models/Usuario');

// Crear una nueva asignación
exports.createAsignacion = async (req, res) => {
    const { id_actividad, id_usuario, fecha_asignacion } = req.body;

    try {
        // Verificar si la actividad y el usuario existen
        const actividad = await Actividad.findByPk(id_actividad);
        const usuario = await Usuario.findByPk(id_usuario);

        if (!actividad) {
            return res.status(404).json({ error: 'Actividad no encontrada' });
        }

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Crear la nueva asignación
        const nuevaAsignacion = await Asignacion.create({
            id_actividad,
            id_usuario,
            fecha_asignacion
        });

        res.status(201).json(nuevaAsignacion);
    } catch (error) {
        console.error('Error al crear la asignación:', error);
        res.status(500).json({ error: 'Error al crear la asignación' });
    }
};

// Obtener todas las asignaciones de un usuario
exports.getAsignacionesPorUsuario = async (req, res) => {
    const { id } = req.params; // id del usuario desde los parámetros

    try {
        const asignaciones = await Asignacion.findAll({
            where: { id_usuario: id },
            include: [
                { model: Actividad, attributes: ['nombre_actividad', 'descripcion', 'estadoActividad'] },
                { model: Usuario, attributes: ['nombre_usuario'] }
            ]
        });

        if (asignaciones.length === 0) {
            return res.status(404).json({ error: 'No se encontraron asignaciones para este usuario' });
        }

        res.json(asignaciones);
    } catch (error) {
        console.error('Error al obtener las asignaciones del usuario:', error);
        res.status(500).json({ error: 'Error al obtener las asignaciones del usuario' });
    }
};

// Actualizar una asignación
exports.updateAsignacion = async (req, res) => {
    const { id } = req.params;  // id de la asignación desde los parámetros
    const { id_actividad, id_usuario, fecha_asignacion } = req.body;

    try {
        const asignacion = await Asignacion.findByPk(id);

        if (!asignacion) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }

        // Actualizar la asignación
        await asignacion.update({
            id_actividad,
            id_usuario,
            fecha_asignacion
        });

        res.json({ message: 'Asignación actualizada exitosamente', asignacion });
    } catch (error) {
        console.error('Error al actualizar la asignación:', error);
        res.status(500).json({ error: 'Error al actualizar la asignación' });
    }
};

// Eliminar una asignación
exports.deleteAsignacion = async (req, res) => {
    const { id } = req.params;

    try {
        const asignacion = await Asignacion.findByPk(id);

        if (!asignacion) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }

        // Eliminar la asignación
        await asignacion.destroy();

        res.json({ message: 'Asignación eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la asignación:', error);
        res.status(500).json({ error: 'Error al eliminar la asignación' });
    }
};
