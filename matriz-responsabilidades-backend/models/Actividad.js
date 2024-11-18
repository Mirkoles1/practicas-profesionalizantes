// models/Actividad.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Proyecto = require('./Proyecto'); // Asegúrate de importar el modelo Proyecto correctamente

const Actividad = sequelize.define('Actividad', {
    id_actividad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_actividad: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: false,  // La actividad debe estar asociada a un proyecto
        references: {
            model: Proyecto,  // Relación con el modelo Proyecto
            key: 'id_proyecto',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    estadoActividad: {
        type: DataTypes.ENUM('Pendiente', 'En Progreso', 'Completada'),
        allowNull: false,
        defaultValue: 'Pendiente',
    },
}, {
    tableName: 'actividad',
    timestamps: false,  // Usamos timestamps para registrar fechas de creación y actualización
});

// Relación con el modelo Proyecto (ya está definida en tu modelo de Proyecto, por lo que no es necesario duplicar aquí)
Actividad.belongsTo(Proyecto, { foreignKey: 'id_proyecto' });
Proyecto.hasMany(Actividad, { foreignKey: 'id_proyecto' });

module.exports = Actividad;
