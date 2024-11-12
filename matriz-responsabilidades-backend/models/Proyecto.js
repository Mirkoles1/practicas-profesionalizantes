// models/Proyecto.js
const { DataTypes } = require('sequelize');

const sequelize = require('../database');
const UsuarioProyecto = require('./UsuarioProyecto'); // Importa el modelo

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
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'proyecto',
    timestamps: false,
});

// Define la relación entre Proyecto y UsuarioProyecto
Proyecto.hasMany(UsuarioProyecto, { foreignKey: 'id_proyecto' });

module.exports = Proyecto;
