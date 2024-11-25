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
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // Importación de íconos
import DeleteIcon from '@mui/icons-material/Delete'; // Importación de íconos
import { useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [newActivity, setNewActivity] = useState({ nombre_actividad: '', descripcion: '' });
  const [newNote, setNewNote] = useState({ titulo: '', descripcion: '' });
  const [dialogActivityOpen, setDialogActivityOpen] = useState(false);
  const [dialogNoteOpen, setDialogNoteOpen] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [notas, setNotas] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [dialogAssignOpen, setDialogAssignOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedEmployeeForActivity, setSelectedEmployeeForActivity] = useState('');
  const [allEmployees, setAllEmployees] = useState([]); // Todos los empleados disponibles


  useEffect(() => {
    loadProjectDetails();
    loadEmployees();
    loadActividades();
    loadNotas();
    loadProjectActivities();
    loadEmployeesAll();
  }, []);

  const loadNotas = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/notas/proyectos/${projectId}/notas`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Notas cargadas:', response.data);

      setProject((prevProject) => ({
        ...prevProject,
        Notas: response.data,
      }));
    } catch (err) {
      console.error('Error completo:', err);
      const message = err.response?.data?.message || 'Error al cargar las notas del proyecto.';
      setError(message);
    }
  };
  

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

  const loadProjectActivities = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/actividades/${projectId}/usuarios-asignados`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActivities(data);
    } catch (err) {
      handleApiError(err, 'Error al cargar las asignaciones.');
      setError('Error al cargar las asignaciones.');
    }
  };

  const loadActividades = async () => {
    try {
        const token = localStorage.getItem('token');

        // Cargar actividades
        const actividadesResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/actividades/proyecto/${projectId}/`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setProject((prevProject) => ({
            ...prevProject,
            Actividades: actividadesResponse.data,
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

  const loadEmployeesAll = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/usuario_proyecto/proyectos/${projectId}/empleados`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEmployees(data);
    } catch (err) {
      handleApiError(err, 'Error al cargar los empleados.');
    }
  };

  const handleAssignEmployeeToActivity = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/asignaciones/`,
        { id_actividad: selectedActivity.id_actividad, id_usuario: selectedEmployeeForActivity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setSuccess('Empleado asignado con éxito a la actividad.');
      setDialogAssignOpen(false);
      setSelectedActivity(null);
      setSelectedEmployeeForActivity('');
      loadActividades(); // Actualiza las actividades
    } catch (err) {
      handleApiError(err, 'Error al asignar el empleado a la actividad.');
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

  const handleEditActivity = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_API_URL}/actividades/${editingActivity.id_actividad}`,
        { ...editingActivity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Actividad actualizada con éxito.');
      setDialogActivityOpen(false);
      setEditingActivity(null);
      loadActividades();
    } catch (err) {
      handleApiError(err, 'Error al editar la actividad.');
    }
  };

  const handleDeleteActivity = async (idActividad) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/actividades/${idActividad}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Actividad eliminada con éxito.');
      loadActividades();
    } catch (err) {
      handleApiError(err, 'Error al eliminar la actividad.');
    }
  };

  const openEditDialog = (activity) => {
    setEditingActivity(activity);
    setDialogActivityOpen(true);
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
    <button
    variant = "outlined"
    onClick={()=> navigate("/matriz")}>
    </button>
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
          {/* Solo el título tiene la navegación */}
          <Typography
            variant="h6"
            style={{ cursor: 'pointer', color: 'blue' }}
            onClick={() => navigate(`/activity/${activity.id_actividad}`)}
          >
            {activity.nombre_actividad}
          </Typography>
          <Typography>{activity.descripcion}</Typography>
          <Typography variant="body2" color="textSecondary">
            Estado: {activity.estadoActividad}
          </Typography>

          {/* Mostrar empleado asignado si existe */}
          {activity.usuariosAsignados ? (
            <Typography variant="body2" color="textPrimary">
              Asignado a: {activity.usuariosAsignados.nombre_usuario}
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Sin empleado asignado
            </Typography>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <IconButton onClick={() => openEditDialog(activity)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDeleteActivity(activity.id_actividad)}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setSelectedActivity(activity);
                setDialogAssignOpen(true);
              }}
            >
              Asignar Empleado
            </Button>
          </div>
        </Card>
      ))
    ) : (
      <Typography>No hay actividades asignadas.</Typography>
    )}

          <Button variant="contained" onClick={() => setDialogActivityOpen(true)} style={{ marginTop: '10px' }}>
            Agregar Actividad
          </Button>

          <Typography variant="h5" gutterBottom>
            Notas del Proyecto
          </Typography>
          {project?.Notas?.length > 0 ? (
            project.Notas.map((nota) => (
              <Card key={nota.id_nota} style={{ margin: '10px', padding: '10px' }}>
                <Typography variant="h6">{nota.titulo}</Typography>
                <Typography>{nota.descripcion}</Typography>
              </Card>
            ))
          ) : (
            <Typography>No hay notas disponibles.</Typography>
          )}

          <Button variant="contained" onClick={() => setDialogNoteOpen(true)} style={{ marginTop: '10px' }}>
            Agregar Nota
          </Button>

          <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Empleados Asignados al Proyecto
      </Typography>

      {employees.length > 0 ? (
        employees.map((employee) => (
          <Card key={employee.id_usuario} sx={{ marginBottom: 2, padding: 2 }}>
            <Typography variant="h6">{employee.nombre_usuario}</Typography>
            <Typography variant="body2" color="textSecondary">
              Email: {employee.email}
            </Typography>
          </Card>
        ))
      ) : (
        <Typography>No hay empleados asignados a este proyecto.</Typography>
      )}

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

<Dialog open={dialogAssignOpen} onClose={() => setDialogAssignOpen(false)}>
  <DialogTitle>Asignar Empleado a la Actividad</DialogTitle>
  <DialogContent>
    <FormControl fullWidth>
      <InputLabel>Empleado</InputLabel>
      <Select
        value={selectedEmployeeForActivity}
        onChange={(e) => setSelectedEmployeeForActivity(e.target.value)}
      >
        {employees.map((employee) => (
          <MenuItem key={employee.id_usuario} value={employee.id_usuario}>
            {employee.nombre_usuario}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDialogAssignOpen(false)} color="secondary">
      Cancelar
    </Button>
    <Button onClick={handleAssignEmployeeToActivity} color="primary">
      Asignar
    </Button>
  </DialogActions>
</Dialog>


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

      {/* Dialogs */}
      <Dialog open={dialogActivityOpen} onClose={() => setDialogActivityOpen(false)}>
        <DialogTitle>{editingActivity ? 'Editar Actividad' : 'Agregar Actividad'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre de la Actividad"
            value={editingActivity ? editingActivity.nombre_actividad : newActivity.nombre_actividad}
            onChange={(e) => {
              const value = e.target.value;
              if (editingActivity) {
                setEditingActivity({ ...editingActivity, nombre_actividad: value });
              } else {
                setNewActivity({ ...newActivity, nombre_actividad: value });
              }
            }}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Descripción"
            value={editingActivity ? editingActivity.descripcion : newActivity.descripcion}
            onChange={(e) => {
              const value = e.target.value;
              if (editingActivity) {
                setEditingActivity({ ...editingActivity, descripcion: value });
              } else {
                setNewActivity({ ...newActivity, descripcion: value });
              }
            }}
            margin="dense"
            multiline
            rows={3}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogActivityOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={editingActivity ? handleEditActivity : handleAddActivity}
            color="primary"
          >
            {editingActivity ? 'Guardar Cambios' : 'Guardar'}
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
