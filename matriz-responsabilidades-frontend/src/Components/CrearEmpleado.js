// src/Components/CrearEmpleado.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    TextField, 
    Button, 
    Container, 
    Paper, 
    Typography, 
    Box, 
    Snackbar, 
    Alert 
} from '@mui/material';

const CrearEmpleado = () => {
    const [empleado, setEmpleado] = useState({
        nombre_usuario: '',
        email: '',
        password: '',
        rol: 'Empleado' // Asignación por defecto del rol
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // Manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        setEmpleado({ ...empleado, [e.target.name]: e.target.value });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Obtener el token de autorización
            await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/registerEmpleado`, 
                empleado, 
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setSuccess('Empleado creado exitosamente');
            // setTimeout(() => navigate('/empleados'), 1500); // Redirigir tras éxito
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error al crear el empleado';
            alert(`Error: ${errorMessage}`); // Mostrar error en una alerta
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Crear Nuevo Empleado
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                    <TextField
                        label="Nombre de Usuario"
                        name="nombre_usuario"
                        value={empleado.nombre_usuario}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Correo Electrónico"
                        name="email"
                        type="email"
                        value={empleado.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={empleado.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 2 }}
                    >
                        Crear Empleado
                    </Button>
                </Box>
            </Paper>

            {/* Snackbar de éxito o error */}
            <Snackbar 
                open={!!error || !!success} 
                autoHideDuration={6000} 
                onClose={() => { setError(null); setSuccess(null); }}
            >
                <Alert 
                    onClose={() => { setError(null); setSuccess(null); }} 
                    severity={success ? 'success' : 'error'}
                >
                    {success || error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CrearEmpleado;
