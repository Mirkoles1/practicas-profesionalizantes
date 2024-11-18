// controllers/proyectoController.js

const Proyecto = require('../models/Proyecto');
const UsuarioProyecto = require('../models/UsuarioProyecto');
const Actividad = require('../models/Actividad');

// Crear un nuevo proyecto y asignar al usuario creador en UsuarioProyecto
exports.createProyecto = async (req, res) => {
    const { nombre_proyecto, descripcion, estado } = req.body;  // Asegúrate de enviar solo los campos que existen
    const id_usuario = req.user?.id_usuario;

    if (!id_usuario) {
        return res.status(400).json({ error: 'id_usuario no encontrado en el token' });
    }

    try {
        // Crear el nuevo proyecto
        const nuevoProyecto = await Proyecto.create({
            nombre_proyecto,
            descripcion,
            estado: estado || 'Pendiente', // Si no se pasa un estado, será 'Pendiente' por defecto
        });

        // Asignar el proyecto al usuario
        await UsuarioProyecto.create({
            id_usuario,
            id_proyecto: nuevoProyecto.id_proyecto,
        });

        // Devolver la respuesta con el proyecto creado
        res.status(201).json(nuevoProyecto);
    } catch (error) {
        console.error("Error en creación de proyecto y asignación de usuario:", error);
        res.status(500).json({ error: 'Error al crear el proyecto y asignar el usuario' });
    }
};

// Obtener todos los proyectos (solo para administradores)
exports.getProyectosAdmin = async (req, res) => {
    try {
        const proyectos = await Proyecto.findAll();
        res.json(proyectos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
};

// Obtener proyectos específicos para un usuario
exports.getProyectosUsuario = async (req, res) => {
    const id_usuario = req.params.id;
    try {
        const proyectos = await Proyecto.findAll({
            include: [
                {
                    model: UsuarioProyecto,
                    where: { id_usuario },
                    attributes: []
                }
            ]
        });
        res.json(proyectos);
    } catch (error) {
        console.error('Detalles del error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un proyecto
exports.updateProyecto = async (req, res) => {
    const { id } = req.params;  // id del proyecto desde los parámetros de la URL
    const { nombre_proyecto, descripcion, estado } = req.body;

    try {
        const proyecto = await Proyecto.findByPk(id);

        if (!proyecto) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        // Actualizar los datos del proyecto
        await proyecto.update({
            nombre_proyecto,
            descripcion,
            estado,
        });

        res.json({ message: 'Proyecto actualizado exitosamente', proyecto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
};

// Eliminar un proyecto y su relación con usuarios
exports.deleteProyecto = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si el proyecto existe
        const proyecto = await Proyecto.findByPk(id);
        if (!proyecto) {
            return res.status(404).json({ error: 'El proyecto no existe' });
        }

        // Eliminar el proyecto (las relaciones se eliminan por CASCADE)
        await proyecto.destroy();
        res.json({ message: 'Proyecto y asignaciones eliminados exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
        res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
};

// Obtener la matriz de responsabilidades para un usuario
exports.getMatrizResponsabilidades = async (req, res) => {
    const id_usuario = req.user.id_usuario;

    try {
        const proyectos = await Proyecto.findAll({
            include: [
                {
                    model: UsuarioProyecto,
                    where: { id_usuario },
                    attributes: []
                },
                {
                    model: Actividad,
                    attributes: ['id_actividad', 'nombre_actividad', 'descripcion']
                }
            ]
        });
        res.json(proyectos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la matriz de responsabilidades' });
    }
};
