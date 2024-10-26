// Components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('empleado');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        username,
        email,
        password,
        rol,
      });
      alert('Registro exitoso');
    } catch (error) {
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-6 text-center">Registrarse</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input 
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            placeholder="Usuario" 
            required 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Correo Electrónico" 
            required 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Contraseña" 
            required 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
          <select 
            value={rol} 
            onChange={e => setRol(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="empleado">Empleado</option>
            <option value="admin">Administrador</option>
          </select>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
