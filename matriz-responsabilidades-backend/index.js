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
const ComentarioAvance = require('./models/ComentarioAvance');
const Notas = require('./models/Notas');

// Definir relaciones entre modelos
// Proyecto -> Actividad (1:n)
Proyecto.hasMany(Actividad, { foreignKey: 'id_proyecto', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Actividad.belongsTo(Proyecto, { foreignKey: 'id_proyecto', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Actividad -> ComentarioAvance (1:n)
Actividad.hasMany(ComentarioAvance, { foreignKey: 'id_actividad', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
ComentarioAvance.belongsTo(Actividad, { foreignKey: 'id_actividad', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Actividad -> Asignacion (1:n)
Actividad.hasMany(Asignacion, { foreignKey: 'id_actividad', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Asignacion.belongsTo(Actividad, { foreignKey: 'id_actividad', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Usuario -> Asignacion (1:n)
Usuario.hasMany(Asignacion, { foreignKey: 'id_usuario', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Asignacion.belongsTo(Usuario, { foreignKey: 'id_usuario', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Proyecto -> Notas (1:n)
Proyecto.hasMany(Notas, { foreignKey: 'id_proyecto', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Notas.belongsTo(Proyecto, { foreignKey: 'id_proyecto', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Usuario -> Proyecto (m:n)
Usuario.belongsToMany(Proyecto, { through: UsuarioProyecto, foreignKey: 'id_usuario', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Proyecto.belongsToMany(Usuario, { through: UsuarioProyecto, foreignKey: 'id_proyecto', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

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
const comentarioAvanceRoutes = require('./routes/comentarioAvanceRoutes');
const notasRoutes = require('./routes/notasRoutes');

// Rutas para los modelos
app.use('/api/auth', usuarioRoutes);
app.use('/api/proyectos', authenticate, proyectoRoutes);
app.use('/api/actividades', authenticate, actividadRoutes);
app.use('/api/asignaciones', authenticate, asignacionRoutes);
app.use('/api/usuario_proyecto', usuarioProyectoRoutes);
app.use('/api/comentarios', comentarioAvanceRoutes);
app.use('/api/notas', notasRoutes);

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

