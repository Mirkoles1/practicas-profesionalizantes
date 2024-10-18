const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Asegúrate de que la conexión sea correcta

// Definir el modelo Proyecto, sincronizando con la tabla existente
const Proyecto = sequelize.define('Proyecto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,  // Campo opcional
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Activo',
    },
}, {
    tableName: 'proyecto',  // Asegúrate de que coincida con el nombre exacto de la tabla
    timestamps: false,  // Esto asegura que no se añada createdAt y UpdatedAt
});

module.exports = Proyecto;
