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
        res.status(500).json({ error: error.message });
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

// Actualizar datos de usuario
exports.updateUsuario = async (req, res) => {
    const { nombre_usuario, email, password } = req.body;
    const id_usuario = req.user.id_usuario; // ID del usuario desde el token

    try {
        // Si hay contraseña, cifrarla
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Actualizar usuario en la base de datos
        await Usuario.update(
            {
                nombre_usuario: nombre_usuario || req.user.nombre_usuario,
                email: email || req.user.email,
                password: hashedPassword || req.user.password
            },
            { where: { id_usuario } }
        );
        
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};

// Eliminar cuenta de usuario
exports.deleteUsuario = async (req, res) => {
    const id_usuario = req.user.id_usuario; // ID del usuario desde el token

    try {
        await Usuario.destroy({ where: { id_usuario } });
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};

// Obtener datos del usuario
exports.getUsuario = async (req, res) => {
    const id_usuario = req.user.id_usuario; // Se obtiene del token

    try {
        const usuario = await Usuario.findOne({
            where: { id_usuario },
            attributes: ['id_usuario', 'nombre_usuario', 'email'] // Solo devolver los campos necesarios
        });
        
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        res.status(500).json({ error: 'Error al obtener los datos del usuario' });
    }
};

// Obtener todos los empleados
exports.getEmpleados = async (req, res) => {
    try {
        const empleados = await Usuario.findAll({
            where: { rol: 'Empleado' },
            attributes: ['id_usuario', 'nombre_usuario', 'email'] // Solo devolver los campos necesarios
        });

        res.json(empleados);
    } catch (error) {
        console.error("Error al obtener empleados:", error);
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
};
