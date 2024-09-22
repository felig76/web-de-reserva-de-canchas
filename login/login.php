<?php

$conn = new mysqli("localhost", "root", "", reservas_paintball);

$conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die('Error de conexión: ' . $conn->connect_error);
    }

    // Consulta para seleccionar todos los usuarios y contraseñas
    $sql = "SELECT id, nombre, contrasenia FROM Usuarios";
    $result = $conn->query($sql);

    $usuarios = array();

    if ($result->num_rows > 0) {
        // Convertir los resultados en un array
        while($row = $result->fetch_assoc()) {
            $usuarios[] = $row;
        }
    }

    // Devolver los usuarios en formato JSON
    echo json_encode($usuarios);

    $conn->close();
?>
