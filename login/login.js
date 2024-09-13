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
