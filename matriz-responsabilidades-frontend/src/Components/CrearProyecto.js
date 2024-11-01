// src/Components/CrearProyecto.js

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

const CrearProyecto = () => {
    const [proyecto, setProyecto] = useState({
        nombre_proyecto: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // Manejar el cambio en los campos del formulario
    const handleChange = (e) => {
        setProyecto({ ...proyecto, [e.target.name]: e.target.value });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Obtén el token de autorización
            await axios.post(
                `${process.env.REACT_APP_API_URL}/proyectos`,
                proyecto,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setSuccess('Proyecto creado exitosamente');
            setTimeout(() => navigate('/proyectos'), 1500); // Redirigir tras éxito
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error al crear el proyecto';
            setError(errorMessage);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Crear Nuevo Proyecto
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                    <TextField
                        label="Nombre del Proyecto"
                        name="nombre_proyecto"
                        value={proyecto.nombre_proyecto}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Descripción"
                        name="descripcion"
                        value={proyecto.descripcion}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                        margin="normal"
                    />
                    <TextField
                        label="Fecha de Inicio"
                        name="fecha_inicio"
                        type="date"
                        value={proyecto.fecha_inicio}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Fecha de Fin"
                        name="fecha_fin"
                        type="date"
                        value={proyecto.fecha_fin}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 2 }}
                    >
                        Crear Proyecto
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

export default CrearProyecto;
