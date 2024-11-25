import React, { useState, useEffect } from 'react'; // Importa los hooks de React
import axios from 'axios'; // Importa axios para hacer peticiones HTTP
import { useNavigate } from 'react-router-dom'; // Importa useNavigate de react-router-dom

const Dashboard = () => {
  const [proyectos, setProyectos] = useState([]);
  const navigate = useNavigate();

  // Intentamos cargar 'user' desde localStorage y verificar si existe
  let user = null;
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      user = JSON.parse(userData); // Solo parseamos si userData no es null
    }
  } catch (error) {
    console.error("Error al parsear el usuario desde localStorage:", error);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:4000/api/proyectos', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => setProyectos(response.data))
      .catch(error => console.error('Error al obtener proyectos:', error));
    } else {
      console.error('No token found');
    }
  }, []);

  return (
    <div>
      <h1>¡Bienvenido {user ? user.nombre_usuario + "!" : "Invitado! Por favor, inicie sesión"}</h1>
      {user?.rol === 'admin' && <p>Eres administrador.</p>}
      <ul>
        {proyectos.map(proyecto => (
          <li key={proyecto.id} onClick={() => navigate(`/proyectos/${proyecto.id}`)}>
            {proyecto.nombre_proyecto} - {proyecto.estado}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
