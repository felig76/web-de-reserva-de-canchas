<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

// Configuración para base de datos local con XAMPP
$servername = "localhost";
$username = "root";
$password = ""; // XAMPP no tiene contraseña por defecto
$dbname = "reservas_paintball";

// Crear conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Leer el nombre de usuario enviado desde JavaScript
$data = json_decode(file_get_contents('php://input'), true);
$nombreUsuario = $data['usuario'];

// Preparar y ejecutar la consulta para obtener el id del usuario
$sql = "SELECT id FROM usuarios WHERE nombre = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $nombreUsuario);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontró el usuario
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(['idUsuario' => $row['id']]);
} else {
    echo json_encode(['error' => 'Usuario no encontrado']);
}

$stmt->close();
$conn->close();
?>