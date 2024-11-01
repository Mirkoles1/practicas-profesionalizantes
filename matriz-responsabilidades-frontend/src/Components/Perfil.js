// src/Components/Perfil.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Snackbar,
    Alert
} from '@mui/material';

const Perfil = () => {
    const [user, setUser] = useState({ nombre_usuario: '', email: '' });
    const [editData, setEditData] = useState({ nombre_usuario: '', email: '', password: '' });
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        const loadUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage("No se encontró el token. Inicia sesión nuevamente.");
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                setUser(response.data); // Guardar los datos en el estado `user`
            } catch (error) {
                console.error("Error al cargar datos del usuario:", error);
                setErrorMessage('No se pudieron cargar los datos del usuario');
            }
        };
        loadUserData();
    }, []);

    // Abrir y cerrar diálogos
    const handleOpenEditDialog = () => {
        // Configurar los campos de edición con los valores actuales de `user`
        setEditData({ nombre_usuario: user.nombre_usuario, email: user.email, password: '' });
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => setOpenEditDialog(false);
    const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

    // Actualizar datos del usuario
    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(
                `${process.env.REACT_APP_API_URL}/auth/update`,
                editData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Actualizar la información en el perfil después de la actualización
            setUser({ ...user, nombre_usuario: editData.nombre_usuario, email: editData.email });
            setSuccessMessage('Perfil actualizado exitosamente');
            handleCloseEditDialog();
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error al actualizar perfil';
            setErrorMessage(errorMessage);
        }
    };

    // Eliminar cuenta de usuario
    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/auth/delete`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.removeItem('token');
            alert('Cuenta eliminada exitosamente');
            window.location.href = '/';
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error al eliminar cuenta';
            setErrorMessage(errorMessage);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Perfil de Usuario
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body1"><strong>Nombre de Usuario:</strong> {user.nombre_usuario}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button variant="contained" color="primary" onClick={handleOpenEditDialog}>
                        Actualizar Perfil
                    </Button>
                    <Button variant="contained" color="error" onClick={handleOpenDeleteDialog}>
                        Eliminar Cuenta
                    </Button>
                </Box>
            </Paper>

            {/* Diálogo para Actualizar Perfil */}
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Actualizar Perfil</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Nombre de Usuario"
                        name="nombre_usuario"
                        value={editData.nombre_usuario}
                        onChange={(e) => setEditData({ ...editData, nombre_usuario: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Nueva Contraseña"
                        name="password"
                        type="password"
                        value={editData.password}
                        onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="secondary">Cancelar</Button>
                    <Button onClick={handleUpdate} color="primary">Guardar Cambios</Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo para Confirmar Eliminación */}
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Eliminar Cuenta</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="secondary">Cancelar</Button>
                    <Button onClick={handleDelete} color="error">Eliminar</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar para mensajes de éxito o error */}
            <Snackbar 
                open={!!successMessage || !!errorMessage} 
                autoHideDuration={6000} 
                onClose={() => { setSuccessMessage(null); setErrorMessage(null); }}
            >
                <Alert 
                    onClose={() => { setSuccessMessage(null); setErrorMessage(null); }} 
                    severity={successMessage ? 'success' : 'error'}
                >
                    {successMessage || errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Perfil;
