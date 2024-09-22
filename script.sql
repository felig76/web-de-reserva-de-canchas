-- Crear la base de datos (si es necesario)
CREATE DATABASE IF NOT EXISTS reservas_paintball;

-- Seleccionar la base de datos
USE reservas_paintball;

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL
);

-- Crear la tabla de reservas
CREATE TABLE IF NOT EXISTS Reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_reserva DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    cancha INT NOT NULL,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);