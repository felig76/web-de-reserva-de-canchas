// Variable para guardar el temporizador para el mensaje de error de login
let loginTimeoutId;

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar la recarga de página

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Realizar la solicitud con fetch al PHP
    fetch('login.php')
        .then(response => response.json())
        .then(data => {            

            var userFound = data.find(user => 
                user.nombre === username && 
                user.contrasenia === password
            );

            const message = document.getElementById('login-message');

            if (userFound) {
                // Usuario y contraseña correctos
                localStorage.setItem('usuarioLogueado', 'true');
                localStorage.setItem('nombreUsuario', username);
                localStorage.setItem('idUsuario', userFound.id);
                message.textContent = 'Sesión iniciada correctamente';
                message.style.backgroundColor = "green";
            } else {
                // Usuario o contraseña incorrectos
                message.style.visibility = 'visible'
                message.textContent = 'Usuario o contraseña incorrectos';
                message.style.color = "red";


                // Limpiar cualquier temporizador previo
                if (loginTimeoutId) {
                    clearTimeout(loginTimeoutId);
                }

                // Temporizador para ocultar el mensaje después de 1 segundo
                loginTimeoutId = setTimeout(function () {
                    message.style.visibility = 'hidden'; // Limpiar el mensaje
                }, 1000); // 1000 milisegundos = 1 segundo
            }
        })
        .catch(error => console.error('Error:', error));
});

// Mostrar el formulario de registro al hacer clic en el botón de registro
document.getElementById('botonRegistro').addEventListener('click', function () {
    document.getElementById('register-container').style.display = 'block'; // Mostrar el contenedor de registro
    document.getElementById('login-container').style.display = 'none'; // Ocultar el panel de login
});

document.getElementById('botonLogin').addEventListener('click', function () {
    document.getElementById('register-container').style.display = 'none'; // Mostrar el contenedor de registro
    document.getElementById('login-container').style.display = 'block'; // Ocultar el panel de login
});

// Variable para guardar el temporizador
let timeoutId;

// Manejar el envío del formulario de registro
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar la recarga de página

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    // Enviar los datos del nuevo usuario al PHP para registrar en la base de datos
    fetch('register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: newUsername, contrasenia: newPassword })
    })
    .then(response => response.json())
    .then(data => {
        const errorMessage = document.getElementById('mensaje-error');

        if (data.success) {
            localStorage.setItem('usuarioLogueado', 'true');
            localStorage.setItem('nombreUsuario', newUsername);
            fetch('obtenerIdUsuario.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify({ usuario: newUsername })
            })
            .then(response => response.json())
            .then(data => {
            if (data.idUsuario) {
                localStorage.setItem('idUsuario', data.idUsuario);
            } else {
                console.error('No se pudo obtener el ID del usuario.');
            }
            })
            .catch(error => {
            console.error('Error al obtener el ID del usuario:', error);
            });

            errorMessage.classList.remove('visible'); // Ocultar mensaje de error si hay éxito
        } else if (data.error === 'username_exists') {
            // Mostrar el mensaje de error si el nombre de usuario ya existe
            errorMessage.classList.add('visible');
            // Si ya había un temporizador corriendo, cancelarlo
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // Establecer un nuevo temporizador que oculta el mensaje 1 segundo después del último clic
            timeoutId = setTimeout(function () {
                errorMessage.classList.remove('visible'); // Aplicar fade out al mensaje
            }, 1000); // 1000 milisegundos = 1 segundo
        } else {
            errorMessage.classList.remove('visible');
        }
    })
    .catch(error => console.error('Error:', error));
});



document.addEventListener('DOMContentLoaded', comprobarLogueo);

function comprobarLogueo(){
    const panelLoginRegister = document.getElementById("panelLoginRegister");
    const avisoLogueado = document.getElementById("avisoLogueado");
    usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if(usuarioLogueado !== null && usuarioLogueado === 'true'){
        panelLoginRegister.style.display = "none";
        avisoLogueado.style.display = "block";
    }
    else{
        panelLoginRegister.style.display = "block";
        avisoLogueado.style.display = "none";
    }
}