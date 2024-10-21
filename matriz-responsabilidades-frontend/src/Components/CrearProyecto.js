// Components/ CrearProyecto.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrearProyecto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:4000/api/auth/usuarios', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, []);

  const handleCrearProyecto = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('Token enviado:', token);  // Verifica si el token está presente
    try {
      const response = await axios.post(
        'http://localhost:4000/api/proyectos',
        {
          nombre,
          descripcion,
          usuarios: usuariosSeleccionados,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Proyecto creado e invitaciones enviadas');
      console.log('Proyecto:', response.data);
    } catch (error) {
      console.error('Error al crear proyecto:', error);
      alert(`Error al crear proyecto: ${error.response?.data?.error || error.message}`);
    }
  };
  

  return (
    <form onSubmit={handleCrearProyecto}>
      <input
        type="text"
        placeholder="Nombre del proyecto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
      <select
        multiple
        onChange={(e) =>
          setUsuariosSeleccionados(
            [...e.target.selectedOptions].map((option) => option.value)
          )
        }
      >
        {usuarios.map((usuario) => (
          <option key={usuario.id} value={usuario.id}>
            {usuario.username} - {usuario.rol}
          </option>
        ))}
      </select>
      <button type="submit">Crear Proyecto</button>
    </form>
  );
};

export default CrearProyecto;
