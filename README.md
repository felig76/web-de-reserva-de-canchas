# Página Web de Reserva de Canchas de Paintball

## Descripción Básica del Proyecto

**Objetivo del Proyecto:**
Desarrollar una página web intuitiva y funcional para la reserva de canchas de paintball. La plataforma permitirá a los usuarios registrarse, iniciar sesión, seleccionar canchas, elegir horarios disponibles y confirmar reservas, todo a través de una interfaz sencilla y accesible.

## Características Principales

1. **Páginas del Sitio:**
   - **Página de Login:**
     - Formulario de registro para nuevos usuarios.
     - Opción para que los usuarios existentes inicien sesión en sus cuentas.

   - **Landing Page de Reservas:**
     - **Título de la Página:** Presentará el nombre o propósito del sitio web.
     - **Barra de Navegación:** Facilitará la navegación entre la página de login y la página de reservas.
     - **Menú Desplegable de Canchas:** Permitirá a los usuarios seleccionar la cancha de paintball que desean reservar.
     - **Opciones de Horarios:** Una vez seleccionada la cancha, se mostrarán los horarios disponibles en diferentes días para que el usuario elija el que mejor se adapte a sus necesidades.
     - **Ventana de Cobro:** Tras seleccionar el horario deseado, se mostrará una ventana para confirmar la reserva y realizar el pago correspondiente.

2. **Funcionalidades del Usuario:**
   - **Creación de Cuenta:** Los usuarios pueden registrarse en el sistema proporcionando sus datos personales y creando un nombre de usuario y contraseña.
   - **Inicio de Sesión:** Los usuarios existentes pueden acceder a sus cuentas para gestionar reservas.
   - **Gestión de Reservas:** Las reservas realizadas se guardarán en la cuenta del usuario para su consulta y gestión futura.

3. **Requisitos Técnicos:**
   - **Interfaz de Usuario:** Diseño amigable y responsivo para una experiencia óptima en diferentes dispositivos.
   - **Seguridad:** Implementación de medidas de seguridad para proteger la información del usuario y las transacciones realizadas.
   - **Base de Datos:** Sistema de base de datos para almacenar información sobre usuarios, canchas, horarios y reservas.


### Documento de investigación:
https://docs.google.com/document/d/1lI5x8H-xdL4F025yJKCU4iFlIuoeXsaNYvHgmf5oFEM/edit?usp=sharing

## Prototipo inicial
![alt text](https://github.com/felig76/web-de-reserva-de-canchas/blob/main/imagenes/prototipado%20rapido.png)

###  Requerimientos del cliente:
https://docs.google.com/document/d/13pKaxUB-yNgMZ_fSxwnoKZ1IjpNhDR9dJ3wBgQfKjOc/edit?usp=sharing

### Product list:
https://docs.google.com/document/d/1eXtSfyRFrKN54EJ5LREIs0zLvEImILz1uDqoG59bBKs/edit?usp=sharing

gantt
    title Diagrama de Gantt para el Proyecto de Reserva de Canchas de Paintball
    dateFormat  YYYY-MM-DD
    section Planificación
    Análisis de Requisitos        :a1, 2024-09-01, 10d
    Investigación de Mercado       :a2, after a1, 10d
    Diseño Inicial                 :a3, after a2, 10d
    section Desarrollo
    Configuración de Entorno       :b1, 2024-09-15, 5d
    Desarrollo de Frontend         :b2, 2024-09-20, 20d
    Desarrollo de Backend          :b3, 2024-09-20, 25d
    Integración de Base de Datos   :b4, 2024-10-10, 15d
    Implementación de Sistema de Pago :b5, after b4, 10d
    section Pruebas
    Pruebas de Funcionalidad       :c1, 2024-10-25, 10d
    Pruebas de Seguridad           :c2, after c1, 5d
    Pruebas de Usabilidad          :c3, after c2, 7d
    section Despliegue
    Preparación para Despliegue    :d1, 2024-11-05, 5d
    Despliegue en Producción       :d2, 2024-11-10, 3d
    Monitoreo y Ajustes            :d3, after d2, 10d
