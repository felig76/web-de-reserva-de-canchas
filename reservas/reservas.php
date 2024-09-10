<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = ""; // XAMPP no tiene contraseña para MySQL por defecto
$dbname = "reservas_paintball";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    throw new Exception("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM Reservas";  // Ejemplo de consulta
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
