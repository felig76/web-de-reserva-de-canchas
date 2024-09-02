<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servername = "sql111.infinityfree.com"; // Cambiar si es necesario
$username = "if0_37225004"; // Cambiar por tu usuario de base de datos
$password = "6dQGvZ15Uh"; // Cambiar por tu contraseña de base de datos
$dbname = "if0_37225004_ReservasEzeizaPaintball"; // Cambiar por el nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta SQL para obtener las reservas
$sql = "SELECT id, fecha_reserva, hora_inicio, cancha, usuario_id FROM Reservas";
$result = $conn->query($sql);

$reservas = array();

if ($result->num_rows > 0) {
    // Output de cada fila
    while($row = $result->fetch_assoc()) {
        $reservas[] = $row;
    }
}

$conn->close();

echo json_encode($reservas);
?>