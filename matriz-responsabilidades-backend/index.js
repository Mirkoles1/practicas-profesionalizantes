// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./database'); // Conexión a la base de datos
const PORT = process.env.PORT || 4000;
const cors = require('cors');

// Middlewares de terceros
app.use(express.json());

app.use(cors());

// Importar modelos para definir relaciones
const Usuario = require('./models/Usuario');
const Proyecto = require('./models/Proyecto');
const Actividad = require('./models/Actividad');
const Asignacion = require('./models/Asignacion');
const UsuarioProyecto = require('./models/UsuarioProyecto');

// Definir relaciones entre modelos
Asignacion.belongsTo(Actividad, { foreignKey: 'id_actividad' });
Asignacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });
UsuarioProyecto.belongsTo(Usuario, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
UsuarioProyecto.belongsTo(Proyecto, { foreignKey: 'id_proyecto', onDelete: 'CASCADE' });
Usuario.hasMany(Asignacion, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
Proyecto.hasMany(Actividad, { foreignKey: 'id_proyecto', onDelete: 'CASCADE' });
Actividad.belongsTo(Proyecto, { foreignKey: 'id_proyecto', onDelete: 'CASCADE' });

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
const usuarioProyectoRoutes = require('./routes/usuarioProyectoRoutes');

// Rutas para los modelos
app.use('/api/auth', usuarioRoutes);
app.use('/api/proyectos', authenticate, proyectoRoutes);
app.use('/api/actividades', authenticate, actividadRoutes);
app.use('/api/asignaciones', authenticate, asignacionRoutes);
app.use('/api/usuario_proyecto', usuarioProyectoRoutes);

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
