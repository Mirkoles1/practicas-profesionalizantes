<?php

require_once __DIR__ . '/../database.php';

class Usuario {
    private $db;

    public function __construct() {
        $this->db = conectarDB();
    }

    public function obtenerUsuarios() {
        $sql = "SELECT * FROM usuario";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
