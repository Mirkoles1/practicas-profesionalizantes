// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => (
  <nav style={{ backgroundColor: '#222', padding: '10px' }}>
    <ul style={{ display: 'flex', listStyle: 'none', justifyContent: 'space-around', margin: 0 }}>
      <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link></li>
      <li><Link to="/proyectos" style={{ color: 'white', textDecoration: 'none' }}>Proyectos</Link></li>

      {user?.rol === 'Administrador' && (
        <>
          <li><Link to="/matriz" style={{ color: 'white', textDecoration: 'none' }}>Matriz</Link></li>
        </>
      )}

      {!user && (
        <>
          <li><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></li>
          <li><Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Sign Up</Link></li>
        </>
      )}

      {user && (
        <li onClick={onLogout} style={{ color: 'white', cursor: 'pointer' }}>Log out</li>
      )}
    </ul>
  </nav>
);

export default Navbar;
