<?php

$conn = new mysqli("localhost", "root", "", reservas_paintball);

// Verificar conexión
if ($conn->connect_error) {
    die('Error de conexión: ' . $conn->connect_error);
}

// Recibir los datos JSON del fetch en JavaScript
$data = json_decode(file_get_contents('php://input'), true);
$newUsername = $data['nombre'];
$newPassword = $data['contrasenia'];

// Consulta para verificar si el usuario ya existe
$sql = "SELECT * FROM Usuarios WHERE nombre = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $newUsername);
$stmt->execute();
$result = $stmt->get_result();

$response = array();

if ($result->num_rows > 0) {
    // Si el usuario ya existe
    $response['success'] = false;
    $response['error'] = 'username_exists';
} else {
    // Si no existe, insertar el nuevo usuario
    $sql = "INSERT INTO Usuarios (nombre, contrasenia) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $newUsername, $newPassword);

    if ($stmt->execute()) {
        $response['success'] = true;
    } else {
        $response['success'] = false;
        $response['error'] = 'insert_failed';
    }
}

// Enviar la respuesta de vuelta al JavaScript en formato JSON
echo json_encode($response);

$stmt->close();
$conn->close();
?>
