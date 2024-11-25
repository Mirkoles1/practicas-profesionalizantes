import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const EmployeeActivityDetails = () => {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [state, setState] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [newComentario, setNewComentario] = useState({ titulo: '', descripcion: '' });

  useEffect(() => {
    loadComentarios();
  }, []);
  // Obtener los detalles de la actividad
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/actividades/${activityId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setActivity(response.data);
        setState(response.data.estadoActividad);
        setComments(response.data.comentarios || []); // Supone que la API devuelve comentarios
      } catch (error) {
        console.error('Error al cargar actividad:', error);
        setError('Error al cargar la actividad.');
      }
    };

    fetchActivity();
  }, [activityId]);

  // Actualizar el estado de la actividad
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
      setError('Error al actualizar el estado.');
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

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 4 }}>
      {activity && (
        <>
          <Typography variant="h4" gutterBottom>
            {activity.nombre_actividad}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {activity.descripcion}
          </Typography>

          {/* Estado de la actividad */}
          <FormControl fullWidth sx={{ marginY: 2 }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value="Pendiente">Pendiente</MenuItem>
              <MenuItem value="En Progreso">En Progreso</MenuItem>
              <MenuItem value="Completada">Completada</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={updateState}>
            Cambiar Estado
          </Button>

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
        </>
      )}

      {/* Notificaciones */}
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
    </Box>
  );
};

export default EmployeeActivityDetails;
