// controllers/usuarioController.js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// Registro de usuario administrador
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Usuario.create({
            username,
            email,
            password: hashedPassword,
            rol: 'Administrador',  // Solo administradores
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Login de usuario
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Usuario.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        const token = jwt.sign({ id: user.id_usuario, rol: user.rol }, SECRET, { expiresIn: '1h' });
        res.json({ token, rol: user.rol });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
