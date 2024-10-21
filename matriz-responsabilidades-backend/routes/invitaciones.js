// routes/invitaciones.js
const express = require('express');
const { Usuario, Proyecto, Invitacion } = require('../models');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu_correo@gmail.com',
        pass: 'tu_password' // Debe ser una contraseña de aplicación o configuración OAuth2
    }
});

// Enviar invitación por correo electrónico
router.post('/enviar', async (req, res) => {
    const { usuario_id, proyecto_id } = req.body;

    try {
        // Verificar que el usuario y el proyecto existan
        const usuario = await Usuario.findByPk(usuario_id);
        const proyecto = await Proyecto.findByPk(proyecto_id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        if (!proyecto) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        // Crear la invitación en la base de datos
        const invitacion = await Invitacion.create({
            usuario_id: usuario.id,
            proyecto_id: proyecto.id,
            estado: 'pendiente'
        });

        // Configurar las opciones del correo
        const mailOptions = {
            from: 'tu_correo@gmail.com',
            to: usuario.email, // Asegúrate de que `usuario.email` contenga el email válido
            subject: `Invitación al proyecto ${proyecto.nombre}`,
            text: `Has sido invitado al proyecto ${proyecto.nombre}. Acepta o rechaza la invitación.`,
        };

        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar correo:', error);
                return res.status(500).json({ error: 'Error al enviar el correo' });
            }
            console.log('Correo enviado:', info.response);
            res.json({ message: 'Invitación enviada correctamente', invitacion });
        });
    } catch (error) {
        console.error('Error al crear la invitación:', error);
        res.status(500).json({ error: 'Error al crear la invitación' });
    }
});

// Aceptar invitación
router.post('/aceptar', async (req, res) => {
    const { invitacionId } = req.body;

    try {
        const invitacion = await Invitacion.findByPk(invitacionId);

        if (!invitacion) {
            return res.status(404).json({ error: 'Invitación no encontrada' });
        }

        invitacion.estado = 'aceptada';
        await invitacion.save();
        res.json({ message: 'Invitación aceptada' });
    } catch (error) {
        console.error('Error al aceptar la invitación:', error);
        res.status(500).json({ error: 'Error al aceptar la invitación' });
    }
});

module.exports = router;
