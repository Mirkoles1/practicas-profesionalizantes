// routes/auth.js
const express = require('express');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const SECRET = 'tu_secreto_jwt';

// Registro de usuario (Sign-up)
router.post('/register', async (req, res) => {
    const { username, password, rol } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Usuario.create({ username, password: hashedPassword, rol });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'El nombre de usuario ya existe o hubo un error.' });
    }
});

// Login de usuario (dividido por rol)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Usuario.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: user.id, rol: user.rol }, SECRET, { expiresIn: '1h' });
        res.json({ token, rol: user.rol });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
