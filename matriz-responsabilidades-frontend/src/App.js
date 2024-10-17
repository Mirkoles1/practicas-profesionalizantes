// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Pages/Header';
import Navbar from './Pages/Navbar';
import Footer from './Pages/Footer';
import Dashboard from './Components/Dashboard';
import ProyectoList from './Components/ProyectoList';
import ProyectoDetalle from './Components/ProyectoDetalle';
import LoginForm from './Components/LoginForm';
import SignUp from './Components/SignUp';
import CrearProyecto from './Components/CrearProyecto'; // Nueva página para admin

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('user');
    if (token && usuario) setUser(JSON.parse(usuario)); // Cargar usuario desde localStorage
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const ProtectedRoute = ({ element, roles }) => {
    if (!user) return <Navigate to="/login" />; // Redirige si no hay sesión
    if (roles && !roles.includes(user.rol)) return <Navigate to="/" />; // Redirige si el rol no es permitido
    return element;
  };

  return (
    <Router>
      <Header username={user?.username} />
      <Navbar user={user} onLogout={handleLogout} />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/proyectos" element={<ProyectoList />} />
          <Route path="/proyectos/:id" element={<ProyectoDetalle />} />
          <Route
            path="/crear-proyecto"
            element={<ProtectedRoute element={<CrearProyecto />} roles={['admin']} />}
          />
          <Route path="/login" element={user ? <Navigate to="/" /> : <LoginForm setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
