<?php

require_once __DIR__ . '/../models/Proyecto.php';

$proyectoModel = new Proyecto();

// Obtener todos los proyectos
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $proyectos = $proyectoModel->obtenerProyectos();
    header('Content-Type: application/json');
    echo json_encode($proyectos);
}

// Crear un nuevo proyecto
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $nombre = $data['nombre'];
    $descripcion = $data['descripcion'];
    $estado = $data['estado'] ?? 'Activo';

    if ($proyectoModel->crearProyecto($nombre, $descripcion, $estado)) {
        http_response_code(201);
        echo json_encode(['message' => 'Proyecto creado con éxito']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Error al crear el proyecto']);
    }
}
