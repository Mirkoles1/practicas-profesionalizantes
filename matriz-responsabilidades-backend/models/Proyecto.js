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
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'proyecto',  // Asegúrate de que coincida con el nombre exacto de la tabla
    timestamps: true,  // Esto añade createdAt y updatedAt, asegúrate de que estos campos existan en tu tabla
});

module.exports = Proyecto;
