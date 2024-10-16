// routes/invitaciones.js

const express = require('express');
const { Usuario, Proyecto, Invitacion } = require('../models');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'tu_correo@gmail.com', pass: 'tu_password' }
});

// Enviar invitación por correo electrónico
router.post('/enviar', async (req, res) => {
    const { usuarioId, proyectoId } = req.body;

    try {
        const invitacion = await Invitacion.create({ usuario_id: usuarioId, proyecto_id: proyectoId });

        const usuario = await Usuario.findByPk(usuarioId);
        const proyecto = await Proyecto.findByPk(proyectoId);

        const mailOptions = {
            from: 'tu_correo@gmail.com',
            to: usuario.username,
            subject: `Invitación al proyecto ${proyecto.nombre}`,
            text: `Has sido invitado al proyecto ${proyecto.nombre}. Acepta o rechaza la invitación.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.status(500).json({ error: error.message });
            res.json({ message: 'Invitación enviada', invitacion });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Aceptar invitación
router.post('/aceptar', async (req, res) => {
    const { invitacionId } = req.body;

    try {
        const invitacion = await Invitacion.findByPk(invitacionId);
        invitacion.estado = 'aceptada';
        await invitacion.save();
        res.json({ message: 'Invitación aceptada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
