const HORAS_TURNOS = ['08:00:00', '11:00:00', '14:00:00', '17:00:00', '20:00:00'];

document.getElementById('selectCancha').addEventListener('change', function() {
  var valorSeleccionado = this.value;
  if (valorSeleccionado > 6){
    var tipoCancha = "Cancha profesional"
  } else {
    var tipoCancha = `Cancha amateur ${this.value}`
  }
  mostrarOpcionesReservas(valorSeleccionado, tipoCancha);
});


function mostrarOpcionesReservas(numeroCancha, nombreCancha) {
  numeroCancha = Number(numeroCancha);
  var contenedorReservas = document.getElementById('listasReservasDiarias');
  contenedorReservas.innerHTML = '';

  // Obtener los próximos 7 días
  const dias = obtenerProximosSieteDias();

  if (numeroCancha != 0) {
    
    // Obtener registros de reservas usando el código php desde base de datos y transformarlo a formato json
    fetch('reservas.php').then(response => response.json()).then(reservas => {

      for (let i = 0; i < dias.length; i++) {
        // Crear un nuevo contenedor para cada día
        var diaContenedor = document.createElement('div');
        diaContenedor.className = 'dia-semana';
        
        // Crear un encabezado con la fecha para el día
        var encabezadoDia = document.createElement('h3');
        encabezadoDia.textContent = formatearFecha(dias[i]);
        diaContenedor.appendChild(encabezadoDia);
        
        // Crear una lista desordenada para las reservas del día
        var listaReservas = document.createElement('ul');
        
        // Agregar elementos a la lista de reservas
        for (let j = 0; j < HORAS_TURNOS.length; j++) {

          var estaReservado = reservas.find(r => 
            r.fecha_reserva === dias[i] &&
            r.hora_inicio === HORAS_TURNOS[j] &&
            r.cancha === numeroCancha
          );
          console.log(estaReservado);
          var nuevaTarjetaReserva = document.createElement('button');
          nuevaTarjetaReserva.textContent = `${HORAS_TURNOS[j]}, ${formatearFecha(dias[i])} - ${nombreCancha}`;
          nuevaTarjetaReserva.classList.add('reserva-item');
          if (estaReservado) {
            nuevaTarjetaReserva.classList.add('reservado');
            nuevaTarjetaReserva.textContent += ' - Reservado';
            nuevaTarjetaReserva.disabled = true;
          } else {
            nuevaTarjetaReserva.classList.add('disponible');
            nuevaTarjetaReserva.textContent += ' - Disponible';
          }
          nuevaTarjetaReserva.setAttribute('data-cancha', numeroCancha);
          nuevaTarjetaReserva.setAttribute('data-horario', HORAS_TURNOS[j]);
          nuevaTarjetaReserva.setAttribute('data-dia', dias[i]);

          listaReservas.appendChild(nuevaTarjetaReserva);
        }
        
        diaContenedor.appendChild(listaReservas);
        contenedorReservas.appendChild(diaContenedor);
      }

    })

    // Mostrar el panel con detalles al hacer clic en una reserva
    document.querySelectorAll('.reserva-item.disponible').forEach(botonReserva => {
      botonReserva.addEventListener('click', function() {
          // Verificar si el usuario está logueado
          if (usuarioLogueado()) {
              const detalles = `Reserva para la cancha ${this.dataset.cancha} a las ${this.dataset.hora} del ${this.dataset.fecha}`;
              document.getElementById('reservaDetalles').textContent = detalles;
              document.getElementById('reservaPanel').style.display = 'block';
          } else {
              alert('Debes iniciar sesión para reservar.');
          }
      });
    });
    // Cerrar el panel flotante
    document.getElementById('cerrarPanel').addEventListener('click', function() {
      document.getElementById('reservaPanel').style.display = 'none';
    });

  }
}

document.getElementById('btnUsuario').addEventListener('click', function() {
  // Simula el login guardando el estado en localStorage
  if (usuarioLogueado()) {
    abrirPanelUsuario();
  } else {
    // luego cambiar por redirect a pagina de login etc.
    localStorage.setItem('usuarioLogueado', 'true');
    alert('Te has logueado exitosamente');
  }
  actualizarEstadoBoton(); // Actualiza el botón al estado de logueado
});

// Función para verificar si el usuario está logueado
function usuarioLogueado() {
  return localStorage.getItem('usuarioLogueado') === 'true';
}

// Función para actualizar el botón de ingresar
function actualizarEstadoBoton() {
  const botonUsuario = document.getElementById('btnUsuario');
  if (usuarioLogueado()) {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    botonUsuario.textContent = `(${nombreUsuario})`;
  } else {
    botonUsuario.textContent = 'Ingresar';
  }
}

// Evento para cerrar sesión
document.getElementById('btnCerrarSesion').addEventListener('click', function() {
  if (usuarioLogueado()) {
      localStorage.removeItem('usuarioLogueado');
      alert('Has cerrado sesión.');
      actualizarEstadoBoton();
  }
});

// Llamar la función al cargar la página
document.addEventListener('DOMContentLoaded', actualizarEstadoBoton);


function obtenerProximosSieteDias() {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    let day = new Date(today);
    day.setDate(today.getDate() + i);
    const year = day.getFullYear(); // Obtener el año, mes y día
    const month = String(day.getMonth() + 1).padStart(2, '0'); // Mes en formato de dos dígitos
    const date = String(day.getDate()).padStart(2, '0'); // Día en formato de dos dígitos
    const formattedDate = `${year}-${month}-${date}`; // Crear la fecha en formato YYYY-MM-DD
    days.push(formattedDate);
  }
  
  return days;
}
function formatearFecha(fecha) {
  let partes = fecha.split("-"); // Divide la fecha por el guión
  return `${partes[2]}/${partes[1]}/${partes[0]}`; // Reordena las partes como día/mes/año
}