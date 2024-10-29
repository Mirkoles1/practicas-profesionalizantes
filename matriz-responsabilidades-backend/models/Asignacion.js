const { DataTypes } = require('sequelize');
const sequelize = require('../database');  // Asegúrate de que la conexión sea correcta
const Actividad = require('./Actividad');  // Importar el modelo Actividad
const Empleado = require('./Empleado');    // Importar el modelo Empleado

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
    id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,  // La asignación debe pertenecer a un empleado
        references: {
            model: Empleado,  // Relación con el modelo Empleado
            key: 'id_empleado',
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
}, {
    tableName: 'asignacion',  // Nombre de la tabla en la base de datos
    timestamps: false,        // Sin createdAt y updatedAt
});

module.exports = Asignacion;
