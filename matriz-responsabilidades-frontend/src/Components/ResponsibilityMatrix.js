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
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';

const ResponsibilityMatrix = () => {
    const [projects, setProjects] = useState([]);
    const [employees, setEmployees] = useState([]);  // Employees list
    const [newActivity, setNewActivity] = useState({ nombre_actividad: '', descripcion: '' });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [assignEmployeeDialogOpen, setAssignEmployeeDialogOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [selectedActivityId, setSelectedActivityId] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [projectData, setProjectData] = useState({ nombre_proyecto: '', descripcion: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        loadProjects();
        loadEmployees();
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
            const errorMessage = error.response?.data?.error || 'Error al cargar los proyectos.';
            setError(errorMessage);
        }
    };

    // Cargar empleados
    const loadEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/empleados`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEmployees(data);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error al cargar los empleados.';
            setError(errorMessage);
        }
    };

    // Manejar la apertura del diálogo para asignar un empleado
    const handleAssignEmployee = (projectId) => {
        setSelectedProjectId(projectId);
        setAssignEmployeeDialogOpen(true);
    };

    // Cerrar el diálogo de asignación de empleado
    const handleCloseAssignEmployeeDialog = () => {
        setAssignEmployeeDialogOpen(false);
        setSelectedEmployeeId(null);
    };

    // Asignar empleado al proyecto
    const handleAssignEmployeeToProject = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/proyectos/${selectedProjectId}/empleado`,
                { id_empleado: selectedEmployeeId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess('Empleado asignado exitosamente');
            handleCloseAssignEmployeeDialog();
            loadProjects(); // Recargar proyectos para ver cambios
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error al asignar el empleado.';
            setError(errorMessage);
        }
    };

    // Manejar la apertura del diálogo para agregar una nueva actividad
    const handleOpenDialog = (projectId) => {
        setSelectedProjectId(projectId);
        setDialogOpen(true);
    };

    // Cerrar el diálogo y resetear los campos
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setNewActivity({ nombre_actividad: '', descripcion: '' });
    };

    // Agregar una nueva actividad al proyecto seleccionado
    const handleAddActivity = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('No se encontró el token de autorización. Por favor, inicia sesión.');
                return;
            }

            await axios.post(
                `${process.env.REACT_APP_API_URL}/actividades`,
                { ...newActivity, id_proyecto: selectedProjectId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess('Actividad agregada exitosamente');
            handleCloseDialog();
            loadProjects(); // Recargar proyectos para actualizar actividades
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error al agregar la actividad.';
            console.log(errorMessage);
            setError(errorMessage);
        }
    };

    // Redirigir a la página de creación de proyecto
    const handleAddProject = () => {
        navigate('/crear-proyecto');
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
            const errorMessage = error.response?.data?.error || 'Error al actualizar el proyecto.';
            setError(errorMessage);
        }
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
            const errorMessage = error.response?.data?.error || 'Error al eliminar el proyecto.';
            setError(errorMessage);
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
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
                                    Fecha de Inicio: {project.fecha_inicio || 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Fecha de Fin: {project.fecha_fin || 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Estado: {project.estado || 'N/A'}
                                </Typography>

                                <Typography variant="h6" style={{ marginTop: '16px' }}>
                                    Actividades
                                </Typography>
                                {project.Actividades && project.Actividades.length > 0 ? (
                                    <ul>
                                        {project.Actividades.map((actividad) => (
                                            <li key={actividad.id_actividad}>
                                                <Typography variant="body2">
                                                    {actividad.nombre_actividad}: {actividad.descripcion}
                                                </Typography>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <Typography variant="body2" color="textSecondary">
                                        No hay actividades asignadas
                                    </Typography>
                                )}

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    style={{ marginTop: '10px', marginRight: '10px' }}
                                    onClick={() => handleOpenDialog(project.id_proyecto)}
                                >
                                    Crear Actividad
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

                                <Button
                                    variant="outlined"
                                    color="success"
                                    style={{ marginTop: '10px' }}
                                    onClick={() => handleAssignEmployee(project.id_proyecto)}
                                >
                                    Asignar Empleado
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Diálogo para asignar un empleado */}
            <Dialog open={assignEmployeeDialogOpen} onClose={handleCloseAssignEmployeeDialog}>
                <DialogTitle>Asignar Empleado al Proyecto</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel>Empleado</InputLabel>
                        <Select
                            value={selectedEmployeeId}
                            onChange={(e) => setSelectedEmployeeId(e.target.value)}
                        >
                            {employees.map((employee) => (
                                <MenuItem key={employee.id_empleado} value={employee.id_empleado}>
                                    {employee.nombre_empleado}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAssignEmployeeDialog} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleAssignEmployeeToProject} color="primary">
                        Asignar Empleado
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Diálogo para agregar nueva actividad */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Agregar Nueva Actividad</DialogTitle>
                <DialogContent>
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
