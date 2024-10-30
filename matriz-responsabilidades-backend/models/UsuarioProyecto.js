// models/UsuarioProyecto.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Usuario = require('./Usuario');
const Proyecto = require('./Proyecto');

const UsuarioProyecto = sequelize.define('UsuarioProyecto', {
    id_usuario_proyecto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id_usuario',
        },
        onDelete: 'CASCADE',  // Elimina en cascada
    },
    id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Proyecto,
            key: 'id_proyecto',
        },
        onDelete: 'CASCADE',  // Elimina en cascada
    },
}, {
    tableName: 'usuario_proyecto',
    timestamps: false,
});

UsuarioProyecto.belongsTo(Usuario, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
UsuarioProyecto.belongsTo(Proyecto, { foreignKey: 'id_proyecto', onDelete: 'CASCADE' });

module.exports = UsuarioProyecto;
