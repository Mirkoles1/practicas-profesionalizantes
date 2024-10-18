// models/Invitacion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Usuario = require('./Usuario');
const Proyecto = require('./Proyecto');

const Invitacion = sequelize.define('Invitacion', {
  usuarioId: {
    type: DataTypes.INTEGER,
    references: { model: Usuario, key: 'id' },
    allowNull: false,
  },
  proyectoId: {
    type: DataTypes.INTEGER,
    references: { model: Proyecto, key: 'id' },
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada'),
    defaultValue: 'pendiente',
  },
}, { tableName: 'invitacion', timestamps: false });

Usuario.belongsToMany(Proyecto, { through: Invitacion, as: 'proyectos' });
Proyecto.belongsToMany(Usuario, { through: Invitacion, as: 'usuarios' });

module.exports = Invitacion;
