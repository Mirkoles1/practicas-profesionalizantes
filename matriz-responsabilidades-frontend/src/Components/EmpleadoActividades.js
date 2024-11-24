import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Button,
    Grid,
    Snackbar,
    Alert,
} from '@mui/material';

const EmpleadoActividades = () => {
    const [actividades, setActividades] = useState([]);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadActividades();
    }, []);

    const loadActividades = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/actividades/empleado/actividades`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setActividades(data);
        } catch (error) {
            handleApiError(error, 'Error al cargar las actividades asignadas.');
        }
    };

    const handleMarcarCompletada = async (actividadId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${process.env.REACT_APP_API_URL}/actividades/${actividadId}/completada`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess('Actividad marcada como completada');
            loadActividades(); // Refrescar la lista de actividades
        } catch (error) {
            handleApiError(error, 'Error al completar la actividad.');
        }
    };

    const handleApiError = (error, defaultMessage) => {
        const errorMessage = error.response?.data?.error || defaultMessage;
        setError(errorMessage);
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Typography variant="h3" gutterBottom>
                Actividades Asignadas
            </Typography>

            <Grid container spacing={2}>
                {actividades.map((actividad) => (
                    <Grid item xs={12} key={actividad.id_actividad}>
                        <Card style={{ padding: '16px', backgroundColor: '#fff' }}>
                            <CardHeader title={actividad.nombre_actividad} />
                            <CardContent>
                                <Typography variant="body1" gutterBottom>
                                    {actividad.descripcion}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Proyecto: {actividad.Proyecto?.nombre_proyecto || 'Sin proyecto asociado'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Estado: {actividad.estadoActividad || 'Pendiente'}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '10px' }}
                                    disabled={actividad.estadoActividad === 'Completada'}
                                    onClick={() => handleMarcarCompletada(actividad.id_actividad)}
                                >
                                    {actividad.estadoActividad === 'Completada'
                                        ? 'Completada'
                                        : 'Marcar como Completada'}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Notificación de éxito o error */}
            <Snackbar open={!!success || !!error} autoHideDuration={6000} onClose={() => { setSuccess(null); setError(null); }}>
                <Alert onClose={() => { setSuccess(null); setError(null); }} severity={success ? 'success' : 'error'}>
                    {success || error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default EmpleadoActividades;
