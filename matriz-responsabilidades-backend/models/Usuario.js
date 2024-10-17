const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Asegúrate de que la conexión sea correcta

// Definir el modelo Usuario, sincronizando con la tabla existente
const Usuario = sequelize.define('Usuario', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.ENUM('admin', 'empleado'),
        allowNull: false,
    },
}, {
    tableName: 'usuario',  // Asegúrate de que coincida con el nombre exacto de la tabla
    timestamps: true,  // Asegúrate de que tu tabla tenga createdAt y updatedAt
});

module.exports = Usuario;
