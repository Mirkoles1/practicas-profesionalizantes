import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProyectoListPage = () => {
    const [proyectos, setProyectos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/proyectos')
            .then(response => setProyectos(response.data))
            .catch(error => console.error('Error al cargar proyectos:', error));
    }, []);

    return (
        <div>
            <h1>Lista de Proyectos</h1>
            <ul>
                {proyectos.map(proyecto => (
                    <li key={proyecto.id}>
                        <Link to={`/proyectos/${proyecto.id}`}>
                            {proyecto.nombre}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/">Volver al Dashboard</Link>
        </div>
    );
};

export default ProyectoListPage;
