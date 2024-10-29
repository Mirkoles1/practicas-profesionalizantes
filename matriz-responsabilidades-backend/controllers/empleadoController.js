// controllers/empleadoController.js
const Empleado = require('../models/Empleado');

exports.createEmpleado = async (req, res) => {
    try {
        const { nombre, email, id_usuario } = req.body;
        const nuevoEmpleado = await Empleado.create({ nombre, email, id_usuario });
        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getAllEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.findAll();
        res.json(empleados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getEmpleadoById = async (req, res) => {
    try {
        const empleado = await Empleado.findByPk(req.params.id);
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        res.json(empleado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateEmpleado = async (req, res) => {
    try {
        const empleado = await Empleado.findByPk(req.params.id);
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        const { nombre, email } = req.body;
        await empleado.update({ nombre, email });
        res.json(empleado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEmpleado = async (req, res) => {
    try {
        const empleado = await Empleado.findByPk(req.params.id);
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        await empleado.destroy();
        res.status(204).send(); // No content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
