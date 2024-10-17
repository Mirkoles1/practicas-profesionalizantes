// CrearProyecto.js
import React, { useState } from 'react';
import axios from 'axios';

const CrearProyecto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [email, setEmail] = useState('');

  const handleCrearProyecto = async (e) => {
    e.preventDefault();
    try {
      const { data: proyecto } = await axios.post('http://localhost:4000/api/proyectos', { nombre, descripcion });

      await axios.post('http://localhost:4000/api/invitaciones/enviar', {
        proyectoId: proyecto.id,
        email
      });

      alert('Proyecto creado e invitación enviada');
    } catch (error) {
      console.error('Error al crear proyecto:', error);
      alert('Error al crear proyecto');
    }
  };

  return (
    <form onSubmit={handleCrearProyecto}>
      <input type="text" placeholder="Nombre del proyecto" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <textarea placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
      <input type="email" placeholder="Correo del empleado" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Crear Proyecto</button>
    </form>
  );
};

export default CrearProyecto;
