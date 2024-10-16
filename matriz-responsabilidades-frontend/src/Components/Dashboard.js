import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip } from 'recharts';

const Dashboard = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/api/proyectos', {
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
  );
};

export default Dashboard;
