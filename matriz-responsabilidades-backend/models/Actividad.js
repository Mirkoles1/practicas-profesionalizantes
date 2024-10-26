const { DataTypes } = require('sequelize');
const sequelize = require('../database');  // Asegúrate de que la conexión sea correcta
const Proyecto = require('./Proyecto');    // Importar el modelo Proyecto

// Definir el modelo Actividad
const Actividad = sequelize.define('Actividad', {
    id_actividad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_actividad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: false,  // La actividad debe pertenecer a un proyecto
        references: {
            model: Proyecto,  // Relación con el modelo Proyecto
            key: 'id_proyecto',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'actividad',  // Nombre de la tabla en la base de datos
    timestamps: false,       // Sin createdAt y updatedAt
});

module.exports = Actividad;
