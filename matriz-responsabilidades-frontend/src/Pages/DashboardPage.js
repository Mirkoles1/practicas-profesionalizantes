import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Bienvenido al Panel de Control.</p>
            <Link to="/proyectos">Ver Proyectos</Link>
        </div>
    );
};

export default DashboardPage;
