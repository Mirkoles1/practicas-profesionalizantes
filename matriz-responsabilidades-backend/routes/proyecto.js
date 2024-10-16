// routes/proyectos.js
const express = require('express');
const Proyecto = require('../models/Proyecto');
const Empleado = require('../models/Empleado');

const router = express.Router();

// Crear un proyecto con empleados asociados
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, estado, empleados } = req.body;

    // Crea el proyecto
    const proyecto = await Proyecto.create({ nombre, descripcion, estado });

    // Asocia empleados al proyecto (si existen)
    if (empleados && empleados.length > 0) {
      const empleadosCreados = await Empleado.bulkCreate(
        empleados.map(e => ({ ...e, proyectoId: proyecto.id }))
      );
      proyecto.empleados = empleadosCreados;
    }

    res.json(proyecto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
