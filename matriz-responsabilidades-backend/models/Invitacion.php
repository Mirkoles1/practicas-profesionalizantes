<?php

require_once __DIR__ . '/../database.php';

class Invitacion {
    private $db;

    public function __construct() {
        $this->db = conectarDB();
    }

    public function crearInvitacion($usuarioId, $proyectoId) {
        $sql = "INSERT INTO invitacion (usuario_id, proyecto_id, estado) VALUES (?, ?, 'pendiente')";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([$usuarioId, $proyectoId]);
    }
}
