import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Typography, Button, Snackbar, Alert } from '@mui/material';

const UserProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = JSON.parse(localStorage.getItem('user')).id_usuario;
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/proyectos/usuario/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjects(response.data);
      } catch (error) {
        console.error('Error al cargar proyectos:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <Typography variant="h4">Mis Proyectos</Typography>
      {projects.map((project) => (
        <Card key={project.id_proyecto} style={{ margin: '10px', padding: '10px' }}>
          <Typography variant="h6">{project.nombre_proyecto}</Typography>
          <Typography>{project.descripcion}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/employee/project/${project.id_proyecto}`)}
          >
            Ver Detalles
          </Button>
        </Card>
      ))}
      {/* Notificación de éxito o error */}
      <Snackbar open={!!success || !!error} autoHideDuration={6000} onClose={() => { setSuccess(null); setError(null); }}>
                <Alert onClose={() => { setSuccess(null); setError(null); }} severity={success ? "success" : "error"}>
                    {success || error}
                </Alert>
            </Snackbar>
    </div>
  );
};

export default UserProjects;
