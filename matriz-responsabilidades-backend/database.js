const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('matriz_responsabilidades_bd', 'root', '24042006', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;

const Proyecto = require('./models/Proyecto');

// Crear un proyecto
exports.crearProyecto = async (req, res) => {
    try {
        const nuevoProyecto = await Proyecto.create(req.body);
        res.json(nuevoProyecto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los proyectos
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.findAll();
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
