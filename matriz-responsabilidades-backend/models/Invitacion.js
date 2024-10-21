// models/Invitacion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Usuario = require('./Usuario');
const Proyecto = require('./Proyecto');

const Invitacion = sequelize.define('invitacion', {
  // Otros campos...
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', // Nombre de la tabla
      key: 'id'
    }
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  proyecto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'proyectos',
      key: 'id'
    }
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada'),
    defaultValue: 'pendiente'
  }
}, {
  tableName: 'invitacion',  // Asegúrate de que coincida con el nombre exacto de la tabla
  timestamps: false,
});

module.exports = Invitacion;
