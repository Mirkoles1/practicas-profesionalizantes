// controllers/asignacionController.js
const Asignacion = require('../models/Asignacion');
const Actividad = require('../models/Actividad');
const Usuario = require('../models/Usuario'); // Cambiado de Empleado a Usuario

// Crear una nueva asignación
exports.createAsignacion = async (req, res) => {
    const { id_actividad, id_usuario, fecha_asignacion } = req.body; // Cambiado id_empleado a id_usuario

    try {
        // Verificar si la actividad y el usuario existen
        const actividad = await Actividad.findByPk(id_actividad);
        const usuario = await Usuario.findByPk(id_usuario); // Cambiado de empleado a usuario

        if (!actividad) {
            return res.status(404).json({ error: 'Actividad no encontrada' });
        }
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' }); // Cambiado de empleado a usuario
        }

        // Crear la asignación
        const nuevaAsignacion = await Asignacion.create({
            id_actividad,
            id_usuario, // Cambiado id_empleado a id_usuario
            fecha_asignacion
        });
        res.status(201).json(nuevaAsignacion);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la asignación' });
    }
};

// Obtener todas las asignaciones de un usuario
exports.getAsignacionesPorUsuario = async (req, res) => { // Cambiado el nombre de la función de getAsignacionesPorEmpleado a getAsignacionesPorUsuario
    const { id } = req.params;

    try {
        const asignaciones = await Asignacion.findAll({
            where: { id_usuario: id }, // Cambiado id_empleado a id_usuario
            include: [
                { model: Actividad, attributes: ['nombre_actividad', 'descripcion'] },
                { model: Usuario, attributes: ['nombre_usuario'] } // Cambiado de Empleado a Usuario
            ]
        });

        if (asignaciones.length === 0) {
            return res.status(404).json({ error: 'No se encontraron asignaciones para este usuario' });
        }

        res.json(asignaciones);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las asignaciones del usuario' });
    }
};

// Actualizar una asignación
exports.updateAsignacion = async (req, res) => {
    const { id } = req.params;
    const { id_actividad, id_usuario, fecha_asignacion } = req.body; // Cambiado id_empleado a id_usuario

    try {
        const asignacion = await Asignacion.findByPk(id);

        if (!asignacion) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }

        // Actualizar la asignación
        await asignacion.update({ id_actividad, id_usuario, fecha_asignacion }); // Cambiado id_empleado a id_usuario
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
