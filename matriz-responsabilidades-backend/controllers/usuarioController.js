// controllers/usuarioController.js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// Registrar un usuario con rol predeterminado "Empleado"
exports.registerEmpleado = async (req, res) => {
    const { nombre_usuario, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Usuario.create({
            nombre_usuario,
            email,
            password: hashedPassword,
            rol: 'Empleado' // Rol predeterminado
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el empleado' });
    }
};

// Registro de usuario administrador
exports.register = async (req, res) => {
    const { nombre_usuario, email, password } = req.body; // Eliminar rol de los datos enviados
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Usuario.create({
            nombre_usuario,
            email,
            password: hashedPassword,
            rol: 'Administrador', // Rol fijo como "admin"
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


// Login de usuario
exports.login = async (req, res) => {
    const { nombre_usuario, password } = req.body;
    try {
        // Encuentra el usuario usando "username"
        const user = await Usuario.findOne({ where: { nombre_usuario } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Genera el token usando "id_usuario" en lugar de "id"
        const token = jwt.sign({ id_usuario: user.id_usuario, rol: user.rol }, SECRET, { expiresIn: '1h' });
        
        res.json({ token, user });      
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

