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

-- Insertar 20 registros en la tabla Reservas con fechas a partir del 10/09/2024 y horarios específicos
INSERT INTO Reservas (fecha_reserva, hora_inicio, cancha, usuario_id) VALUES
-- Día 1 (10/09/2024)
('2024-09-10', '08:00:00', 1, 1),
('2024-09-10', '11:00:00', 2, 2),
('2024-09-10', '14:00:00', 3, 3),
('2024-09-10', '17:00:00', 4, 4),
('2024-09-10', '20:00:00', 5, 5),

-- Día 2 (11/09/2024)
('2024-09-11', '08:00:00', 6, 1),
('2024-09-11', '11:00:00', 1, 2),
('2024-09-11', '14:00:00', 2, 3),
('2024-09-11', '17:00:00', 3, 4),
('2024-09-11', '20:00:00', 4, 5),

-- Día 3 (12/09/2024)
('2024-09-12', '08:00:00', 5, 6),
('2024-09-12', '11:00:00', 6, 1),
('2024-09-12', '14:00:00', 1, 2),
('2024-09-12', '17:00:00', 2, 3),
('2024-09-12', '20:00:00', 3, 4),

-- Día 4 (13/09/2024)
('2024-09-13', '08:00:00', 4, 5),
('2024-09-13', '11:00:00', 5, 6),
('2024-09-13', '14:00:00', 6, 1),
('2024-09-13', '17:00:00', 1, 2),
('2024-09-13', '20:00:00', 2, 3),

-- Día 5 (14/09/2024)
('2024-09-14', '08:00:00', 3, 4),
('2024-09-14', '11:00:00', 4, 5),
('2024-09-14', '14:00:00', 5, 6),
('2024-09-14', '17:00:00', 6, 1),
('2024-09-14', '20:00:00', 1, 2);
