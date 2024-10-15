const { DataTypes } = require('sequelize');
const sequelize = require('../database');  // Importa la instancia de Sequelize

const Proyecto = sequelize.define('Proyecto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Activo'
    },
    fecha_inicio: {
        type: DataTypes.DATE,
    },
    fecha_fin: {
        type: DataTypes.DATE,
    }
});

module.exports = Proyecto;
