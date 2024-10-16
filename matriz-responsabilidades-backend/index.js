const express = require('express');
const cors = require('cors');
const sequelize = require('./database');  // Conexión a la base de datos
const Proyecto = require('./models/Proyecto');  // Importa Proyecto (Empleado se importa en él)
const authRoutes = require('./routes/auth');  // Importa rutas de autenticación

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API del backend funcionando correctamente.');
});

// Sincroniza los modelos con la base de datos
sequelize.sync({ force: false })  // Usa { force: true } para reiniciar las tablas (solo en desarrollo)
    .then(() => {
        console.log('Tablas sincronizadas con éxito.');

        // Inicia el servidor solo si la sincronización es exitosa
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch(err => console.error('Error al sincronizar las tablas:', err));
