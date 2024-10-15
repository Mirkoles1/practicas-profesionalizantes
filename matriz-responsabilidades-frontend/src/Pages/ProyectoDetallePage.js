import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProyectoDetallePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [proyecto, setProyecto] = useState({});
    const [actividades, setActividades] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/proyectos/${id}`)
            .then(response => {
                setProyecto(response.data.proyecto);
                setActividades(response.data.actividades);
            })
            .catch(error => console.error('Error al cargar detalles:', error));
    }, [id]);

    return (
        <div>
            <button onClick={() => navigate(-1)}>Volver</button>
            <h1>{proyecto.nombre}</h1>
            <p><strong>Descripción:</strong> {proyecto.descripcion}</p>
            <p><strong>Estado:</strong> {proyecto.estado}</p>

            <h2>Actividades</h2>
            <ul>
                {actividades.map(actividad => (
                    <li key={actividad.id}>
                        {actividad.descripcion} - {actividad.estado}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProyectoDetallePage;
