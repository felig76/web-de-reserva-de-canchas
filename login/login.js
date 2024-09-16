document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar la recarga de página

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Realizar la solicitud con fetch al PHP
    fetch('login.php')
        .then(response => response.json())
        .then(data => {
            let userFound = false;
            // Usar .forEach() para iterar sobre los usuarios y printarlos en la consola
            data.forEach(user => {
                console.log(`Comprobando usuario: ${user.nombre}`);
                
                // Verificar si el usuario y la contraseña coinciden
                if (user.nombre === username && user.contrasenia === password) {
                    userFound = true;
                }
            });

            const message = document.getElementById('login-message');

            if (userFound) {
                // Usuario y contraseña correctos
                message.textContent = 'sesion iniciada correctamente';
                message.style.backgroundColor = "green";
                window.location.href = 'http://ezeizapaintball.infinityfreeapp.com';
            } else {
                // Usuario o contraseña incorrectos
                message.textContent = 'Usuario o contraseña incorrectos';
                message.style.backgroundColor = "red";
            }
            })
            .catch(error => console.error('Error:', error));
});

// Mostrar el formulario de registro al hacer clic en el botón de registro
document.getElementById('botonRegistro').addEventListener('click', function () {
    document.querySelector('.register-container').style.display = 'block'; // Mostrar el contenedor de registro
    document.querySelector('.login-container').style.display = 'none'; // Ocultar el panel de login
});

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
        const message = document.getElementById('register-message');
        if (data.success) {
            message.textContent = 'Cuenta registrada con éxito';
            message.style.backgroundColor = "green";
        } else {
            message.textContent = 'Error al registrar la cuenta';
            message.style.backgroundColor = "red";
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


