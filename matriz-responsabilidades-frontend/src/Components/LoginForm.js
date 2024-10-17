// Components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { username, password });
      const { token, rol } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ username, rol }));
      setUser({ username, rol });

      navigate('/'); // Redirige al dashboard
    } catch (error) {
      alert('Error en las credenciales');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
