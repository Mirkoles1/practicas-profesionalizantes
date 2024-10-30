// controllers/proyectoController.js
const Proyecto = require('../models/Proyecto');

// Crear un nuevo proyecto
exports.createProyecto = async (req, res) => {
    const { nombre_proyecto, descripcion, fecha_inicio, fecha_fin, id_usuario } = req.body;
    try {
        const nuevoProyecto = await Proyecto.create({ nombre_proyecto, descripcion, fecha_inicio, fecha_fin, id_usuario });
        res.status(201).json(nuevoProyecto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los proyectos (solo para administradores)
exports.getProyectosAdmin = async (req, res) => {
    try {
        const proyectos = await Proyecto.findAll();
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener proyectos específicos para un empleado
exports.getProyectosEmpleado = async (req, res) => {
    const empleadoId = req.params.id;
    try {
        const proyectos = await Proyecto.findAll({ where: { id_usuario: empleadoId } });
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un proyecto
exports.updateProyecto = async (req, res) => {
    const { id } = req.params;
    const { nombre_proyecto, descripcion, fecha_inicio, fecha_fin, id_usuario } = req.body;
    try {
        await Proyecto.update({ nombre_proyecto, descripcion, fecha_inicio, fecha_fin, id_usuario }, { where: { id_proyecto: id } });
        res.json({ message: 'Proyecto actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un proyecto
exports.deleteProyecto = async (req, res) => {
    const { id } = req.params;
    try {
        await Proyecto.destroy({ where: { id_proyecto: id } });
        res.json({ message: 'Proyecto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener matriz de responsabilidades
exports.getMatrizResponsabilidades = async (req, res) => {
    try {
        const proyectos = await Proyecto.findAll({
            where: { id_usuario: req.user.id },
            include: [
                {
                    model: Actividad,
                    attributes: ['id_actividad', 'nombre_actividad', 'descripcion'],
                },
            ],
        });
        res.json(proyectos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la matriz de responsabilidades' });
    }
};
