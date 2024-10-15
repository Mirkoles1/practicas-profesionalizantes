import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './Pages/DashboardPage';
import ProyectoListPage from './Pages/ProyectoListPage';
import ProyectoDetallePage from './Pages/ProyectoDetallePage';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/proyectos" element={<ProyectoListPage />} />
                    <Route path="/proyectos/:id" element={<ProyectoDetallePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
