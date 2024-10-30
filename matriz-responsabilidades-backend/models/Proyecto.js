// models/Proyecto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Proyecto = sequelize.define('Proyecto', {
    id_proyecto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_proyecto: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'proyecto',
    timestamps: false,
});

module.exports = Proyecto;
