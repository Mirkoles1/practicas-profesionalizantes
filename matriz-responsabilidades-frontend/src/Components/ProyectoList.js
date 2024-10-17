import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProyectoList = () => {
    const [proyectos, setProyectos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/proyectos')
            .then(response => {
                setProyectos(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los proyectos:', error);
            });
    }, []);

    return (
        <div>
            <h1>Proyectos Activos</h1>
            <ul>
                {proyectos.map(proyecto => (
                    <li key={proyecto.id}>{proyecto.nombre} - {proyecto.estado}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProyectoList;
