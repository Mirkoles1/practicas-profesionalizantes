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
sequelize.sync({ force: false, alter: false })  // Sin crear ni modificar tablas
    .then(() => {
        console.log('Conexión establecida con la base de datos.');
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch(err => console.error('Error al conectar a la base de datos:', err));

