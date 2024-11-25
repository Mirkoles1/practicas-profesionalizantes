// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Header from './Pages/Header';
import Footer from './Pages/Footer';
import Navbar from './Pages/Navbar';
import Dashboard from './Components/Dashboard';
import ProyectoList from './Components/ProyectoList';
import LoginForm from './Components/LoginForm';
import SignUp from './Components/SignUp';
import ResponsibilityMatrix from './Components/ResponsibilityMatrix';
import CrearEmpleado from './Components/CrearEmpleado';
import CrearProyecto from './Components/CrearProyecto';
import Perfil from './Components/Perfil';
import ProjectDetails from './Components/ProjectDetails';
import ActivityDetails from './Components/ActivityDetails';
import EmployeeProjectDetails from './Components/EmployeeProjectDetails';
import EmployeeActivityDetails from './Components/EmployeeActivityDetails';
import UserProjects from './Components/UserProjects';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Recuperar token y usuario del localStorage
        const token = localStorage.getItem('token');
        const usuario = localStorage.getItem('user');
        
        if (token && usuario) {
            try {
                setUser(JSON.parse(usuario)); // Parsear usuario solo si es válido
            } catch (error) {
                console.error("Error al parsear el usuario desde localStorage:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null); // Limpiar el estado del usuario al hacer logout
    };

    // Rutas protegidas que requieren autenticación y roles específicos
    const ProtectedRoute = ({ element, roles }) => {
        if (!user) {
            return <Navigate to="/login" />; // Redirige si no hay usuario
        }
        if (roles && !roles.includes(user.rol)) {
            return <Navigate to="/" />; // Redirige si el rol no tiene permisos
        }
        return element; // Renderiza el componente si el usuario tiene acceso
    };

    return (
        <Router>
            <Header nombre_usuario={user?.nombre_usuario} />
            <Navbar user={user} onLogout={handleLogout} />
            <div style={{ padding: '20px' }}>
                <Routes>
                    {/* Rutas generales */}
                    <Route path="/" element={<Dashboard user={user} />} />
                    <Route path="/proyectos" element={<ProyectoList />} />
                    <Route path="/crear-proyecto" element={<CrearProyecto />} />
                    <Route 
                        path="/crear-empleado" 
                        element={<ProtectedRoute element={<CrearEmpleado />} roles={['Administrador']} />} 
                    />

                    <Route path="/matriz" element={<ResponsibilityMatrix />} />
                    <Route path="/proyecto-detalle/:projectId" element={<ProjectDetails />} />
                    <Route path="/activity/:activityId" element={<ActivityDetails />} />
                    <Route path="/employee/project/:projectId" element={<EmployeeProjectDetails />} />
                    <Route path="/employee/activity/:activityId" element={<EmployeeActivityDetails />} />
                    <Route path="/user/projects" element={<UserProjects />} />


                    {/* Ruta de login solo si el usuario no está logueado */}
                    <Route path="/login" element={user ? <Navigate to="/" /> : <LoginForm setUser={setUser} />} />

                    {/* Perfil y SignUp */}
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/signup" element={<SignUp />} />
                    
                </Routes>
            </div>
            <footer>
                <Footer/>
            </footer>
            
        </Router>
    );
};

export default App;
