// Components/LoginForm.js
import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Usuario:', username, 'Contraseña:', password);
    // Aquí puedes integrar la lógica de autenticación
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: 'auto', padding: '20px' }}>
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ width: '100%', margin: '5px 0', padding: '8px' }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ width: '100%', margin: '5px 0', padding: '8px' }}
      />
      <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;
