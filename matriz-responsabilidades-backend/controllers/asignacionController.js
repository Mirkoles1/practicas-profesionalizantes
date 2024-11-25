// controllers/asignacionController.js
const Asignacion = require('../models/Asignacion');
const Actividad = require('../models/Actividad');
const Usuario = require('../models/Usuario');
const Proyecto = require('../models/Proyecto')

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

exports.getActividadesConUsuariosAsignados = async (req, res) => {
    try {
      const { idProyecto } = req.params;
  
      // Buscar las actividades del proyecto
      const actividades = await Actividad.findAll({
        where: { id_proyecto: idProyecto },
        include: [
          {
            model: Asignacion,
            include: [
              {
                model: Usuario,
                attributes: ['nombre_usuario'] // Obtener solo el nombre del usuario
              }
            ]
          }
        ]
      });
  
      // Si no se encuentran actividades
      if (!actividades) {
        return res.status(404).json({ message: 'No se encontraron actividades para este proyecto.' });
      }
  
      // Formatear la respuesta para obtener el nombre_usuario de cada actividad
      const actividadesConUsuarios = actividades.map(actividad => {
        const usuariosAsignados = actividad.Asignacions.map(asignacion => asignacion.Usuario.nombre_usuario);
        
        return {
          id_actividad: actividad.id_actividad,
          nombre_actividad: actividad.nombre_actividad,
          usuariosAsignados: usuariosAsignados.length > 0 ? usuariosAsignados : null // Si no hay usuarios, devolver null
        };
      });
  
      // Devolver la respuesta con las actividades y los usuarios asignados
      return res.status(200).json(actividadesConUsuarios);
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al obtener las actividades con usuarios asignados.' });
    }
  };

  exports.getActividadesAsignadas = async (req, res) => {
    const id_usuario = req.user?.id_usuario; // Extraer ID del usuario autenticado del token
  
    try {
      // Obtener asignaciones del usuario, incluyendo datos de la actividad y el proyecto relacionado
      const asignaciones = await Asignacion.findAll({
        where: { id_usuario },
        include: [
          {
            model: Actividad,
            attributes: ['id_actividad', 'nombre_actividad', 'descripcion', 'estadoActividad'],
            include: {
              model: Proyecto,
              attributes: ['id_proyecto', 'nombre_proyecto'], // Opcional: Información del proyecto
            },
          },
        ],
      });
  
      if (!asignaciones.length) {
        return res.status(404).json({ error: 'No tienes actividades asignadas.' });
      }
  
      // Formatear los datos para devolver solo lo necesario
      const actividades = asignaciones.map((asignacion) => ({
        id_actividad: asignacion.Actividad.id_actividad,
        nombre_actividad: asignacion.Actividad.nombre_actividad,
        descripcion: asignacion.Actividad.descripcion,
        estadoActividad: asignacion.Actividad.estadoActividad,
        proyecto: asignacion.Actividad.Proyecto,
      }));
  
      res.status(200).json(actividades);
    } catch (error) {
      console.error('Error al obtener actividades asignadas:', error);
      res.status(500).json({ error: 'Error al obtener las actividades asignadas.' });
    }
  };