<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", reservas_paintball);

if ($conn->connect_error) {
    throw new Exception("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM Reservas";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $reservas = [];

    while($row = $result->fetch_assoc()) {
        // Convertir los valores numéricos a enteros
        $row['id'] = (int)$row['id'];
        $row['cancha'] = (int)$row['cancha'];
        $row['usuario_id'] = (int)$row['usuario_id'];

        $reservas[] = $row;
    }

    echo json_encode($reservas);
} else {
    echo json_encode([]);
}

$conn->close();
?>
