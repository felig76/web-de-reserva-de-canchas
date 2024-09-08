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

-- Insertar datos de prueba en la tabla de usuarios
INSERT INTO Usuarios (id, nombre, contrasenia) VALUES
(1, 'Juan Pérez', 'juan123'),
(2, 'Ana Gómez', 'ana456'),
(3, 'Carlos Sánchez', 'carlos789'),
(4, 'Laura Fernández', 'laura1011'),
(5, 'Marta López', 'marta1213'),
(6, 'Pedro Martínez', 'pedro1415');

-- Insertar datos de prueba en la tabla de reservas
INSERT INTO Reservas (id, fecha_reserva, hora_inicio, cancha, usuario_id) VALUES
(1, '2024-08-25', '10:00', 1, 1),  -- Juan Pérez
(2, '2024-08-25', '13:00', 7, 2),  -- Ana Gómez
(5, '2024-08-26', '12:00', 3, 3),  -- Carlos Sánchez
(6, '2024-08-26', '15:00', 7, 4),  -- Laura Fernández
(9, '2024-08-27', '14:00', 5, 5),  -- Marta López
(10, '2024-08-27', '17:00', 6, 6); -- Pedro Martínez
