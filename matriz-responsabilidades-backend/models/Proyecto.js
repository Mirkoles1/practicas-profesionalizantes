const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const UsuarioProyecto = require('./UsuarioProyecto'); // Importa el modelo UsuarioProyecto

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
    estado: {
        type: DataTypes.ENUM('Pendiente', 'En Progreso', 'Completado'),
        allowNull: false,
        defaultValue: 'Pendiente', // Valor por defecto
    }
}, {
    tableName: 'proyecto',
    timestamps: false,
});

// Define la relación entre Proyecto y UsuarioProyecto
Proyecto.hasMany(UsuarioProyecto, { foreignKey: 'id_proyecto', onDelete: 'CASCADE' });

module.exports = Proyecto;