// routes/auth.js
const express = require('express');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const SECRET = 'tu_secreto_jwt';


// Registro de usuario (Sign-up)
router.post('/register', async (req, res) => {
    const { username, email, password, rol } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Usuario.create({
            username,
            email,
            password: hashedPassword,
            rol
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'El nombre de usuario o correo ya existe o hubo un error.' });
    }
});



// Login de usuario
router.post('/login', async (req, res) => {
    const { username, password } = req.body;


    try {
        const user = await Usuario.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }


        // Generar un token JWT
        const token = jwt.sign({ id: user.id, rol: user.rol }, SECRET, { expiresIn: '1h' });
        res.json({ token, rol: user.rol });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;