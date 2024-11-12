import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip } from 'recharts';

const Dashboard = () => {
  const [proyectos, setProyectos] = useState([]);

  // Dashboard.js - Ejemplo de configuración del token
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/api/proyectos', {
        headers: { Authorization: `Bearer ${token}` } // Incluye "Bearer "
    })
    .then(response => setProyectos(response.data))
    .catch(error => console.error('Error al obtener proyectos:', error));
  }, []);


  return (
    <div>
      <h1>Bienvenido, {user?.nombre_usuario}</h1>
      {user?.rol === 'admin' && <p>Eres administrador.</p>}
      <ul>
        {proyectos.map(proyecto => (
          <li key={proyecto.id} onClick={() => navigate(`/proyectos/${proyecto.id}`)}>
            {proyecto.nombre} - {proyecto.estado}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
