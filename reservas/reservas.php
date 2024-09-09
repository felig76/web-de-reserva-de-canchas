<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Configuración de la base de datos

$servername = "localhost";
$username = "root";
$password = ""; // XAMPP no tiene contraseña para MySQL por defecto
$dbname = "reservas_paintball";
/*
$servername = "sql111.infinityfree.com"; // Cambiar si es necesario
$username = "if0_37225004"; // Cambiar por tu usuario de base de datos
$password = "6dQGvZ15Uh"; // Cambiar por tu contraseña de base de datos
$dbname = "if0_37225004_ReservasEzeizaPaintball"; // Cambiar por el nombre de tu base de datos
*/

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    throw new Exception("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM Reservas";  // Ejemplo de consulta
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $reservas = [];

    while($row = $result->fetch_assoc()) {
        $reservas[] = $row;
    }

    echo json_encode($reservas);
} else {
    echo json_encode([]);
}

$conn->close();
?>