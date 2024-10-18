<?php

// Habilitar CORS para permitir solicitudes desde el frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Content-Type: application/json");

$request = $_SERVER['REQUEST_URI'];

// Rutas
if (strpos($request, '/api/proyectos') === 0) {
    require_once __DIR__ . '/routes/proyectos.php';
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Ruta no encontrada']);
}
