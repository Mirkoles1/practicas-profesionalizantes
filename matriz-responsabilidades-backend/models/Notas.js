const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Proyecto = require('./Proyecto');

const Notas = sequelize.define('Notas', {
    id_nota: {
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
    estadoProyecto: {
        type: DataTypes.ENUM('Pendiente', 'En Progreso', 'Completada'),
        allowNull: false,
        defaultValue: 'Pendiente',
    },
    id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: false,  // La asignación debe pertenecer a una actividad
        references: {
            model: Proyecto,
            key: 'id_proyecto',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'notas',
    timestamps: false,
});

module.exports = Notas;
