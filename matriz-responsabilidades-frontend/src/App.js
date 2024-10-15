// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import Navbar from './Pages/Navbar';
import Dashboard from './Components/Dashboard';
import ProyectoList from './Components/ProyectoList';
import ProyectoDetalle from './Components/ProyectoDetalle';
import LoginForm from './Components/LoginForm';

const App = () => {
  return (
    <Router>
      <Header />
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/proyectos" element={<ProyectoList />} />
          <Route path="/proyectos/:id" element={<ProyectoDetalle />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
