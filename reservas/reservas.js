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
  var listasReservasDiarias = document.getElementById('listasReservasDiarias');
  listasReservasDiarias.innerHTML = '';

  // Obtener los próximos 7 días
  const dias = obtenerProximosSieteDias();

  if (numeroCancha != 0) {
    
    // Obtener registros de reservas usando el código php desde base de datos y transformarlo a formato json
    fetch('reservas.php').then(response => response.json()).then(reservas => {

      for (let i = 0; i < dias.length; i++) {

        var diaContenedor = document.createElement('div');
        diaContenedor.className = 'dia-semana';
        
        var encabezadoDia = document.createElement('h3');
        encabezadoDia.textContent = formatearFecha(dias[i]);
        diaContenedor.appendChild(encabezadoDia);

        var listaReservas = document.createElement('ul');

        for (let j = 0; j < HORAS_TURNOS.length; j++) {

          var estaReservado = reservas.find(r => 
            r.fecha_reserva === dias[i] &&
            r.hora_inicio === HORAS_TURNOS[j] &&
            r.cancha === numeroCancha
          );

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
        listasReservasDiarias.appendChild(diaContenedor);
      }

    })

    // Agregar listener para todas las tarjetas de reserva creadas
    document.getElementById('listasReservasDiarias').addEventListener('click', function(event) {
      if (event.target.classList.contains('reserva-item')) {
        const botonReserva = event.target;
        if (usuarioLogueado()) {
            
          document.getElementById('reservaPanel').style.display = 'block';
        } else {
          manejarAvisoEstadoLogeo();
        }
      }
    });

    // Cerrar el panel flotante
    document.getElementById('cerrarPanelReserva').addEventListener('click', function() {
      document.getElementById('panelReserva').style.display = 'none';
    });

  }
}

document.getElementById('btnUsuario').addEventListener('click', function() {
  if (usuarioLogueado()) {
    controlarPanelUsuario();
  } else {
    localStorage.setItem('usuarioLogueado', 'true');
    localStorage.setItem('nombreUsuario', 'juan perez');
    window.location.href = 'http://localhost/web-de-reserva-de-canchas/login/login.html'; // !!! cambiar por dominio
  }
});

function usuarioLogueado() {
  return localStorage.getItem('usuarioLogueado') === 'true';
}

document.addEventListener('DOMContentLoaded', function() {actualizarBotonUsuario();});
function actualizarBotonUsuario() {
  const botonUsuario = document.getElementById('btnUsuario');
  if (usuarioLogueado()) {
    botonUsuario.textContent = 'Ver Perfil';
  } else {
    botonUsuario.textContent = 'Ingresar';
  }
}

function controlarPanelUsuario(){
  const panelUsuario = document.getElementById('panelUsuario');
  if (panelUsuario.style.display === 'none'){
    panelUsuario.style.display = 'block';
    const nombreUsuario = document.getElementById('nombreUsuario');
    nombreUsuario.textContent = `${localStorage.getItem('nombreUsuario')}`;
  } else {
    panelUsuario.style.display = 'none';
  }
}
document.getElementById('cerrarSesion').addEventListener('click', function() {
  localStorage.removeItem('usuarioLogueado');
  localStorage.removeItem('nombreUsuario');
  location.reload();
});

function manejarAvisoEstadoLogeo(){
  const avisoEstadoLogeo = document.getElementById('avisoEstadoLogeo');
  avisoEstadoLogeo.style.display = 'flex';
  document.getElementById('cerrarAvisoLogeo').addEventListener('click', function() {
    avisoEstadoLogeo.style.display = 'none';
  });
}


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