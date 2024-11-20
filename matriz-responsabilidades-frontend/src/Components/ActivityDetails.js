import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  Card,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ActivityDetails = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [newComentario, setNewComentario] = useState({ titulo: '', descripcion: '' });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadActivityDetails();
    loadComentarios();
  }, []);

  const loadActivityDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/actividades/${activityId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActivity(data);
    } catch (err) {
      setError('Error al cargar la actividad.');
    }
  };

  const loadComentarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/comentarios/actividad/${activityId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComentarios(data);
    } catch (err) {
      setError('Error al cargar los comentarios.');
    }
  };

  const handleAddComentario = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/comentarios`,
        { ...newComentario, id_actividad: activityId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Comentario añadido con éxito.');
      setNewComentario({ titulo: '', descripcion: '' });
      loadComentarios();
    } catch (err) {
      setError('Error al añadir el comentario.');
    }
  };

  const handleDeleteComentario = async (idComentario) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/comentarios/${idComentario}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Comentario eliminado con éxito.');
      loadComentarios();
    } catch (err) {
      setError('Error al eliminar el comentario.');
    }
  };

  const handleEditActivity = () => {
    navigate(`/edit-activity/${activityId}`); // Navegar a un componente para editar la actividad
  };

  const handleDeleteActivity = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/actividades/${activityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Actividad eliminada con éxito.');
      navigate('/projects'); // Redirigir al listado de proyectos
    } catch (err) {
      setError('Error al eliminar la actividad.');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {activity && (
        <>
          <Typography variant="h4">Actividad: {activity.nombre_actividad}</Typography>
          <Typography variant="h6">Descripción:</Typography>
          <Typography paragraph>{activity.descripcion}</Typography>

          <div style={{ marginTop: '20px' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEditActivity}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteActivity}
              style={{ marginLeft: '10px' }}
            >
              Eliminar
            </Button>
          </div>
        </>
      )}

      <Typography variant="h5" style={{ marginTop: '20px' }}>
        Comentarios de Avance
      </Typography>
      {comentarios.map((comentario) => (
        <Card key={comentario.id} style={{ margin: '10px', padding: '10px' }}>
          <div style={{ flexGrow: 1 }}>
            <Typography variant="h6">{comentario.titulo}</Typography>
            <Typography>{comentario.descripcion}</Typography>
            <Typography>{comentario.tiempo_publicacion}</Typography>
          </div>
          <IconButton
            onClick={() => handleDeleteComentario(comentario.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Card>
      ))}

      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Añadir Comentario
      </Typography>
      <TextField
        fullWidth
        label="Título"
        value={newComentario.titulo}
        onChange={(e) => setNewComentario({ ...newComentario, titulo: e.target.value })}
        margin="dense"
      />
      <TextField
        fullWidth
        label="Descripción"
        value={newComentario.descripcion}
        onChange={(e) => setNewComentario({ ...newComentario, descripcion: e.target.value })}
        margin="dense"
        multiline
        rows={3}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddComentario}
        style={{ marginTop: '10px' }}
      >
        Añadir Comentario
      </Button>

      <Snackbar
        open={!!success || !!error}
        autoHideDuration={6000}
        onClose={() => {
          setSuccess(null);
          setError(null);
        }}
      >
        <Alert severity={success ? 'success' : 'error'}>{success || error}</Alert>
      </Snackbar>
    </div>
  );
};

export default ActivityDetails;
