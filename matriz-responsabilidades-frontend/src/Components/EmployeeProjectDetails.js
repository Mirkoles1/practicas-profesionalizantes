import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Typography, Button, Snackbar, Alert } from '@mui/material';

const EmployeeProjectDetails = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleApiError = (error, defaultMessage) => {
    const errorMessage = error.response?.data?.error || defaultMessage;
    console.error('API Error:', errorMessage);
    setError(errorMessage);
  };

  useEffect(() => {
    const fetchAssignedActivities = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/asignaciones/actividades-asignadas`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Response data:', response.data); // Verificar datos del backend
        setActivities(response.data);
        setSuccess('Actividades asignadas cargadas con éxito.');
      } catch (error) {
        console.error('Error al cargar actividades asignadas:', error);
        handleApiError(error, 'Error al cargar las actividades asignadas.');
      }
    };

    fetchAssignedActivities();
  }, []);

  console.log('Activities state:', activities);

  return (
    <div>
      <Typography variant="h4">Mis Actividades Asignadas</Typography>
      {activities.length > 0 ? (
        activities.map((activity) => (
          <Card key={activity.id_actividad} style={{ margin: '10px', padding: '10px' }}>
            <Typography variant="h6">{activity.nombre_actividad}</Typography>
            <Typography>{activity.descripcion}</Typography>
            <Typography variant="body2" color="textSecondary">
              Estado: {activity.estadoActividad}
            </Typography>
            {activity.proyecto && (
              <Typography variant="body2" color="textPrimary">
                Proyecto: {activity.proyecto.nombre_proyecto}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/employee/activity/${activity.id_actividad}`)}
            >
              Ver Detalles
            </Button>
          </Card>
        ))
      ) : (
        <Typography>No tienes actividades asignadas.</Typography>
      )}

      <Snackbar
        open={!!success || !!error}
        autoHideDuration={6000}
        onClose={() => {
          setSuccess(null);
          setError(null);
        }}
      >
        <Alert
          onClose={() => {
            setSuccess(null);
            setError(null);
          }}
          severity={success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {success || error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EmployeeProjectDetails;
