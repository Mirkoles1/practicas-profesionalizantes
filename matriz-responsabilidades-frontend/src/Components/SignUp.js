import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('empleado');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/api/auth/register', { username, password, rol });
            alert('Registro exitoso');
        } catch (error) {
            alert('Error al registrar usuario');
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required />
            <select value={rol} onChange={e => setRol(e.target.value)}>
                <option value="empleado">Empleado</option>
                <option value="admin">Administrador</option>
            </select>
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default SignUp;
