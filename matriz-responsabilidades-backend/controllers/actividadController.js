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
// Obtener una actividad por su ID
exports.getActividadById = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar la actividad por su ID
        const actividad = await Actividad.findByPk(id);

        if (!actividad) {
            return res.status(404).json({ error: 'Actividad no encontrada' });
        }

        res.json(actividad);
    } catch (error) {
        console.error('Error al obtener la actividad:', error);
        res.status(500).json({ error: 'Error al obtener la actividad' });
    }
};

exports.getUsuariosAsignadosPorProyecto = async (req, res) => {
    const { id } = req.params; // id del proyecto desde los parámetros

    try {
        // Obtener todas las actividades del proyecto junto con los usuarios asignados
        const actividades = await Actividad.findAll({
            where: { id_proyecto: id },
            include: [
                {
                    model: Asignacion,
                    include: [
                        {
                            model: Usuario,
                            attributes: ['id_usuario', 'nombre_usuario'], // Campos del usuario
                        },
                    ],
                },
            ],
        });

        // Si no se encuentran actividades en el proyecto
        if (actividades.length === 0) {
            return res.status(404).json({ error: 'No se encontraron actividades para este proyecto' });
        }

        // Extraer los usuarios asignados a las actividades
        const usuariosAsignados = actividades.flatMap((actividad) =>
            actividad.Asignacions.map((asignacion) => ({
                id_usuario: asignacion.Usuario.id_usuario,
                nombre_usuario: asignacion.Usuario.nombre_usuario,
                id_actividad: actividad.id_actividad,
                nombre_actividad: actividad.nombre_actividad,
            }))
        );

        // Si no hay usuarios asignados a ninguna actividad
        if (usuariosAsignados.length === 0) {
            return res.status(404).json({ error: 'No hay usuarios asignados a las actividades de este proyecto' });
        }

        res.json(usuariosAsignados);
    } catch (error) {
        console.error('Error al obtener los usuarios asignados:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios asignados a las actividades' });
    }
};

// controllers/actividadController.js
exports.getActividadesEmpleado = async (req, res) => {
    const id_usuario = req.user?.id_usuario;

    try {
        const actividades = await Actividad.findAll({
            where: { id_asignado: id_usuario }, // Campo que relaciona la actividad con el usuario
            include: [
                {
                    model: Proyecto,
                    attributes: ['id_proyecto', 'nombre_proyecto'],
                },
            ],
        });

        if (!actividades.length) {
            return res.status(404).json({ error: 'No se encontraron actividades asignadas.' });
        }

        res.json(actividades);
    } catch (error) {
        console.error('Error al obtener actividades del empleado:', error);
        res.status(500).json({ error: 'Error al obtener actividades del empleado.' });
    }
};



