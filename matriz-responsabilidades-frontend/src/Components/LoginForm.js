// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import {
    Button,
    TextField,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Container,
    Box,
} from '@mui/material';

function LoginForm({ setUser }) {
    const [credentials, setCredentials] = useState({ nombre_usuario: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));  // Asegurarse de almacenar el usuario
            setUser(data.user);
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || 'Login failed';
            alert(`Login failed: ${errorMessage}`);
        }
    };

    return (
        <Container 
            maxWidth="sm" 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh', 
                backgroundColor: '#f5f5f5' 
            }}
        >
            <Card sx={{ width: '100%', maxWidth: 400, boxShadow: 3, padding: 2 }}>
                <CardHeader
                    title={
                        <Typography 
                            variant="h5" 
                            component="h2" 
                            align="center" 
                            gutterBottom
                        >
                            Iniciar Sesión
                        </Typography>
                    }
                />
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <CardContent>
                        <TextField
                            label="Nombre de Usuario"
                            type="text"
                            value={credentials.nombre_usuario}
                            onChange={(e) =>
                                setCredentials({ ...credentials, nombre_usuario: e.target.value })
                            }
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            value={credentials.password}
                            onChange={(e) =>
                                setCredentials({ ...credentials, password: e.target.value })
                            }
                            fullWidth
                            margin="normal"
                            required
                        />
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            fullWidth
                        >
                            Iniciar Sesión
                        </Button>
                    </CardActions>
                </Box>
            </Card>
        </Container>
    );
}

export default LoginForm;
