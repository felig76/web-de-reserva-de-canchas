<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

// Configuración para base de datos local con XAMPP
$servername = "localhost";
$username = "root";
$password = ""; // XAMPP no tiene contraseña para MySQL por defecto
$dbname = "reservas_paintball";
// Configuración para base de datos hosteada
/*
$servername = "sql111.infinityfree.com";
$username = "if0_37225004";
$password = "6dQGvZ15Uh ";
$dbname = "if0_37225004_ReservasEzeizaPaintball";
*/

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Leer los datos JSON enviados por la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Obtener los datos enviados
$fecha = $data['fecha'];
$hora = $data['hora'];
$cancha = intval($data['cancha']);
$usuario = $data['usuario'];

// Buscar el id del usuario en la base de datos
$sql_usuario = "SELECT id FROM usuarios WHERE nombre = ?";
$stmt_usuario = $conn->prepare($sql_usuario);
$stmt_usuario->bind_param('s', $usuario);
$stmt_usuario->execute();
$result_usuario = $stmt_usuario->get_result();

if ($result_usuario->num_rows > 0) {
    // Si el usuario existe, obtener su id
    $row_usuario = $result_usuario->fetch_assoc();
    $usuario_id = $row_usuario['id'];

    // Insertar la nueva reserva
    $sql_reserva = "INSERT INTO reservas (fecha_reserva, hora_inicio, cancha, usuario_id) VALUES (?, ?, ?, ?)";
    $stmt_reserva = $conn->prepare($sql_reserva);
    $stmt_reserva->bind_param('ssii', $fecha, $hora, $cancha, $usuario_id);

    if ($stmt_reserva->execute()) {
        echo json_encode(['success' => 'Reserva creada exitosamente']);
    } else {
        echo json_encode(['error' => 'Error al crear la reserva']);
    }

    $stmt_reserva->close();
} else {
    echo json_encode(['error' => 'Usuario no encontrado (Logeado incorrectamente o maliciosamente)']);
}

$stmt_usuario->close();
$conn->close();
?>
