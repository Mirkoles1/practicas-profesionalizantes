const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Asegúrate de que la conexión sea correcta
const Usuario = require('./Usuario'); // Importar el modelo de Usuario

// Definir el modelo Empleado, sincronizando con la tabla existente
const Empleado = sequelize.define('Empleado', {
    id_empleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Relación con la tabla Usuario
        references: {
            model: Usuario,  // Referencia al modelo Usuario
            key: 'id_usuario',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'empleado',  // Asegúrate de que coincida con el nombre exacto de la tabla
    timestamps: false,  // No se añaden createdAt y updatedAt
});

module.exports = Empleado;
