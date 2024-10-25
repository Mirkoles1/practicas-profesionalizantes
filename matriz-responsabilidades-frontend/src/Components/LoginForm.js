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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="text" 
            placeholder="Usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
