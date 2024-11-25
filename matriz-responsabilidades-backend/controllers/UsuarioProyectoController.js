// controllers/UsuarioProyectoController.js
const Usuario = require('../models/Usuario');
const UsuarioProyecto = require('../models/UsuarioProyecto');

// Crear una nueva relación usuario-proyecto
exports.createUsuarioProyecto = async (req, res) => {
    try {
        const { id_usuario, id_proyecto } = req.body;
        const newUsuarioProyecto = await UsuarioProyecto.create({ id_usuario, id_proyecto });
        res.status(201).json(newUsuarioProyecto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las relaciones usuario-proyecto
exports.getAllUsuarioProyectos = async (req, res) => {
    try {
        const usuarioProyectos = await UsuarioProyecto.findAll();
        res.status(200).json(usuarioProyectos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una relación usuario-proyecto
exports.deleteUsuarioProyecto = async (req, res) => {
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


exports.asignarProyectoEmpleado = async (req, res) => {
    const { id_usuario, id_proyecto } = req.body;

    try {
        const relacion = await UsuarioProyecto.create({ id_usuario, id_proyecto });
        res.status(201).json(relacion);
    } catch (error) {
        console.error('Error al asignar usuario al proyecto:', error);
        res.status(500).json({ error: 'Error al asignar usuario al proyecto' });
    }
};

// Obtener los usuarios con rol 'empleado' asignados a un proyecto específico
exports.getEmpleadosByProyecto = async (req, res) => {
    const { id_proyecto } = req.params;

    try {
        // Consultar las relaciones usuario-proyecto para el proyecto específico
        const empleados = await Usuario.findAll({
            include: [
                {
                    model: UsuarioProyecto,
                    where: { id_proyecto },
                    attributes: [], // No necesitamos los datos de la relación, solo el usuario
                },
            ],
            where: { rol: 'empleado' }, // Filtrar solo usuarios con rol "empleado"
            attributes: ['id_usuario', 'nombre_usuario', 'correo'], // Atributos que queremos devolver
        });

        if (empleados.length > 0) {
            res.status(200).json(empleados);
        } else {
            res.status(404).json({ message: 'No se encontraron empleados asignados a este proyecto.' });
        }
    } catch (error) {
        console.error('Error al obtener empleados del proyecto:', error);
        res.status(500).json({ message: 'Error al obtener empleados del proyecto.' });
    }
};

exports.getEmpleadosPorProyecto = async (req, res) => {
    const { id_proyecto } = req.params;
  
    try {
      // Obtener empleados relacionados con el proyecto específico
      const empleados = await Usuario.findAll({
        include: [
          {
            model: UsuarioProyecto,
            where: { id_proyecto },
            attributes: [], // No necesitamos los atributos de UsuarioProyecto
          },
        ],
        where: { rol: 'Empleado' },
        attributes: ['id_usuario', 'nombre_usuario', 'email'], // Solo los campos necesarios
      });
  
      if (!empleados.length) {
        return res.status(404).json({ message: 'No hay empleados asignados a este proyecto.' });
      }
  
      res.status(200).json(empleados);
    } catch (error) {
      console.error('Error al obtener empleados por proyecto:', error);
      res.status(500).json({ error: 'Error al obtener empleados por proyecto.' });
    }
  };
