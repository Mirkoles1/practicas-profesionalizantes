const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const UsuarioProyecto = sequelize.define('UsuarioProyecto', {
    id_usuario_proyecto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'usuario_proyecto',
    timestamps: false,
});

module.exports = UsuarioProyecto;
