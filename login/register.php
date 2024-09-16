<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "reservas_paintball";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die('Error de conexión: ' . $conn->connect_error);
}

// Recibir los datos JSON
$data = json_decode(file_get_contents('php://input'), true);
$newUsername = $data['nombre'];
$newPassword = $data['contrasenia'];

// Consulta para insertar el nuevo usuario
$sql = "INSERT INTO Usuarios (nombre, contrasenia) VALUES (?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $newUsername, $newPassword);

$response = array();

if ($stmt->execute()) {
    $response['success'] = true;
} else {
    $response['success'] = false;
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>
