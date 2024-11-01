// src/components/SignUp.js

import React, { useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Container,
    Box,
    Typography,
    Paper,
} from '@mui/material';

const SignUp = () => {
    const [nombre_usuario, setNombreUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // El rol se establece directamente a "admin"
    const rol = 'Administrador';

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
                nombre_usuario,
                email,
                password,
                rol,  // Rol fijo como "admin"
            });
            alert('Registro exitoso');
        } catch (error) {
          const errorMessage = error.response?.data?.error || error.message || 'Error';
          alert(`Error: ${errorMessage}`);
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                    Registrarse como Administrador
                </Typography>
                <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Usuario"
                        value={nombre_usuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Correo Electrónico"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Registrarse
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignUp;
