import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  Alert,
} from '@mui/material';

const ProjectDetails = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [newActivity, setNewActivity] = useState({ nombre_actividad: '', descripcion: '' });
  const [newNote, setNewNote] = useState({ titulo: '', descripcion: '' });
  const [dialogActivityOpen, setDialogActivityOpen] = useState(false);
  const [dialogNoteOpen, setDialogNoteOpen] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProjectDetails();
    loadEmployees();
    loadActividadesyNotas();
  }, []);

  const loadProjectDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/proyectos/${projectId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProject(data);
    } catch (err) {
      handleApiError(err, 'Error al cargar el proyecto.');
    }
  };

  const loadActividadesyNotas = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/proyectos/${projectId}/actividades-y-notas`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Separa actividades y notas
      setProject((prevProject) => ({
        ...prevProject,
        Actividades: data.actividades,
        Notas: data.notas,
      }));
    } catch (err) {
      handleApiError(err, 'Error al cargar actividades y notas.');
    }
  };
  

  const loadEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/empleados`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEmployees(data);
    } catch (err) {
      handleApiError(err, 'Error al cargar los empleados.');
    }
  };

  const handleApiError = (error, defaultMessage) => {
    const message = error.response?.data?.error || defaultMessage;
    setError(message);
  };

  const handleAddActivity = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/actividades`,
        { ...newActivity, id_proyecto: projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Actividad creada con éxito.');
      setNewActivity({ nombre_actividad: '', descripcion: '' });
      setDialogActivityOpen(false);
      loadProjectDetails();
    } catch (err) {
      handleApiError(err, 'Error al agregar la actividad.');
    }
  };

  const handleAddNote = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/notas`,
        { ...newNote, id_proyecto: projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Nota creada con éxito.');
      setNewNote({ titulo: '', descripcion: '' });
      setDialogNoteOpen(false);
      loadProjectDetails();
    } catch (err) {
      handleApiError(err, 'Error al agregar la nota.');
    }
  };

  const handleAssignEmployeeToProject = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/usuario_proyecto/asignar`,
        { id_usuario: selectedEmployee, id_proyecto: projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Empleado asignado con éxito al proyecto.');
      setSelectedEmployee('');
      loadProjectDetails();
    } catch (err) {
      handleApiError(err, 'Error al asignar el empleado al proyecto.');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {project && (
        <>
          <Typography variant="h4" gutterBottom>
            Proyecto: {project.nombre_proyecto}
          </Typography>
          <Typography variant="h6">Descripción:</Typography>
          <Typography paragraph>{project.descripcion}</Typography>

          <Typography variant="h5" gutterBottom>
            Actividades
          </Typography>
          {project.Actividades?.length > 0 ? (
            project.Actividades.map((activity) => (
              <Card key={activity.id_actividad} style={{ margin: '10px', padding: '10px' }}>
                <Typography variant="h6">{activity.nombre_actividad}</Typography>
                <Typography>{activity.descripcion}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Estado: {activity.estadoActividad}
                </Typography>
                {activity.Usuarios && (
                  <ul>
                    {activity.Usuarios.map((user) => (
                      <li key={user.id_usuario}>{user.nombre_usuario}</li>
                    ))}
                  </ul>
                )}
              </Card>
            ))
          ) : (
            <Typography>No hay actividades asignadas.</Typography>
          )}

          <Button variant="contained" onClick={() => setDialogActivityOpen(true)} style={{ marginTop: '10px' }}>
            Agregar Actividad
          </Button>

          <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
            Notas
          </Typography>
          {project.Notas?.length > 0 ? (
            project.Notas.map((note) => (
              <Card key={note.id_nota} style={{ margin: '10px', padding: '10px' }}>
                <Typography variant="h6">{note.titulo}</Typography>
                <Typography>{note.descripcion}</Typography>
              </Card>
            ))
          ) : (
            <Typography>No hay notas disponibles.</Typography>
          )}

          <Button variant="contained" onClick={() => setDialogNoteOpen(true)} style={{ marginTop: '10px' }}>
            Agregar Nota
          </Button>

          <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
            Asignar Empleado al Proyecto
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Empleado</InputLabel>
            <Select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
              {employees.map((employee) => (
                <MenuItem key={employee.id_usuario} value={employee.id_usuario}>
                  {employee.nombre_usuario}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAssignEmployeeToProject}
            style={{ marginTop: '10px' }}
          >
            Asignar
          </Button>
        </>
      )}

      {/* Dialogs */}
      <Dialog open={dialogActivityOpen} onClose={() => setDialogActivityOpen(false)}>
        <DialogTitle>Agregar Actividad</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre de la Actividad"
            value={newActivity.nombre_actividad}
            onChange={(e) => setNewActivity({ ...newActivity, nombre_actividad: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Descripción"
            value={newActivity.descripcion}
            onChange={(e) => setNewActivity({ ...newActivity, descripcion: e.target.value })}
            margin="dense"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogActivityOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddActivity} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogNoteOpen} onClose={() => setDialogNoteOpen(false)}>
        <DialogTitle>Agregar Nota</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Título"
            value={newNote.titulo}
            onChange={(e) => setNewNote({ ...newNote, titulo: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Descripción"
            value={newNote.descripcion}
            onChange={(e) => setNewNote({ ...newNote, descripcion: e.target.value })}
            margin="dense"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogNoteOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddNote} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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

export default ProjectDetails;
