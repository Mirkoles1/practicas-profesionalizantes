// models/Empleado.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Empleado = sequelize.define('Empleado', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  puesto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Empleado;
