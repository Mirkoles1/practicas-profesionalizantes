import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProyectoDetalle = () => {
    const { id } = useParams();  // ID del proyecto desde la URL
    const navigate = useNavigate();

    const [proyecto, setProyecto] = useState({});
    const [actividades, setActividades] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [nuevaActividad, setNuevaActividad] = useState('');

    // Cargar datos del proyecto al montar el componente
    useEffect(() => {
        axios.get(`http://localhost:4000/api/proyectos/${id}`)
            .then(response => {
                setProyecto(response.data.proyecto);
                setActividades(response.data.actividades);
                setEmpleados(response.data.empleados);
            })
            .catch(error => console.error('Error al cargar proyecto:', error));
    }, [id]);

    // Manejar la creación de una nueva actividad
    const handleAgregarActividad = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:4000/api/proyectos/${id}/actividades`, {
            descripcion: nuevaActividad,
        })
        .then(response => {
            setActividades([...actividades, response.data]);
            setNuevaActividad('');  // Limpiar el campo
        })
        .catch(error => console.error('Error al agregar actividad:', error));
    };

    return (
        <div>
            <button onClick={() => navigate(-1)}>Volver</button>
            <h1>Detalles del Proyecto: {proyecto.nombre}</h1>
            <p><strong>Descripción:</strong> {proyecto.descripcion}</p>
            <p><strong>Estado:</strong> {proyecto.estado}</p>
            <p><strong>Fecha de inicio:</strong> {proyecto.fecha_inicio}</p>
            <p><strong>Fecha de fin:</strong> {proyecto.fecha_fin}</p>

            <h2>Actividades</h2>
            <ul>
                {actividades.map(actividad => (
                    <li key={actividad.id}>
                        {actividad.descripcion} - {actividad.estado}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleAgregarActividad}>
                <input 
                    type="text" 
                    placeholder="Nueva actividad" 
                    value={nuevaActividad} 
                    onChange={(e) => setNuevaActividad(e.target.value)} 
                    required 
                />
                <button type="submit">Agregar Actividad</button>
            </form>

            <h2>Empleados Asignados</h2>
            <ul>
                {empleados.map(empleado => (
                    <li key={empleado.id}>{empleado.nombre} - {empleado.puesto}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProyectoDetalle;
