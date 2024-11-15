const { DataTypes } = require('sequelize');
const sequelize = require('../database');  // Asegúrate de que la conexión sea correcta
const Actividad = require('./Actividad');  // Importar el modelo Actividad
const Usuario = require('./Usuario');      // Importar el modelo Usuario

// Definir el modelo Asignación
const Asignacion = sequelize.define('Asignacion', {
    id_asignacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_actividad: {
        type: DataTypes.INTEGER,
        allowNull: false,  // La asignación debe pertenecer a una actividad
        references: {
            model: Actividad,  // Relación con el modelo Actividad
            key: 'id_actividad',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    fecha_asignacion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('Pendiente', 'En Progreso', 'Completada'),
        allowNull: false,
        defaultValue: 'Pendiente',  // Estado por defecto es 'Pendiente'
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,  // La asignación debe pertenecer a un empleado
        references: {
            model: Usuario,  // Relación con el modelo Empleado
            key: 'id_usuario',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: true,   // Permite que el comentario sea nulo
    },
}, {
    tableName: 'asignacion',  // Nombre de la tabla en la base de datos
    timestamps: false,        // Sin createdAt y updatedAt
});

module.exports = Asignacion;
