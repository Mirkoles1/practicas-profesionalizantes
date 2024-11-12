import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip } from 'recharts';

const Dashboard = () => {
  const [proyectos, setProyectos] = useState([]);

  // Dashboard.js - Ejemplo de configuración del token
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/api/proyectos', {
<<<<<<< HEAD
      headers: { Authorization: token }
    }).then(response => setProyectos(response.data));
  }, []);

  const data = proyectos.map(p => ({
    name: p.nombre,
    value: p.empleados.length,
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" />
      <Tooltip />
    </PieChart>
=======
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
>>>>>>> Frontend
  );
};

export default Dashboard;
