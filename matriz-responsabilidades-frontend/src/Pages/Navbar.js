// Components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ backgroundColor: '#222', padding: '10px' }}>
    <ul style={{ display: 'flex', listStyle: 'none', justifyContent: 'space-around', margin: 0 }}>
      <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</Link></li>
      <li><Link to="/proyectos" style={{ color: 'white', textDecoration: 'none' }}>Proyectos</Link></li>
      <li><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></li>
      <li><Link to="/SignUp" style={{ color: 'white', textDecoration: 'none' }}>SignUp</Link></li>
    </ul>
  </nav>
);

export default Navbar;
