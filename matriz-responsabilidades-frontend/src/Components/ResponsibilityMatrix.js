// components/ResponsibilityMatrix.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardContent,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    Snackbar,
    Alert
} from '@mui/material';

const ResponsibilityMatrix = () => {
    const [projects, setProjects] = useState([]);
    const [projectData, setProjectData] = useState({ nombre_proyecto: '', descripcion: '' });
    const [editMode, setEditMode] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        loadProjects();
        loadProjectsProgreso();
    }, []);

    // Cargar proyectos asociados con el usuario
    const loadProjects = async () => {
        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user')); // Usuario desde localStorage

            if (!token || !user) {
                setError('No se encontró la sesión de usuario. Por favor, inicia sesión.');
                return;
            }

            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/proyectos/usuario/${user.id_usuario}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            

            setProjects(data);
        } catch (error) {
            handleApiError(error, 'Error al cargar los proyectos.');
        }
    };

    // Cargar proyectos asociados con el usuario y su progreso
const loadProjectsProgreso = async () => {
    try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user')); // Usuario desde localStorage

        if (!token || !user) {
            setError('No se encontró la sesión de usuario. Por favor, inicia sesión.');
            return;
        }

        const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/proyectos/proyectos/usuario/${user.id_usuario}/progreso`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setProjects(data);
    } catch (error) {
        handleApiError(error, 'Error al cargar los proyectos con Progreso.');
    }
};

const checkProyectoCompletado = async (projectId) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.put(
            `${process.env.REACT_APP_API_URL}/proyectos/proyecto/${projectId}/check-completado`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        setSuccess(data.message);
        loadProjects(); // Recargar los proyectos para reflejar los cambios
    } catch (error) {
        handleApiError(error, 'Error al verificar el estado del proyecto.');
    }
};


    // Manejo de errores comunes de API
    const handleApiError = (error, defaultMessage) => {
        const errorMessage = error.response?.data?.error || defaultMessage;
        setError(errorMessage);
    };

    // Manejar la apertura del modo de edición de proyecto
    const handleEditProject = (project) => {
        setProjectData({ nombre_proyecto: project.nombre_proyecto, descripcion: project.descripcion });
        setSelectedProjectId(project.id_proyecto);
        setEditMode(true);
    };

    // Actualizar proyecto
    const handleUpdateProject = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${process.env.REACT_APP_API_URL}/proyectos/${selectedProjectId}`,
                projectData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess('Proyecto actualizado exitosamente');
            setEditMode(false);
            loadProjects();
        } catch (error) {
            handleApiError(error, 'Error al actualizar el proyecto.');
        }
    };

    // Ver detalles del proyecto
    const handleViewProjectDetails = (projectId) => {
        navigate(`/proyecto-detalle/${projectId}`);
    };

    // Eliminar proyecto
    const handleDeleteProject = async (projectId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${process.env.REACT_APP_API_URL}/proyectos/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSuccess('Proyecto eliminado exitosamente');
            loadProjects();
        } catch (error) {
            handleApiError(error, 'Error al eliminar el proyecto.');
        }
    };

    // Redirigir a la página de creación de proyecto
    const handleAddProject = () => {
        navigate('/crear-proyecto');
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '60vh' }}>
            <Typography variant="h3" gutterBottom>
                Matriz de Responsabilidades
            </Typography>
            <Button variant="contained" color="primary" onClick={handleAddProject} style={{ marginBottom: '20px' }}>
                Agregar Proyecto
            </Button>
            <Grid container spacing={2}>
                {projects.map((project) => (
                    <Grid item xs={12} key={project.id_proyecto}>
                        <Card style={{ padding: '16px', backgroundColor: '#fff' }}>
                            <CardHeader title={project.nombre_proyecto} />
                            <CardContent>
                                <Typography variant="body1" gutterBottom>
                                    {project.descripcion}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Estado: {project.estado || 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Actividades Completadas: {project.actividadesCompletadas} / {project.totalActividades}
                                </Typography>

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    style={{ marginTop: '10px', marginRight: '10px' }}
                                    onClick={() => handleViewProjectDetails(project.id_proyecto)}
                                >
                                    Ver Detalles
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    style={{ marginTop: '10px', marginRight: '10px' }}
                                    onClick={() => handleEditProject(project)}
                                >
                                    Editar Proyecto
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="error"
                                    style={{ marginTop: '10px' }}
                                    onClick={() => handleDeleteProject(project.id_proyecto)}
                                >
                                    Eliminar Proyecto
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Formulario de edición de proyecto */}
            {editMode && (
                <Dialog open={editMode} onClose={() => setEditMode(false)}>
                    <DialogTitle>Editar Proyecto</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Nombre del Proyecto"
                                    fullWidth
                                    value={projectData.nombre_proyecto}
                                    onChange={(e) =>
                                        setProjectData({ ...projectData, nombre_proyecto: e.target.value })
                                    }
                                    margin="normal"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Descripción del Proyecto"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={projectData.descripcion}
                                    onChange={(e) =>
                                        setProjectData({ ...projectData, descripcion: e.target.value })
                                    }
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditMode(false)} color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={handleUpdateProject} color="primary">
                            Actualizar Proyecto
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Notificación de éxito o error */}
            <Snackbar open={!!success || !!error} autoHideDuration={6000} onClose={() => { setSuccess(null); setError(null); }}>
                <Alert onClose={() => { setSuccess(null); setError(null); }} severity={success ? "success" : "error"}>
                    {success || error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ResponsibilityMatrix;
