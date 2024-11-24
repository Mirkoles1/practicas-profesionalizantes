import React from 'react';
import ReactDOM from 'react-dom/client'; // Importar 'createRoot' de ReactDOM
import App from './App'; // Asegúrate de que App.js esté correctamente importado
import './index.css'; // Estilos globales si los tienes

// Crear el root y renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root')); // 'createRoot' en lugar de 'render'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
