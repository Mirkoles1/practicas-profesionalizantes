// Components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token); // Guardar el token en localStorage

            // Redirigir según el rol del usuario
            if (response.data.rol === 'admin') {
                window.location.href = '/admin/dashboard'; // Ruta para admin
            } else {
                window.location.href = '/empleado/dashboard'; // Ruta para empleado
            }
        } catch (error) {
            alert('Error en las credenciales'); // Manejo de errores
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                placeholder="Usuario" 
                required 
            />
            <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Contraseña" 
                required 
            />
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default LoginForm;
