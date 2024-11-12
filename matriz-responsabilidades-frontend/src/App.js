// App.js


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Header from './Pages/Header';
import Footer from './Pages/Footer';
import Navbar from './Pages/Navbar';
import Dashboard from './Components/Dashboard';
import ProyectoList from './Components/ProyectoList';
import ProyectoDetalle from './Components/ProyectoDetalle';
import LoginForm from './Components/LoginForm';
import SignUp from './Components/SignUp';
import ResponsibilityMatrix from './Components/ResponsibilityMatrix';
import CrearEmpleado from './Components/CrearEmpleado';
import CrearProyecto from './Components/CrearProyecto';
import Perfil from './Components/Perfil';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const usuario = localStorage.getItem('user');
        if (token && usuario) setUser(JSON.parse(usuario));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const ProtectedRoute = ({ element, roles }) => {
        if (!user) return <Navigate to="/login" />;
        if (roles && !roles.includes(user.rol)) return <Navigate to="/" />;
        return element;
    };

    return (
        <Router>
            <Header nombre_usuario={user?.nombre_usuario} />
            <Navbar user={user} onLogout={handleLogout} />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<Dashboard user={user} />} />
                    <Route path="/proyectos" element={<ProyectoList />} />
                    <Route path="/proyectos/:id" element={<ProyectoDetalle />} />
                    <Route path="/crear-proyecto" element={<CrearProyecto />} />
                    <Route 
                        path="/crear-empleado" 
                        element={<ProtectedRoute element={<CrearEmpleado />} roles={['Administrador']} />} 
                    />
                    <Route path="/matriz" element={<ResponsibilityMatrix />} />
                    <Route path="/login" element={user ? <Navigate to="/" /> : <LoginForm setUser={setUser} />} />
                    <Route 
                        path="/perfil" element={<Perfil />}/>
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
