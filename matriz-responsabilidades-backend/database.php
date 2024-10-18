<?php

function conectarDB() {
    $host = 'localhost';
    $dbname = 'matriz_responsabilidades_bd';
    $user = 'root';
    $password = '24042006';

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("Error de conexión: " . $e->getMessage());
    }
}
