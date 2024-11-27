// controllers/proyectoController.js

const Proyecto = require('../models/Proyecto');
const UsuarioProyecto = require('../models/UsuarioProyecto');
const Actividad = require('../models/Actividad');
const Notas = require('../models/Notas');
const Usuario = require('../models/Usuario');

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

// Obtener un proyecto específico por su ID
exports.getProyectoById = async (req, res) => {
    const { id } = req.params;

    try {
        const proyecto = await Proyecto.findOne({
            where: { id_proyecto: id },
            include: [
                {
                    model: UsuarioProyecto,
                    attributes: ['id_usuario'], // Incluye los usuarios relacionados
                },
                {
                    model: Actividad,
                    attributes: ['id_actividad', 'nombre_actividad', 'descripcion'], // Incluye las actividades relacionadas
                }
            ]
        });

        if (!proyecto) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        res.json(proyecto);
    } catch (error) {
        console.error('Error al obtener el proyecto:', error);
        res.status(500).json({ error: 'Error al obtener el proyecto' });
    }
};


exports.getActividadesYNotas = async (req, res) => {
    const { id } = req.params; // ID del proyecto
    try {
      // Buscar actividades y notas relacionadas al proyecto
      const actividades = await Actividad.findAll({
        where: { id_proyecto: id },
        attributes: ['id_actividad', 'nombre_actividad', 'descripcion', 'estadoActividad'],
        include: [
          {
            model: Usuario, // Si necesitas incluir usuarios asignados
            attributes: ['id_usuario', 'nombre_usuario'],
          },
        ],
      });
  
      const notas = await Notas.findAll({
        where: { id_proyecto: id },
        attributes: ['id_nota', 'titulo', 'descripcion'],
      });
  
      if (!actividades.length && !notas.length) {
        return res.status(404).json({ error: 'No se encontraron actividades o notas para este proyecto' });
      }
  
      res.json({ actividades, notas });
    } catch (error) {
      console.error('Error al obtener actividades y notas:', error);
      res.status(500).json({ error: 'Error al obtener actividades y notas del proyecto' });
    }
  };

// Verificar si un proyecto está completado
exports.checkProyectoCompletado = async (req, res) => {
    const { id } = req.params; // ID del proyecto

    try {
        // Buscar todas las actividades relacionadas con el proyecto
        const actividades = await Actividad.findAll({
            where: { id_proyecto: id },
            attributes: ['estadoActividad']
        });

        if (!actividades.length) {
            return res.status(404).json({ error: 'El proyecto no tiene actividades asignadas' });
        }

        // Verificar si todas las actividades están completadas
        const todasCompletadas = actividades.every(
            actividad => actividad.estadoActividad === 'Completada'
        );

        if (todasCompletadas) {
            // Actualizar el estado del proyecto a 'Completado'
            const proyecto = await Proyecto.findByPk(id);

            if (!proyecto) {
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            await proyecto.update({ estado: 'Completado' });
            return res.json({ message: 'El proyecto ha sido marcado como completado', proyecto });
        } else {
            return res.json({ message: 'El proyecto no puede ser marcado como completado, aún hay actividades pendientes' });
        }
    } catch (error) {
        console.error('Error al verificar el estado del proyecto:', error);
        res.status(500).json({ error: 'Error al verificar el estado del proyecto' });
    }
};

// Obtener proyectos con conteo de actividades y actualizar el estado si están todas completadas
exports.getProyectosConProgreso = async (req, res) => {
    const id_usuario = req.params.id;

    try {
        // Obtener proyectos del usuario
        const proyectos = await Proyecto.findAll({
            include: [
                {
                    model: UsuarioProyecto,
                    where: { id_usuario },
                    attributes: []
                },
                {
                    model: Actividad,
                    attributes: ['estadoActividad'],
                }
            ]
        });

        // Formatear los datos con conteo de actividades
        const proyectosConProgreso = await Promise.all(
            proyectos.map(async (proyecto) => {
                const actividades = proyecto.Actividads || [];
                const totalActividades = actividades.length;
                const actividadesCompletadas = actividades.filter(
                    (actividad) => actividad.estadoActividad === 'Completada'
                ).length;

                // Actualizar estado del proyecto si todas las actividades están completadas
                if (totalActividades > 0 && totalActividades === actividadesCompletadas) {
                    await proyecto.update({ estado: 'Completado' });
                }

                return {
                    ...proyecto.toJSON(),
                    totalActividades,
                    actividadesCompletadas,
                };
            })
        );

        res.json(proyectosConProgreso);
    } catch (error) {
        console.error('Error al obtener proyectos con progreso:', error);
        res.status(500).json({ error: 'Error al obtener proyectos con progreso' });
    }
};

exports.checkProyectoFromActivity = async (req, res) => {
    const { activityId } = req.params; // ID de la actividad desde los parámetros

    try {
        // Buscar la actividad específica por activityId
        const actividad = await Actividad.findByPk(activityId);

        if (!actividad) {
            return res.status(404).json({ error: 'La actividad no existe' });
        }

        // Obtener el ID del proyecto al que pertenece la actividad
        const idProyecto = actividad.id_proyecto;

        // Buscar todas las actividades del proyecto
        const actividades = await Actividad.findAll({
            where: { id_proyecto: idProyecto },
            attributes: ['estadoActividad'],
        });

        if (!actividades.length) {
            return res.status(404).json({ error: 'El proyecto no tiene actividades asignadas' });
        }

        // Verificar si todas las actividades están completadas
        const todasCompletadas = actividades.every(
            (actividad) => actividad.estadoActividad === 'Completada'
        );

        if (todasCompletadas) {
            // Actualizar el estado del proyecto a 'Completado'
            const proyecto = await Proyecto.findByPk(idProyecto);

            if (!proyecto) {
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            await proyecto.update({ estado: 'Completado' });
            return res.json({ message: 'El proyecto ha sido marcado como completado', proyecto });
        } else {
            return res.json({
                message: 'El proyecto no puede ser marcado como completado, aún hay actividades pendientes',
            });
        }
    } catch (error) {
        console.error('Error al verificar el estado del proyecto desde la actividad:', error);
        res.status(500).json({ error: 'Error al verificar el estado del proyecto' });
    }
};

