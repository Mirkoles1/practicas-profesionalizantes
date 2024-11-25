import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, TextField, Button, Snackbar, Alert } from '@mui/material';

const EmployeeActivityDetails = () => {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [state, setState] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/actividades/${activityId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setActivity(response.data);
      } catch (error) {
        console.error('Error al cargar actividad:', error);
      }
    };

    fetchActivity();
  }, [activityId]);

  const updateState = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_API_URL}/actividades/${activityId}`,
        { estadoActividad: state },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Estado actualizado');
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  return (
    <div>
      {activity && (
        <>
          <Typography variant="h4">Actividad para Empleados: {activity.nombre_actividad}</Typography>
          <Typography>{activity.descripcion}</Typography>
          <TextField
            label="Estado"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <Button variant="contained" onClick={updateState}>
            Cambiar Estado
          </Button>
          <Snackbar open={!!success}>
            <Alert severity="success">{success}</Alert>
          </Snackbar>
        </>
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

export default EmployeeActivityDetails;
