<?php

require_once __DIR__ . '/../database.php';

class Proyecto {
    private $db;

    public function __construct() {
        $this->db = conectarDB();
    }

    public function obtenerProyectos() {
        $sql = "SELECT * FROM proyecto";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function crearProyecto($nombre, $descripcion, $estado) {
        $sql = "INSERT INTO proyecto (nombre, descripcion, estado) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$nombre, $descripcion, $estado]);
    }
}
