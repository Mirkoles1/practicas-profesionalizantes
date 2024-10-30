// CrearEmpleado.js

import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Snackbar, Alert, MenuItem } from '@mui/material';
import axios from 'axios';

const CrearEmpleado = () => {
    const [usuario, setUsuario] = useState({ nombre: '', email: '', rol: 'Empleado' });
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usuario.nombre || !usuario.email) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/usuario`, // Asegúrate de que esta ruta es correcta
                usuario,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Empleado creado exitosamente');
            setUsuario({ nombre: '', email: '', rol: 'Empleado' }); // Resetea el formulario
        } catch (error) {
            setError('Error al crear empleado');
        }
    };

    return (
        <Card style={{ maxWidth: 400, margin: '20px auto', padding: '20px' }}>
            <CardContent>
                <h2>Crear Empleado</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre"
                        name="nombre"
                        value={usuario.nombre}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={usuario.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        select
                        label="Rol"
                        name="rol"
                        value={usuario.rol}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="Empleado">Empleado</MenuItem>
                        <MenuItem value="Administrador">Administrador</MenuItem>
                    </TextField>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Crear
                    </Button>
                </form>
            </CardContent>
            <Snackbar open={!!success || !!error} autoHideDuration={6000} onClose={() => { setSuccess(null); setError(null); }}>
                <Alert severity={success ? "success" : "error"}>
                    {success || error}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default CrearEmpleado;
