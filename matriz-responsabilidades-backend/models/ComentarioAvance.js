const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Actividad = require('./Actividad');

const ComentarioAvance = sequelize.define('ComentarioAvance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tiempo_publicacion: {
        type: DataTypes.DATE,  // Asegúrate de que sea un tipo de dato adecuado (por ejemplo, DATE)
        allowNull: false,
        defaultValue: DataTypes.NOW // Asigna la fecha y hora actual por defecto
    },
    id_actividad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Actividad,
            key: 'id_actividad',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'comentarioavance',
    timestamps: false,
});

module.exports = ComentarioAvance;
