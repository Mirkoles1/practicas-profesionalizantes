import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card, CardHeader, CardContent, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField, Snackbar, Alert, Grid
} from '@mui/material';

const ResponsibilityMatrix = () => {
    const [projects, setProjects] = useState([]);
    const [newActivity, setNewActivity] = useState({ nombre_actividad: '', descripcion: '', id_proyecto: '' });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        loadProjects();
    }, []);

    // Función para cargar proyectos
    const loadProjects = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token de autorización no encontrado. Por favor, inicia sesión nuevamente.');
                return;
            }
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/proyectos`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProjects(data);
        } catch (error) {
            const errorMessage = error.response?.status === 401 
                ? 'No autorizado. Por favor, verifica tus credenciales.' 
                : `Error al cargar proyectos: ${error.message}`;
            setError(errorMessage);
        }
    };

    // Función para manejar la apertura del diálogo para agregar actividad
    const handleOpenDialog = (projectId) => {
        setSelectedProjectId(projectId);
        setDialogOpen(true);
    };

    // Función para cerrar el diálogo
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setNewActivity({ nombre_actividad: '', descripcion: '', id_proyecto: '' });
    };

    // Función para agregar una nueva actividad
    const handleAddActivity = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token de autorización no encontrado. Por favor, inicia sesión nuevamente.');
                return;
            }
            await axios.post(
                `${process.env.REACT_APP_API_URL}/actividades`,
                { ...newActivity, id_proyecto: selectedProjectId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Actividad agregada exitosamente');
            handleCloseDialog();
            loadProjects(); // Opcional, si deseas actualizar la lista de actividades en cada proyecto
        } catch (error) {
            const errorMessage = error.response?.status === 401 
                ? 'No autorizado para agregar actividad.' 
                : `Error al agregar actividad: ${error.message}`;
            setError(errorMessage);
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Typography variant="h3" gutterBottom>
                Matriz de Responsabilidades
            </Typography>
            <Grid container spacing={2}>
                {projects.map(project => (
                    <Grid item xs={12} key={project.id_proyecto}>
                        <Card style={{ padding: '16px', backgroundColor: '#fff' }}>
                            <CardHeader title={project.nombre_proyecto} />
                            <CardContent>
                                <Typography variant="body1" gutterBottom>
                                    {project.descripcion}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Fecha de Inicio: {project.fecha_inicio || 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Fecha de Fin: {project.fecha_fin || 'N/A'}
                                </Typography>
                                <Button 
                                    variant="outlined" 
                                    color="primary" 
                                    style={{ marginTop: '10px' }} 
                                    onClick={() => handleOpenDialog(project.id_proyecto)}
                                >
                                    Crear Actividad
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Agregar Nueva Actividad</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Llena los detalles de la nueva actividad para el proyecto.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre de la Actividad"
                        fullWidth
                        value={newActivity.nombre_actividad}
                        onChange={(e) => setNewActivity({ ...newActivity, nombre_actividad: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        fullWidth
                        multiline
                        rows={3}
                        value={newActivity.descripcion}
                        onChange={(e) => setNewActivity({ ...newActivity, descripcion: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleAddActivity} color="primary">
                        Agregar Actividad
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={!!success || !!error} autoHideDuration={6000} onClose={() => { setSuccess(null); setError(null); }}>
                <Alert onClose={() => { setSuccess(null); setError(null); }} severity={success ? "success" : "error"}>
                    {success || error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ResponsibilityMatrix;
