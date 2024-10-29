// src/components/ResponsibilityMatrix.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Card, 
    CardHeader, 
    CardContent, 
    Button, 
    TextField, 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableRow, 
    Paper 
} from '@mui/material';

const ResponsibilityMatrix = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ nombre_proyecto: '', descripcion: '' });
    const [newActivity, setNewActivity] = useState({ nombre_actividad: '', descripcion: '', id_proyecto: '' });

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/proyectos`);
            setProjects(data);
        } catch (error) {
            alert(`Error al cargar proyectos: ${error.message}`);
        }
    };

    const handleAddProject = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/proyectos`, newProject);
            setNewProject({ nombre_proyecto: '', descripcion: '' });
            loadProjects();
        } catch (error) {
            alert(`Error al agregar proyecto: ${error.message}`);
        }
    };

    const handleAddActivity = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/actividades`, newActivity);
            setNewActivity({ nombre_actividad: '', descripcion: '', id_proyecto: '' });
            loadProjects();
        } catch (error) {
            alert(`Error al agregar actividad: ${error.message}`);
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/proyectos/${projectId}`);
            loadProjects();
        } catch (error) {
            alert(`Error al eliminar proyecto: ${error.message}`);
        }
    };

    const handleDeleteActivity = async (activityId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/actividades/${activityId}`);
            loadProjects();
        } catch (error) {
            alert(`Error al eliminar actividad: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Typography variant="h3" gutterBottom>
                Matriz de Responsabilidades
            </Typography>

            <Card style={{ marginBottom: '20px', padding: '16px' }}>
                <CardHeader title="Agregar Proyecto" />
                <CardContent>
                    <TextField
                        fullWidth
                        label="Nombre del Proyecto"
                        value={newProject.nombre_proyecto}
                        onChange={(e) => setNewProject({ ...newProject, nombre_proyecto: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Descripción"
                        multiline
                        rows={4}
                        value={newProject.descripcion}
                        onChange={(e) => setNewProject({ ...newProject, descripcion: e.target.value })}
                        margin="normal"
                    />
                    <Button 
                        onClick={handleAddProject} 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        Agregar Proyecto
                    </Button>
                </CardContent>
            </Card>

            {projects.map((project) => (
                <Card key={project.id_proyecto} style={{ marginBottom: '20px', padding: '16px' }}>
                    <CardHeader title={project.nombre_proyecto} />
                    <CardContent>
                        <Typography variant="body1" paragraph>
                            {project.descripcion}
                        </Typography>
                        <Button 
                            onClick={() => handleDeleteProject(project.id_proyecto)} 
                            variant="contained" 
                            color="error"
                        >
                            Eliminar Proyecto
                        </Button>

                        <Typography variant="h6" style={{ marginTop: '20px' }}>
                            Actividades
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {project.actividades?.map((activity) => (
                                        <TableRow key={activity.id_actividad}>
                                            <TableCell>{activity.nombre_actividad}</TableCell>
                                            <TableCell>{activity.descripcion}</TableCell>
                                            <TableCell>
                                                <Button 
                                                    variant="contained" 
                                                    color="error" 
                                                    onClick={() => handleDeleteActivity(activity.id_actividad)}
                                                >
                                                    Eliminar Actividad
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <div style={{ marginTop: '20px' }}>
                            <TextField
                                fullWidth
                                label="Nombre de la Actividad"
                                value={newActivity.nombre_actividad}
                                onChange={(e) => setNewActivity({ 
                                    ...newActivity, 
                                    nombre_actividad: e.target.value, 
                                    id_proyecto: project.id_proyecto 
                                })}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Descripción"
                                multiline
                                rows={4}
                                value={newActivity.descripcion}
                                onChange={(e) => setNewActivity({ 
                                    ...newActivity, 
                                    descripcion: e.target.value 
                                })}
                                margin="normal"
                            />
                            <Button 
                                onClick={handleAddActivity} 
                                variant="contained" 
                                color="primary" 
                                fullWidth
                                style={{ marginTop: '10px' }}
                            >
                                Agregar Actividad
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ResponsibilityMatrix;
