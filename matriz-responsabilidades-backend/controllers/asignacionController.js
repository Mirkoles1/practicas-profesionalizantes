// controllers/asignacionController.js
const Asignacion = require('../models/Asignacion');
const Actividad = require('../models/Actividad');
const Empleado = require('../models/Empleado');

// Crear una nueva asignación
exports.createAsignacion = async (req, res) => {
    const { id_actividad, id_empleado, fecha_asignacion } = req.body;

    try {
        // Verificar si la actividad y el empleado existen
        const actividad = await Actividad.findByPk(id_actividad);
        const empleado = await Empleado.findByPk(id_empleado);

        if (!actividad) {
            return res.status(404).json({ error: 'Actividad no encontrada' });
        }
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }

        // Crear la asignación
        const nuevaAsignacion = await Asignacion.create({
            id_actividad,
            id_empleado,
            fecha_asignacion
        });
        res.status(201).json(nuevaAsignacion);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la asignación' });
    }
};

// Obtener todas las asignaciones de un empleado
exports.getAsignacionesPorEmpleado = async (req, res) => {
    const { id } = req.params;

    try {
        const asignaciones = await Asignacion.findAll({
            where: { id_empleado: id },
            include: [
                { model: Actividad, attributes: ['nombre_actividad', 'descripcion'] },
                { model: Empleado, attributes: ['nombre'] }
            ]
        });

        if (asignaciones.length === 0) {
            return res.status(404).json({ error: 'No se encontraron asignaciones para este empleado' });
        }

        res.json(asignaciones);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las asignaciones del empleado' });
    }
};

// Actualizar una asignación
exports.updateAsignacion = async (req, res) => {
    const { id } = req.params;
    const { id_actividad, id_empleado, fecha_asignacion } = req.body;

    try {
        const asignacion = await Asignacion.findByPk(id);

        if (!asignacion) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }

        // Actualizar la asignación
        await asignacion.update({ id_actividad, id_empleado, fecha_asignacion });
        res.json({ message: 'Asignación actualizada', asignacion });

    } catch (error) {
        console.error(error);
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

        await asignacion.destroy();
        res.json({ message: 'Asignación eliminada' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la asignación' });
    }
};
