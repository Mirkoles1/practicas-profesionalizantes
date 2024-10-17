// models/Proyecto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Asegúrate de que la importación es correcta

// Definir el modelo Proyecto
const Proyecto = sequelize.define('Proyecto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Activo',
  },
  fecha_inicio: {
    type: DataTypes.DATE,
  },
  fecha_fin: {
    type: DataTypes.DATE,
  },
});

module.exports = Proyecto;
