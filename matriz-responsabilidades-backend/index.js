// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./database'); // Conexión a la base de datos
const PORT = process.env.PORT || 4000;

// Middlewares de terceros
app.use(express.json());

// Importar modelos para definir relaciones
const Usuario = require('./models/Usuario');
const Empleado = require('./models/empleado');
const Proyecto = require('./models/Proyecto');
const Actividad = require('./models/Actividad');
const Asignacion = require('./models/Asignacion');

// Definir relaciones entre modelos
Proyecto.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Asignacion.belongsTo(Actividad, { foreignKey: 'id_actividad' });
Asignacion.belongsTo(Empleado, { foreignKey: 'id_empleado' });
Empleado.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Actividad.hasMany(Asignacion, { foreignKey: 'id_actividad' });
Empleado.hasMany(Asignacion, { foreignKey: 'id_empleado' });

// Sincronizar modelos con la base de datos
sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch((err) => console.error('Error al sincronizar la base de datos:', err));

// Middleware de autenticación y autorización
const { authenticate, isAdmin } = require('./middleware/authMiddleware');

// Importar rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const proyectoRoutes = require('./routes/proyectoRoutes');
const actividadRoutes = require('./routes/actividadRoutes');
const asignacionRoutes = require('./routes/asignacionRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');

// Rutas para los modelos
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', authenticate, proyectoRoutes);
app.use('/api/actividades', authenticate, actividadRoutes);
app.use('/api/asignaciones', authenticate, asignacionRoutes);
app.use('/api/empleados', empleadoRoutes); 

// Ruta para verificar permisos de administrador
app.use('/api/admin', authenticate, isAdmin, (req, res) => {
    res.json({ message: 'Bienvenido, administrador' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Inicializar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
