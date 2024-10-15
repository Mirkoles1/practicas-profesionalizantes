const express = require('express');
const cors = require('cors');
const sequelize = require('./database');  // Conexión a la base de datos

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de ejemplo
app.get('/', (req, res) => {
    res.send('API del backend funcionando correctamente.');
});

// Iniciar el servidor y conectar a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa.');
        app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
    })
    .catch(err => console.error('Error al conectar la base de datos:', err));
